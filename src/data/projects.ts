export type ProjectStatus = "Active" | "Stable" | "Experimental";
export type ProjectCategory =
  | "PDF"
  | "Image"
  | "GitHub"
  | "AI"
  | "Design"
  | "DevTools"
  | "Template";

export type Project = {
  slug: string;
  name: string;
  type: string;
  category: ProjectCategory;
  summary: string;
  status: ProjectStatus;
  version: string;
  features: string[];
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  relatedPostSlugs: string[];
  roadmap: string[];
  featured?: boolean;
};

const sharedTags = ["Local First", "No Backend", "GitHub Pages Ready"];

export const projectCategories: ProjectCategory[] = [
  "PDF",
  "Image",
  "GitHub",
  "AI",
  "Design",
  "DevTools",
  "Template"
];

export const projectStatuses: ProjectStatus[] = ["Active", "Stable", "Experimental"];

export const projects: Project[] = [
  {
    slug: "fxxkpdf",
    name: "FxxKPDF",
    type: "PDF Tool",
    category: "PDF",
    summary:
      "Local-first PDF toolkit for merge, split, image to PDF and privacy-friendly document tasks.",
    status: "Active",
    version: "v0.1.x",
    features: [
      "Merge and split PDF files in the browser.",
      "Convert images into PDF documents locally.",
      "Keep document processing client-side by default."
    ],
    tags: [...sharedTags, "Document Workflow"],
    liveUrl: "https://w0nderful666.github.io/FxxKPDF/",
    githubUrl: "https://github.com/w0nderful666/FxxKPDF",
    relatedPostSlugs: ["building-a-local-first-open-tool"],
    roadmap: [
      "Add stronger batch operation guidance.",
      "Document browser memory limits for large PDFs."
    ],
    featured: true
  },
  {
    slug: "image-limit-helper",
    name: "image-limit-helper",
    type: "Image Tool",
    category: "Image",
    summary: "Local-first image compressor and resize helper for upload limits.",
    status: "Stable",
    version: "v0.1.x",
    features: [
      "Resize images for upload limits.",
      "Compress images without server upload.",
      "Preview size changes before export."
    ],
    tags: [...sharedTags, "Compression"],
    liveUrl: "https://w0nderful666.github.io/image-limit-helper/",
    githubUrl: "https://github.com/w0nderful666/image-limit-helper",
    relatedPostSlugs: ["why-github-pages-is-enough-for-small-tools"],
    roadmap: [],
    featured: true
  },
  {
    slug: "open-tools-starter",
    name: "open-tools-starter",
    type: "Template / Starter",
    category: "Template",
    summary: "A reusable starter system for local-first open tools.",
    status: "Active",
    version: "v0.1.x",
    features: [
      "Project start guide for A-Level local-first tools.",
      "Preflight expectations for privacy, docs, and deployment.",
      "Reusable release discipline for small static products."
    ],
    tags: [...sharedTags, "Starter", "A-Level"],
    liveUrl: "https://w0nderful666.github.io/open-tools-starter/",
    githubUrl: "https://github.com/w0nderful666/open-tools-starter",
    relatedPostSlugs: ["building-a-local-first-open-tool"],
    roadmap: [
      "Add more reusable Astro component patterns.",
      "Publish a project scoring checklist."
    ],
    featured: true
  },
  {
    slug: "profile-glow-studio",
    name: "profile-glow-studio",
    type: "GitHub Tool",
    category: "GitHub",
    summary: "GitHub profile polishing and showcase generator.",
    status: "Stable",
    version: "v0.1.x",
    features: [
      "Generate profile showcase copy and structure.",
      "Prepare profile sections for public repos.",
      "Keep outputs easy to review before publishing."
    ],
    tags: [...sharedTags, "Profile", "Showcase"],
    liveUrl: "https://w0nderful666.github.io/profile-glow-studio/",
    githubUrl: "https://github.com/w0nderful666/profile-glow-studio",
    relatedPostSlugs: [],
    roadmap: []
  },
  {
    slug: "repo-galaxy-studio",
    name: "repo-galaxy-studio",
    type: "GitHub Visualization",
    category: "GitHub",
    summary: "Turn GitHub repositories into a visual galaxy.",
    status: "Experimental",
    version: "v0.1.x",
    features: [
      "Visualize repository groups as a browsable map.",
      "Highlight repo identity and project relationships.",
      "Support static export for portfolio use."
    ],
    tags: [...sharedTags, "Visualization"],
    liveUrl: "https://w0nderful666.github.io/repo-galaxy-studio/",
    githubUrl: "https://github.com/w0nderful666/repo-galaxy-studio",
    relatedPostSlugs: [],
    roadmap: [
      "Improve large repository set performance.",
      "Add grouping presets for profile pages."
    ]
  },
  {
    slug: "prompt-market",
    name: "prompt-market",
    type: "AI Prompt Tool",
    category: "AI",
    summary: "Local-first AI image prompt workstation.",
    status: "Active",
    version: "v0.1.x",
    features: [
      "Organize reusable image prompt recipes.",
      "Compare prompt variants in a local workspace.",
      "Export prompt packs without account requirements."
    ],
    tags: [...sharedTags, "Prompting", "Creative Workflow"],
    liveUrl: "https://w0nderful666.github.io/prompt-market/",
    githubUrl: "https://github.com/w0nderful666/prompt-market",
    relatedPostSlugs: [],
    roadmap: [
      "Add prompt pack import and export presets.",
      "Document privacy boundaries for AI workflows."
    ]
  },
  {
    slug: "readme-badge-studio",
    name: "readme-badge-studio",
    type: "GitHub Tool",
    category: "GitHub",
    summary: "Generate README badges and open-source project identity blocks.",
    status: "Stable",
    version: "v0.1.x",
    features: [
      "Build README badge groups.",
      "Prepare consistent open-source identity blocks.",
      "Copy generated Markdown directly into a repository."
    ],
    tags: [...sharedTags, "README", "Badges"],
    liveUrl: "https://w0nderful666.github.io/readme-badge-studio/",
    githubUrl: "https://github.com/w0nderful666/readme-badge-studio",
    relatedPostSlugs: [],
    roadmap: []
  },
  {
    slug: "orbit-bg-kit",
    name: "orbit-bg-kit",
    type: "Design Tool",
    category: "Design",
    summary: "Visual background generator for landing pages and README hero sections.",
    status: "Experimental",
    version: "v0.1.x",
    features: [
      "Generate reusable visual background presets.",
      "Tune palette and density for project identity.",
      "Export static assets for README and landing pages."
    ],
    tags: [...sharedTags, "Visual System"],
    liveUrl: "https://w0nderful666.github.io/orbit-bg-kit/",
    githubUrl: "https://github.com/w0nderful666/orbit-bg-kit",
    relatedPostSlugs: [],
    roadmap: [
      "Add more accessible palette checks.",
      "Create export presets for GitHub README images."
    ]
  },
  {
    slug: "code-toolkit-lite",
    name: "code-toolkit-lite",
    type: "Developer Tool",
    category: "DevTools",
    summary: "Small local-first developer utility toolkit.",
    status: "Experimental",
    version: "v0.1.x",
    features: [
      "Bundle small developer utilities in one static workspace.",
      "Keep common transformations offline.",
      "Favor quick copy/export flows."
    ],
    tags: [...sharedTags, "Developer Utility"],
    liveUrl: "https://w0nderful666.github.io/code-toolkit-lite/",
    githubUrl: "https://github.com/w0nderful666/code-toolkit-lite",
    relatedPostSlugs: ["turning-project-data-into-a-matrix"],
    roadmap: [
      "Select the first stable utility set.",
      "Add per-tool validation states."
    ]
  },
  {
    slug: "w0nderful-lab-os",
    name: "w0nderful-lab-os",
    type: "Personal Lab",
    category: "DevTools",
    summary: "OS-themed personal blog and open-source lab hub.",
    status: "Active",
    version: "v0.8.4",
    features: [
      "OS-style navigation for blog, projects, timeline, about, settings, and terminal.",
      "Global Command Palette and Terminal.app powered by the shared System State.",
      "Project, post, and timeline content connected through local search and recent activity."
    ],
    tags: [...sharedTags, "Personal Lab", "Astro"],
    liveUrl: "https://w0nderful666.github.io/w0nderful-lab-os/",
    githubUrl: "https://github.com/w0nderful666/w0nderful-lab-os",
    relatedPostSlugs: [
      "shipping-lab-os-v020",
      "designing-w0nderful-lab-os",
      "turning-project-data-into-a-matrix"
    ],
    roadmap: [
      "Move posts into Astro content collections.",
      "Add project case study pages when deeper writeups are ready.",
      "Expand keyboard navigation for power users."
    ],
    featured: true
  }
];
