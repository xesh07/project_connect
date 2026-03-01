import Link from "next/link";

export default function Home() {
  return (
    <div className="shell">
      <section className="panel relative overflow-hidden p-8 md:p-12">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[color:var(--bg-sand)]/35 blur-3xl" />
        <div className="absolute -bottom-14 left-14 h-40 w-40 rounded-full bg-[color:var(--accent)]/20 blur-2xl" />

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--muted-ink)]">
          CONNECT PLATFORM
        </p>
        <h1 className="mt-4 max-w-3xl font-mono text-4xl font-semibold tracking-tight md:text-6xl">
          Talent over contacts. Access over privilege.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[color:var(--muted-ink)]">
          A creative networking platform for models, photographers, stylists,
          makeup artists, designers, videographers, creators, venues, and
          brands.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/auth/sign-up"
            className="rounded-full bg-[color:var(--ink)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Join as a creator
          </Link>
          <Link
            href="/discover"
            className="rounded-full border border-[color:var(--line)] bg-white/70 px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-white"
          >
            Discover talent
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "No vanity metrics",
            text: "No likes, no follower race, no fake signals.",
          },
          {
            title: "Direct collaboration",
            text: "Send requests, apply for opportunities, build real projects.",
          },
          {
            title: "Community-first",
            text: "Events and networking for people without industry access.",
          },
        ].map((item) => (
          <article key={item.title} className="panel p-6">
            <h2 className="font-mono text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-[color:var(--muted-ink)]">{item.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
