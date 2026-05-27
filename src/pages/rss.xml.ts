import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog", ({ data }) => data.status === "published");
  const sorted = posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const items = sorted
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${site.liveUrl}blog/?post=${post.id}</link>
      <guid isPermaLink="false">${post.id}</guid>
      <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.data.summary}]]></description>
      ${post.data.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name}</title>
    <link>${site.liveUrl}</link>
    <description>${site.description}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${site.liveUrl}rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
