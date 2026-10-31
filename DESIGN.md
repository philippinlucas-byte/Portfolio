---
name: Portfolio — Lucas Philippin
description: Un portfolio éditorial épuré, porté par les réalisations et une identité botanique en aquarelle.
colors:
  blue: "#01497c"
  ink: "#012c50"
  turquoise-ocean: "#2c7da0"
  turquoise: "#4ba2c5"
  home-outline: "#b6ddeb"
  pale: "#daedf4"
  paper: "#f0f9fb"
  surface: "#ffffff"
  rule: "#b2ccde"
typography:
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Gloock, Georgia, serif"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  abstract:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  narrative:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: ".875rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: ".095em"
  meta:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: ".75rem"
    fontWeight: 400
    lineHeight: 1.55
  control:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: ".875rem"
    fontWeight: 500
    lineHeight: "22px"
rounded:
  field: "8px"
  thumbnail: "12px"
  media: "16px"
  home-card: "20px"
  footer: "32px"
  action: "27px"
  pill: "999px"
spacing:
  detail: "8px"
  item: "16px"
  group: "24px"
  block: "32px"
components:
  button-contact:
    backgroundColor: "{colors.turquoise-ocean}"
    textColor: "{colors.surface}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "7px 24px"
    height: "36px"
  button-contact-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
  button-discover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.action}"
    padding: "12px 28px"
  button-discover-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  keyword:
    backgroundColor: "{colors.pale}"
    textColor: "{colors.blue}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  filter:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "18px"
    padding: "8px 16px"
  filter-selected:
    backgroundColor: "{colors.turquoise-ocean}"
    textColor: "{colors.surface}"
  project-card:
    rounded: "{rounded.home-card}"
    typography: "{typography.card-title}"
  pagination:
    textColor: "{colors.blue}"
    size: "44px"
---

# Design System: Lucas Philippin

## Overview

**Creative North Star: "Portfolio botanique éditorial"**

Cette formule descriptive synthétise les choix du site ; elle n’est pas un nouveau nom de marque. L’identité associe une composition éditoriale précise, une typographie de titre expressive et des aquarelles végétales légères. Le rendu doit rester moderne, propre, soigné et épuré. Les réalisations portent l’attention ; l’interface organise leur lecture et facilite le contact.

Document extrait de l’implémentation et des décisions validées au 31 octobre 2026. Les valeurs du frontmatter décrivent les primitives réutilisées ; les expressions fluides, états et cas particuliers sont consignés ci-dessous et dans `.impeccable/design.json`. Les sources effectives restent les styles et composants de `src`, les polices de `public/fonts` et la charte fournie. Lors d’une évolution volontaire, actualiser ces deux documents ensemble.

**Key Characteristics:**
- Titres Gloock et lecture en Geist.
- Bleu profond, turquoise océanique et papier bleuté.
- Grandes réalisations, fonds calmes et motifs végétaux périphériques.
- Espacements hiérarchisés et boutons fins.
- Mêmes composants de navigation et de suggestion sur tout le site.

## Colors

### Primary

**Bleu Profond** (`blue`) porte les titres, les liens et le CTA de découverte. **Écriture** (`ink`) porte le texte courant. Les noms viennent de `charte/Brand design_variables.json`.

### Secondary

**Turquoise Océanique** (`turquoise-ocean`) porte les boutons contact, les filtres sélectionnés et les libellés de projets. **TO 2** (`turquoise`) reste un accent secondaire, notamment pour la sélection du texte. **TO 4** (`home-outline`) dessine les contours de filtres. **TO 5** (`pale`) remplit les mots-clés et sépare discrètement les métadonnées.

### Neutral

**TO 6 / papier bleuté** (`paper`) est le fond général ; le canevas partage cette valeur. **Blanc** (`surface`) sert aux textes sur boutons colorés et à la surface du footer. **BP 4** (`rule`) porte les contours discrets. Le corail de la charte peut apparaître dans les œuvres et illustrations originales, mais ne constitue pas un accent ajouté à l’interface.

**The Palette Rule.** Reprendre les valeurs officielles ; ne pas inventer un turquoise « corrigé » ou remplacer le turquoise par une nuance voisine sans décision explicite.

Exception conservée à la demande de l’utilisateur : les petits textes turquoise sur papier ont un contraste de 4,32:1. Le semi-bold améliore leur présence sans changer ce ratio. Ne pas présenter cette association comme conforme au seuil de 4,5:1 pour le petit texte. Les placeholders Tally, également peu contrastés, sont conservés tels quels à sa demande. Cette documentation constate ces choix, elle ne les transforme pas en recommandation générale.

## Typography

