# Validation — 2026-09-22

- `npm install` : réussi, lockfile créé ; audit initial : aucune vulnérabilité signalée.
- `npm run build` : réussi sur la version finale.
- `npm run typecheck` : réussi.
- `npm run lint` : réussi, sans avertissement.
- Navigateur intégré, build de production local : accueil visible immédiatement, image chargée, décomposition en couches et huit panneaux sur le toit vérifiés sur desktop.
- Mobile 390 × 844 : accueil, contraste du CTA, navigation contact, images chargées et absence de débordement horizontal vérifiés.
- Console consultée : aucune erreur/alerte pendant les contrôles.
- Dernière modification de trajectoire : compilation validée, accueil revérifié ; parcours animé complet à revérifier après cette finition.
- Mouvement réduit implémenté mais pas émulé ; Safari et appareils physiques non testés.
- Serveur dev : limite locale EMFILE des watchers ; contrôles réalisés avec `next build` puis `next start` sur le port 4317. Arrêter le dev avant build pour éviter des types générés concurrents.
- Contact commercial non fourni : aucun envoi réel testé. Aucun déploiement public effectué.
