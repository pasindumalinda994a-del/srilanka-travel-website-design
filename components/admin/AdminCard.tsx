import type { ReactNode } from "react";

type AdminCardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
};

export function AdminCard({ title, description, children, footer }: AdminCardProps) {
  return (
    <section className="flex flex-col rounded-2xl border border-[var(--admin-card-border)] bg-[var(--background)] p-5 shadow-sm md:p-6">
      {(title || description) && (
        <header className="mb-3">
          {title && (
            <h2 className="text-sm font-semibold tracking-tight text-[var(--foreground)] md:text-base">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-1 text-xs text-neutral-500 md:text-sm">{description}</p>
          )}
        </header>
      )}

      {children && (
        <div className="flex-1 text-sm text-neutral-700">{children}</div>
      )}

      {footer && (
        <footer className="mt-3 border-t border-[var(--admin-card-border)] pt-3 text-xs text-neutral-500">
          {footer}
        </footer>
      )}
    </section>
  );
}
