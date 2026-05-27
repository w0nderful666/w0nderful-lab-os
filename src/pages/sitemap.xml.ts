import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog", ({ data }) => data.status === "published");
  const base = site.liveUrl;

  const staticPages = [
    "",
    "about/",
    "blog/",
    "categories/",
    "composer/",
    "projects/",
    "settings/",
    "tags/",
    "terminal/",
    "timeline/",
  ];

  const urls = [
    ...staticPages.map((p) => `${base}${p}`),
    ...posts.map((p) => `${base}blog/?post=${p.id}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
