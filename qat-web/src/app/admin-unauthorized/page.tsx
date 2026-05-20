import Link from "next/link";

export default function AdminUnauthorizedPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5">
      <div className="glass-panel max-w-md rounded-2xl p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-red-400">
          Access denied
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-white">
          Admin access required
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          Your account does not have admin privileges. If you believe this is a
          mistake, contact the site administrator.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-10 items-center rounded-full bg-white/10 px-5 text-sm font-medium text-white transition hover:bg-white/15"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
}
