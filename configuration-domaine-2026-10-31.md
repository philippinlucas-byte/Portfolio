# Configuration de philippin.fr — 31 octobre 2026

Configuration autorisée par le propriétaire dans le chat.

## Modifications effectuées

- Serveurs DNS déclarés chez Hostinger : `faye.ns.cloudflare.com`, `kyle.ns.cloudflare.com`.
- Ancien couple, pour retour arrière : `ns1.dns-parking.com`, `ns2.dns-parking.com`.
- Domaine toujours enregistré chez Hostinger, date d'expiration inchangée : 21 juin 2027.
- Cloudflare : `portfolio.philippin.fr` rattaché au Worker existant `portfolio`, environnement `production`, HTTPS automatique ; prévisualisations désactivées sur ce nouveau nom.
- `philippin.fr` : CNAME aplati, DNS uniquement, vers `philippin.fr.cdn.hstgr.net`.
- `www.philippin.fr` : CNAME, DNS uniquement, vers `www.philippin.fr.cdn.hstgr.net`.
- Suppression des huit anciennes adresses A/AAAA de la copie Cloudflare, remplacées par la destination actuelle Hostinger ci-dessus. Aucun contenu de site supprimé.
- CNAME de messagerie en DNS uniquement : `autoconfig`, `autodiscover`, `hostingermail-a._domainkey`, `hostingermail-b._domainkey`, `hostingermail-c._domainkey` ; destinations Hostinger conservées.
- MX conservés : priorité 5 `mx1.hostinger.com`, priorité 10 `mx2.hostinger.com`.
- SPF conservé : `v=spf1 include:_spf.mail.hostinger.com ~all`.
- DMARC conservé : `v=DMARC1; p=none`.

## Vérifications

- Serveurs DNS relus chez Hostinger après changement : conformes.
- Destination du WordPress et MX vérifiés directement sur le serveur DNS Cloudflare.
- Mode maintenance WordPress relu : activé.
- Page publique WordPress : titre `Prochainement`, mention de construction.
- Site Cloudflare original : HTTPS 200 sur `portfolio.philippin-lucas.workers.dev`.
- Au premier contrôle après changement, activation Cloudflare et propagation publique encore en attente ; le nouveau sous-domaine ne répondait pas encore publiquement.
- Aucun déploiement ni modification de fichiers ou base de données des sites.

## Retour arrière

La zone Hostinger n'a pas été modifiée. Pour rétablir l'ancienne gestion DNS, remettre chez Hostinger les serveurs `ns1.dns-parking.com` et `ns2.dns-parking.com` (la propagation nécessite un délai).

Snapshot DNS Hostinger le plus récent avant opération : `176491088`, 29 août 2026 à 01:38:37 UTC.
Copie complète de l'ancienne zone Cloudflare : `dns-backup-cloudflare-2026-10-31.json`.
