import Link from "next/link";
import { signOutAction } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

const links = [
  { href: "/discover", label: "Discover Talent" },
  { href: "/opportunities", label: "Open Opportunities" },
  { href: "/community", label: "Community" },
  { href: "/create-profile", label: "Create Profile" },
];

export async function SiteHeader() {
  let userEmail = "";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? "";
  } catch {
    userEmail = "";
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)] bg-[color:var(--bg-cream)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="font-mono text-sm font-semibold tracking-[0.2em]">
          CONNECT
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-[color:var(--muted-ink)] transition hover:bg-white/80 hover:text-[color:var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-sm">
          {userEmail ? (
            <>
              <span className="hidden text-[color:var(--muted-ink)] md:inline">
                {userEmail}
              </span>
              <form action={signOutAction}>
                <button className="rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-1.5 font-semibold">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-1.5 font-semibold"
              >
                Sign in
              </Link>
              <Link
                href="/auth/sign-up"
                className="rounded-full bg-[color:var(--ink)] px-4 py-1.5 font-semibold text-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
