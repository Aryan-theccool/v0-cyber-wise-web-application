import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export type UserRecord = {
  id: string;
  username: string;
  mobile: string;
  parentMobile: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function createUser(input: {
  username: string;
  password: string;
  mobile: string;
  parentMobile: string;
}): Promise<{ ok: true; user: UserRecord } | { ok: false; error: string }> {
  const { username, password, mobile, parentMobile } = input;

  try {
    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });

    if (existingUsername) {
      return { ok: false, error: "Username already exists" };
    }

    // Check if mobile number already exists
    const existingMobile = await prisma.user.findUnique({
      where: { mobile: mobile },
    });

    if (existingMobile) {
      return { ok: false, error: "Mobile number is already registered" };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        passwordHash,
        mobile,
        parentMobile,
      },
      select: {
        id: true,
        username: true,
        mobile: true,
        parentMobile: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { ok: true, user };
  } catch (error: any) {
    console.error("Error creating user:", error);
    
    // Provide more specific error messages
    if (error.code === 'P2002') {
      // Check which field caused the unique constraint violation
      if (error.meta?.target?.includes('mobile')) {
        return { ok: false, error: "Mobile number is already registered" };
      }
      return { ok: false, error: "Username already exists" };
    }
    if (error.code === 'P2003') {
      return { ok: false, error: "Database constraint violation" };
    }
    if (error.message?.includes('connect')) {
      return { ok: false, error: "Database connection failed. Please check your database configuration." };
    }
    
    return { ok: false, error: `Failed to create user: ${error.message || 'Unknown error'}` };
  }
}

export async function verifyUser(input: {
  username: string;
  password: string;
}): Promise<{ ok: true; user: UserRecord } | { ok: false; error: string }> {
  const { username, password } = input;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });

    if (!user) {
      return { ok: false, error: "Invalid credentials" };
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return { ok: false, error: "Invalid credentials" };
    }

    const { passwordHash: _omit, ...safe } = user;
    return { ok: true, user: safe };
  } catch (error: any) {
    console.error("Error verifying user:", error);
    
    // Check for database connection errors
    if (error.message?.includes('connect') || error.code === 'ECONNREFUSED' || error.code === 'P1001') {
      return { ok: false, error: "Database connection failed. Please check your database configuration." };
    }
    
    return { ok: false, error: `Failed to verify user: ${error.message || 'Unknown error'}` };
  }
}
