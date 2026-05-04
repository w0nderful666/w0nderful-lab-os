import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.string(),
    updated: z.string().optional(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.string().default("General"),
    status: z.enum(["published", "draft"]).default("published"),
    articleStyle: z.enum(["system", "paper", "terminal", "magazine", "notebook", "minimal"]).default("system"),
    readerDensity: z.enum(["comfortable", "compact", "wide"]).default("comfortable"),
    toc: z.boolean().default(false),
    cover: z.string().optional(),
    relatedProject: z.string().optional(),
  }),
});

export const collections = { blog };
