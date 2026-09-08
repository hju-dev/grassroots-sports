import { ClerkProvider, SignIn } from '@clerk/nextjs';

// ClerkProvider is scoped to just this page rather than the root layout —
// see the note in src/app/(site)/layout.tsx.
export default function SignInPage() {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <SignIn />
      </div>
    </ClerkProvider>
  );
}
