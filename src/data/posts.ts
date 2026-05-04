export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  tags: string[];
  relatedProject: string;
  readingTime: string;
  roadmap: string[];
};

export const posts: Post[] = [
  {
    slug: "building-a-local-first-open-tool",
    title: "Building a Local-First Open Tool",
    summary:
      "A field note on shaping small browser tools that keep user data on the device and still feel polished.",
    date: "2026-05-04",
    category: "Build Notes",
    tags: ["Local First", "Tooling", "Privacy"],
    relatedProject: "open-tools-starter",
    readingTime: "5 min read",
    roadmap: [
      "Expand this preview into a full build log.",
      "Add a checklist for privacy-friendly tool launches.",
      "Connect the article to future content collections."
    ]
  },
  {
    slug: "why-github-pages-is-enough-for-small-tools",
    title: "Why GitHub Pages Is Enough for Small Tools",
    summary:
      "A practical argument for static deployment when the product is local-first and does not need accounts.",
    date: "2026-05-03",
    category: "Publishing",
    tags: ["GitHub Pages", "No Backend", "Static Site"],
    relatedProject: "image-limit-helper",
    readingTime: "4 min read",
    roadmap: [
      "Add deployment tradeoffs for Cloudflare Pages mirroring.",
      "Document path handling for repository-based GitHub Pages.",
      "Add production checklist examples."
    ]
  },
  {
    slug: "designing-w0nderful-lab-os",
    title: "Designing w0nderful Lab OS",
    summary:
      "How the site uses an operating-system metaphor without losing the blog and project hub underneath.",
    date: "2026-05-02",
    category: "Design Systems",
    tags: ["OS Theme", "Personal Lab", "A-Level"],
    relatedProject: "w0nderful-lab-os",
    readingTime: "6 min read",
    roadmap: [
      "Add screenshots after the first public release.",
      "Write the component design notes for Dock and System Bar.",
      "Map future article routes to Astro content collections."
    ]
  }
];

export const postCategories = Array.from(new Set(posts.map((post) => post.category)));
