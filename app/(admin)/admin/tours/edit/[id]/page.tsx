import type { Metadata } from "next";
import { AdminForm } from "@/components/admin/AdminForm";
import { getTourBySlug } from "@/app/tours/TourContent";
import { tourToFormValues } from "@/app/tours/types";
import { TOUR_FIELDS } from "../../fields";

type EditTourPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: EditTourPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Edit tour #${id} | Admin`,
  };
}

export default async function EditTourPage({ params }: EditTourPageProps) {
  const { id } = await params;

  // Prefill from static content when id matches a tour slug (e.g. cultural-discovery)
  const tour = getTourBySlug(id);
  const defaultValues = tour ? tourToFormValues(tour) : undefined;

  return (
    <AdminForm
      title={`Edit tour ${tour ? `"${tour.card.title}"` : `#${id}`}`}
      description="Modify details of this tour package. All fields match the public tour page."
      fields={TOUR_FIELDS}
      defaultValues={defaultValues}
      submitLabel="Save changes (mock)"
    />
  );
}
