import { AdminForm, type AdminFormField } from "@/components/admin/AdminForm";

const BLOG_FIELDS: AdminFormField[] = [
  {
    name: "title",
    label: "Title",
    placeholder: "Descriptive blog post title...",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Short summary that will be used on listings and previews.",
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

export default function CreateBlogPage() {
  return (
    <AdminForm
      title="Create blog post"
      description="Create a new article for your travel blog. This data is not persisted yet and only lives in the browser."
      fields={BLOG_FIELDS}
      submitLabel="Create blog (mock)"
    />
  );
}

