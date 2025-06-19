"use server";
import { auth } from "~/lib/auth";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      message: e.message || "Invalid email or password",
      success: false,
    };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { success: true, message: "Signed up successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      message: e.message || "An unknown error occurred",
      success: false,
    };
  }
};
