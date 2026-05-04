export type PostCategory = "Project Notes" | "Build Logs" | "Ideas" | "Tutorials";

export type PostBodyBlock = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: PostCategory;
  tags: string[];
  relatedProject: string;
  relatedProjectLabel: string;
  readingTime: string;
  contentSource: {
    collection: "posts";
    plannedPath: string;
  };
  body: PostBodyBlock[];
  roadmap: string[];
};

export const postCategories: PostCategory[] = [
  "Project Notes",
  "Build Logs",
  "Ideas",
  "Tutorials"
];

export const posts: Post[] = [
  {
    slug: "building-a-local-first-open-tool",
    title: "Building a Local-First Open Tool",
    summary:
      "A field note on shaping small browser tools that keep user data on the device and still feel polished.",
    date: "2026-05-04",
    category: "Project Notes",
    tags: ["Local First", "Tooling", "Privacy", "A-Level"],
    relatedProject: "open-tools-starter",
    relatedProjectLabel: "open-tools-starter",
    readingTime: "5 min read",
    contentSource: {
      collection: "posts",
      plannedPath: "src/content/posts/building-a-local-first-open-tool.md"
    },
    body: [
      {
        heading: "The useful boundary",
        paragraphs: [
          "Local-first tools work best when the browser is treated as the product runtime, not as a thin client waiting for a backend. That boundary keeps the app simpler, faster to deploy, and easier to trust.",
          "For small open tools, the most important product decision is often what not to collect. If the input can stay on the user's device, the interface should make that promise visible through the behavior of the tool itself."
        ]
      },
      {
        heading: "The release checklist",
        paragraphs: [
          "A-Level does not mean oversized. It means the repo has a clear purpose, real links, working controls, repeatable verification, and documentation that explains how the project can be maintained after the first release."
        ],
        bullets: [
          "No backend dependency for core use.",
          "No placeholder links or inert controls.",
          "Build, self-test, and preflight must pass before deployment.",
          "Project data should be centralized enough to replace with content collections later."
        ]
      },
      {
        heading: "Next connection",
        paragraphs: [
          "This note will become the bridge between the starter system and the individual tools that use it. The future content collection entry can keep the same slug and metadata while moving the body into Markdown."
        ]
      }
    ],
    roadmap: [
      "Move the article body into an Astro content collection.",
      "Add a privacy launch checklist as a reusable appendix.",
      "Connect examples from FxxKPDF and image-limit-helper."
    ]
  },
  {
    slug: "shipping-lab-os-v020",
    title: "Shipping Lab OS v0.2.0",
    summary:
      "A build log for turning the OS shell into a practical blog reader and project matrix.",
    date: "2026-05-04",
    category: "Build Logs",
    tags: ["Lab OS", "Astro", "Reader", "Projects"],
    relatedProject: "w0nderful-lab-os",
    relatedProjectLabel: "w0nderful-lab-os",
    readingTime: "6 min read",
    contentSource: {
      collection: "posts",
      plannedPath: "src/content/posts/shipping-lab-os-v020.md"
    },
    body: [
      {
        heading: "From theme to workstation",
        paragraphs: [
          "The first release proved the desktop metaphor, but v0.2.0 has a narrower job: make the blog and project areas useful without adding theatrical UI. The reader stays inside Blog.app, and project inspection stays inside Projects.app.",
          "The result is still static, local-first, and GitHub Pages friendly. The new behavior is driven by data and small client-side controllers rather than a framework runtime."
        ]
      },
      {
        heading: "What changed",
        paragraphs: [
          "Posts now carry categories, tags, body blocks, related project metadata, and a planned content collection path. Projects now carry a category, version, feature list, related posts, and roadmap slots."
        ],
        bullets: [
          "Blog filters can combine category, tag, and search.",
          "The reader has a back action, progress bar, body content, roadmap, and related articles.",
          "Projects can be filtered by category and status, then inspected in a detail panel."
        ]
      },
      {
        heading: "Why stay small",
        paragraphs: [
          "A personal lab hub benefits from fast navigation and predictable maintenance. Keeping the interaction layer vanilla makes the repository easier to audit and easier to deploy from GitHub Actions."
        ]
      }
    ],
    roadmap: [
      "Add screenshots for the v0.2.0 release notes.",
      "Promote the body blocks into content collections.",
      "Add keyboard shortcuts after the core reader stabilizes."
    ]
  },
  {
    slug: "why-github-pages-is-enough-for-small-tools",
    title: "Why GitHub Pages Is Enough for Small Tools",
    summary:
      "A practical argument for static deployment when the product is local-first and does not need accounts.",
    date: "2026-05-03",
    category: "Ideas",
    tags: ["GitHub Pages", "No Backend", "Static Site", "Deployment"],
    relatedProject: "image-limit-helper",
    relatedProjectLabel: "image-limit-helper",
    readingTime: "4 min read",
    contentSource: {
      collection: "posts",
      plannedPath: "src/content/posts/why-github-pages-is-enough-for-small-tools.md"
    },
    body: [
      {
        heading: "Static can be enough",
        paragraphs: [
          "A tool that never needs accounts, server-side storage, or private APIs does not gain much from a backend. GitHub Pages is often enough because the build artifact is the application.",
          "This tradeoff also lowers the maintenance surface. There are fewer secrets, fewer services, and fewer runtime permissions to explain to users."
        ]
      },
      {
        heading: "Where the limits are",
        paragraphs: [
          "The limit is not visual polish. The limit is product scope. Once a tool needs shared state, collaboration, or authenticated integrations, static hosting becomes one part of the system rather than the whole system."
        ],
        bullets: [
          "Good fit: local conversion, compression, generators, checklists, and static dashboards.",
          "Poor fit: accounts, payments, collaboration, queues, and server-side automation."
        ]
      },
      {
        heading: "Deployment shape",
        paragraphs: [
          "Repository-based GitHub Pages needs correct base path handling. In Astro, that means setting both site and base, then keeping internal links routed through the project base."
        ]
      }
    ],
    roadmap: [
      "Document path handling examples for Astro static assets.",
      "Add deployment tradeoffs for Cloudflare Pages mirroring.",
      "Create a checklist for repository-based GitHub Pages releases."
    ]
  },
  {
    slug: "designing-w0nderful-lab-os",
    title: "Designing w0nderful Lab OS",
    summary:
      "How the site uses an operating-system metaphor without losing the blog and project hub underneath.",
    date: "2026-05-02",
    category: "Project Notes",
    tags: ["OS Theme", "Personal Lab", "Design", "A-Level"],
    relatedProject: "w0nderful-lab-os",
    relatedProjectLabel: "w0nderful-lab-os",
    readingTime: "6 min read",
    contentSource: {
      collection: "posts",
      plannedPath: "src/content/posts/designing-w0nderful-lab-os.md"
    },
    body: [
      {
        heading: "The metaphor has a job",
        paragraphs: [
          "The OS layer is navigation, not cosplay. System Bar, Dock, and App windows give the site a memorable frame, but the content still has to be readable, searchable, and easy to maintain.",
          "That is why v0.2.0 treats Blog.app and Projects.app as first-class work areas instead of decorative panels."
        ]
      },
      {
        heading: "Useful constraints",
        paragraphs: [
          "The interface avoids heavyweight animation and backend dependencies. It leans on static data, CSS variables, localStorage, and small DOM controllers."
        ],
        bullets: [
          "The Dock is a navigation control.",
          "App windows are content regions.",
          "Experience Mode changes real motion and depth tokens.",
          "Mobile layout keeps the Dock available without covering reading content."
        ]
      },
      {
        heading: "Future path",
        paragraphs: [
          "The next content step is to move articles into Astro content collections while keeping the same data contract for list filtering, related posts, and project detail panels."
        ]
      }
    ],
    roadmap: [
      "Add screenshots after the v0.2.0 public release.",
      "Write component notes for Dock and System Bar.",
      "Map article metadata to Astro content collection schemas."
    ]
  },
  {
    slug: "turning-project-data-into-a-matrix",
    title: "Turning Project Data into a Matrix",
    summary:
      "A tutorial-style walkthrough for modeling projects so filters, details, and related posts stay in sync.",
    date: "2026-05-01",
    category: "Tutorials",
    tags: ["Projects", "Data Model", "Astro", "DevTools"],
    relatedProject: "w0nderful-lab-os",
    relatedProjectLabel: "w0nderful-lab-os",
    readingTime: "7 min read",
    contentSource: {
      collection: "posts",
      plannedPath: "src/content/posts/turning-project-data-into-a-matrix.md"
    },
    body: [
      {
        heading: "Start with stable fields",
        paragraphs: [
          "A project matrix needs more than a title and link. The useful fields are the ones a reader can filter by or use to decide what to open next: category, status, version, feature list, links, related articles, and roadmap."
        ]
      },
      {
        heading: "Keep display and filtering separate",
        paragraphs: [
          "Category values should be predictable, while type labels can stay more descriptive. That gives the UI simple filters without flattening the language shown on the cards."
        ],
        bullets: [
          "Use category for filter buttons.",
          "Use type for the card eyebrow.",
          "Use relatedPostSlugs to connect writing back to projects.",
          "Keep roadmap as an array even when it is empty."
        ]
      },
      {
        heading: "Prepare the content migration",
        paragraphs: [
          "When project case studies move into content collections, the UI can keep reading the same normalized project records and swap the source behind the record."
        ]
      }
    ],
    roadmap: [
      "Add a schema example for projects.",
      "Add import notes for future content collections.",
      "Link each matrix field to its UI surface."
    ]
  }
];

export const postTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
