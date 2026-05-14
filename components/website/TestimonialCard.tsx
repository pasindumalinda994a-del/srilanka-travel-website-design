import Image from "next/image";

export interface TestimonialCardProps {
  quote: string;
  author: string;
  descriptor: string;
  stars?: number;
  avatar?: string;
  className?: string;
}

const Star = () => (
  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function TestimonialCard({
  quote,
  author,
  descriptor,
  stars = 5,
  avatar,
  className = "",
}: TestimonialCardProps) {
  return (
    <div
      className={`rounded-2xl bg-gray-100 p-5 flex flex-col gap-4 ${className}`}
      role="article"
    >
      <div className="flex gap-0.5 text-black" aria-hidden>
        {Array.from({ length: Math.min(5, Math.max(0, stars)) }).map((_, i) => (
          <Star key={i} />
        ))}
      </div>
      <blockquote className="text-gray-800 font-medium text-base leading-snug flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        {avatar ? (
          <Image
            src={avatar}
            alt=""
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10 shrink-0"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium text-sm shrink-0"
            aria-hidden
          >
            {author.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-medium text-black truncate">{author}</p>
          <p className="text-sm text-gray-500 truncate">{descriptor}</p>
        </div>
      </div>
    </div>
  );
}
