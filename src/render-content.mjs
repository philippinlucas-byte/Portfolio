// Preserve the source copy while giving editorial blocks the right semantics.
export function renderContent(html) {
  let result = html.replace(/<h3>\s*<h3>/g, '<h3>').replace(/<\/h3>\s*<\/h3>/g, '</h3>');
  result = result.replace(/<h3>(Autres supports[\s\S]*?)<\/h3>/g, '<h2>$1</h2>');
  result = result.replace(/<a([^>]*href="([^"]+)"[^>]*)>\s*(LIEN|ICI)\s*<\/a>/g, (link, attributes, href) => {
    const label = href.includes('figma.com/') ? 'Ouvrir la maquette Figma' : href.includes('gumroad.com/') ? 'Voir les modèles de CV sur Gumroad' : '';
    return label ? `<a${attributes}>${label}</a>` : link;
  });
  result = result.replace('composantes.Ces', 'composantes. Ces');
  return result.replace(/<h3>([^]*?)<\/h3>/g, (heading, content) => content.includes('<a ') ? `<p class="project-resource-copy">${content}</p>` : heading);
}
