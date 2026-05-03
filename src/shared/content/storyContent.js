const snapshot1 = new URL("../../assets/memories/snapshot-1.jpg", import.meta.url).href;
const snapshot2 = new URL("../../assets/memories/snapshot-2.jpg", import.meta.url).href;
const snapshot3 = new URL("../../assets/memories/snapshot-3.jpg", import.meta.url).href;

export const timelineMoments = [
  {
    tag: "Month 01",
    title: "The hello that stayed longer than expected",
    copy: "Some people arrive loudly. You arrived gently and still somehow changed the whole room.",
  },
  {
    tag: "Month 06",
    title: "We started collecting rituals",
    copy: "Favorite songs, familiar phrases, the kind of tiny habits that quietly become a shared language.",
  },
  {
    tag: "Year 01",
    title: "Ordinary days started feeling precious",
    copy: "Love stopped being a big dramatic moment and became something softer, steadier, and even more beautiful.",
  },
  {
    tag: "2 Years 3 Months",
    title: "Now our story feels ready for its forever chapter",
    copy: "Every memory led here: to a future that feels playful, safe, and deeply ours.",
  },
];

export const memoryCards = [
  {
    title: "Our first impossible-to-forget conversation",
    note: "The kind where time stopped acting normal.",
    accent: "from-[#ffd7df] via-[#fff2ec] to-[#ffc3cf]",
    image: snapshot1,
  },
  {
    title: "That place we accidentally made ours",
    note: "Now every corner of it feels like a love note.",
    accent: "from-[#ffe8d9] via-[#fff6ee] to-[#f8c3c8]",
    image: snapshot2,
  },
  {
    title: "The laugh I would recognize anywhere",
    note: "Still my favorite sound in every room.",
    accent: "from-[#ffd9e4] via-[#fff0f3] to-[#f7b8c8]",
    image: snapshot3,
  },
];

export const loveNotes = [
  "You make even calm days feel cinematic.",
  "I still smile at the small things you do.",
  "Home started sounding like your name.",
  "With you, ordinary became unforgettable.",
];

export const quizQuestions = [
  {
    prompt: "What kind of moments define us the most?",
    options: ["Only the big surprises", "The little everyday rituals", "The fancy dates only"],
    answer: "The little everyday rituals",
  },
  {
    prompt: "What does our story feel like?",
    options: ["Rushed and loud", "Soft, playful, and steady", "Completely random"],
    answer: "Soft, playful, and steady",
  },
  {
    prompt: "What comes after all these memories?",
    options: ["Just more photos", "Forever, if you want it too", "A dramatic cliffhanger"],
    answer: "Forever, if you want it too",
  },
];

export const finalLines = [
  "I don't just want more memories...",
  "I want forever with you.",
];
