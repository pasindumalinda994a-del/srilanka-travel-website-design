import { ReactNode, useId } from "react";

interface H1Props {
  children: ReactNode;
  textSize?: string | { mobile?: string; tablet?: string; desktop?: string }; // CSS value or responsive object
  lineHeight?: string | number; // CSS value like "1.2" or "120%"
  letterSpacing?: string; // CSS value like "-0.025em" or "-0.4px"
  fontWeight?: "300" | "400" | "500" | "700" | "900";
  className?: string;
}

export default function H1({
  children,
  textSize = { mobile: "5.25rem", tablet: "4.5rem", desktop: "14.85rem" }, // Responsive defaults: 84px mobile, 72px tablet, 238px desktop
  lineHeight = 1.1,
  letterSpacing = "0em",
  fontWeight = "500",
  className = "",
}: H1Props) {
  const lineHeightValue = typeof lineHeight === "number" ? lineHeight.toString() : lineHeight;
  const reactId = useId();
  const componentId = `h1-${reactId.replace(/:/g, "")}`;
  
  // Handle responsive textSize
  const isResponsive = typeof textSize === "object";
  const mobileSize = isResponsive ? textSize.mobile || "4.5rem" : textSize;
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
      <h1
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
      </h1>
    </>
  );
}
