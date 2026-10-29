"""Vendor the confirmed Google Fonts families and their licenses."""
from pathlib import Path
from urllib.request import Request, urlopen
import re

root = Path(__file__).resolve().parents[1]
out = root/'public'/'fonts'
out.mkdir(parents=True,exist_ok=True)
url='https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Gloock&display=swap'
request=Request(url,headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'})
css=urlopen(request,timeout=40).read().decode()
for i, remote in enumerate(dict.fromkeys(re.findall(r'url\((https://[^)]+)\)',css))):
    suffix=Path(remote).suffix
    filename=f'local-font-{i}{suffix}'
    target=out/filename
    if not target.exists(): target.write_bytes(urlopen(remote,timeout=40).read())
    css=css.replace(remote,'/fonts/'+filename)
(out/'fonts.css').write_text(css,encoding='utf-8')
for family in ['gloock','geist']:
    source=f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt'
    (out/(family+'-OFL.txt')).write_bytes(urlopen(source,timeout=40).read())
(out/'SOURCES.txt').write_text('Fonts downloaded from Google Fonts CSS endpoint.\n'+url+'\nFamilies: Gloock (Duarte Pinto); Geist (Vercel).\nLicenses: respective OFL files.\n',encoding='utf-8')
print('Vendored Gloock and Geist.')
