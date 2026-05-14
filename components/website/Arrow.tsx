import { SVGProps } from "react";

interface ArrowProps extends SVGProps<SVGSVGElement> {
  direction?: "up-right" | "up" | "right" | "down" | "left" | "down-right" | "down-left" | "up-left";
  className?: string;
}

export default function Arrow({
  direction = "up-right",
  className = "",
  ...props
}: ArrowProps) {
  // Rotation angles for each direction (base arrow points up-right)
  const rotations: Record<string, number> = {
    "up-right": 0,
    "up": -45,
    "right": -90,
    "down": -135,
    "left": -180,
    "down-right": 90,
    "down-left": 135,
    "up-left": 45,
  };

  // Path from arrow.svg
  const arrowPath = "M246.67-244 200-290.67l402.67-402.66H236V-760h480v480h-66.67v-366.67L246.67-244Z";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={`w-5 h-5 ${className}`}
      style={{
        transform: `rotate(${rotations[direction]}deg)`,
        transformOrigin: "center",
      }}
      fill="currentColor"
      {...props}
    >
      <path d={arrowPath} />
    </svg>
  );
}
