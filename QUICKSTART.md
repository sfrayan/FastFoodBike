# ⚡ Quick Start Guide - FastFoodBike

Le moyen le plus rapide de démarrer le développement.

## 🚀 30 secondes pour la première démo

```bash
# 1. Clone
git clone https://github.com/sfrayan/FastFoodBike.git
cd FastFoodBike

# 2. Services (Docker)
docker-compose up -d

# 3. Backend (Terminal 1)
cd backend && npm install && npm run dev

# 4. Frontend (Terminal 2)
cd frontend && npm install && npm run dev
```

Voilà ! 🎉
- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:5000
- **API Docs** : http://localhost:5000/api/docs

## 📋 Checklist de démarrage

### Prérequis
- [ ] Node.js 16+ (`node --version`)
- [ ] Docker & Docker Compose (`docker --version`)
- [ ] Git (`git --version`)

### Installation

```bash
# Cloner
git clone https://github.com/sfrayan/FastFoodBike.git
cd FastFoodBike

# Démarrer les services
docker-compose up -d

# Vérifier les services
docker-compose ps
# Vous devriez voir : mongodb, redis, rabbitmq, mailhog tous "Up"
```

### Backend

```bash
cd backend

# Copier .env
cp .env.example .env

# Installer
npm install

# Lancer
npm run dev

# Test
curl http://localhost:5000/api/health
# Réponse attendue : {"status":"ok"}
```

### Frontend

```bash
cd frontend

# Copier .env
cp .env.example .env.local

# Installer
npm install

# Lancer (s'ouvre auto sur http://localhost:3000)
npm run dev
```

## 🔧 Commandes essentielles

### Backend

```bash
cd backend

# Développement
npm run dev

# Tests
npm test

# Linting
npm run lint
npm run lint:fix

# Format code
npm run format
```

### Frontend

```bash
cd frontend

# Développement
npm run dev

# Build
npm run build
npm run preview

# Tests
npm test

# Linting
npm run lint
npm run lint:fix

# Format code
npm run format
```

## 🐳 Docker

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down

# Reset (données perdues !)
docker-compose down -v
```

## 🌍 Accès aux services

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | N/A |
| Backend API | http://localhost:5000 | N/A |
| MongoDB | mongodb://localhost:27017 | admin / password |
| Redis | redis://localhost:6379 | N/A |
| RabbitMQ | http://localhost:15672 | guest / guest |
| Mailhog | http://localhost:8025 | N/A |
| API Docs | http://localhost:5000/api/docs | N/A |

## 📝 Fichiers importants

```
FastFoodBike/
├── backend/
│   ├── src/
│   │   ├── index.js              ← Entry point
│   │   ├── models/               ← Schemas MongoDB
│   │   ├── routes/               ← Endpoints API
│   │   └── controllers/           ← Business logic
│   ├── .env.example              ← Template d'env
│   └── package.json              ← Dépendances
├── frontend/
│   ├── src/
│   │   ├── main.jsx              ← Entry point
│   │   ├── pages/                ← Routes/Pages
│   │   ├── components/            ← Composants React
│   │   └── services/              ← API calls
│   ├── .env.example              ← Template d'env
│   ├── package.json              ← Dépendances
│   └── vite.config.js            ← Config Vite
├── docs/
│   ├── SETUP.md                  ← Setup détaillé
│   ├── API.md                    ← API reference
│   ├── ARCHITECTURE.md            ← Tech stack
│   └── DEPLOYMENT.md              ← Production
├── docker-compose.yml            ← Services locaux
├── README.md                     ← Ce fichier
└── CONTRIBUTING.md               ← Guidelines
```

## 🚨 Troubleshooting

### Port déjà utilisé

```bash
# Port 3000 (frontend)
lsof -i :3000
# Tuer le processus
kill -9 <PID>

# Port 5000 (backend)
lsof -i :5000
kill -9 <PID>
```

### MongoDB ne démarre pas

```bash
# Arrêter tout
docker-compose down -v

# Redémarrer
docker-compose up -d

# Vérifier
docker-compose logs mongodb
```

### "npm ERR! not ok"

```bash
# Nettoyer
rm -rf node_modules package-lock.json
npm cache clean --force

# Réinstaller
npm install
```

### API ne répond pas

```bash
# Vérifier que le backend tourne
curl http://localhost:5000/api/health

# Voir les logs
cd backend && npm run dev

# Vérifier MongoDB
docker-compose logs mongodb
```

## 📚 Prochaines étapes

1. **Lire la doc**
   - [Setup détaillé](./docs/SETUP.md)
   - [Architecture](./docs/ARCHITECTURE.md)
   - [API reference](./docs/API.md)

2. **Créer un endpoint**
   - Créer un model dans `backend/src/models/`
   - Créer un controller dans `backend/src/controllers/`
   - Créer une route dans `backend/src/routes/`
   - Tester avec Postman/cURL

3. **Créer une page**
   - Créer un composant dans `frontend/src/components/`
   - Créer une page dans `frontend/src/pages/`
   - Ajouter la route dans `App.jsx`
   - Appeler l'API via `frontend/src/services/`

4. **Contribuer**
   - Voir [CONTRIBUTING.md](./CONTRIBUTING.md)
   - Git flow : feature branches
   - Conventional commits
   - Tests & linting avant PR

## 💡 Tips

### VS Code Extensions
```
- ES7+ React/Redux/React-Native snippets
- MongoDB for VS Code
- Thunder Client (Postman alternative)
- REST Client
- ESLint
- Prettier
```

### Utiles
```bash
# Voir les logs en temps réel
cd backend && npm run dev      # Backend logs
docker-compose logs -f mongodb # MongoDB logs

# Tester l'API
curl http://localhost:5000/api/health
curl http://localhost:5000/api/restaurants

# Seed données
cd backend && npm run db:seed

# Réinitialiser la BD
docker-compose down -v && docker-compose up -d
```

## 🤝 Besoin d'aide ?

- 📖 [GitHub Discussions](https://github.com/sfrayan/FastFoodBike/discussions)
- 🐛 [Report bugs](https://github.com/sfrayan/FastFoodBike/issues)
- 💬 [Slack/Discord](link-to-community)

## ✅ Checklist de départ

- [ ] Clone du repo
- [ ] Docker services running (`docker-compose up -d`)
- [ ] Backend installé et running (`npm run dev`)
- [ ] Frontend installé et running (`npm run dev`)
- [ ] Frontend accessible sur http://localhost:3000
- [ ] Backend accessible sur http://localhost:5000/api/health
- [ ] MongoDB opérationnel
- [ ] J'ai lu [SETUP.md](./docs/SETUP.md)
- [ ] J'ai lu [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- [ ] Prêt à contribuer ! 🚀

---

**Happy coding! 🎉**
