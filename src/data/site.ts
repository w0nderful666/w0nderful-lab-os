export const site = {
  name: "w0nderful Lab OS",
  packageName: "w0nderful-lab-os",
  version: "0.1.0",
  displayVersion: "v0.1.0",
  author: "w0nderful666",
  title: "w0nderful Lab OS",
  description:
    "An OS-themed personal blog, open-source lab, and project showcase hub.",
  liveUrl: "https://w0nderful666.github.io/w0nderful-lab-os/",
  repositoryUrl: "https://github.com/w0nderful666/w0nderful-lab-os",
  storageKey: "w0nderful-lab-os.settings",
  brandTags: [
    "Local First",
    "No Backend",
    "GitHub Pages Ready",
    "Privacy Friendly",
    "Open Source Lab",
    "A-Level Project Hub"
  ],
  techStack: [
    "Astro",
    "TypeScript",
    "CSS",
    "Vanilla JavaScript",
    "GitHub Pages"
  ]
} as const;

export function withBase(path = "") {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.replace(/^\/+/, "");

  return cleanPath ? `${normalizedBase}${cleanPath}` : normalizedBase;
}
