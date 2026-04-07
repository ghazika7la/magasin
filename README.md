# MagasinJeux 🎮



Un magnifique magasin de jeux vidéo en ligne avec panier d'achat et authentification.



## 🌐 Déploiement



**Site en ligne** : https://hassen100.github.io/magasin-jeux/

### GitHub Pages (Angular SPA)

Pour publier correctement l'application Angular sur GitHub Pages :

```bash
npm run deploy:github
```

Ensuite :

1. Push les changements sur GitHub.
2. Ouvre Settings > Pages dans le repository.
3. Choisis Deploy from a branch.
4. Sélectionne `main` et le dossier `/docs`.

Le script `deploy:github` :

- génère le build Angular avec `base-href` et `deploy-url` sur `/magasin-jeux/`
- copie la sortie de `docs/browser` vers `docs/`
- crée `docs/404.html` (fallback des routes SPA)
- crée `docs/.nojekyll`



## 🎮 Fonctionnalités



- 🛒 **Panier d'achat** fonctionnel

- 🔐 **Authentification** complète

- 🎮 **Catalogue de jeux** interactif

- 📱 **Design responsive** mobile/desktop

- ⚡ **Performance** optimisée



## 🛠️ Technologies



- **Angular 21** avec TypeScript

- **CSS3** moderne et animations

- **LocalStorage** pour la persistance

- **GitHub Pages** pour l'hébergement



## 🚀 Installation locale



```bash

# Cloner le repository

git clone https://github.com/Hassen100/magasin-jeux.git

cd magasin-jeux



# Installer les dépendances

npm install



# Démarrer le serveur de développement

npm start

```



L'application sera disponible sur `http://localhost:4200/`



## 🔐 Identifiants de test



- **Nom d'utilisateur** : `admin`

- **Mot de passe** : `password`



## 📱 Pages



- **Accueil** : Hero section avec bannière

- **Jeux** : Catalogue avec panier

- **Authentification** : Connexion/Déconnexion

- **Contact** : Informations de contact



## 🎨 Design



- Interface moderne avec dégradés

- Animations fluides et transitions

- Responsive design complet

- Icônes et bannières intégrées



## 🤝 Contribuer



1. Fork le projet

2. Créer une branche (`git checkout -b feature/NomFeature`)

3. Commit les changements (`git commit -m 'Ajout de NomFeature'`)

4. Push sur la branche (`git push origin feature/NomFeature`)

5. Ouvrir une Pull Request



## 📄 Licence



Ce projet est sous licence MIT.



---



**Développé avec ❤️ par Hassen**

