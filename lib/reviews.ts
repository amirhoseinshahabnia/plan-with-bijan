import type { QuoteItem } from "@/components/ui/quote";

export type Review = {
  title: string;
  review: string;
  stars: number;
};

export const REVIEWS: Review[] = [
  {
    title: "John Davis",
    review:
      "I’ve known Bijan for a while now and really admire the care and thought he brings to his work. He is smart, steady, and genuinely invested in helping people. I’d absolutely recommend him.",
    stars: 5,
  },
  {
    title: "Liana Cote",
    review:
      "I had a great experience working with the team at Abar Law! I would highly recommend them. Everything was seamless and they took great care of me through the process of completing my trust.",
    stars: 5,
  },
  {
    title: "Jessica Webb",
    review:
      "Bijan may be the most thoughtful, kind, and approachable attorney I have ever worked with. He goes above and beyond to provide great service and share his knowledge. I am so glad I found him.",
    stars: 5,
  },
  {
    title: "carlos",
    review:
      "Bijan and Bani are amazing! They made the estate planning process easy and were able to accommodate my tight schedule. He went above and beyond what I was expecting. Hope to work with him in the future.",
    stars: 5,
  },
  {
    title: "Christine Honeybone",
    review:
      "We used Abar Law for our estate planning needs. Bijan took the time to explain everything in detail and in a way we could understand. He really cares for his clients, and we appreciate Bijan and Bani for all their help.",
    stars: 5,
  },
];

export function reviewsToQuotes(reviews: Review[]): QuoteItem[] {
  return reviews.map(({ title, review }) => ({
    quote: `"${review}"`,
    person: `— ${title.toUpperCase()}`,
  }));
}

export const REVIEW_QUOTES = reviewsToQuotes(REVIEWS);
