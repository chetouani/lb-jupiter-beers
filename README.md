# 🍺 Jupiter Beers

Application officielle Jupiter pour [lb-phone](https://lbphone.com/) (FiveM). Parcourez le catalogue de bières, votez pour vos favorites et explorez les saveurs.

## Fonctionnalités

- Catalogue de bières avec carousel swipeable (touch & souris)
- Vote par cœur sur chaque bière
- Page classement des votes (bientôt disponible)
- Page revendeurs (bientôt disponible)
- Écran de chargement animé
- Support des thèmes lb-phone

## Installation

1. Placez le dossier dans votre répertoire `resources`
2. Ajoutez `ensure lb-jupiter-beers` dans votre `server.cfg`
3. Nécessite [lb-phone](https://lbphone.com/)

## Structure

```
├── fxmanifest.lua      # Manifest FiveM
├── client.lua          # Enregistrement de l'app lb-phone
└── ui/
    ├── index.html      # Point d'entrée UI
    ├── script.js       # Logique carousel, votes, navigation
    ├── styles.css      # Styles principaux
    ├── colors.css      # Variables de couleurs / thème
    ├── frame.css       # Styles frame lb-phone
    ├── dev.js          # Helper de développement
    └── assets/         # Images (bouteilles, icônes, background)
```

## Développement

Ouvrez `ui/index.html` dans un navigateur pour tester l'interface sans FiveM.

## Licence

Jupiter Co.
