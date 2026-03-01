import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type DashboardPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in?next=/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, city, category")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/create-profile");
  }

  return (
    <div className="shell">
      <section className="panel p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--muted-ink)]">
          Dashboard
        </p>
        <h1 className="mt-2 font-mono text-3xl font-semibold">
          Welcome, {profile.full_name}
        </h1>
        <p className="mt-2 text-[color:var(--muted-ink)]">
          {profile.category} from {profile.city}
        </p>

        {params.message ? (
          <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-sm text-emerald-700">
            {params.message}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/create-profile"
            className="rounded-full border border-[color:var(--line)] bg-white/80 px-5 py-2 text-sm font-semibold"
          >
            Edit profile basics
          </Link>
          <Link
            href="/discover"
            className="rounded-full bg-[color:var(--ink)] px-5 py-2 text-sm font-semibold text-white"
          >
            Explore talent
          </Link>
        </div>
      </section>
    </div>
  );
}
