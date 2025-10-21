import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser } from "@/lib/auth/store";

const SignupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  parentMobile: z.string().min(10, "Parent mobile must be at least 10 digits"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = SignupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await createUser(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({ message: "Signup successful", user: result.user });
  } catch (e: any) {
    console.error("Signup error:", e);
    
    // Check for database connection errors
    if (e.message?.includes('connect') || e.code === 'ECONNREFUSED' || e.code === 'P1001') {
      return NextResponse.json({ 
        error: "Database connection failed. Please ensure your database is running and .env file is configured correctly." 
      }, { status: 503 });
    }
    
    return NextResponse.json({ 
      error: e.message || "Failed to create account. Please try again." 
    }, { status: 500 });
  }
}
