"use client";

import { ClerkProvider as BaseClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BaseClerkProvider>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="w-full max-w-md space-y-8 p-8">
            <div className="text-center">
              <h1 className="gradient-text text-4xl font-bold">TalentFlow AI</h1>
              <p className="mt-2 text-muted-foreground">
                Enterprise AI-Powered HR Operating System
              </p>
            </div>
            <SignIn
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-xl",
                },
              }}
            />
          </div>
        </div>
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </BaseClerkProvider>
  );
}
