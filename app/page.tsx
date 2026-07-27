import { About } from "@/components/ui/about";
import { CTA } from "@/components/ui/cta";
import { EstatePlanningDoneRight } from "@/components/ui/estate-planning-done-right";
import { Features } from "@/components/ui/features";
import { Hero } from "@/components/ui/hero";
import { OurApproach } from "@/components/ui/our-approach";
import { RightFit } from "@/components/ui/right-fit";
import { WhoWeServe } from "@/components/ui/who-we-serve";
import { Quote } from "@/components/ui/quote";
import { Testimonials } from "@/components/ui/testimonials";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Features />
      <WhoWeServe />
      <CTA
        title="Not ready for a consultation yet? Start with the checklist"
        subtitle="The Complete Estate Planning Checklist: for families who protect what they've built."
        cta="Download the Checklist Now"
        link="#book-strategy-session"
        padding="compact"
      />
      <RightFit />
      <EstatePlanningDoneRight />
      <OurApproach />
      <About />
      <Testimonials />
      <Quote
        quote={{
          person: "BIJAN ROBOUBI - KAISER LAW GROUP",
          quote:
            '"Most people spend 30 to 40 years building their wealth, and only spend 3 to 4 hours planning what happens after they are gone. We help families address this imbalance so they can create generational wealth and leave a lasting legacy."',
        }}
      />

      <CTA
        title="Ready to Protect Your Family? Request a Consultation."
        subtitle="We are selective about who we work with because your plan deserves our full attention. If you are serious about protecting your family and everything you have built, fill out the form below. Our team will review your request and if we believe we can truly help you, we will be in touch."
        cta="Request a Consultation"
        link="#book-strategy-session"
      />
    </main>
  );
}
