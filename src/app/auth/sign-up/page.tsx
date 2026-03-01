import Link from "next/link";
import { signUpAction } from "@/app/auth/actions";
import { SubmitButton } from "@/components/submit-button";

type SignUpPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;

  return (
    <div className="shell">
      <section className="panel mx-auto max-w-md p-7">
        <h1 className="font-mono text-2xl font-semibold">Create account</h1>
        <p className="mt-1 text-sm text-[color:var(--muted-ink)]">
          Start without references. Build your profile from day one.
        </p>

        {params.error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            {params.error}
          </p>
        ) : null}

        <form action={signUpAction} className="mt-5 space-y-4">
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

          <SubmitButton label="Create account" pendingLabel="Creating account..." />
        </form>

        <p className="mt-4 text-sm text-[color:var(--muted-ink)]">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-semibold text-[color:var(--ink)]">
            Sign in
          </Link>
        </p>
      </section>
    </div>
  );
}
