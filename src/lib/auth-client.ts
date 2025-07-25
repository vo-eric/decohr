import { createAuthClient } from "better-auth/react";

// Use environment variable for base URL, fallback to localhost for development
const baseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
  (typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signUp, useSession, signOut } = createAuthClient();
