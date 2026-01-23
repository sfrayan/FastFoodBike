# 🚀 Guide de Démarrage - FastFoodBike

## Table des matières

1. [Prérequis](#prérequis)
2. [Installation locale](#installation-locale)
3. [Configuration de l'environnement](#configuration-de-lenvironnement)
4. [Base de données](#base-de-données)
5. [Démarrage du projet](#démarrage-du-projet)
6. [Vérification de l'installation](#vérification-de-linstallation)
7. [Troubleshooting](#troubleshooting)

## Prérequis

### Système d'exploitation
- **Windows 10+** ou **macOS 10.15+** ou **Linux (Ubuntu 18.04+)**

### Logiciels obligatoires

- **Node.js** 16.0.0 ou supérieur
  ```bash
  node --version  # v16.0.0 ou plus
  npm --version   # 7.0.0 ou plus
  ```
  
  Installer depuis : https://nodejs.org/

- **Git** 2.30.0 ou supérieur
  ```bash
  git --version
  ```

### Optionnel mais recommandé

- **Docker** 20.10+
- **Docker Compose** 1.29+
- **VS Code** (ou tout autre éditeur)

## Installation locale

### 1. Cloner le repository

```bash
git clone https://github.com/sfrayan/FastFoodBike.git
cd FastFoodBike
```

### 2. Vérifier la structure

```bash
ls -la
# Vous devriez voir :
# - frontend/
# - backend/
# - mobile/
# - docs/
# - README.md
```

## Configuration de l'environnement

### Backend (.env)

#### Créer le fichier

```bash
cd backend
cp .env.example .env  # ou créer manuellement
```

#### Configurer les variables

```env
# === ENVIRONNEMENT ===
NODE_ENV=development
PORT=5000
HOST=localhost

# === BASE DE DONNÉES ===
DATABASE_URL=mongodb://localhost:27017/fastfoodbike
# Alternative PostgreSQL :
# DATABASE_URL=postgresql://user:password@localhost:5432/fastfoodbike

# === AUTHENTIFICATION ===
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

# === PAIEMENT STRIPE ===
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# === EMAIL ===
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# === CARTES (Google Maps ou Mapbox) ===
MAPS_API_KEY=your_maps_api_key
MAPS_PROVIDER=google  # ou mapbox

# === LOGS ===
LOG_LEVEL=debug
```

### Frontend (.env.local)

```bash
cd ../frontend
cat > .env.local << EOF
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
REACT_APP_MAPS_API_KEY=your_maps_api_key
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
REACT_APP_VERSION=1.0.0
EOF
```

## Base de données

### Option 1 : MongoDB avec Docker

```bash
# Créer et démarrer MongoDB
docker run -d \
  --name fastfoodbike-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:5.0

# Vérifier la connexion
mongo mongodb://admin:password@localhost:27017/fastfoodbike
```

### Option 2 : PostgreSQL avec Docker

```bash
docker run -d \
  --name fastfoodbike-postgres \
  -p 5432:5432 \
  -e POSTGRES_USER=fastfood \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=fastfoodbike \
  postgres:14-alpine
```

### Option 3 : Docker Compose

```bash
# À la racine du projet
docker-compose up -d
```

## Démarrage du projet

### Terminal 1 : Backend

```bash
cd backend
npm install
npm run dev

# Attendez le message :
# ✅ Backend running on http://localhost:5000
```

### Terminal 2 : Frontend

```bash
cd frontend
npm install
npm start

# Le navigateur s'ouvrira automatiquement sur http://localhost:3000
```

### Terminal 3 : Mobile (optionnel)

```bash
# Pour Flutter
cd mobile
flutter pub get
flutter run -d chrome

# Pour React Native
cd mobile
npm install
npm start
```

## Vérification de l'installation

### 1. Vérifier le backend

```bash
curl http://localhost:5000/api/health
# Réponse attendue : {"status":"ok","timestamp":"2024-01-23T..."}
```

### 2. Vérifier le frontend

Ouvrira automatiquement http://localhost:3000

### 3. Vérifier la base de données

```bash
# MongoDB
mongo mongodb://localhost:27017/fastfoodbike
> show databases
> use fastfoodbike
> show collections

# PostgreSQL
psql -U fastfood -d fastfoodbike -h localhost
```

## Troubleshooting

### ❌ Erreur : "Port 5000 déjà utilisé"

```bash
# Identifier le processus
lsof -i :5000

# Tuer le processus (macOS/Linux)
kill -9 <PID>

# Ou modifier le PORT dans .env
PORT=5001
```

### ❌ Erreur : "MongoDB connection failed"

```bash
# Vérifier que MongoDB fonctionne
docker ps | grep mongodb

# Si elle n'existe pas, la relancer
docker start fastfoodbike-mongodb
```

### ❌ Erreur : "npm ERR! not ok"

```bash
# Nettoyer les caches
rm -rf node_modules package-lock.json
npm cache clean --force

# Réinstaller
npm install
```

### ❌ Erreur : "EACCES: permission denied"

```bash
# Sur macOS/Linux
sudo chown -R $USER:$USER .
```

## Prochaines étapes

1. 📖 Lire la [Documentation API](./API.md)
2. 🤝 Voir [Guide de contribution](./CONTRIBUTING.md)
3. 🔌 Consulter l'[Architecture](./ARCHITECTURE.md)
4. 🧪 Lancer les tests : `npm test`

## Besoin d'aide ?

- 💬 [GitHub Discussions](https://github.com/sfrayan/FastFoodBike/discussions)
- 📧 Créez une [Issue](https://github.com/sfrayan/FastFoodBike/issues)
- 📚 Consultez la [Wiki](https://github.com/sfrayan/FastFoodBike/wiki)
