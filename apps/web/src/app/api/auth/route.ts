import { NextRequest, NextResponse } from "next/server";
import { createUser, authenticate } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, firstName, lastName } = body;

    if (action === "register") {
      if (!email || !password || !firstName || !lastName) {
        return NextResponse.json(
          { success: false, error: "All fields are required" },
          { status: 400 }
        );
      }

      const user = await createUser({ email, password, firstName, lastName });
      const token = await authenticate(email, password);

      return NextResponse.json({
        success: true,
        data: {
          user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
          token,
        },
      });
    }

    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json(
          { success: false, error: "Email and password are required" },
          { status: 400 }
        );
      }

      const token = await authenticate(email, password);
      if (!token) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        data: { token },
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Auth failed" },
      { status: 500 }
    );
  }
}
