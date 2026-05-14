import { ReactNode, useId } from "react";

interface H2SecondaryProps {
  children: ReactNode;
  textSize?: string | { mobile?: string; tablet?: string; desktop?: string }; // CSS value or responsive object
  lineHeight?: string | number; // CSS value like "1.5" or "150%"
  letterSpacing?: string; // CSS value like "0em" or "0px"
  fontWeight?: "300" | "400" | "500" | "700" | "900";
  textAlign?: "left" | "right" | "center" | "justify";
  className?: string;
}

export default function H2Secondary({
  children,
  textSize = { mobile: "1.85rem", tablet: "2.5rem", desktop: "2.75rem" }, // Responsive defaults: 20px, 24px, 28px
  lineHeight = 1.0,
  letterSpacing = "-0.05em",
  fontWeight = "500", // Medium weight (Satoshi doesn't have 600)
  textAlign = "left",
  className = "",
}: H2SecondaryProps) {
  const lineHeightValue = typeof lineHeight === "number" ? lineHeight.toString() : lineHeight;
  const reactId = useId();
  const componentId = `h2-secondary-${reactId.replace(/:/g, "")}`;
  
  // Handle responsive textSize
  const isResponsive = typeof textSize === "object";
  const mobileSize = isResponsive ? textSize.mobile || "1.25rem" : textSize;
  const tabletSize = isResponsive ? textSize.tablet || mobileSize : textSize;
  const desktopSize = isResponsive ? textSize.desktop || tabletSize : textSize;

  return (
    <>
      {isResponsive && (
        <style dangerouslySetInnerHTML={{
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
          `
        }} />
      )}
      <h2
        style={{
          fontSize: isResponsive ? undefined : textSize as string,
          lineHeight: lineHeightValue,
          letterSpacing: letterSpacing,
          fontWeight: fontWeight,
          textAlign: textAlign,
        }}
        className={`${isResponsive ? componentId : ""} ${className}`}
      >
        {children}
      </h2>
    </>
  );
}
