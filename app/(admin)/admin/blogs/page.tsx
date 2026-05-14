import Link from "next/link";
import { AdminTable, type AdminTableColumn } from "@/components/admin/AdminTable";
import { AdminButton } from "@/components/admin/AdminButton";

type BlogRow = {
  id: string;
  title: string;
  status: "Draft" | "Published";
  updatedAt: string;
};

const MOCK_BLOGS: BlogRow[] = [
  {
    id: "1",
    title: "A Weekend in Marrakech: The Perfect 48-Hour Itinerary",
    status: "Published",
    updatedAt: "2026-02-01",
  },
  {
    id: "2",
    title: "How to Choose the Right Desert Tour for Your Family",
    status: "Draft",
    updatedAt: "2026-01-28",
  },
  {
    id: "3",
    title: "Packing List for a Comfortable Sahara Adventure",
    status: "Published",
    updatedAt: "2026-01-15",
  },
];

const COLUMNS: AdminTableColumn<BlogRow>[] = [
  { key: "title", header: "Title" },
  { key: "updatedAt", header: "Last updated" },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span
        className={[
          "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium",
          row.status === "Published"
            ? "bg-[var(--foreground)]/10 text-[var(--foreground)] ring-1 ring-[var(--foreground)]/20"
            : "bg-neutral-200/80 text-neutral-600 ring-1 ring-neutral-300/80",
        ].join(" ")}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <Link
        href={`/admin/blogs/edit/${row.id}`}
        className="text-sm font-medium text-[var(--foreground)] underline-offset-2 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

export default function AdminBlogsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AdminButton href="/admin/blogs/create" variant="primary">
          + New blog post
        </AdminButton>
      </div>
      <AdminTable columns={COLUMNS} data={MOCK_BLOGS} />
    </div>
  );
}

