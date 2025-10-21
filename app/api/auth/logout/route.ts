import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Delete the session cookie
    const cookieStore = cookies();
    cookieStore.delete("session");
    
    // Create response with additional cookie clearing headers
    const response = NextResponse.json({ 
      message: "Logged out successfully" 
    });
    
    // Set cookie to expire immediately (backup method)
    response.cookies.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });
    
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ 
      message: "Logged out" 
    });
  }
}
