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
    id: "lab-os-v0891-reader-toolbar-position",
    date: "2026-05-06",
    type: "Release",
    title: "w0nderful-lab-os v0.8.9.1 Floating Toolbar Fix",
    description:
      "Moved reader toolbar to right:1px; top:81vh, changed expand animation from left to right slide.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v089-os-master-detail-shell",
    date: "2026-05-06",
    type: "Release",
    title: "w0nderful-lab-os v0.8.9 OS Master-Detail Shell",
    description:
      "Unified Blog, Projects, and Timeline around a shared OS Master-Detail shell with real layout-width animation, shared detail surface switching, Motion Speed tokens, and reduced-motion coverage.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v088-blog-master-detail-motion",
    date: "2026-05-06",
    type: "Release",
    title: "w0nderful-lab-os v0.8.8 Blog Master-Detail Motion",
    description:
      "Restored OS-level Blog Master-Detail layout animation, added explicit detail-open state, and fixed Motion Speed so detail transitions follow Settings instead of being overwritten by Motion Intensity.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v087-token-unification",
    date: "2026-05-05",
    type: "Release",
    title: "w0nderful-lab-os v0.8.7 Token Unification",
    description:
      "Unified hardcoded colors, shadows, borders, and backdrop-filter values to OS tokens. Consolidated duplicate CSS. All components now follow OS Design System Contract.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v086-design-system-audit",
    date: "2026-05-05",
    type: "Release",
    title: "w0nderful-lab-os v0.8.6 OS Design System Audit",
    description:
      "Established mandatory design system contracts (OS_DESIGN_SYSTEM, OS_MOTION_CONTRACT, OS_LAYOUT_CONTRACT). Added self-test/preflight gates for contract docs and keywords. No UI logic changed.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v085-motion-system-rewrite",
    date: "2026-05-05",
    type: "Release",
    title: "w0nderful-lab-os v0.8.5 OS Motion System Rewrite",
    description:
      "Rewrote detail transition animation system with proper keyframes, fixed CSS syntax error, added Slower/Cinematic motion speeds, --detail-duration now responds to Motion Speed setting.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v072-toolbar-layout-polish",
    date: "2026-05-05",
    type: "Release",
    title: "w0nderful-lab-os v0.7.2 Master-Detail Toolbar + Composer Layout Final Polish",
    description:
      "Unified Master-Detail reader toolbar across Blog/Projects/Timeline, fixed Composer preview width isolation, resolved single-scroll reading, improved detail panel initial hiding.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v071-composer-polish",
    date: "2026-05-05",
    type: "Release",
    title: "w0nderful-lab-os v0.7.1 Composer Usability Polish",
    description:
      "Draft notice with continue/clear buttons, auto-save status indicator, enhanced field validation UI, improved Copy/Download feedback, and clearer GitHub manual publish instructions.",
    relatedProject: "w0nderful-lab-os"
  },
  {
    id: "lab-os-v070-composer",
    date: "2026-05-05",
    type: "Release",
    title: "w0nderful-lab-os v0.7.0 Article Composer release",
    description:
      "Local Markdown article composer with frontmatter form, live preview, articleStyle switching, localStorage drafts, import/export, and GitHub handoff.",
    relatedProject: "w0nderful-lab-os"
  },
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
