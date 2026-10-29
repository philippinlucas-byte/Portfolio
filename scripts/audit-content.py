"""Verify original narrative and media counts against the generated project pages."""
from pathlib import Path
from lxml import html
import json,re
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'src/data/portfolio.json').read_text(encoding='utf-8'))
normalize=lambda x: re.sub(r'\s+',' ',x).strip()
total=0
for project in data['projects']:
    source=html.fromstring((root/project['source']).read_text(encoding='utf-8'))
    target=html.fromstring((root/'dist'/project['slug']/'index.html').read_text(encoding='utf-8'))
    before=source.xpath('//div[@id="project-modules"]/*[contains(@class,"project-module-text")]')
    after=target.xpath('//section[contains(@class,"project-text")]')
    assert len(before)==len(after),project['slug']
    for a,b in zip(before,after):
        assert normalize(a.text_content())==normalize(b.text_content()),project['slug']+' text differs'
        total+=1
    original_images=source.xpath('//div[@id="project-modules"]//img')
    assert len(original_images)==len(target.xpath('//*[@data-gallery]')),project['slug']+' images differ'
print(f'PASS: all {total} original text modules and image counts preserved in all five projects.')
