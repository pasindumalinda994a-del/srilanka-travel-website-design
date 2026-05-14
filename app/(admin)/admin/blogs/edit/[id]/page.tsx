import type { Metadata } from "next";
import { AdminForm, type AdminFormField } from "@/components/admin/AdminForm";

type EditBlogPageProps = {
  params: {
    id: string;
  };
};

// In a real app this would fetch one blog post by ID.
// For now we only use the ID to personalize the UI a bit.
const BLOG_FIELDS: AdminFormField[] = [
  {
    name: "title",
    label: "Title",
    placeholder: "Existing blog title...",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Update the summary for this article.",
    type: "textarea",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Draft", value: "draft" },
      { label: "Published", value: "published" },
    ],
  },
];

export function generateMetadata({ params }: EditBlogPageProps): Metadata {
  return {
    title: `Edit blog #${params.id} | Admin`,
  };
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  return (
    <AdminForm
      title={`Edit blog #${params.id}`}
      description="Adjust content and publishing status for this blog post. Values are not saved yet; this is a frontend-only mock."
      fields={BLOG_FIELDS}
      submitLabel="Save changes (mock)"
    />
  );
}

