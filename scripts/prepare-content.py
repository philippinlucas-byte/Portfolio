"""Rebuild content and responsive WebP assets from the preserved Adobe exports.

Requires Pillow and lxml. Downloads only missing source artwork referenced by
the exports; keeps a cache and records each image's original source.
"""
from pathlib import Path
from lxml import html, etree
from PIL import Image, ImageOps
from urllib.request import Request, urlopen
from urllib.parse import urlparse, unquote
from xml.sax.saxutils import escape
import json, re, hashlib, shutil

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'contenu'
OUT = ROOT / 'public' / 'assets'
CACHE = ROOT / '.impeccable' / 'source-assets'
DATA = ROOT / 'src' / 'data'
for d in (OUT, CACHE, DATA):
    d.mkdir(parents=True, exist_ok=True)
provenance = []

def parse(path):
    return html.fromstring(path.read_text(encoding='utf-8'))

def text(node):
    return ' '.join(node.text_content().split())

def download(url):
    dest = CACHE / (hashlib.sha256(url.encode()).hexdigest()[:20] + Path(urlparse(url).path).suffix)
    if not dest.exists():
        with urlopen(Request(url, headers={'User-Agent':'Mozilla/5.0'}), timeout=60) as response:
            dest.write_bytes(response.read())
    return dest

def get_image(img, page):
    src = img.get('src', '')
    if src and not src.startswith(('data:', 'http')):
        local = page.parent / unquote(src)
        if local.is_file():
            return local, str(local.relative_to(ROOT)).replace('\\','/')
    url = img.get('data-src') or src
    if not url.startswith('https://'):
        raise ValueError('Missing image source: '+url)
    image_id = Path(urlparse(url).path).name.split('_')[0].split('.')[0]
    candidates = list(page.parent.rglob(image_id + '*.jpg'))
    if candidates:
        local = max(candidates, key=lambda p: Image.open(p).width)
        return local, str(local.relative_to(ROOT)).replace('\\','/')
    return download(url), url

def image_data(img, page, key, label):
    source, origin = get_image(img, page)
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).convert('RGB')
        widths = sorted(set(min(w, image.width) for w in [640,1200,1920,2560]))
        variants=[]
        xmp = ('<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/" dc:source="'+escape(origin, {'"':'&quot;'})+'"/></rdf:RDF></x:xmpmeta>').encode()
        for width in widths:
            name = f'{key}-{width}.webp'
            target = OUT / name
            if not target.exists():
                scaled = image.resize((width, round(image.height*width/image.width)), Image.Resampling.LANCZOS)
                scaled.save(target, 'WEBP', quality=86, method=6, xmp=xmp)
            variants.append({'src':'/assets/'+name, 'width':width})
            provenance.append({'file':'public/assets/'+name,'source':origin,'operation':'Resize and WebP encode; original artwork unchanged.'})
        return {'src':variants[-1]['src'],'variants':variants,'width':image.width,'height':image.height,'alt':img.get('alt') or label,'origin':origin}

def clean_rich(node):
    clone = html.fromstring(html.tostring(node, encoding='unicode'))
    for el in clone.iter():
        classes = el.get('class','').split()
        if 'title' in classes: el.tag='h2'
        elif 'sub-title' in classes: el.tag='h3'
        elif 'bold' in classes: el.tag='strong'
        elif 'italic' in classes: el.tag='em'
        href = el.get('href')
        el.attrib.clear()
        if href:
            if href.startswith('https://lucasphilippin.myportfolio.com/'):
                href = urlparse(href).path or '/'
            el.set('href',href)
    return html.tostring(clone,encoding='unicode')

listing_path = SOURCE / 'projets' / 'projets.html'
listing = parse(listing_path)
projects=[]
for cover in listing.xpath('//a[contains(concat(" ",normalize-space(@class)," ")," project-cover ")]'):
    slug=urlparse(cover.get('href')).path.strip('/')
    title=text(cover.xpath('.//*[contains(concat(" ",@class," ")," title ")]')[0])
    year=text(cover.xpath('.//*[@class="date"]')[0])
    page=SOURCE/slug/(slug+'.html')
    tree=parse(page)
    project={'slug':slug,'title':title,'year':year,'source':str(page.relative_to(ROOT)).replace('\\','/'),'cover':image_data(cover.xpath('.//img')[0],listing_path,slug+'-cover',title),'modules':[]}
    for i,module in enumerate(tree.xpath('//div[@id="project-modules"]/*')):
        classes=module.get('class','').split()
        if 'text' in classes:
            rich=module.xpath('.//*[contains(concat(" ",@class," ")," rich-text ")]')[0]
            project['modules'].append({'type':'text','html':clean_rich(rich),'text':text(rich)})
        elif 'image' in classes or 'media_collection' in classes:
            items=[image_data(img,page,f'{slug}-{i}-{j}',f'{title} — visuel {j+1}') for j,img in enumerate(module.xpath('.//img'))]
            project['modules'].append({'type':'images','items':items})
        elif 'video' in classes:
            embed=page.parent/module.xpath('.//iframe')[0].get('src')
            embed_tree=parse(embed)
            video=embed.parent/embed_tree.xpath('//source[@type="video/mp4"]')[0].get('src')
            original=embed.parent/'Séquence 01.mp4'
            if original.exists(): video=original
            target=OUT/'termino-logic-video.mp4'
            if not target.exists(): shutil.copy2(video,target)
            project['modules'].append({'type':'video','src':'/assets/'+target.name,'title':'Termino-Logic — présentation vidéo','source':str(video.relative_to(ROOT)).replace('\\','/')})
        else:
            raise ValueError('Unknown module: '+str(classes))
    projects.append(project)
    print('Prepared',slug,flush=True)
result={'greeting':text(listing.xpath('//h1')[0]),'invitation':text(listing.xpath('//*[contains(@class,"masthead")]//p')[0]),'projects':projects}
(DATA/'portfolio.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'ASSET-SOURCES.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2),encoding='utf-8')
for name in ['Logo_C.svg','Logo_Full_C.svg','Logo_Ico.png']:
    shutil.copy2(ROOT/'charte'/name,OUT/name)
print('Done:',len(projects),'projects;',len(provenance),'WebP variants.')
