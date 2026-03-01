"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function messageUrl(path: string, type: "error" | "message", text: string) {
  const params = new URLSearchParams({ [type]: text });
  return `${path}?${params.toString()}`;
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const nextPath = String(formData.get("next") ?? "/auth/complete");

  if (!email || !password) {
    redirect(messageUrl("/auth/sign-in", "error", "Email and password are required."));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(messageUrl("/auth/sign-in", "error", error.message));
  }

  redirect(nextPath || "/auth/complete");
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    redirect(messageUrl("/auth/sign-up", "error", "Email and password are required."));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(messageUrl("/auth/sign-up", "error", error.message));
  }

  redirect(
    messageUrl(
      "/auth/sign-in",
      "message",
      "Signup complete. If email confirmation is enabled, verify your email first.",
    ),
  );
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
