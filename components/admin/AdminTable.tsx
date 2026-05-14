import type { ReactNode } from "react";

export type AdminTableColumn<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
};

type AdminTableProps<T> = {
  columns: AdminTableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
};

export function AdminTable<T extends { id: string | number }>({
  columns,
  data,
  emptyMessage = "No records found.",
  onRowClick,
}: AdminTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--admin-card-border)] bg-[var(--background)] shadow-sm">
      <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="border-b border-[var(--admin-card-border)] bg-neutral-50/80 px-4 py-3 text-xs font-medium uppercase tracking-wider text-neutral-600"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-neutral-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onRowClick(row);
                        }
                      }
                    : undefined
                }
                className={[
                  rowIndex % 2 === 0
                    ? "bg-[var(--background)]"
                    : "bg-neutral-50/50",
                  onRowClick
                    ? "cursor-pointer hover:bg-neutral-100/70 transition-colors"
                    : "hover:bg-neutral-50/50 transition-colors",
                ].join(" ")}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="border-t border-[var(--admin-card-border)] px-4 py-3 text-sm text-[var(--foreground)]"
                  >
                    {col.render
                      ? col.render(row)
                      : (row as Record<string, unknown>)[col.key as string] as ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
