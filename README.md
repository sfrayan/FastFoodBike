# 🚴‍♂️ FastFoodBike - Application de Livraison à Vélo

[![GitHub license](https://img.shields.io/github/license/sfrayan/FastFoodBike)](https://github.com/sfrayan/FastFoodBike/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/sfrayan/FastFoodBike)](https://github.com/sfrayan/FastFoodBike/stargazers)
[![Build Status](https://github.com/sfrayan/FastFoodBike/workflows/CI%2FCD/badge.svg)](https://github.com/sfrayan/FastFoodBike/actions)
[![Docs](https://img.shields.io/badge/docs-online-brightgreen)](https://sfrayan.github.io/FastFoodBike/)

**FastFoodBike** est une plateforme moderne de livraison de nourriture à vélo connectant clients, restaurants et livreurs avec suivi en temps réel, commandes en ligne et gestion optimisée des livraisons.

## 📋 Table des Matières

- [Caractéristiques](#caractéristiques)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Déploiement](#déploiement)
- [Documentation](#documentation)
- [Contribuer](#contribuer)
- [Licence](#licence)

## ✨ Caractéristiques

### 👥 Clients
- 📱 Interface mobile intuitive (React/Flutter)
- 🔍 Recherche et filtrage de restaurants
- 🛒 Panier persistant et checkout facile
- 📍 Suivi en temps réel des livraisons
- 💳 Paiement sécurisé (intégration Stripe)
- ⭐ Système de notes et avis

### 🍔 Restaurants
- 📊 Tableau de bord de gestion
- 📝 Gestion du menu et inventaire
- 📦 Gestion des commandes
- 📈 Analytics et statistiques
- 🔔 Notifications en temps réel

### 🚴‍♂️ Livreurs
- 📍 Itinéraires optimisés
- 💰 Gestion des revenus
- 📊 Historique des livraisons
- 🗺️ Intégration GPS
- 💬 Communication directe avec les clients

## 🏗️ Architecture

```
FastFoodBike/
├── frontend/                 # Application React/Web
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/            # Pages principales
│   │   ├── services/         # API clients
│   │   └── utils/            # Fonctions utilitaires
│   └── public/
├── backend/                  # API Node.js/Express
│   ├── src/
│   │   ├── routes/           # Endpoints API
│   │   ├── controllers/       # Logique métier
│   │   ├── models/           # Modèles de données
│   │   ├── middleware/        # Authentification, etc.
│   │   └── config/            # Configuration
│   └── tests/
├── mobile/                   # Application Flutter/React Native
│   ├── lib/                  # Code source
│   └── test/
├── docs/                     # Documentation
│   ├── API.md                # Documentation API
│   ├── SETUP.md              # Guide d'installation
│   └── CONTRIBUTING.md       # Guide de contribution
└── .github/
    ├── workflows/            # Actions CI/CD
    └── ISSUE_TEMPLATE/       # Templates d'issues
```

## 🚀 Installation

### Prérequis
- Node.js 16+ et npm/yarn
- Python 3.8+ (si applicable)
- Docker (optionnel)
- Git

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurer vos variables d'environnement
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### Mobile (Flutter/React Native)

```bash
cd mobile
flutter pub get
flutter run
# ou pour React Native:
npm install
npm start
```

## ⚙️ Configuration

### Variables d'environnement (.env)

```env
# Backend
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/fastfoodbike
JWT_SECRET=your_jwt_secret_key
STRIPE_KEY=your_stripe_key

# Frontend
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAPS_KEY=your_maps_api_key
```

### Base de données

```bash
# MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# ou PostgreSQL
docker run -d -p 5432:5432 --name postgres postgres:latest
```

## 📦 Déploiement

### GitHub Pages (Documentation)

La documentation est automatiquement déployée sur [GitHub Pages](https://sfrayan.github.io/FastFoodBike/) via GitHub Actions.

```bash
# Documents source dans /docs
# Build automatique avec chaque push sur master
```

### Déploiement Backend

```bash
# Heroku
heroku create fastfoodbike-api
git push heroku master

# Railway/Render
# Connecter le repo GitHub et configurer les variables d'env
```

### Déploiement Frontend

```bash
# Vercel
npm i -g vercel
vercel

# Netlify
npm run build
# Connecter le build folder à Netlify
```

### Docker

```bash
# Build image
docker build -t fastfoodbike:latest .

# Run container
docker run -p 5000:5000 fastfoodbike:latest
```

## 📖 Documentation

### Guides disponibles
- [📖 Guide de démarrage](./docs/SETUP.md)
- [🔌 Documentation API](./docs/API.md)
- [🤝 Guide de contribution](./CONTRIBUTING.md)
- [🔐 Architecture de sécurité](./docs/SECURITY.md)
- [📋 Schéma de base de données](./docs/DATABASE.md)

### Documentation API

L'API est documentée avec Swagger/OpenAPI. Accédez à :
```
http://localhost:5000/api/docs
```

## 🧪 Tests

```bash
# Frontend
cd frontend
npm test
npm run test:coverage

# Backend
cd backend
npm test
npm run test:coverage
```

## 🔄 CI/CD Pipeline

Les workflows GitHub Actions automatisent :

- ✅ Tests unitaires et intégration
- 🔍 Linting et formatage
- 📦 Build des artefacts
- 📚 Déploiement de la documentation
- 🚀 Déploiement automatique (production)

Voir [`.github/workflows/`](.github/workflows/) pour les détails.

## 🤝 Contribuer

Les contributions sont bienvenues ! Veuillez :

1. Forker le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commiter vos changements (`git commit -m 'Add amazing feature'`)
4. Pousser vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les détails complets.

## 📝 Licence

Ce projet est sous licence [MIT](LICENSE) - voir le fichier [LICENSE](LICENSE) pour les détails.

## 📞 Contact

- 👤 Auteur: [@sfrayan](https://github.com/sfrayan)
- 📧 Email: [votre-email@example.com]
- 💬 Discussions: [GitHub Discussions](https://github.com/sfrayan/FastFoodBike/discussions)

## 🙏 Remerciements

- Communautés Node.js, React et Flutter
- Contributeurs et mainteneurs
- Utilisateurs du projet

---

**⭐ Si vous trouvez ce projet utile, n'hésitez pas à laisser une star !**
