export function normalizeHeader(header: string) {
  return header.trim().replace(/^\uFEFF/, "");
}

export function makeUniqueHeaders(headers: string[]) {
  const seen = new Map<string, number>();

  return headers.map((header) => {
    const normalized = normalizeHeader(header);
    const count = seen.get(normalized) ?? 0;
    seen.set(normalized, count + 1);

    if (count === 0) {
      return normalized;
    }

    return `${normalized}__${count + 1}`;
  });
}

export function getDuplicateHeaders(headers: string[]) {
  const seen = new Map<string, number>();

  return headers
    .map(normalizeHeader)
    .filter((header) => {
      const count = seen.get(header) ?? 0;
      seen.set(header, count + 1);
      return count > 0;
    });
}

