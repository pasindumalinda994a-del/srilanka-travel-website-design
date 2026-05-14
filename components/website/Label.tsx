import { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Label({
  children,
  variant = "default",
  size = "md",
  className = "",
}: LabelProps) {
  const baseClasses = "inline-flex items-center justify-center font-regular rounded-full";
  
  const variantClasses = {
    default: "bg-gray-100 text-black",
    outline: "bg-transparent border border-gray-300 text-black",
  };
  
  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-5 py-2 text-base",
  };
  
  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
