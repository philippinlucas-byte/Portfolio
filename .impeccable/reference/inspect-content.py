from lxml import html
from pathlib import Path
from collections import Counter
import json

for p in Path('contenu').rglob('*.html'):
    tree = html.parse(str(p))
    print('\nPAGE', p.parent.name)
    for module in tree.xpath('//div[@id="project-modules"]/*'):
        print(module.get('class'), 'images', len(module.xpath('.//img')), 'video', len(module.xpath('.//video')), 'iframe', len(module.xpath('.//iframe')))
        if 'video' in module.get('class','') or module.xpath('.//iframe'):
            print(html.tostring(module, encoding='unicode')[:6000])
