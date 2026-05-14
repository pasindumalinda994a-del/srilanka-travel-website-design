import { ReactNode, useId } from "react";

interface ParagraphProps {
  children: ReactNode;
  textSize?: string | { mobile?: string; tablet?: string; desktop?: string }; // CSS value or responsive object
  lineHeight?: string | number; // CSS value like "1.5" or "150%"
  letterSpacing?: string; // CSS value like "0em" or "0px"
  fontWeight?: "300" | "400" | "500" | "700" | "900";
  className?: string;
}

export default function Paragraph({
  children,
  textSize = { mobile: "0.925rem", tablet: "1rem", desktop: "1.1rem" }, // Responsive defaults: 14px, 16px, 18px
  lineHeight = 1.25,
  letterSpacing = "0em",
  fontWeight = "500",
  className = "",
}: ParagraphProps) {
  const lineHeightValue = typeof lineHeight === "number" ? lineHeight.toString() : lineHeight;
  const reactId = useId();
  const componentId = `paragraph-${reactId.replace(/:/g, "")}`;
  
  // Handle responsive textSize
  const isResponsive = typeof textSize === "object";
  const mobileSize = isResponsive ? textSize.mobile || "0.875rem" : textSize;
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
      <p
        style={{
          fontSize: isResponsive ? undefined : textSize as string,
          lineHeight: lineHeightValue,
          letterSpacing: letterSpacing,
          fontWeight: fontWeight,
          textAlign: "left",
        }}
        className={`${isResponsive ? componentId : ""} ${className}`}
      >
        {children}
      </p>
    </>
  );
}
