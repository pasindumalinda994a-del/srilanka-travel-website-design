import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header, PageHero, Startnow, Footer } from "@/app/sections";
import {
  homeContent,
  blogContent,
  getBlogBySlug,
  getAllBlogSlugs,
} from "@/app/content";

type PageProps = {
  params: Promise<{ blog: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((blog) => ({ blog }));
}

export async function generateMetadata({ params }: PageProps) {
  const { blog: slug } = await params;
  const post = getBlogBySlug(slug);
  const title = post?.title ?? "Blog";
  const description =
    post?.body?.[0]?.slice(0, 160) || title;
  return {
    title: `${title} | ${blogContent.pageHero.heading.line1}`,
    description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { blog: slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header content={homeContent.header} />
      <PageHero
        label={blogContent.pageHero.label}
        heading={post.title}
        description={post.date}
        imageSrc={post.image}
        imageAlt={post.title}
      />
      <article className="w-full pb-28 md:pb-30 lg:pb-32">
        <div className="mx-auto max-w-[1440px] px-[8px]">
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden aspect-[21/9] mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-6 text-base text-gray-700 leading-relaxed">
              {post.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 pt-6 border-t border-gray-200">
              <Link
                href="/blog"
                className="inline-flex items-center font-medium text-gray-900 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black rounded"
              >
                ← Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Startnow content={homeContent.startnow} />
      <Footer content={homeContent.footer} />
    </>
  );
}
