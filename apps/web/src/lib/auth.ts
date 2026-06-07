import { SignJWT, jwtVerify } from "jose";
import { db, users } from "@/lib/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "talentflow-secret-change-in-production");

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  companyId: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(user: SessionUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export async function getUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}

export async function createUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  companyId?: string;
}) {
  const hashedPassword = await hashPassword(data.password);
  const [user] = await db
    .insert(users)
    .values({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      role: (data.role as any) || "employee",
      companyId: data.companyId || null,
    })
    .returning();
  return user;
}

export async function authenticate(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user || !user.password) return null;

  const valid = await verifyPassword(password, user.password);
  if (!valid) return null;

  return createToken({
    id: user.id,
    email: user.email,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    role: user.role || "employee",
    companyId: user.companyId,
  });
}
