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
    id: "lab-os-v063-publishing-polish",
    date: "2026-05-05",
    type: "Maintenance",
    title: "w0nderful-lab-os v0.6.3 publishing workflow polish",
    description:
      "Article template, publishing workflow docs, article content validation, blog result count display, and version consistency.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v062-motion-polish",
    date: "2026-05-05",
    type: "Release",
    title: "w0nderful-lab-os v0.6.2 OS Motion Polish release",
    description:
      "Unified OS motion language with detail panel transitions, OS Effects toggle, Motion Intensity control, and Detail Transition modes (Off/Fade/Slide/OS Panel).",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v060-blog-publishing",
    date: "2026-05-05",
    type: "Release",
    title: "w0nderful-lab-os v0.6.0 blog publishing stable release",
    description:
      "Astro Content Collections, Markdown articles, Article Style System with 6 styles, Reader Style switcher, Copy Link, TOC, and 4 example articles.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v050-os-systemization",
    date: "2026-05-04",
    type: "Release",
    title: "w0nderful-lab-os v0.5.0 OS experience systemization",
    description:
      "Desktop Workspace shortcuts, enhanced System Bar, System Health checks, Keyboard Shortcuts, Command Palette Chinese aliases, and Toggle Theme.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v042-experience-polish",
    date: "2026-05-04",
    type: "Release",
    title: "w0nderful-lab-os v0.4.2 experience polish release",
    description:
      "Dock active state, window layering, Command Palette grouped results, Settings Preview Card, Empty State, 404 notice, and Welcome Toast.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v040-control-layer",
    date: "2026-05-04",
    type: "Release",
    title: "w0nderful-lab-os v0.4.0 control layer release",
    description:
      "Command Palette, Terminal.app, System State, Global Search, Recent Items, and Project/Blog/Timeline linking.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-visible-interaction-release",
    date: "2026-05-04",
    type: "Release",
    title: "w0nderful-lab-os v0.3.0 visible interaction release",
    description:
      "The Lab OS interaction layer now has Master-Detail states, Motion Speed control, stronger app transitions, and clearer Dock/System Bar feedback.",
    relatedProject: "w0nderful-lab-os"
  },
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