Gloock est la voix des titres ; Geist est celle du texte, des sous-titres et des contrôles. Les deux familles sont hébergées localement avec affichage de secours pendant le chargement. Geist fournit les graisses 400 à 700 ; Gloock utilise sa vraie graisse régulière.

- **Titres de projet :** taille fluide `clamp(2.3rem, 3.55vw, 4.4rem)`, interligne du rôle `display`. Variantes mobiles et écrans peu hauts dans la feuille des projets.
- **Titres de récit :** taille fluide `clamp(2rem, 3.2vw, 3.5rem)`, rôle `headline`. Les titres affichés en Gloock restent en graisse régulière, même lorsqu’un sous-titre voisin est en semi-bold.
- **Titres sur vignettes :** rôle `card-title`, réduit à 18 px sous 1100 px. Blanc, aligné en bas de l’image.
- **Lecture :** rôle `body` pour la page, `abstract` pour les résumés, `narrative` pour les récits ; mesure de lecture généralement limitée entre 72 et 75 caractères typographiques.
- **Sous-titres :** Geist en capitales espacées, turquoise, rôle `label`. Semi-bold dans les pages projet ; le sous-titre d’accueil reste en bold.
- **Métadonnées :** rôle `meta`, passant à 13 px sur mobile. Libellés en semi-bold ; valeurs régulières. Mots-clés à 12 px.

**The Type Role Rule.** Distinguer le niveau visuel du niveau sémantique : un seul titre principal par page, sections en h2, sous-sections et projets suggérés en h3. Un lien de ressource est un paragraphe, pas un titre.

## Layout

Les pages partagent un header d’au moins 84 px, un contenu centré avec gouttières fluides et le nouveau footer. Les détails ci-dessous décrivent les compositions existantes ; ils ne rendent pas chaque nouvelle page identique à l’accueil.

**The Proximity Rule.** Lier les éléments par leur proximité : titre, discipline et mots-clés forment un groupe ; le résumé, les spécificités et la navigation reçoivent chacun leur pause. Ne pas appliquer le même espacement à toutes ces relations.

La base de rythme est de 4 px. Les quatre pas fixes du frontmatter correspondent aux détails, éléments voisins, groupes et blocs. Les trois pauses fluides sont : sections (`clamp(48px, 6vw, 96px)`), chapitres et suggestions (`clamp(96px, 10vw, 160px)`), footer (`clamp(64px, 7vw, 112px)`). Reprendre ces rôles avant d’ajouter une valeur isolée.

- **Accueil :** largeur maximale de 1744 px, gouttière `clamp(20px, 4.583333vw, 88px)`. Hero avec texte à gauche et couverture de l’identité visuelle à droite, fondue vers la transparence à gauche. Le lien de projet est superposé au visuel. La partie droite est masquée à 720 px et moins, son image n’est alors pas téléchargée. La grille de travaux passe de trois colonnes avec un projet dominant à deux colonnes sous 1100 px, puis une sous 720 px. Les filtres gardent le même ordre de lecture.
- **Premier écran :** le contenu d’accueil mesure au minimum `100svh - 84px`, avec une pause avant le footer. Header et contenu occupent donc au moins la hauteur de l’écran. Le footer se découvre au défilement, y compris lorsqu’un filtre ne laisse qu’un projet.
- **Projets :** hero en deux colonnes au-dessus de 760 px, récit vertical ensuite. Dans la plage 761–1000 px, la colonne texte reçoit davantage de largeur ; sous 760 px, la lecture devient linéaire. Sur ordinateur et tablette, viser un hero tenant dans le premier écran. Si nécessaire, utiliser un résumé court et déplacer l’introduction complète au début du récit plutôt que diminuer le corps de lecture.
- **Récit :** titres à gauche et texte en vis-à-vis sur grand écran ; empilement sur mobile. Les cadres suivent les proportions des œuvres, sans bandes vides ajoutées pour imposer un format artificiel.
- **Suggestions :** même principe de vignette que l’accueil, après une pause de chapitre ; deux colonnes puis une sous 720 px. Les motifs du corps se prolongent derrière cette section.
- **Contact :** deux colonnes, puis une sous 760 px. Le conteneur du formulaire est transparent. Le formulaire lui-même est hébergé par Tally.

Cas contrôlés : largeurs 320, 375, 768 et 1440 px ; heros également vérifiés à 768 × 720 et 1280 × 720. Ces vérifications ne valent pas certification de tous les appareils ou navigateurs.

## Elevation & Depth

La structure est essentiellement plane. La profondeur vient des œuvres, de la superposition de légendes et de la différence entre le papier et le footer blanc. Il n’y a pas d’ombre de boîte générale sur les vignettes ni de verre flouté décoratif.

