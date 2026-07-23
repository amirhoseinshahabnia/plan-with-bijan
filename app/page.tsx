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
      <RightFit />
      <EstatePlanningDoneRight />
      <OurApproach />
      <Testimonials />
      <Quote
        quote={{
          person: "BIJAN ROBOUBI - KAISER LAW GROUP",
          quote:
            '"The most sophisticated professionals in the world spend decades building wealth — and often hours planning how to protect it. We believe that imbalance is one of the most consequential oversights of our time."',
        }}
      />

      <CTA
        title="Ready to Protect Your Family? Request a Strategy Session."
        subtitle="We are selective about who we work with because your plan deserves our full attention. If you are serious about protecting your family and everything you have built, fill out the form below. Our team will review your request and if we believe we can truly help you, we will be in touch."
        cta="Book Your Strategy Session"
        link="#book-strategy-session"
      />
    </main>
  );
}
