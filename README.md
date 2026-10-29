# Portfolio de Lucas Philippin

Site statique multipage, généré avec Node.js, sans dépendance JavaScript de production. Gloock et Geist sont hébergées localement. Les cinq projets et leur narration proviennent de `contenu/`.

## Développement

Node.js 22 ou ultérieur :

```sh
npm run dev
```

L’aperçu se trouve à `http://127.0.0.1:4321/`. Après une modification des sources, exécuter `npm run build`, puis recharger la page. Le serveur ne reconstruit pas automatiquement.

```sh
npm run build
npm run check
```

Le résultat est généré dans `dist/`. `src/build.mjs` contient les gabarits, `src/styles.css` le système visuel, `src/site.js` les interactions et `src/data/portfolio.json` le contenu extrait.

## Cloudflare Pages

- Framework preset : None.
- Build command : `npm run build`.
- Output directory : `dist`.
- Node.js : 22 ou ultérieur.
- Variable `SITE_URL` : origine HTTPS du domaine retenu, sans chemin, par exemple le domaine Pages fourni par Cloudflare. Elle active les liens canoniques, les images de partage et le sitemap ; ne pas employer un domaine fictif en production.

Le site reste entièrement statique. Le formulaire s’exécute chez Tally, sans serveur applicatif ou secret à fournir au site. `_headers` configure les en-têtes de sécurité et le cache sur Cloudflare Pages. Une page 404 dédiée est incluse.

## Contact

Le formulaire publié est `https://tally.so/r/81gBgk`. Il possède les champs obligatoires Nom, Entreprise, Email et Message, ainsi qu’un CAPTCHA. Son état existant a été conservé. La redirection après envoi configurée chez Tally pointe vers `https://philippin.fr/` : vérifier qu’elle correspond au domaine de production avant publication.

Le formulaire est intégré en iframe, avec un lien direct de secours et un lien e-mail. Aucun message de test n’est envoyé automatiquement. La validation, le CAPTCHA, les notifications et la confirmation d’envoi appartiennent à Tally.

## Médias et fidélité des contenus

Les originaux restent dans `contenu/` et `charte/`. `scripts/prepare-content.py` extrait les contenus, récupère les images manquantes depuis les URLs des exports et crée les variantes WebP de 640 à 2560 px. Il nécessite Python, Pillow et lxml ; il n’est pas nécessaire au build quotidien ou Cloudflare, car les données et images préparées sont versionnées.

```sh
python scripts/prepare-content.py
python scripts/audit-content.py
```

`ASSET-SOURCES.json` et les métadonnées XMP des WebP enregistrent la provenance. La vidéo originale est servie localement, sans lecture automatique. `scripts/fetch-fonts.py` permet de récupérer les polices officielles et leurs licences.

## Animation et accessibilité

L’ouverture de la galerie révèle les trois plans en une séquence courte ; les images réagissent au survol, les projets disposent de transitions natives entre pages lorsque le navigateur les prend en charge. La visionneuse est utilisable au clavier (flèches, Échap), au toucher et avec ses boutons. Les contenus et liens restent utilisables sans JavaScript. `prefers-reduced-motion` supprime les mouvements ; il ne cache aucun contenu.

Les interactions sont regroupées dans un seul script léger, sans bibliothèque d’animation, boucle permanente ou interception des liens ordinaires.
