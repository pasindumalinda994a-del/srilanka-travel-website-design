/**
 * Typography Components Usage Examples
 *
 * This file demonstrates how to use the H1, H2, and Paragraph components
 * with all their customizable props.
 */

import H1 from "./H1";
import H2Primary from "./H2Primary";
import H2Secondary from "./H2Secondary";
import Paragraph from "./Paragraph";

export default function TypographyExample() {
  return (
    <div className="space-y-8 p-8">
      {/* H1 Examples */}
      <section className="space-y-4">
        <H1>Default H1 Style</H1>

        <H1
          textSize="text-6xl md:text-7xl lg:text-8xl"
          lineHeight="leading-none"
          letterSpacing="tracking-wider"
          fontWeight="900"
        >
          Custom H1 with Larger Size and Black Weight
        </H1>
      </section>

      {/* H2 Primary Examples */}
      <section className="space-y-4">
        <H2Primary>Default Primary H2</H2Primary>

        <H2Primary
          textSize="text-4xl md:text-5xl"
          lineHeight="leading-snug"
          letterSpacing="tracking-wide"
          fontWeight="900"
        >
          Custom Primary H2 with Black Weight
        </H2Primary>
      </section>

      {/* H2 Secondary Examples */}
      <section className="space-y-4">
        <H2Secondary>Default Secondary H2</H2Secondary>

        <H2Secondary
          textSize="text-xl md:text-2xl"
          lineHeight="leading-loose"
          letterSpacing="tracking-widest"
          fontWeight="500"
        >
          Custom Secondary H2 with Medium Weight
        </H2Secondary>
      </section>

      {/* Paragraph Examples */}
      <section className="space-y-4">
        <Paragraph>Default Paragraph Style</Paragraph>

        <Paragraph
          textSize="text-sm md:text-base"
          lineHeight="leading-loose"
          letterSpacing="tracking-wide"
          fontWeight="500"
        >
          Custom Paragraph with smaller text, wider spacing, and medium weight
        </Paragraph>
      </section>
    </div>
  );
}
