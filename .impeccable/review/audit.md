# Audit Impeccable — portfolio Lucas Philippin

29 octobre 2026. Périmètre : les neuf pages générées, les styles et interactions communs, l’intégration Tally. Procédures appliquées : `audit`, vérification du mouvement selon `animate`, corrections selon `polish`. Analyse statique avec `impeccable detect` et inspection du navigateur. Il ne s’agit pas d’une certification WCAG ni d’une mesure Lighthouse.

## Intégrité de l’implémentation

Le système suit la correction explicite de l’utilisateur : Gloock/Geist locales, gamme bleue claire, galerie sans cadres blancs, coins d’images réguliers de 3 px, aucun motif de vagues. Une fougère vectorielle originale de Lucas sert de texture discrète. Les cinq réalisations et les 16 modules narratifs originaux sont conservés. Aucune promesse commerciale du site de référence n’est reprise.

Le nouveau détecteur retourne trois avertissements : un avertissement de marge sur le champ Contact et deux sur Geist. L’avertissement de marge est un faux positif : les marges internes sont assurées par le conteneur `.wrap` et le remplissage vertical. Geist est une contrainte explicite de la charte. Les sous-titres ont une taille minimale de 12 px. Le résultat brut de cette version est conservé dans `detector.json`.

## Score technique

| Dimension | Score | Observation |
|---|---:|---|
| Accessibilité | 2/4 | Navigation au clavier et focus présents ; contraste du formulaire externe insuffisant. |
| Performance | 4/4 | Site statique, WebP adaptatifs, polices WOFF2 locales, aucun moteur d’animation ni boucle continue. |
| Thème | 4/4 | Palette claire explicite, couleurs et élévations partagées ; aucun mode sombre annoncé. |
| Responsive | 3/4 | Mise en page contrôlée à 320, 390, 1440 px et à la largeur courante ; gestes tactiles physiques non testés. |
| Intégrité | 4/4 | Contenus, ressources locales, provenance et parcours conservés. |
| **Total** | **17/20** | **Bon, avec une réserve de contraste externe avant validation d’accessibilité complète.** |

## Constat restant

### P1 — Contraste du formulaire Tally partagé

- **Emplacement :** page Contact, iframe `81gBgk` ; thème géré dans Tally.
- **Impact :** « Envoyer » blanc sur turquoise `#4BA2C5` présente un contraste calculé de **2,89:1**, inférieur à 4,5:1 pour ce petit texte (WCAG 1.4.3). Les textes indicatifs des champs paraissent également très pâles ; ils nécessitent une mesure dans le thème Tally.
- **Recommandation :** utiliser le bleu `#01497C` pour le bouton (blanc/bleu : **9,35:1**) et assombrir les textes indicatifs. Cette modification toucherait aussi l’autre site qui utilise ce formulaire : elle n’a pas été appliquée implicitement.
- **Commande adaptée :** `impeccable colorize`, puis `impeccable audit` sur le formulaire.

### P2 — Descriptions alternatives peu détaillées

- **Emplacement :** images des pages projet, descriptions issues de l’extraction.
- **Impact :** le nom du projet et « visuel » ne décrivent pas précisément chaque composition pour une personne qui ne la voit pas.
- **Recommandation :** enrichir les descriptions image par image à partir des œuvres originales, sans inventer d’interprétation. Le contenu adjacent fournit déjà le contexte du projet.
- **Commande adaptée :** `impeccable clarify`, puis `impeccable polish`.

## Mouvement et finitions contrôlés

- Apparition courte des titres et de trois plans de la mosaïque, avec un décalage limité.
- Apparitions au défilement ; contenu visible même si JavaScript ou IntersectionObserver manque.
- Survol : agrandissement de 2,5 % de l’image, soulignement du titre et action textuelle « Voir le projet » ; aucune élévation artificielle de carte.
- Transitions natives entre pages ; repli sur la navigation normale lorsque non prises en charge.
- Visionneuse : images contenues dans l’espace disponible, boutons nommés, fermeture avec Échap, retour du focus et changements avec les flèches.
- `prefers-reduced-motion` neutralise animations, transitions et déplacements. La préférence système n’a pas été basculée pendant le test ; ce contrôle est fondé sur le code.
- Petits écrans : navigation et panneau Contact adaptés à 320 px, sans débordement horizontal au repos.

## Preuves et limites

`npm run check` valide neuf pages et 233 références locales. `scripts/audit-content.py` confirme les 16 modules de texte et les quantités d’images des cinq projets. Le contrôle de provenance couvre 110 rasters, sans manque. Le motif végétal est le SVG original `Plante 5.svg`, copié sans modifier son dessin et accompagné d’une notice de source.

Aucun envoi de formulaire, résolution de CAPTCHA, test de réception d’e-mail, déploiement, test sur appareil tactile physique ou mesure chiffrée de Web Vitals n’a été effectué. La redirection Tally existante reste `https://philippin.fr/` ; le domaine de production du portfolio reste à configurer.
