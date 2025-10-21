import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyUser } from "@/lib/auth/store";
import { createSession, setSessionCookie } from "@/lib/auth/session";

const SigninSchema = z.object({
  username: z.string().min(3, "Username required"),
  password: z.string().min(6, "Password required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = SigninSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await verifyUser(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    // Create session and set cookie
    const { token, expiresAt } = await createSession(result.user.id, result.user.username);
    setSessionCookie(token, expiresAt);

    return NextResponse.json({ 
      message: "Signin successful", 
      user: {
        id: result.user.id,
        username: result.user.username,
        mobile: result.user.mobile,
        parentMobile: result.user.parentMobile,
      }
    });
  } catch (e: any) {
    console.error("Signin error:", e);
    
    // Check for database connection errors
    if (e.message?.includes('connect') || e.code === 'ECONNREFUSED') {
      return NextResponse.json({ 
        error: "Database connection failed. Please ensure your database is running and .env file is configured correctly." 
      }, { status: 503 });
    }
    
    return NextResponse.json({ 
      error: e.message || "Invalid request" 
    }, { status: 400 });
  }
}
