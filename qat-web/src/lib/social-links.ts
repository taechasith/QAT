import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type SocialLink = {
  label: string;
  href: string;
};

const fallbackLinks: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:creativelab.co.th@gmail.com",
  },
];

function normalizeHref(label: string, value: string) {
  if (label.toLowerCase().includes("gmail") || label.toLowerCase().includes("email")) {
    return value.startsWith("mailto:") ? value : `mailto:${value}`;
  }

  return value;
}

export function getSocialLinks(): SocialLink[] {
  const filePath = path.join(process.cwd(), "content", "social-media.md");

  if (!existsSync(filePath)) {
    return fallbackLinks;
  }

  const content = readFileSync(filePath, "utf8");
  const links = content
    .split(/\r?\n/)
    .map((line) => line.trim().match(/^-\s*([^:]+):\s*(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      label: match[1].trim(),
      href: normalizeHref(match[1], match[2].trim()),
    }))
    .filter((link) => link.label && link.href);

  return links.length > 0 ? links : fallbackLinks;
}
