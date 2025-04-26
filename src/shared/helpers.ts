export function decodeHtmlEntities(input: string): string {
  if (!input) return "";

  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
}
