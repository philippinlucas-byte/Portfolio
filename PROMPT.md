# Instructions de travail — Portfolio

Tu interviens sur un **portfolio de graphiste déjà développé**. L'objectif est de le faire évoluer, notamment sur le plan visuel, **sans repartir de zéro**. Recherche un résultat haut de gamme, moderne et soigné, avec l'aide d'Impeccable lorsque cela est pertinent, sans effets génériques d'« AI slop ».

## Références et priorités

- `PRODUCT.md` fait autorité pour les objectifs, le positionnement, les décisions de marque et les contraintes déjà validées.
- `README.md` décrit la réalisation technique actuelle et les commandes du projet. Vérifie les fichiers concernés avant toute intervention ; ne considère pas le site comme un projet à initialiser.
- `contenu/` (notamment `sitemap.xml` et les dossiers des pages) reste la source de vérité pour l'arborescence, la structure éditoriale, les textes et les médias. Ne remplace pas ce contenu par les textes ou images fictifs d'une maquette.
- `charte/` conserve les éléments d'identité à respecter, en particulier les logos. **Polices obligatoires : Gloock pour les titres et Geist pour le corps de texte.**
- Lorsqu'une **nouvelle référence de web design générée par IA** est fournie, elle devient la référence **pour l'apparence et la composition visuelle**, sans annuler les contraintes de contenu, de marque et de fonctionnement ci-dessus. L'interface actuelle n'est pas une référence esthétique à reproduire.

## Préserver l'existant

- Conserver la stack en place : site statique multipage généré avec Node.js, HTML/CSS et JavaScript léger, sans dépendance de production, destiné à Cloudflare Pages.
- Préserver les routes, les contenus, les réalisations, la navigation fonctionnelle, le contact et son formulaire Tally, les interactions, l'accessibilité et la compatibilité responsive.
- Adapter en priorité les styles, les gabarits et les composants existants. Ne refondre la logique ou l'architecture que si une nécessité concrète le justifie ; ne pas introduire de dépendances sans raison explicite.
- Conserver des animations discrètes, fluides et performantes, compatibles avec `prefers-reduced-motion`.

## Refonte visuelle à partir d'un design Figma

1. Examiner la référence réellement fournie et les seuls fichiers pertinents du projet. Distinguer les choix visuels observables des éléments incertains (notamment les comportements mobiles non montrés).
2. Proposer une courte correspondance entre le design cible et les composants existants : à conserver, à restyler, à restructurer seulement si nécessaire.
3. Formaliser le système visuel (couleurs, typographies, espacements, composants, états, responsive) avec Impeccable. Créer ou actualiser `DESIGN.md` **à partir du nouveau design**, une fois la direction validée, et non en reconduisant automatiquement l'ancienne apparence.
4. Migrer **une page représentative à la fois**, après accord sur le périmètre. Réutiliser ensuite les styles et composants validés sur les autres pages.
5. Vérifier le rendu et les interactions du périmètre modifié. Signaler les écarts restants avant de multiplier les itérations de finition.

## Travail ciblé et économie de crédits

- Respecter strictement le périmètre de chaque demande ; éviter les scans répétés du dépôt, les réécritures complètes, les audits globaux non demandés et les variantes graphiques inutiles.
- Privilégier des changements petits, réversibles et réutilisables. Pour une demande d'analyse, **ne modifier aucun fichier** sans instruction explicite ; pour une demande d'implémentation validée, agir directement sur le périmètre convenu.
- Garder les comptes rendus brefs : fichiers touchés, résultat, vérifications et éventuels points à arbitrer.
- Mettre à jour `README.md`, `PRODUCT.md` ou `DESIGN.md` seulement si une évolution réelle l'exige ; ne pas réécrire ces documents pour reformuler des informations déjà présentes.
