# louis.bettelli — mon site perso

Un site en deux parties :

- **Page d'accueil (`/`)** : un CV / portfolio public, dans le style
  [vivek-azure.vercel.app](https://vivek-azure.vercel.app/), pour les gens qui
  ne te connaissent pas.
- **Espace perso (`/dashboard`)** : ton centre de pilotage — suivi du poids,
  sorties vélo & course, recettes, todo, choses à apprendre (avec vidéos).

## Lancer le site

```bash
npm install   # seulement la première fois, ou après avoir changé package.json
npm run dev
```

Puis ouvre http://localhost:3000

## Personnaliser le CV

Tout le contenu de la page d'accueil vient d'un seul fichier :

```
src/domains/profil.ts
```

Je n'ai pas pu récupérer automatiquement les infos de ton LinkedIn (le profil
est protégé derrière une connexion). Remplace les champs marqués `TODO` par
tes vraies infos (titre, bio, expériences, compétences, formation).

## Où sont stockées tes données perso ?

Dans le dossier `data/` à la racine du projet, un fichier JSON par rubrique :

```
data/poids.json
data/velo.json
data/course.json
data/recettes.json
data/todo.json
data/apprentissage.json
```

Quand tu ajoutes une pesée, une sortie vélo, une recette, etc. depuis le
site, ça écrit directement dans ces fichiers — pas de base de données à
installer. Tu peux aussi les éditer à la main si tu préfères.

Le portfolio public et son chatbot peuvent être déployés sur Vercel. En
revanche, les modifications faites dans l'espace personnel ne sont pas
persistantes sur un hébergeur serverless, car les données du dashboard sont
encore stockées dans des fichiers JSON locaux.

## Déployer le portfolio sur Vercel

1. Importe ce dossier ou son dépôt Git dans Vercel.
2. Dans **Settings → Environment Variables**, ajoute `GROQ_API_KEY` avec la
   clé gratuite créée dans la console Groq.
3. Ajoute aussi `DASHBOARD_CODE` si tu souhaites conserver l'accès à l'espace
   personnel sur le déploiement.
4. Lance le déploiement. Vercel détectera automatiquement Next.js.

Le chatbot utilise `openai/gpt-oss-20b` sur le niveau gratuit de Groq en
production. Sans clé Groq, il utilise Ollama localement avec
`llama3.1:8b`. Les variables disponibles sont documentées dans
`.env.example`.

## Structure du projet (architecture par domaine)

```
src/
  domains/        → logique métier + accès aux données, un fichier par thème
                    (poids.ts, velo.ts, course.ts, recettes.ts, todo.ts,
                    apprentissage.ts, profil.ts)
  lib/             → utilitaires partagés (lecture/écriture JSON, formats)
  components/      → composants d'interface réutilisables (cartes, graphique...)
  app/
    page.tsx              → page d'accueil (CV public)
    dashboard/             → tout l'espace perso
      layout.tsx           → barre de navigation latérale
      page.tsx              → vue d'ensemble
      poids/, velo/, course/, recettes/, todo/, apprentissage/
        page.tsx            → l'interface de la rubrique
        actions.ts          → les actions serveur (ajouter/supprimer/cocher)
data/              → tes données, en JSON
```

Chaque rubrique suit le même principe : `domains/<rubrique>.ts` définit le
type de donnée et les fonctions pour lire/écrire, et
`app/dashboard/<rubrique>/actions.ts` les branche aux formulaires de la page.
Pour ajouter une nouvelle rubrique, tu peux copier ce schéma.

## Idées pour la suite

- Ajouter une page de statistiques croisées (poids + sport dans le temps).
- Protéger `/dashboard` par un mot de passe si tu comptes l'exposer en ligne.
- Ajouter des photos aux recettes.
- Exporter/sauvegarder le dossier `data/` régulièrement (ce sont juste des
  fichiers JSON, faciles à versionner avec git ou à copier ailleurs).

## Accès protégé à l'espace perso

`/dashboard` est verrouillé par un code. Il est défini dans `.env.local`
(fichier non versionné) :

```

Pour changer le code, modifie cette valeur puis relance `npm run dev`.
Le bouton « Verrouiller l'accès » en bas de la sidebar déconnecte l'espace
perso (il faudra retaper le code pour y revenir).
