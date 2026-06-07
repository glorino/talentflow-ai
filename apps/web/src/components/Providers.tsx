"use client";

import { ReactNode, Suspense } from "react";

function ClerkLoaded({ children }: { children: ReactNode }) {
  const { ClerkProvider, SignIn, SignedIn, SignedOut } = require("@clerk/nextjs");

  return (
    <ClerkProvider>
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
    </ClerkProvider>
  );
}

function Fallback({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md space-y-8 p-8 text-center">
        <h1 className="gradient-text text-4xl font-bold">TalentFlow AI</h1>
        <p className="text-muted-foreground">
          Enterprise AI-Powered HR Operating System
        </p>
        <div className="animate-pulse rounded-lg border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Fallback>{children}</Fallback>}>
      <ClerkLoaded>{children}</ClerkLoaded>
    </Suspense>
  );
}
