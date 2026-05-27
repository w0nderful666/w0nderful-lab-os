import { commands } from "../data/commands";
import { posts } from "../data/posts";
import { projects } from "../data/projects";
import { timeline } from "../data/timeline";

export type SearchSource = "Project" | "Post" | "Timeline" | "Command";

export type SearchResult = {
  id: string;
  source: SearchSource;
  title: string;
  description: string;
  target: string;
  commandId?: string;
  keywords: string[];
  score: number;
};

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ").trim();

const tokensFor = (value: string) => normalize(value).split(/\s+/).filter(Boolean);

const scoreResult = (result: Omit<SearchResult, "score">, query: string) => {
  const normalizedQuery = normalize(query);
  const queryTokens = tokensFor(query);
  const haystack = normalize([result.title, result.description, result.source, result.target, ...result.keywords].join(" "));
  if (!normalizedQuery) return 0;

  let score = haystack.includes(normalizedQuery) ? 8 : 0;
  for (const token of queryTokens) {
    if (normalize(result.title).startsWith(token)) score += 6;
    if (normalize(result.title).includes(token)) score += 4;
    if (haystack.includes(token)) score += 2;
  }

  return score;
};

let cachedIndex: SearchResult[] | null = null;

export const getSearchIndex = (): SearchResult[] => {
  if (cachedIndex) return cachedIndex;

  const projectResults = projects.map((project) => ({
    id: `project:${project.slug}`,
    source: "Project" as const,
    title: project.name,
    description: project.summary,
    target: project.slug,
    keywords: [project.type, project.category, project.status, project.version, ...project.tags],
    score: 0
  }));

  const postResults = posts.map((post) => ({
    id: `post:${post.slug}`,
    source: "Post" as const,
    title: post.title,
    description: post.summary,
    target: post.slug,
    keywords: [post.category, post.relatedProject, post.relatedProjectLabel, ...post.tags],
    score: 0
  }));

  const timelineResults = timeline.map((entry) => ({
    id: `timeline:${entry.id}`,
    source: "Timeline" as const,
    title: entry.title,
    description: entry.description,
    target: entry.id,
    keywords: [entry.type, entry.date, entry.relatedProject],
    score: 0
  }));

  const commandResults = commands.map((command) => ({
    id: `command:${command.id}`,
    source: "Command" as const,
    title: command.title,
    description: command.description,
    target: command.target || command.href || command.id,
    commandId: command.id,
    keywords: [command.kind, command.action, ...command.keywords],
    score: 0
  }));

  cachedIndex = [...projectResults, ...postResults, ...timelineResults, ...commandResults];
  return cachedIndex;
};

export const searchLabIndex = (query: string, limit = 12): SearchResult[] => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  return getSearchIndex()
    .map((result) => ({
      ...result,
      score: scoreResult(result, query)
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
};

export const executeSearchResult = (result: SearchResult) => {
  const labOS = window.labOS;
  if (result.source === "Command" && result.commandId) {
    void labOS.executeCommand(result.commandId);
  }
  if (result.source === "Project") labOS.openProject(result.target);
  if (result.source === "Post") labOS.openPost(result.target);
  if (result.source === "Timeline") labOS.openTimeline(result.target);
};
