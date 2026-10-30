# Portfolio — Lucas Philippin

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Choix délégué à l’agent, conformément à `PROMPT.md`, confirmé par l’utilisateur le 29 octobre 2026. Réalisation retenue : site statique multipage, gabarits JavaScript exécutés par Node.js 22 ou ultérieur, HTML/CSS et JavaScript léger dans le navigateur, sans dépendance de production. `npm run build` génère `dist/`. Déploiement cible : **Cloudflare Pages**, version gratuite. Les médias préparés et les polices WOFF2 sont locaux et versionnés.

## Users

Deux publics ont la même importance :

- Les clients potentiels qui évaluent le travail de Lucas Philippin en vue d’une mission de graphisme.
- Les recruteurs et agences qui évaluent son profil en vue d’un poste ou d’une collaboration.

## Product Purpose

Présenter le portfolio professionnel de Lucas Philippin, designer graphique, permettre de découvrir ses réalisations et faciliter la prise de contact. Le site doit soutenir aussi bien l’obtention de missions que les opportunités de recrutement ou de collaboration. Aucun objectif chiffré n’est fixé.

## Positioning

Graphiste éditorial, orienté vers l'édition et les métiers proches : conception et déclinaison de supports graphiques imprimables (livres, revues, jeux, supports de cours). Le portfolio présente d'abord des projets print aboutis, qui montrent une mise en page claire et une vraie rigueur de production.

En complément, et de manière secondaire :
- une double culture 3D, qui nourrit certains projets mais ne définit plus le positionnement ;
- une capacité à décliner des supports de façon automatisée, grâce à des scripts Excel/Power Query qui alimentent la fusion de données InDesign.

Ces deux éléments ne doivent pas occuper le devant de la scène. Le portfolio laisse parler les projets. Ne pas mettre en avant la 3D ni l'automatisation dans les titres ou les accroches de la page d'accueil.

Ne pas ajouter de promesse de différenciation ou de résultat sans confirmation. Ne pas mentionner de compétence « prépresse ».

## Operating Context

Le parcours existant permet de consulter la liste des projets, d’ouvrir leurs pages détaillées, de découvrir d’autres réalisations et d’accéder au contact. Les contenus sont principalement en français.

Les sources locales sont des exports du portfolio Adobe Portfolio, accompagnés de médias. Elles constituent la référence de contenu pour le nouveau site. `contenu/sitemap.xml` répertorie la racine, la page des projets, cinq pages de réalisation et la page contact ; le comportement de la racine devra être vérifié lors de l’implémentation.

## Capabilities and Constraints

- Conserver exactement la structure, les textes et les images fournis dans `contenu`, conformément au brief confirmé dans `PROMPT.md`.
- Préserver les cinq réalisations : Termino-Logic — Croix-Rouge Compétence ; Identité visuelle — Lucas Philippin ; Kit de CV Figma — 5 modèles modulaires ; Webdesign — Raise ; Logo et carte de visite — Résiop. Les intitulés publiés doivent reprendre les sources.
- Préserver la page contact, avec ses champs nom, adresse e-mail et message, ainsi que les liens de contact et réseaux présents dans les sources.
- Le formulaire Tally confirmé par l’utilisateur est `https://tally.so/r/81gBgk`, intégré dans la page contact. Il comporte actuellement Nom, Entreprise, Email et Message obligatoires, un CAPTCHA et une redirection après envoi vers `https://philippin.fr/`. Le domaine de déploiement du portfolio reste à confirmer.
- Produire un code propre, modulaire et prêt à être compilé si la stack retenue le nécessite.
- Prévoir les animations au défilement demandées dans le brief, subtiles, fluides et performantes.
- Le nom de domaine et la configuration de déploiement restent à déterminer. Cloudflare Pages est la cible, sans déploiement existant confirmé.

## Brand Commitments

- Nom : Lucas Philippin. Intitulé existant : Designer Graphique.
- Portfolio professionnel haut de gamme, moderne, soigné et épuré, selon `PROMPT.md` confirmé par l’utilisateur.
- Prendre pour référence la charte fournie dans `charte` et préserver ses éléments d’identité.
- Polices imposées : **Gloock** pour les titres, **Geist** pour le corps de texte. L’utilisateur a confirmé le 29 octobre 2026 que « Glook » dans le brief désignait bien Gloock. Héberger les fichiers de police avec le site.
- L’utilisateur autorise l’ajout de sous-titres en **Geist, capitales grasses** pour renforcer la hiérarchie. Les intitulés ajoutés doivent décrire les disciplines réellement représentées dans les projets.
- Correction explicite du 29 octobre : priorité à la modernité et à la propreté. L’utilisateur rejette les cadres blancs à deux coins arrondis, leur rendu vieillot et les lignes de vagues ajoutées. Les références doivent nourrir le travail sans être copiées littéralement. Utiliser les motifs végétaux de sa planche d’iconographie comme texture discrète uniquement. Les flèches droites et froides restent rejetées. La référence web est graphique uniquement : ses promesses commerciales ne font pas partie du contenu du portfolio.
- Préserver les formulations existantes ; ne pas ajouter de nouveaux arguments commerciaux sans validation.

## Evidence on Hand

- `PROMPT.md` : brief confirmé le 29 octobre 2026.
- `contenu/sitemap.xml` : inventaire des routes du portfolio source.
- `contenu/projets/projets.html` : présentation et liste des projets.
- `contenu/contact/contact.html` : formulaire et moyens de contact existants.
- Les cinq autres dossiers de `contenu` : pages détaillées des réalisations et médias associés, dont images et vidéos.
- `charte/Couleurs.png`, `charte/Exemple1.jpg`, `charte/Exemple2.pdf` : références de charte fournies.
- `charte/Logo_Background_Square.svg`, `charte/Logo_C.svg`, `charte/Logo_Full_C.svg`, `charte/Logo_Ico.png` : éléments de logo fournis.
- `charte/plantes/Citrons.svg`, `charte/plantes/Fleur.svg`, `charte/plantes/Plante 1.svg`, `charte/plantes/Plante 2.svg`, `charte/plantes/Plante 3.svg`, `charte/plantes/Plante 4.svg`, `charte/plantes/Plante 5.svg` : éléments graphiques secondaires fournis.

Les réalisations documentées constituent la preuve du travail. Aucun témoignage, résultat chiffré, tarif ou engagement commercial supplémentaire n’a été confirmé dans cet échange ; ne pas en inventer.

## Product Principles

1. Accorder la même importance aux besoins des clients et à ceux des recruteurs.
2. Faire reposer l’évaluation du profil sur les réalisations et les contenus réels fournis.
3. Conserver fidèlement le contenu et l’identité de Lucas Philippin lors de la reconstruction.
4. Permettre de passer facilement de la découverte des projets à la prise de contact.
5. Privilégier une réalisation fiable et maintenable sur Cloudflare Pages, avec des animations qui servent les travaux présentés.
