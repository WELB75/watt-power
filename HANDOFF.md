# Watt Power — passation Codex / Claude

## Objectif
Site solaire haut de gamme au Maroc : villa photoréaliste, panneau au premier plan qui se décompose, se réassemble puis se duplique sur le toit. Éviter les maisons 3D simplistes.

## État au 22 septembre 2026
Branche : `fix/photoreal-solar-story`. Checkout : `/Users/kamel/Documents/Codex/watt-power`.
Villa générée embarquée dans `public/assets/images/villa-aerial-v2.webp` (provenance et prompt dans THIRD_PARTY_ASSETS.md). Hero CSS/SVG + GSAP ; anciens composants Three.js conservés.
Titre visible immédiatement, panneaux dans le même repère que la photo, corrections mobile et contraste. Contact fictif supprimé ; `CONTACT_EMAIL` active les liens mailto à l’exécution, sans inventer de coordonnées.
Build, typecheck, lint passent. Vérifications visuelles desktop et mobile effectuées ; voir VALIDATION.md pour limites.
Aucune mise en production de ces changements. L’URL Railway présente encore l’ancienne version.

## Reprendre sans relire toute la conversation
1. Lire ce fichier, puis `git status` et le dernier commit.
2. Travailler sur un objectif précis ; ne lire que les fichiers nécessaires.
3. Pour voir le résultat : `npm ci`, `npm run build`, `npm start -- --port 4317`.
4. Avant livraison : `npm run typecheck`, `npm run lint`, vérification navigateur ciblée.
5. Mettre ce fichier à jour avec changements, tests, blocages et prochaine action ; créer un commit.

## Reste à faire
- Recevoir l’adresse commerciale réelle ; configurer CONTACT_EMAIL.
- Faire valider le rendu par l’utilisateur puis publier via le processus choisi.
- Vérifier préférence de mouvement réduit et animation mobile complète ; Safari réel non testé.
- La scène est une illustration architecturale, pas une réalisation client. Les données énergétiques restent des démonstrations.

## Alternance et travail simultané
Claude Code et Codex peuvent reprendre ce même checkout à tour de rôle. Ne pas éditer simultanément les mêmes fichiers dans ce dossier. Pour un travail simultané, utiliser deux worktrees/branches distincts puis intégrer les commits. Ne transmettre aucun .env ni secret.

## Économie
Réponses courtes, pas de sous-agents, recherches ciblées, pas de relecture intégrale du dépôt. Réutiliser les validations tant que le code concerné ne change pas.
