import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
    variant?: "primary" | "secondary";
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
    variant?: "primary" | "secondary";
  };

type AdminButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses = {
  primary:
    "inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--foreground)]",
  secondary:
    "inline-flex items-center justify-center rounded-full border border-[var(--foreground)] bg-[var(--background)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--foreground)]",
};

export function AdminButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: AdminButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
