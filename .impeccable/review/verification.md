# Vérifications du 29 octobre 2026

- État initial : dépôt propre, dernier commit `6adef42` — `Initial push`.
- `PRODUCT.md` lu intégralement ; choix conservés : cinq projets, textes et médias sources, charte, Gloock/Geist, code direct et Cloudflare Pages.
- `npm run build` : neuf pages générées.
- `npm run check` : 233 références locales valides, structure et médias présents, polices locales, garde-fous de mouvement et provenance WebP.
- `scripts/audit-content.py` : les 16 modules de texte originaux et les nombres d’images concordent pour les cinq réalisations.
- Provenance : 110 images contrôlées, aucune provenance manquante.
- Navigateur : accueil aux largeurs 390, 1440 et 1622 px, page Termino-Logic et contact aux formats mobile et ordinateur ; aucun débordement horizontal détecté.
- Visionneuse : ouverture, changement avec boutons et flèches clavier, fermeture avec Échap et retour du focus. Correction du cadrage des grandes images ; commandes et légende restent visibles.
- Formulaire Tally : affichage observé avec ses quatre champs et CAPTCHA ; aucun envoi effectué. Les couleurs internes et la redirection vers `https://philippin.fr/` sont les réglages existants du formulaire.
- Console : aucune erreur relevée lors du parcours final.
- `prefers-reduced-motion` : règles CSS et garde-fous JavaScript contrôlés ; préférence système non basculée dans le navigateur de contrôle.
- Transitions entre pages : amélioration native progressive ; la navigation ordinaire reste disponible sur les navigateurs sans cette fonction.

## Reprise après correction de la direction

- Dernier commit observé : `4ef32ec` — `2nd push`. Modifications de travail conservées ; aucun commit ni envoi distant effectué.
- Suppression des panneaux blancs, des coins diagonaux et des vagues. Images sans cadre, hiérarchie Gloock/Geist, fougère originale en texture légère.
- Nouvelle compilation et contrôles réussis : neuf pages, 233 références locales et 16 modules narratifs conservés.
- Captures actuelles vérifiées : accueil ordinateur et largeur habituelle de 1864 px ; accueil mobile en deux vues (`mobile.png` et `mobile-footer.png`) ; projet, contact et visionneuse sur ordinateur et mobile. La capture longue du navigateur était limitée à 2250 px : les deux vues mobiles évitent de masquer le pied de page.
- Les anciennes captures `narrow-*` et `mobile-top.png` ne constituent pas les preuves de cette dernière version.

Aucun domaine de production ni déploiement n’a été confirmé pendant cette tâche. Voir `audit.md` pour les limites restantes, notamment le contraste du formulaire Tally externe.
