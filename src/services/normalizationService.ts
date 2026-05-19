export function normalizeTextCode(value: string | undefined) {
  return value?.trim().replace(/\s+/g, " ").toUpperCase() || undefined;
}

export function splitCodeAndName(value: string | undefined) {
  if (!value) {
    return { code: undefined, name: undefined };
  }

  const [code, ...nameParts] = value.split("-");
  return {
    code: normalizeTextCode(code),
    name: nameParts.join("-").trim() || value.trim(),
  };
}

