export type TimelineType = "Release" | "Project" | "Blog" | "Idea" | "Maintenance";

export type TimelineEntry = {
  id: string;
  date: string;
  type: TimelineType;
  title: string;
  description: string;
  relatedProject: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: "lab-os-initialized",
    date: "2026-05-04",
    type: "Release",
    title: "w0nderful-lab-os v0.1.0 initialized",
    description:
      "The first A-Level foundation lands with Astro, OS navigation, project data, blog previews, and deployment checks.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "starter-baseline",
    date: "2026-05-04",
    type: "Maintenance",
    title: "open-tools-starter upgraded as project baseline",
    description:
      "The local starter now defines the engineering bar for structure, release notes, self-test, and preflight.",
    relatedProject: "open-tools-starter"
  },
  {
    id: "image-limit-helper-launched",
    date: "2026-05-03",
    type: "Project",
    title: "image-limit-helper launched",
    description:
      "A compact local-first image compression and resizing tool joins the lab's GitHub Pages toolset.",
    relatedProject: "image-limit-helper"
  },
  {
    id: "profile-glow-polished",
    date: "2026-05-02",
    type: "Project",
    title: "profile-glow-studio polished",
    description:
      "Profile presentation tooling receives a stronger showcase flow and clearer open-source identity output.",
    relatedProject: "profile-glow-studio"
  },
  {
    id: "fxxkpdf-upgrade-selected",
    date: "2026-05-01",
    type: "Idea",
    title: "FxxKPDF selected for future upgrade",
    description:
      "The PDF toolkit is marked for a future A-Level pass focused on document workflows and privacy messaging.",
    relatedProject: "FxxKPDF"
  }
];

export const timelineTypes = Array.from(new Set(timeline.map((entry) => entry.type)));
