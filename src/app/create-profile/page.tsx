import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import { createClient } from "@/lib/supabase/server";
import { saveBasicProfileAction } from "./actions";

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

type CreateProfilePageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function CreateProfilePage({
  searchParams,
}: CreateProfilePageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in?next=/create-profile");
  }

  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("full_name, city, category")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <div className="shell">
      <section className="panel mx-auto max-w-2xl p-7">
        <h1 className="font-mono text-3xl font-semibold">Create your profile</h1>
        <p className="mt-2 text-sm text-[color:var(--muted-ink)]">
          MVP onboarding for phase 1. More profile fields are added in phase 2.
        </p>

        {params.error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            {params.error}
          </p>
        ) : null}

        <form action={saveBasicProfileAction} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block space-y-1 text-sm md:col-span-2">
            <span>Name</span>
            <input
              name="full_name"
              required
              defaultValue={existingProfile?.full_name ?? ""}
              className="w-full rounded-lg border border-[color:var(--line)] bg-white px-3 py-2"
              placeholder="Your full name"
            />
          </label>

          <label className="block space-y-1 text-sm">
            <span>City</span>
            <input
              name="city"
              required
              defaultValue={existingProfile?.city ?? ""}
              className="w-full rounded-lg border border-[color:var(--line)] bg-white px-3 py-2"
              placeholder="Mumbai"
            />
          </label>

          <label className="block space-y-1 text-sm">
            <span>Category</span>
            <select
              name="category"
              required
              defaultValue={existingProfile?.category ?? ""}
              className="w-full rounded-lg border border-[color:var(--line)] bg-white px-3 py-2"
            >
              <option value="" disabled>
                Select role
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <div className="md:col-span-2">
            <SubmitButton label="Save and continue" pendingLabel="Saving..." />
          </div>
        </form>
      </section>
    </div>
  );
}
