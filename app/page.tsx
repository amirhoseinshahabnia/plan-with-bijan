import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function Home() {
  return (
    <main className="min-h-dvh w-full">
      <Container>
        <Section as="div" padding="medium">
          <h1 className="text-4xl font-bold text-copper-400 font-serif">
            Plan
            <br />
            <span className="font-normal italic">with</span> Bijan
          </h1>
          <p className="font-sans text-gray-300 mt-5 max-w-xl leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur aperiam aliquid adipisci quia culpa laudantium,
            assumenda dignissimos laborum nostrum, deleniti similique itaque
            obcaecati commodi asperiores et delectus quis at voluptatem!
            Corporis quisquam illo cupiditate praesentium inventore fugit dicta
            eveniet quae dolor nihil quo nisi, facilis doloremque ipsam placeat.
            Aperiam illum molestias placeat officia quod reiciendis debitis,
            quaerat at provident obcaecati.
          </p>
        </Section>
      </Container>
    </main>
  );
}
