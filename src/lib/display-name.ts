export function getDisplayNameParts(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.toUpperCase() ?? "HASSAAN";
  const rest = parts.slice(1).join(" ").toUpperCase();
  return { first, rest, full: [first, rest].filter(Boolean).join(" ") };
}
