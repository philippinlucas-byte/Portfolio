// Preserve the source copy while giving editorial blocks the right semantics.
export function renderContent(html) {
  let result = html.replace(/<h3>\s*<h3>/g, '<h3>').replace(/<\/h3>\s*<\/h3>/g, '</h3>');
  result = result.replace(/<h3>(Autres supports[\s\S]*?)<\/h3>/g, '<h2>$1</h2>');
  return result.replace(/<h3>([^]*?)<\/h3>/g, (heading, content) => content.includes('<a ') ? `<p class="project-resource-copy">${content}</p>` : heading);
}
