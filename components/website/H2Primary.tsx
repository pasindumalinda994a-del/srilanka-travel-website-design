import { ReactNode, useId } from "react";

interface H2PrimaryProps {
  children: ReactNode;
  textSize?: string | { mobile?: string; tablet?: string; desktop?: string }; // CSS value or responsive object
  lineHeight?: string | number; // CSS value like "1.25" or "125%"
  letterSpacing?: string; // CSS value like "-0.025em" or "-0.4px"
  fontWeight?: "300" | "400" | "500" | "700" | "900";
  className?: string;
}

export default function H2Primary({
  children,
  textSize = { mobile: "2.45rem", tablet: "3.25rem", desktop: "3.75rem" }, // Responsive defaults: 30px, 36px, 40px
  lineHeight = 1.0,
  letterSpacing = "-0.05em",
  fontWeight = "500",
  className = "",
}: H2PrimaryProps) {
  const lineHeightValue = typeof lineHeight === "number" ? lineHeight.toString() : lineHeight;
  const reactId = useId();
  const componentId = `h2-primary-${reactId.replace(/:/g, "")}`;
  
  // Handle responsive textSize
  const isResponsive = typeof textSize === "object";
  const mobileSize = isResponsive ? textSize.mobile || "1.875rem" : textSize;
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
          fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
          fontWeight: fontWeight,
          textAlign: "left",
        }}
        className={`${isResponsive ? componentId : ""} ${className}`}
      >
        {children}
      </h2>
    </>
  );
}
