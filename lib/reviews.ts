export type Review = {
  name: string;
  review: string;
  profession: string;
  stars: number;
};

export const REVIEWS: Review[] = [
  {
    name: "John Davis",
    review:
      "I've known Bijan for a while now and really admire the care and thought he brings to his work. He is smart, steady, and genuinely invested in helping people. I'd absolutely recommend him.",
    profession: "Estate Planning Client, California",
    stars: 5,
  },

  {
    name: "Jessica Webb",
    review:
      "Bijan may be the most thoughtful, kind, and approachable attorney I have ever worked with. He goes above and beyond to provide great service and share his knowledge. I am so glad I found him.",
    profession: "Estate Planning Client, California",
    stars: 5,
  },
  {
    name: "Carlos",
    review:
      "Bijan and Bani are amazing! They made the estate planning process easy and were able to accommodate my tight schedule. He went above and beyond what I was expecting. Hope to work with him in the future.",
    profession: "Estate Planning Client, California",
    stars: 5,
  },

  {
    name: "Michael Torres",
    review:
      "From our first conversation, Bijan made estate planning feel straightforward instead of overwhelming. He answered every question patiently and delivered a plan we actually understand and trust.",
    profession: "Estate Planning Client, California",
    stars: 5,
  },
];
