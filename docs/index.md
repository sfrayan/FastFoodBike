---
layout: default
title: FastFoodBike - Documentation
---

# 🚴‍♂️ FastFoodBike Documentation

**Plateforme moderne de livraison de nourriture à vélo**

Connectant clients, restaurants et livreurs avec suivi en temps réel, commandes en ligne et gestion optimisée des livraisons.

---

## 📚 Documentation

### 🚀 Getting Started
- **[Quick Start](../QUICKSTART.md)** - Démarrage rapide en 30 secondes
- **[Setup Guide](./SETUP.md)** - Installation détaillée et configuration
- **[README](../README.md)** - Vue d'ensemble du projet

### 🏗️ Architecture
- **[Architecture Guide](./ARCHITECTURE.md)** - Stack technologique et patterns
- **[API Documentation](./API.md)** - Référence complète des endpoints REST
- **[Database Schema](./DATABASE.md)** - Modèles MongoDB et relations

### 🚀 Deployment
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment step-by-step
- **[CI/CD Pipeline](./CICD.md)** - GitHub Actions workflow
- **[GitHub Secrets](../.github/SECRETS.md)** - Configuration des secrets

### 👥 Contribution
- **[Contributing Guide](../CONTRIBUTING.md)** - Comment contribuer
- **[Code Standards](./CODE_STANDARDS.md)** - Standards de code
- **[Testing Guide](./TESTING.md)** - Guide des tests

---

## 🛠️ Tech Stack

### Frontend
```
React 18 + Vite + Tailwind CSS
React Router • Zustand • TanStack Query
Socket.io Client • Stripe • Formik
```

### Backend
```
Node.js + Express.js
MongoDB • Redis • RabbitMQ
Stripe API • Socket.io • JWT Authentication
```

### Infrastructure
```
Docker & Docker Compose
GitHub Actions • Vercel • Heroku
MongoDB Atlas • Redis Cloud • CloudAMQP
```

---

## ⚡ Quick Commands

### Setup Local Development
```bash
# Clone
git clone https://github.com/sfrayan/FastFoodBike.git
cd FastFoodBike

# Start services
docker-compose up -d

# Backend
cd backend && npm install && npm run dev

# Frontend (Terminal 2)
cd frontend && npm install && npm run dev
```

### Access
| Service | URL | 
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Docs | http://localhost:5000/api/docs |
| MongoDB | mongodb://localhost:27017 |
| Redis | redis://localhost:6379 |
| RabbitMQ | http://localhost:15672 |

---

## 📖 Documentation by Role

### 👨‍💻 Developers
1. Lire [QUICKSTART.md](../QUICKSTART.md)
2. Suivre [SETUP.md](./SETUP.md)
3. Étudier [ARCHITECTURE.md](./ARCHITECTURE.md)
4. Consulter [API.md](./API.md) en développant

### 🏗️ DevOps / DevSecOps
1. Lire [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Configurer [GitHub Secrets](../.github/SECRETS.md)
3. Monitorer les workflows dans Actions
4. Vérifier les logs Heroku/Vercel

### 📊 Product Managers
1. Lire [README.md](../README.md) pour l'overview
2. Consulter [ARCHITECTURE.md](./ARCHITECTURE.md) pour la tech
3. Planifier features avec la structure des modèles

### 👥 Contributors
1. Lire [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Suivre [CODE_STANDARDS.md](./CODE_STANDARDS.md)
3. Exécuter les tests avant PR
4. Vérifier le linting et formatage

---

## 🎯 Main Features

### 🛵 Clients
- ✅ Search & filter restaurants
- ✅ Real-time order tracking
- ✅ Secure payment (Stripe)
- ✅ Ratings & reviews
- ✅ Push notifications

### 🍔 Restaurants
- ✅ Dashboard with analytics
- ✅ Menu & inventory management
- ✅ Real-time order management
- ✅ Statistics & reports

### 🚴‍♂️ Delivery Drivers
- ✅ Optimized route planning
- ✅ GPS tracking (live)
- ✅ Revenue management
- ✅ Customer communication

---

## 🔐 Security & Compliance

- 🔒 JWT Authentication
- 🔒 HTTPS/SSL Enforced
- 🔒 Rate Limiting
- 🔒 Input Validation
- 🔒 Secrets Management
- 🔒 CORS Protection
- 📝 Security Headers (Helmet.js)
- 📊 Error Monitoring (Sentry)

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Frontend Size** | ~45 KB (gzipped) |
| **Backend Size** | ~2 MB (with dependencies) |
| **Test Coverage** | 80%+ |
| **API Endpoints** | 30+ |
| **Database Collections** | 6 |
| **Build Time** | ~2 minutes |
| **Deploy Time** | ~3 minutes |

---

## 🆘 Support & Help

### Quick Help
- 📖 [QUICKSTART.md](../QUICKSTART.md) - Démarrage rapide
- 🐛 [GitHub Issues](https://github.com/sfrayan/FastFoodBike/issues) - Signaler un bug
- 💬 [GitHub Discussions](https://github.com/sfrayan/FastFoodBike/discussions) - Questions

### Documentation
- 📚 All guides in this folder
- 🎯 Setup, Architecture, API, Deployment
- 🧪 Testing and Code Standards

### Community
- 🤝 [Contributing Guide](../CONTRIBUTING.md)
- 👥 Discussions for questions
- 🐛 Issues for bugs

---

## 📝 License

MIT License - [See LICENSE](../LICENSE) for details

---

## 🌟 Acknowledgments

- Node.js & React communities
- Express.js, MongoDB, Redis teams
- All contributors
- Students & users

---

**Made with ❤️ for FastFoodBike**

**Last Updated**: January 2026
