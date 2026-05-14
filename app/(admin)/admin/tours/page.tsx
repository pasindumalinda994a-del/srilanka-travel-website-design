import Link from "next/link";
import { AdminTable, type AdminTableColumn } from "@/components/admin/AdminTable";
import { AdminButton } from "@/components/admin/AdminButton";
import { tourContent, getTourSlug } from "@/app/content";

type TourRow = {
  id: string;
  title: string;
  duration: string;
  price: string;
  status: "Draft" | "Published";
};

/** Build list from same source as public tour pages; id = slug for edit prefill. */
function getTourRows(): TourRow[] {
  return tourContent.tourExperience.tours.map((t) => ({
    id: getTourSlug(t.card.title),
    title: t.card.title,
    duration: t.card.duration,
    price: `$${t.card.price}`,
    status: "Published" as const,
  }));
}

const COLUMNS: AdminTableColumn<TourRow>[] = [
  { key: "title", header: "Tour title" },
  { key: "duration", header: "Duration" },
  { key: "price", header: "Price" },
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
        href={`/admin/tours/edit/${row.id}`}
        className="text-sm font-medium text-[var(--foreground)] underline-offset-2 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

export default function AdminToursPage() {
  const tours = getTourRows();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AdminButton href="/admin/tours/create" variant="primary">
          + New tour
        </AdminButton>
      </div>
      <AdminTable columns={COLUMNS} data={tours} />
    </div>
  );
}
