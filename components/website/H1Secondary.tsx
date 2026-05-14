import { ReactNode, useId } from "react";

interface H1SecondaryProps {
  children: ReactNode;
  textSize?: string | { mobile?: string; tablet?: string; desktop?: string };
  lineHeight?: string | number;
  letterSpacing?: string;
  fontWeight?: "300" | "400" | "500" | "700" | "900";
  className?: string;
}

/**
 * Secondary H1 variant
 * Mirrors `H1` API but with smaller, lighter default typography.
 */
export default function H1Secondary({
  children,
  // Slightly smaller, more subtle defaults than primary H1
  textSize = { mobile: "2.5rem", tablet: "3rem", desktop: "6.25rem" },
  lineHeight = 1.2,
  letterSpacing = "-0.05em",
  fontWeight = "500",
  className = "",
}: H1SecondaryProps) {
  const lineHeightValue =
    typeof lineHeight === "number" ? lineHeight.toString() : lineHeight;
  const reactId = useId();
  const componentId = `h1-secondary-${reactId.replace(/:/g, "")}`;

  const isResponsive = typeof textSize === "object";
  const mobileSize = isResponsive ? textSize.mobile || "2.25rem" : textSize;
  const tabletSize = isResponsive ? textSize.tablet || mobileSize : textSize;
  const desktopSize = isResponsive ? textSize.desktop || tabletSize : textSize;

  return (
    <>
      {isResponsive && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .${componentId} {
              font-size: ${mobileSize};
            }
            @media (min-width: 768px) {
              .${componentId} {
                font-size: ${tabletSize};
              }
            }
            @media (min-width: 1024px) {
              .${componentId} {
                font-size: ${desktopSize};
              }
            }
          `,
          }}
        />
      )}
      <h1
        style={{
          fontSize: isResponsive ? undefined : (textSize as string),
          lineHeight: lineHeightValue,
          letterSpacing: letterSpacing,
          fontFamily:
            "var(--font-satoshi), system-ui, -apple-system, sans-serif",
          fontWeight: fontWeight,
          textAlign: "left",
        }}
        className={`${isResponsive ? componentId : ""} ${className}`}
      >
        {children}
      </h1>
    </>
  );
}
