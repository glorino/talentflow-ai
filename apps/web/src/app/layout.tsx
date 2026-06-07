import type { Metadata } from "next";
import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "TalentFlow AI - Enterprise HR Operating System",
  description: "AI-powered HR management platform for modern enterprises",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-background antialiased">
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
        </body>
      </html>
    </ClerkProvider>
  );
}
