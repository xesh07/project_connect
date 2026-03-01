"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const categories = [
  "Model",
  "Photographer",
  "Stylist",
  "Makeup Artist",
  "Designer",
  "Videographer",
  "Content Creator",
  "Venue",
  "Brand",
];

function isAllowedCategory(category: string) {
  return categories.includes(category);
}

export async function saveBasicProfileAction(formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();

  if (!fullName || !city || !category || !isAllowedCategory(category)) {
    redirect("/create-profile?error=Please+fill+all+required+fields.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in?next=/create-profile");
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      full_name: fullName,
      city,
      category,
    },
    {
      onConflict: "user_id",
    },
  );

  if (error) {
    const params = new URLSearchParams({ error: error.message });
    redirect(`/create-profile?${params.toString()}`);
  }

  redirect("/dashboard?message=Profile+saved");
}
