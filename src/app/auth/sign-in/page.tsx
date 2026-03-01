import Link from "next/link";
import { signInAction } from "@/app/auth/actions";
import { SubmitButton } from "@/components/submit-button";

type SignInPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    next?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;

  return (
    <div className="shell">
      <section className="panel mx-auto max-w-md p-7">
        <h1 className="font-mono text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-[color:var(--muted-ink)]">
          Welcome back. Continue building your creator profile.
        </p>

        {params.error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            {params.error}
          </p>
        ) : null}
        {params.message ? (
          <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-sm text-emerald-700">
            {params.message}
          </p>
        ) : null}

        <form action={signInAction} className="mt-5 space-y-4">
          <input type="hidden" name="next" value={params.next ?? "/auth/complete"} />

          <label className="block space-y-1 text-sm">
            <span>Email</span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-[color:var(--line)] bg-white px-3 py-2"
              placeholder="you@example.com"
            />
          </label>

          <label className="block space-y-1 text-sm">
            <span>Password</span>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-lg border border-[color:var(--line)] bg-white px-3 py-2"
              placeholder="At least 6 characters"
            />
          </label>

          <SubmitButton label="Sign in" pendingLabel="Signing in..." />
        </form>

        <p className="mt-4 text-sm text-[color:var(--muted-ink)]">
          New here?{" "}
          <Link href="/auth/sign-up" className="font-semibold text-[color:var(--ink)]">
            Create an account
          </Link>
        </p>
      </section>
    </div>
  );
}
