import { AdminForm } from "@/components/admin/AdminForm";
import { TOUR_FIELDS } from "../fields";

export default function CreateTourPage() {
  return (
    <AdminForm
      title="Create tour"
      description="Create a new tour package. All fields match the public tour detail page. Connect this form to your tours API to persist."
      fields={TOUR_FIELDS}
      submitLabel="Create tour (mock)"
    />
  );
}
