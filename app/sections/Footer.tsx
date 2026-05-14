import Image from "next/image";
import Link from "next/link";
import { Paragraph } from "@/components/website";
import type { HomeContent } from "@/app/HomeContent";

type FooterProps = {
  content: HomeContent["footer"];
};

export default function Footer({ content }: FooterProps) {
  const { logo, tagline, navigationLinks, socialLinks } = content;
  const taglineLines = tagline.split("\n");

  return (
    <section className="w-full pb-6 md:pb-8 lg:pb-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-12 gap-3">
          <span className="col-span-12">
            <div className="relative w-full rounded-3xl overflow-hidden h-[450px] md:h-[400px]">
              <Image
                src="/images/homepage/s-footer-image.jpeg"
                alt="Lush green forest with rock fortress"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/70"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 w-full">
                  {/* Left Section - Branding */}
                  <div className="flex flex-col items-start">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{logo}</h2>
                    <div className="w-12 h-px bg-white mb-6"></div>
                    <Paragraph className="text-white" textSize={{ mobile: "0.875rem", tablet: "1rem", desktop: "1.125rem" }} fontWeight="400">
                      {taglineLines.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < taglineLines.length - 1 && <br />}
                        </span>
                      ))}
                    </Paragraph>
                  </div>

                  {/* Right Section - Navigation and Social Links */}
                  <div className="flex flex-row justify-start items-start gap-8 md:gap-20 md:mr-6 lg:mr-10 w-full md:w-auto">
                    {/* Navigation Column */}
                    <div className="flex flex-col">
                      <h3 className="text-sm md:text-base font-normal text-white/70 mb-4">Navigation</h3>
                      <nav className="flex flex-col gap-3">
                        {navigationLinks.map((link) => {
                          const href = 
                            link === "Home" ? "/" :
                            link === "Tours" ? "/tours" :
                            link === "About" ? "/about" :
                            link === "Blog" ? "/blog" :
                            link === "Gallery" ? "/gallery" :
                            "#";
                          return (
                            <Link
                              key={link}
                              href={href}
                              className="text-base md:text-lg font-medium text-white hover:text-white/80 transition-colors"
                            >
                              {link}
                            </Link>
                          );
                        })}
                      </nav>
                    </div>

                    {/* Social Column */}
                    <div className="flex flex-col">
                      <h3 className="text-sm md:text-base font-normal text-white/70 mb-4">Social</h3>
                      <nav className="flex flex-col gap-3">
                        {socialLinks.map((link) => (
                          <a
                            key={link}
                            href="#"
                            className="text-base md:text-lg font-medium text-white hover:text-white/80 transition-colors"
                          >
                            {link}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </section>
  );
}
