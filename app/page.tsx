import { About } from "@/components/ui/about";
import { CTA } from "@/components/ui/cta";
import { EstatePlanningDoneRight } from "@/components/ui/estate-planning-done-right";
import { Features } from "@/components/ui/features";
import { Hero } from "@/components/ui/hero";
import { OurApproach } from "@/components/ui/our-approach";
import { RightFit } from "@/components/ui/right-fit";
import { WhoWeServe } from "@/components/ui/who-we-serve";
import { Newsletter } from "@/components/ui/newsletter";
import { OpenChecklistButton } from "@/components/ui/open-checklist-button";
import { OpenConsultationButton } from "@/components/ui/open-consultation-button";
import { Quote } from "@/components/ui/quote";
import { Testimonials } from "@/components/ui/testimonials";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Features />
      <WhoWeServe />
      <CTA
        id="checklist"
        title="Not ready for a consultation yet? Start with the checklist."
        subtitle="The Complete Estate Planning Checklist: for families who want to protect what they've built."
        padding="compact"
        action={
          <OpenChecklistButton animation="moveUp">
            Download the Checklist Now
          </OpenChecklistButton>
        }
      />
      <RightFit />
      <EstatePlanningDoneRight />
      <OurApproach />
      <About />
      <Testimonials />
      <Newsletter />
      <Quote
        quote={{
          person: "BIJAN ROBOUBI",
          quote:
            '"Most people spend 30 to 40 years to build their wealth, and only spend 3 to 4 hours to plan what happens to it after they are gone. We help families address this imbalance so they can create generational wealth and leave a lasting legacy."',
        }}
      />

      <CTA
        title="Ready to Protect Your Family? Request a Consultation."
        subtitle="We are intentional about who we work with because your plan deserves our full attention. If you are serious about protecting your family and everything you have built, fill out the form below. Our team will review your request and if we believe we can truly help you, we will be in touch."
        action={
          <OpenConsultationButton animation="moveUp">
            Request a Consultation
          </OpenConsultationButton>
        }
      />
    </main>
  );
}
