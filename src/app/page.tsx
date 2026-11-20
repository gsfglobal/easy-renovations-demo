import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { Method } from "@/components/home/Method";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaQuote } from "@/components/home/CtaQuote";
import { ModelSection } from "@/components/three/ModelSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesGrid />
      <ProjectsShowcase />
      <BeforeAfterSection />
      <Method />
      <ModelSection />
      <Testimonials />
      <CtaQuote />
    </>
  );
}