Le bas des vignettes reçoit un voile sombre progressif lorsque la légende apparaît. Sur l’accueil, ce voile se renforce vers le bas (opacité finale .72), avec un flou de 8 px fondu par un masque sur toute la hauteur : aucune coupure entre zones nette et floue. Le texte blanc reçoit une ombre diffuse et décalée (`0 5px 14px rgba(1,44,80,.35)`), sans contour noir rapproché. Les suggestions conservent leur traitement distinct plus léger. Les champs Tally possèdent leurs propres ombres fines ; ce traitement externe n’est pas un motif à reproduire sur les autres composants.

**The Quiet Depth Rule.** Employer une ombre pour la lisibilité ou l’état d’un composant, jamais pour donner artificiellement du volume à chaque bloc.

## Shapes

Les photos et œuvres ont des coins doucement arrondis, avec des valeurs distinctes pour médias, petites vignettes et cartes d’accueil. Les contrôles textuels courts prennent la forme de pilules ; les flèches de navigation sont circulaires. Le footer et l’extrémité droite du hero utilisent un arrondi plus ample. Les contours sont fins, d’un pixel.

**The Botanical Rule.** Utiliser seulement les plantes 1, 3 et 5 fournies dans la charte pour les fonds du site. Les disposer sur les côtés, à une taille discrète et relativement constante, sans chevauchement et avec une opacité maximale de 10 %. Les pages projet alternent les motifs, côtés et orientations ; le nombre de motifs suit la longueur de la page. Repères actuels : 280 × 340 px sur ordinateur, 180 × 260 px pour les projets sur mobile. Ne pas retirer les textures végétales au nom de la simplification. Les plantes contenues dans une image de projet restent une partie de cette œuvre et ne suivent pas les règles de la texture de fond.

## Components

### Navigation et footer

Logo officiel à gauche, « Mes projets » et « Contact » à droite. Les liens projets vont à `/#projets`. L’ancienne route `/projets/` rend le même accueil, pas une ancienne version. À 320 px, garder les liens du header sur une ligne. Footer partagé : signature, contact, réseaux et retour en haut. Les zones cliquables peuvent dépasser les pilules visibles pour conserver leur finesse.

### Boutons et filtres

Contact : fond turquoise océanique et texte blanc ; survol bleu profond. Découverte des projets : fond bleu profond, survol encre. Pas de texte bleu sur un bouton turquoise rempli. Les filtres sont clairs au repos et deviennent turquoise avec texte blanc lorsqu’ils sont sélectionnés ; leur état est annoncé. Les filtres ne remplacent pas les liens de projets et ne sont affichés que si JavaScript fonctionne.

Focus visible : contour bleu de 2 px, normalement décalé de 6 px ; ajustements à 4 px pour les cartes et le lien du hero. Respecter les zones cliquables de 44 px visées dans les composants : la pilule contact visible reste plus fine, avec une zone transparente agrandie.

### Mots-clés et spécificités

Mots-clés non interactifs : petites pilules bleu pâle, texte bleu. Spécificités en liste de définitions avec séparateur supérieur léger ; année, client lorsqu’il existe, support, mission et outils selon le projet. Ne pas inventer une valeur manquante. Titres raccourcis lorsque la discipline est déjà portée par le sous-titre.

### Vignettes et navigation de projet

Image dominante, légende intégrée au survol et au focus clavier. Sur l’accueil mobile (720 px et moins) ou sans survol, le défilement révèle uniquement le projet visible dont le centre est le plus proche du centre de l’écran ; un projet recevant le focus clavier prend la priorité. Le filtre et les changements de taille recalculent cette sélection. Aucun overlay de projet lorsque la galerie est hors écran ; aucun survol tactile persistant. L’ancien overlay s’efface immédiatement lors du changement de sélection pour éviter deux légendes simultanées. Sans JavaScript, les appareils sans survol gardent les légendes visibles en secours. Les suggestions des pages projet gardent leurs légendes visibles sur les appareils sans survol. Aucun titre détaché sous les suggestions. Le nom accessible du lien annonce une seule fois le titre, la discipline et l’année ; les couvertures à l’intérieur sont décoratives pour éviter la répétition. Les images du récit gardent leurs alternatives descriptives.

Flèches précédent/suivant : cercle de 44 px, pictogramme courbe du site, compteur à chiffres tabulaires, noms accessibles indiquant le projet cible. Boucle circulaire entre les cinq réalisations.

### Images, vidéo et visionneuse

Images WebP responsives, dimensions explicites, chargement différé hors ouverture. Le hero d’accueil réutilise les variantes de la couverture d’identité, avec un masque CSS ; ne pas réintroduire l’ancien SVG embarquant la photo des cartes de visite.

