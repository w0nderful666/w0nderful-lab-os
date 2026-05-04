export type ProjectStatus = "Active" | "Stable" | "Experimental";

export type Project = {
  slug: string;
  name: string;
  type: string;
  summary: string;
  status: ProjectStatus;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
};

const sharedTags = ["Local First", "No Backend", "GitHub Pages Ready"];

export const projects: Project[] = [
  {
    slug: "fxxkpdf",
    name: "FxxKPDF",
    type: "PDF Tool",
    summary:
      "Local-first PDF toolkit for merge, split, image to PDF and privacy-friendly document tasks.",
    status: "Active",
    tags: sharedTags,
    liveUrl: "https://w0nderful666.github.io/FxxKPDF/",
    githubUrl: "https://github.com/w0nderful666/FxxKPDF",
    featured: true
  },
  {
    slug: "image-limit-helper",
    name: "image-limit-helper",
    type: "Image Tool",
    summary: "Local-first image compressor and resize helper for upload limits.",
    status: "Stable",
    tags: sharedTags,
    liveUrl: "https://w0nderful666.github.io/image-limit-helper/",
    githubUrl: "https://github.com/w0nderful666/image-limit-helper",
    featured: true
  },
  {
    slug: "open-tools-starter",
    name: "open-tools-starter",
    type: "Template / Starter",
    summary: "A reusable starter system for local-first open tools.",
    status: "Active",
    tags: sharedTags,
    liveUrl: "https://w0nderful666.github.io/open-tools-starter/",
    githubUrl: "https://github.com/w0nderful666/open-tools-starter",
    featured: true
  },
  {
    slug: "profile-glow-studio",
    name: "profile-glow-studio",
    type: "GitHub Tool",
    summary: "GitHub profile polishing and showcase generator.",
    status: "Stable",
    tags: sharedTags,
    liveUrl: "https://w0nderful666.github.io/profile-glow-studio/",
    githubUrl: "https://github.com/w0nderful666/profile-glow-studio"
  },
  {
    slug: "repo-galaxy-studio",
    name: "repo-galaxy-studio",
    type: "GitHub Visualization",
    summary: "Turn GitHub repositories into a visual galaxy.",
    status: "Experimental",
    tags: sharedTags,
    liveUrl: "https://w0nderful666.github.io/repo-galaxy-studio/",
    githubUrl: "https://github.com/w0nderful666/repo-galaxy-studio"
  },
  {
    slug: "prompt-market",
    name: "prompt-market",
    type: "AI Prompt Tool",
    summary: "Local-first AI image prompt workstation.",
    status: "Active",
    tags: sharedTags,
    liveUrl: "https://w0nderful666.github.io/prompt-market/",
    githubUrl: "https://github.com/w0nderful666/prompt-market"
  },
  {
    slug: "readme-badge-studio",
    name: "readme-badge-studio",
    type: "GitHub Tool",
    summary: "Generate README badges and open-source project identity blocks.",
    status: "Stable",
    tags: sharedTags,
    liveUrl: "https://w0nderful666.github.io/readme-badge-studio/",
    githubUrl: "https://github.com/w0nderful666/readme-badge-studio"
  },
  {
    slug: "orbit-bg-kit",
    name: "orbit-bg-kit",
    type: "Design Tool",
    summary: "Visual background generator for landing pages and README hero sections.",
    status: "Experimental",
    tags: sharedTags,
    liveUrl: "https://w0nderful666.github.io/orbit-bg-kit/",
    githubUrl: "https://github.com/w0nderful666/orbit-bg-kit"
  },
  {
    slug: "code-toolkit-lite",
    name: "code-toolkit-lite",
    type: "Developer Tool",
    summary: "Small local-first developer utility toolkit.",
    status: "Experimental",
    tags: sharedTags,
    liveUrl: "https://w0nderful666.github.io/code-toolkit-lite/",
    githubUrl: "https://github.com/w0nderful666/code-toolkit-lite"
  },
  {
    slug: "w0nderful-lab-os",
    name: "w0nderful-lab-os",
    type: "Personal Lab",
    summary: "OS-themed personal blog and open-source lab hub.",
    status: "Active",
    tags: sharedTags,
    liveUrl: "https://w0nderful666.github.io/w0nderful-lab-os/",
    githubUrl: "https://github.com/w0nderful666/w0nderful-lab-os",
    featured: true
  }
];

export const projectTypes = Array.from(new Set(projects.map((project) => project.type)));
