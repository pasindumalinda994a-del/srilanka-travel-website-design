import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-[var(--admin-card-border)] bg-[var(--background)] p-6 shadow-lg">
        <div className="mb-5 space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Admin sign in
          </h1>
          <p className="text-sm text-neutral-500">
            Mock login. Hook your auth provider here later.
          </p>
        </div>

        <form className="space-y-4 text-sm">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-medium uppercase tracking-wider text-neutral-600"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-[var(--admin-card-border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[var(--admin-input-ring)] focus:border-transparent"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-wider text-neutral-600"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-[var(--admin-card-border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[var(--admin-input-ring)] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--foreground)] px-4 py-2.5 text-sm font-medium text-[var(--background)] transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--foreground)]"
          >
            Sign in (mock)
          </button>
        </form>

        <p className="mt-4 text-xs text-neutral-500">
          This button does not validate credentials. Wire your auth flow and redirect to{" "}
          <Link href="/admin/dashboard" className="font-medium text-[var(--foreground)] underline-offset-2 hover:underline">
            /admin/dashboard
          </Link>{" "}
          later.
        </p>
      </div>
    </div>
  );
}
