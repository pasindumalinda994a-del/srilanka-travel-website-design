"use client";

import type { ReactNode, FormEvent } from "react";

export type AdminFormField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "section";
  placeholder?: string;
  options?: { label: string; value: string }[];
  /** For type "section": renders a heading only; name is ignored for form values. */
  defaultValue?: string;
};

type AdminFormProps = {
  title: string;
  description?: string;
  fields: AdminFormField[];
  /** Optional prefill (e.g. for edit). Overrides field.defaultValue when set. */
  defaultValues?: Record<string, string>;
  submitLabel?: string;
  onSubmit?: (values: Record<string, string>) => void;
  footer?: ReactNode;
};

export function AdminForm({
  title,
  description,
  fields,
  defaultValues,
  submitLabel = "Save",
  onSubmit,
  footer,
}: AdminFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.type === "section" || !field.name) return;
      values[field.name] = String(formData.get(field.name) ?? "");
    });

    // eslint-disable-next-line no-console
    console.log("Admin form submitted:", values);
    onSubmit?.(values);
  };

  return (
    <section className="rounded-2xl border border-[var(--admin-card-border)] bg-[var(--background)] p-5 shadow-sm md:p-6">
      <header className="mb-4">
        <h2 className="text-base font-semibold tracking-tight text-[var(--foreground)] md:text-lg">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-xs text-neutral-500 md:text-sm">{description}</p>
        )}
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {fields.map((field) => {
          if (field.type === "section") {
            return (
              <h3
                key={field.name || field.label}
                className="pt-4 pb-1 text-sm font-semibold text-[var(--foreground)] border-b border-[var(--admin-card-border)] first:pt-0"
              >
                {field.label}
              </h3>
            );
          }

          const inputClass =
            "w-full rounded-xl border border-[var(--admin-card-border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[var(--admin-input-ring)] focus:border-transparent";
          const value = defaultValues?.[field.name] ?? field.defaultValue;

          return (
            <div key={field.name} className="space-y-1.5">
              <label
                htmlFor={field.name}
                className="block text-xs font-medium uppercase tracking-wider text-neutral-600"
              >
                {field.label}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  defaultValue={value}
                  className={`min-h-[90px] ${inputClass}`}
                />
              ) : field.type === "select" ? (
                <select id={field.name} name={field.name} className={inputClass} defaultValue={value}>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "number" ? (
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  placeholder={field.placeholder}
                  defaultValue={value}
                  className={inputClass}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  defaultValue={value}
                  className={inputClass}
                />
              )}
            </div>
          );
        })}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <p className="text-[11px] text-neutral-500">
            Demo-only form. Submissions are not persisted yet.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--foreground)]"
          >
            {submitLabel}
          </button>
        </div>
      </form>

      {footer && (
        <div className="mt-4 border-t border-[var(--admin-card-border)] pt-3 text-xs text-neutral-500">
          {footer}
        </div>
      )}
    </section>
  );
}
