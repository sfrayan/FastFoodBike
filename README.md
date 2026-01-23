# 🚴‍♂️ FastFoodBike - Application de Livraison à Vélo

[![GitHub license](https://img.shields.io/github/license/sfrayan/FastFoodBike)](https://github.com/sfrayan/FastFoodBike/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/sfrayan/FastFoodBike)](https://github.com/sfrayan/FastFoodBike/stargazers)
[![Build Status](https://github.com/sfrayan/FastFoodBike/workflows/CI%2FCD/badge.svg)](https://github.com/sfrayan/FastFoodBike/actions)
[![Docs](https://img.shields.io/badge/docs-online-brightgreen)](https://sfrayan.github.io/FastFoodBike/)

**FastFoodBike** est une plateforme moderne de livraison de nourriture à vélo connectant clients, restaurants et livreurs avec suivi en temps réel, commandes en ligne et gestion optimisée des livraisons.

## 📱 Stack technologique

### Frontend
- **React 18** + **Vite** - Fast development & modern tooling
- **Tailwind CSS** - Utility-first styling
- **React Router v6** - Client-side navigation
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management
- **Socket.io Client** - Real-time updates
- **Formik + Yup** - Form validation
- **Axios** - HTTP client with interceptors

### Backend
- **Node.js 16+** + **Express.js** - Fast, minimal API framework
- **MongoDB** + **Mongoose** - NoSQL database with schema
- **Redis** - Caching & session management
- **RabbitMQ** - Async job queue
- **JWT** - Secure authentication
- **Stripe API** - Payment processing
- **Socket.io** - Real-time communication
- **Winston** - Structured logging

### Infrastructure
- **Docker & Docker Compose** - Containerization & local dev
- **GitHub Actions** - CI/CD automation
- **Vercel** - Frontend hosting
- **Heroku** - Backend hosting
- **MongoDB Atlas** - Cloud database
- **Redis Cloud** - Managed cache
- **CloudAMQP** - Managed message queue

## 📋 Table des Matières

- [Caractéristiques](#caractéristiques)
- [Installation](#installation)
- [Configuration](#configuration)
- [Développement](#développement)
- [Tests](#tests)
- [Prévisualisation](#prévisualisation)
- [Déploiement](#déploiement)
- [Documentation](#documentation)
- [Contribuer](#contribuer)
- [Licence](#licence)

## ✨ Caractéristiques

### 👥 Clients
- 📱 Interface web réactive avec React 18
- 🔍 Recherche et filtrage de restaurants en temps réel
- 🛒 Panier persistant avec localStorage
- 📍 Suivi en temps réel des livraisons (Socket.io)
- 💳 Paiement sécurisé via Stripe
- ⭐ Système de notes et avis
- 📨 Notifications push

### 🍔 Restaurants
- 📊 Tableau de bord avec analytics
- 📝 Gestion du menu et inventaire
- 📦 Gestion des commandes en temps réel
- 📈 Statistiques et rapports
- 🔔 Notifications de nouvelles commandes

### 🚴‍♂️ Livreurs
- 📍 Itinéraires optimisés avec Google Maps
- 💰 Gestion des revenus et transactions
- 📊 Historique des livraisons
- 🗺️ GPS en direct avec Socket.io
- 💬 Communication avec clients

## 🚀 Installation

### Prérequis

- **Node.js 16+** ([Download](https://nodejs.org/))
- **npm ou yarn** (included with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Docker & Docker Compose** (optionnel, pour les services)

### 1. Cloner le repository

```bash
git clone https://github.com/sfrayan/FastFoodBike.git
cd FastFoodBike
```

### 2. Démarrer les services (MongoDB, Redis, RabbitMQ)

```bash
# Avec Docker Compose (recommandé)
docker-compose up -d

# Vérifier que les services sont actifs
docker-compose ps
```

Ou localement si vous avez MongoDB, Redis et RabbitMQ d'ejà installés.

### 3. Configurer le Backend

```bash
cd backend

# Copier le template d'environnement
cp .env.example .env

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Le serveur fonctionnera sur http://localhost:5000
```

### 4. Configurer le Frontend

Dans un **autre terminal** :

```bash
cd frontend

# Copier le template d'environnement
cp .env.example .env.local

# Installer les dépendances
npm install

# Démarrer le serveur de développement Vite
npm run dev

# Vite s'ouvrira automatiquement sur http://localhost:3000
```

## ⚙️ Configuration

### Backend (.env)

Lessentiel :

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/fastfoodbike
JWT_SECRET=your_secret_key_here_minimum_32_characters
STRIPE_SECRET_KEY=sk_test_...
```

Voir `backend/.env.example` pour la liste complète.

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_GOOGLE_MAPS_API_KEY=...
```

Voir `frontend/.env.example` pour la liste complète.

## 🔺 Développement

### Architecture du Backend

```
backend/src/
├── config/          # Configuration (DB, Redis, etc.)
├── models/          # Schemas MongoDB
├── routes/          # Endpoints API
├── controllers/     # Logique de requêtes
├── services/        # Business logic
├── middleware/      # Auth, validation, etc.
├── utils/           # Helpers & constants
├── queue/           # RabbitMQ consumers/producers
├── sockets/         # Socket.io handlers
└── index.js         # Entry point
```

### Architecture du Frontend

```
frontend/src/
├── pages/           # Pages/Routes
├── components/      # React components
├── hooks/           # Custom hooks
├── services/        # API calls (Axios)
├── store/           # State (Zustand)
├── utils/           # Helpers
├── styles/          # CSS/Tailwind
└── App.jsx          # Root component
```

### Commands Utiles

**Backend :**
```bash
cd backend

# Développement
npm run dev

# Tests
npm test
npm run test:coverage

# Linting
npm run lint
npm run lint:fix

# Formatage
npm run format

# Seeding de données
npm run db:seed
```

**Frontend :**
```bash
cd frontend

# Développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview

# Tests
npm test
npm run test:watch
npm run test:coverage

# Linting
npm run lint
npm run lint:fix

# Formatage
npm run format
```

## 🧪 Tests

### Backend (Mocha + Chai + Sinon)

```bash
cd backend

# Lancer tous les tests
npm test

# Mode watch
npm run test:watch

# Avec couverture
npm run test:coverage
```

### Frontend (Vitest + React Testing Library)

```bash
cd frontend

# Lancer tous les tests
npm test

# Mode watch
npm run test:watch

# Avec couverture
npm run test:coverage
```

## 📽 Prévisualisation

### Local Preview

```bash
cd frontend
npm run build
npm run preview
# Visit http://localhost:5173
```

## 📦 Déploiement

### Déployer le Backend (Heroku)

```bash
# Login Heroku
heroku login

# Créer une app
heroku create fastfoodbike-api

# Configurer les variables d'env
heroku config:set NODE_ENV=production JWT_SECRET=... STRIPE_SECRET_KEY=... -a fastfoodbike-api

# Pousser le code
git push heroku master

# Voir les logs
heroku logs --tail -a fastfoodbike-api
```

### Déployer le Frontend (Vercel)

```bash
# Installer Vercel CLI
npm i -g vercel

# Deployer
cd frontend
vercel

# En production
vercel --prod
```

Ou connectez le repo directement dans le [Dashboard Vercel](https://vercel.com).

### Variables d'environnement en Production

**Backend (Heroku)** : Vérifiez que toutes les clés sont configurées

```bash
heroku config -a fastfoodbike-api
```

**Frontend (Vercel)** : Settings > Environment Variables

## 📖 Documentation

### Guides
- [💫 Guide de démarrage](./docs/SETUP.md) - Installation détaillée
- [🔌 Documentation API](./docs/API.md) - Endpoints REST complets
- [🏗️ Architecture](./docs/ARCHITECTURE.md) - Tech stack & patterns
- [🚀 Déploiement](./docs/DEPLOYMENT.md) - Production guide
- [🤝 Contribution](./CONTRIBUTING.md) - Comment contribuer

### Documentation Interactive

L'API est documentée avec Swagger :
```
http://localhost:5000/api/docs
```

## 🤝 Contribuer

Les contributions sont bienvenues ! 🎉

1. Fork le projet
2. Créez une branche (`git checkout -b feature/amazing-feature`)
3. Faites vos changements
4. Committez (`git commit -m 'Add amazing feature'`)
5. Poussez (`git push origin feature/amazing-feature`)
6. Ouvrez une Pull Request

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour plus de détails.

## 🔄 CI/CD Pipeline

Chaque push sur `master` ou PR déclenche :

- ✅ Tests backend & frontend
- 🔍 Linting & formatage
- 📦 Build Docker
- 📚 Déploiement docs (GitHub Pages)
- 🚀 Déploiement auto en prod (avec tags `v*`)

Voir [.github/workflows/](./.github/workflows/) pour les détails.

## 📞 Support

- 💬 [GitHub Discussions](https://github.com/sfrayan/FastFoodBike/discussions)
- 📧 Issues: [GitHub Issues](https://github.com/sfrayan/FastFoodBike/issues)
- 📚 Wiki: [GitHub Wiki](https://github.com/sfrayan/FastFoodBike/wiki)

## 📝 Licence

Ce projet est sous licence [MIT](LICENSE) - voir le fichier [LICENSE](LICENSE) pour les détails.

## 🙏 Remerciements

- Communauté Node.js & React
- Express.js, MongoDB & Redis teams
- Contributeurs du projet
- Élèves et utilisateurs

---

**⭐ Si vous aimez ce projet, n'hésitez pas à laisser une star !**

Créé avec ❤️ par [@sfrayan](https://github.com/sfrayan)