La présentation Termino-Logic est un MP4 H.264 Full HD 1920 × 1080, à 30 images/s, de 36,8 secondes, optimisé pour le démarrage progressif. La version intégrée pèse environ 1,8 Mo. Une affiche WebP précède le chargement ; à l’approche de la section (200 px), la lecture commence automatiquement en mode muet, avec contrôles natifs. Le mode de réduction des animations conserve la lecture manuelle. Ne pas annoncer une garantie d’autoplay sur tous les appareils : le navigateur peut la refuser.

La visionneuse est un dialogue plein écran : fermeture explicite ou Échap, images précédente/suivante au clavier, compteur, message de chargement et recours à l’image originale en cas d’échec. Le focus retourne au visuel déclencheur après fermeture.

### Formulaire externe

Tally est la source du formulaire. Le parent transparent ne dessine pas de panneau blanc. Les champs comportent des labels ; leur surface est blanche translucide et leur texte bleu. Les placeholders et leur couleur sont conservés à la demande de l’utilisateur. Ne pas chercher à les modifier par CSS dans la page parente. Conserver le lien permettant d’ouvrir le formulaire séparément et ne pas inventer d’états de succès locaux non reliés à son envoi réel.

### Mouvement

Compatibilité Firefox : en l'absence de `CSSViewTransitionRule`, un repli conserve la navigation multipage normale. Le clic mémorise temporairement la miniature et son rectangle dans `sessionStorage` ; à l'arrivée, une couche d'image non interactive rejoint la couverture avec Web Animations sur 650 ms, puis disparaît. Aucun remplacement du document ni routeur client. Les clics modifiés, l'ouverture dans un autre onglet, le stockage indisponible et la réduction des animations conservent leur comportement normal. Les navigateurs compatibles gardent la transition native. Le repli a été vérifié avec la fonction native désactivée dans le navigateur de test, pas dans un Firefox réel.

La transition entre une miniature et la couverture utilise un seul participant nommé `project-cover`. Les événements natifs `pageswap` et `pagereveal` sélectionnent uniquement l'image du projet concerné ; les suggestions ne reçoivent pas de nom permanent. Le trajet dure 650 ms avec `cubic-bezier(.22,.61,.36,1)`, tandis que le fond quitte la page en 150 ms et apparaît en 250 ms, sans translation du canevas. L'enregistrement des événements se fait dans le petit script classique de tête `src/transitions.js`, avant le premier rendu, conformément à la [documentation du navigateur](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document). Préserver cette transition lors des retouches des overlays et nettoyer les noms temporaires pour le retour d'historique.

L'overlay des vignettes d'accueil entre par un fondu de 550 ms ; la légende suit après 60 ms, sur 500 ms, avec un déplacement vertical discret de 6 px. La courbe locale `cubic-bezier(.22,.61,.36,1)` rend cette arrivée plus progressive que les retours d'état rapides du site. Le même mouvement accompagne le focus clavier et la sélection au scroll mobile. L'ancien overlay mobile s'efface immédiatement pour ne jamais afficher deux projets actifs.

Courbe commune : `cubic-bezier(.16, 1, .3, 1)`. Révélations subtiles, contenu visible même sans JavaScript, transitions de légendes et changements d’image courts. Les animations sont supprimées lorsque la préférence de réduction du mouvement est active, sans masquer le contenu ni les états. Ne pas multiplier les animations pour rendre une finition plus visible.

## Do's and Don'ts

### Do:
- **Do** reprendre les couleurs officielles et les deux polices locales.
- **Do** laisser les réalisations porter la couleur et la présence visuelle.
- **Do** conserver les plantes périphériques, légères et sans chevauchement.
- **Do** regrouper les contenus proches et séparer les sections par les rôles d’espacement existants.
- **Do** garder la même navigation, les mêmes suggestions et le même footer sur les pages.
- **Do** préserver les textes et œuvres d’origine, en distinguant leurs résumés de présentation.
- **Do** vérifier les longs contenus, le clavier, les filtres, la vidéo et les petits écrans après modification.

### Don't:
- **Don't** inventer de nuance turquoise ou déclarer conformes les contrastes conservés par choix.
- **Don't** remplacer Gloock par une police système ou lui appliquer une fausse graisse bold.
- **Don't** employer les plantes orange comme textures du fond, ni agrandir les motifs jusqu’à dominer la page.
- **Don't** réintroduire l’ancien accueil, l’ancien header/footer ou le visuel des cartes de visite dans le hero.
- **Don't** ajouter des panneaux blancs, des cadres à deux coins arrondis, des vagues ou des effets de verre décoratifs.
- **Don't** comprimer les images dans des cadres qui créent des zones vides ou tronquent une œuvre informative.
- **Don't** modifier le style des placeholders Tally sans nouvelle demande.
- **Don't** ajouter de promesse commerciale ou de résultat non fourni par l’utilisateur.
