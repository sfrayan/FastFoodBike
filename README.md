# 🍔 FastFoodBike - Plateforme de Livraison

[![Status](https://img.shields.io/badge/Status-Educational%20Project-blue)](/)
[![Stack](https://img.shields.io/badge/Stack-MERN-green)](/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](/)

**Application full-stack de livraison de nourriture (projet d'apprentissage) : API Node/Express + MongoDB, frontend React, intégration paiements Stripe/Razorpay (mode test) et notifications email/SMS.**

> ⚠️ Projet éducatif, configuré en mode **test** (clés Stripe/Razorpay de test). Non destiné à un usage en production tel quel.

---

## 📋 Table des matières

1. [Aperçu](#-aperçu)
2. [Fonctionnalités](#-fonctionnalités)
3. [Architecture](#-architecture)
4. [Installation rapide (5 min)](#-installation-rapide-5-minutes)
5. [Configuration des API Keys](#-configuration-des-api-keys)
6. [Lancer le projet](#-lancer-le-projet)
7. [Test des paiements](#-test-des-paiements)
8. [API Endpoints](#-api-endpoints)
9. [Structure des fichiers](#-structure-des-fichiers)
10. [Déploiement](#-déploiement)
11. [Troubleshooting](#-troubleshooting)

---

## 🎯 Aperçu

FastFoodBike est une plateforme complète de livraison de nourriture comprenant :

- **Backend API** : 37 endpoints REST avec Node.js/Express
- **Frontend** : 6 pages React responsive
- **Paiements** : Stripe + Razorpay + Cash on Delivery
- **Notifications** : 8 templates email + 9 templates SMS

---

## ✨ Fonctionnalités

### 💳 Paiements
- **Stripe** (International) - Cartes bancaires, 3D Secure
- **Razorpay** (Inde) - UPI, Cartes, Wallets
- **Cash on Delivery** - Paiement à la livraison
- Remboursements automatiques
- Webhooks sécurisés

### 📧 Notifications Email
- Confirmation de commande
- Mises à jour de statut
- Livraison confirmée
- Commande annulée
- Nouveau restaurant approuvé
- Alerte nouvelle commande
- Compte créé
- Reset mot de passe

### 📱 Notifications SMS (Twilio)
- Confirmation de commande
- Statut en temps réel
- Info livreur
- OTP vérification
- Campagnes promo

### 🔒 Sécurité
- JWT Authentication
- Hash des mots de passe (bcrypt)
- Validation des entrées
- Paiements délégués aux SDK Stripe/Razorpay (aucune donnée carte stockée)

---

## 🏗 Architecture

```
FastFoodBike/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Logique métier
│   │   │   ├── OrderController.js
│   │   │   ├── PaymentController.js
│   │   │   ├── RestaurantController.js
│   │   │   └── MenuItemController.js
│   │   ├── services/           # Services externes
│   │   │   ├── paymentService.js    # Stripe + Razorpay
│   │   │   ├── emailService.js      # Nodemailer
│   │   │   └── smsService.js        # Twilio
│   │   ├── routes/             # Routes API
│   │   ├── models/             # Schémas MongoDB
│   │   └── middleware/         # Auth, validation
│   ├── .env                    # ⚠️ VOS API KEYS ICI
│   ├── .env.example            # Template de configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/              # Pages React
│   │   │   ├── Restaurants.jsx
│   │   │   ├── RestaurantDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   └── OrderDetail.jsx
│   │   └── components/
│   │       └── Payment/
│   │           └── PaymentGateway.jsx
│   ├── .env                    # ⚠️ STRIPE PUBLIC KEY ICI
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation rapide (5 minutes)

### Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)
- Git

### Étape 1 : Cloner le projet
```bash
git clone https://github.com/sfrayan/FastFoodBike.git
cd FastFoodBike
```

### Étape 2 : Installer les dépendances

```bash
# Backend
cd backend
npm install

# Frontend (nouveau terminal)
cd ../frontend
npm install
```

### Étape 3 : Créer le fichier de configuration

```bash
cd backend
cp .env.example .env
```

### Étape 4 : Configurer vos API Keys

➡️ **Voir la section suivante pour les détails**

---

## 🔑 Configuration des API Keys

### 📍 Où se trouve le fichier ?

```
FastFoodBike/
└── backend/
    └── .env          ← C'EST ICI ! Ouvrez ce fichier
```

### 📝 Contenu du fichier `.env` à remplir :

```env
# ═══════════════════════════════════════════════════════════
# DATABASE - Votre connexion MongoDB
# ═══════════════════════════════════════════════════════════
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/fastfoodbike

# ═══════════════════════════════════════════════════════════
# SERVER
# ═══════════════════════════════════════════════════════════
PORT=5000
NODE_ENV=development

# ═══════════════════════════════════════════════════════════
# JWT - Générez une clé secrète unique
# ═══════════════════════════════════════════════════════════
JWT_SECRET=votre_cle_secrete_tres_longue_et_unique_123456789
JWT_EXPIRE=7d

# ═══════════════════════════════════════════════════════════
# 💳 STRIPE (Paiements internationaux)
# ═══════════════════════════════════════════════════════════
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# ═══════════════════════════════════════════════════════════
# 💳 RAZORPAY (Paiements Inde)
# ═══════════════════════════════════════════════════════════
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx

# ═══════════════════════════════════════════════════════════
# 📧 EMAIL (Gmail recommandé)
# ═══════════════════════════════════════════════════════════
EMAIL_SERVICE=gmail
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM=FastFoodBike <noreply@fastfoodbike.com>

# ═══════════════════════════════════════════════════════════
# 📱 TWILIO SMS (Optionnel)
# ═══════════════════════════════════════════════════════════
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890

# ═══════════════════════════════════════════════════════════
# FRONTEND
# ═══════════════════════════════════════════════════════════
FRONTEND_URL=http://localhost:3000
```

---

## 🔐 Comment obtenir vos API Keys

### 1️⃣ MongoDB (Base de données) - OBLIGATOIRE

**Option A : MongoDB Atlas (Cloud - Recommandé)**

1. Allez sur https://www.mongodb.com/atlas
2. Créez un compte gratuit
3. Cliquez "Build a Database" → Choisissez "FREE"
4. Créez un utilisateur (username + password)
5. Whitelist IP: cliquez "Allow Access from Anywhere"
6. Cliquez "Connect" → "Connect your application"
7. Copiez l'URI et remplacez `<password>` par votre mot de passe

```env
MONGO_URI=mongodb+srv://monuser:monpassword@cluster0.xxxxx.mongodb.net/fastfoodbike
```

**Option B : MongoDB Local**
```env
MONGO_URI=mongodb://localhost:27017/fastfoodbike
```

---

### 2️⃣ Stripe (Paiements) - OBLIGATOIRE

1. Allez sur https://dashboard.stripe.com/register
2. Créez un compte (gratuit)
3. Une fois connecté, allez dans **Developers → API Keys**
4. Copiez vos clés **TEST** :

```
Publishable key: pk_test_51... → STRIPE_PUBLIC_KEY
Secret key: sk_test_51...      → STRIPE_SECRET_KEY
```

**Pour le Webhook (optionnel en dev):**
1. Developers → Webhooks → Add endpoint
2. URL: `https://votre-domaine.com/api/payments/stripe/webhook`
3. Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copiez le Signing secret → `STRIPE_WEBHOOK_SECRET`

```env
STRIPE_PUBLIC_KEY=pk_test_51xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_51xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

---

### 3️⃣ Razorpay (Paiements Inde) - OPTIONNEL

1. Allez sur https://dashboard.razorpay.com/signup
2. Créez un compte
3. Settings → API Keys → Generate Key

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
```

---

### 4️⃣ Gmail (Email) - RECOMMANDÉ

**⚠️ Important : Vous devez créer un "App Password", pas votre mot de passe Gmail !**

1. Allez sur https://myaccount.google.com/security
2. Activez la **Validation en 2 étapes** (obligatoire)
3. Retournez sur Security, cherchez "App passwords"
4. Ou allez directement sur https://myaccount.google.com/apppasswords
5. Sélectionnez "Mail" et "Windows Computer"
6. Cliquez "Generate"
7. Copiez le mot de passe de 16 caractères (format: xxxx xxxx xxxx xxxx)

```env
EMAIL_SERVICE=gmail
EMAIL_USER=votre.email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM=FastFoodBike <noreply@fastfoodbike.com>
```

---

### 5️⃣ Twilio (SMS) - OPTIONNEL

1. Allez sur https://www.twilio.com/try-twilio
2. Créez un compte (gratuit avec $15 de crédit)
3. Vérifiez votre numéro de téléphone
4. Sur le Dashboard, vous verrez :
   - Account SID
   - Auth Token
5. Achetez un numéro de téléphone (ou utilisez le trial)

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+15551234567
```

---

### 6️⃣ Frontend (.env)

Créez aussi un fichier `.env` dans le dossier `frontend/` :

```bash
cd frontend
touch .env
```

Contenu de `frontend/.env` :

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_51xxxxxxxxxxxxxxxxxxxxx
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

---

## 🎮 Lancer le projet

### Terminal 1 - Backend
```bash
cd backend
npm run dev
# ✅ Server running on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
# ✅ App running on http://localhost:3000
```

### Vérifier que tout fonctionne
- Ouvrez http://localhost:3000
- Parcourez les restaurants
- Ajoutez au panier
- Testez le paiement

---

## 💳 Test des paiements

### Cartes de test Stripe

| Type | Numéro | Expiry | CVV |
|------|--------|--------|-----|
| ✅ Succès | `4242 4242 4242 4242` | 12/25 | 123 |
| ❌ Refusée | `4000 0000 0000 0002` | 12/25 | 123 |
| 🔐 3D Secure | `4000 0000 0000 3220` | 12/25 | 123 |

### Cartes de test Razorpay

| Type | Numéro | Expiry | CVV |
|------|--------|--------|-----|
| ✅ Succès | `4111 1111 1111 1111` | 12/25 | 123 |
| ❌ Échec | `4000 0000 0000 0002` | 12/25 | 123 |

---

## 🔌 API Endpoints

### Utilisateurs (8 endpoints)
```
POST   /api/users/register      - Inscription
POST   /api/users/login         - Connexion
GET    /api/users/profile       - Mon profil
PUT    /api/users/profile       - Modifier profil
POST   /api/users/addresses     - Ajouter adresse
GET    /api/users/addresses     - Mes adresses
PUT    /api/users/addresses/:id - Modifier adresse
DELETE /api/users/:id           - Supprimer compte
```

### Restaurants (7 endpoints)
```
GET    /api/restaurants         - Liste restaurants
GET    /api/restaurants/:id     - Détail restaurant
GET    /api/restaurants/search  - Rechercher
POST   /api/restaurants         - Créer (owner)
PUT    /api/restaurants/:id     - Modifier (owner)
DELETE /api/restaurants/:id     - Supprimer (admin)
POST   /api/restaurants/:id/approve - Approuver (admin)
```

### Menu (6 endpoints)
```
GET    /api/restaurants/:id/menu - Menu du restaurant
POST   /api/restaurants/:id/menu - Ajouter item (owner)
GET    /api/menu/:id            - Détail item
PUT    /api/menu/:id            - Modifier item
DELETE /api/menu/:id            - Supprimer item
GET    /api/menu/search         - Rechercher items
```

### Commandes (8 endpoints)
```
POST   /api/orders              - Créer commande
GET    /api/orders              - Mes commandes
GET    /api/orders/:id          - Détail commande
GET    /api/orders/:id/track    - Tracking
PUT    /api/orders/:id/status   - Changer statut
PUT    /api/orders/:id/cancel   - Annuler
GET    /api/restaurants/:id/orders - Commandes restaurant
GET    /api/delivery/orders     - Commandes livreur
```

### Paiements (8 endpoints)
```
POST   /api/payments/stripe/create-intent  - Créer paiement Stripe
POST   /api/payments/stripe/confirm        - Confirmer Stripe
POST   /api/payments/stripe/refund         - Rembourser Stripe
POST   /api/payments/stripe/webhook        - Webhook Stripe

POST   /api/payments/razorpay/create-order - Créer commande Razorpay
POST   /api/payments/razorpay/verify       - Vérifier Razorpay
POST   /api/payments/razorpay/refund       - Rembourser Razorpay

GET    /api/payments/status/:orderId       - Statut paiement
```

---

## 📁 Structure des fichiers

```
FastFoodBike/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── OrderController.js       (240 lignes)
│   │   │   ├── PaymentController.js     (200 lignes)
│   │   │   ├── RestaurantController.js  (250 lignes)
│   │   │   └── MenuItemController.js    (220 lignes)
│   │   │
│   │   ├── services/
│   │   │   ├── paymentService.js        (180 lignes - Stripe/Razorpay)
│   │   │   ├── emailService.js          (350 lignes - 8 templates)
│   │   │   └── smsService.js            (200 lignes - 9 templates)
│   │   │
│   │   ├── routes/
│   │   │   ├── users.js
│   │   │   ├── restaurants.js
│   │   │   ├── menuItems.js
│   │   │   ├── orders.js
│   │   │   └── payments.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Restaurant.js
│   │   │   ├── MenuItem.js
│   │   │   └── Order.js
│   │   │
│   │   └── middleware/
│   │       ├── auth.js
│   │       └── errorHandler.js
│   │
│   ├── .env                 ← CONFIGURER ICI
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Restaurants.jsx          (250 lignes)
│   │   │   ├── RestaurantDetail.jsx     (280 lignes)
│   │   │   ├── Cart.jsx                 (250 lignes)
│   │   │   ├── Checkout.jsx             (320 lignes)
│   │   │   ├── UserProfile.jsx          (380 lignes)
│   │   │   └── OrderDetail.jsx          (320 lignes)
│   │   │
│   │   ├── components/
│   │   │   └── Payment/
│   │   │       └── PaymentGateway.jsx   (300 lignes)
│   │   │
│   │   └── services/
│   │       └── api.js
│   │
│   ├── .env                 ← CONFIGURER ICI AUSSI
│   └── package.json
│
└── README.md
```

---

## 🚀 Déploiement

### Variables d'environnement en production

```env
# Changez ces valeurs pour la production
NODE_ENV=production

# Utilisez les clés LIVE (pas test)
STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
RAZORPAY_KEY_ID=rzp_live_xxxxx

# URL de production
FRONTEND_URL=https://votre-domaine.com
```

### Checklist avant déploiement

- [ ] Clés API en mode LIVE (pas test)
- [ ] HTTPS activé
- [ ] Variables d'environnement configurées
- [ ] Base de données sécurisée
- [ ] Webhooks Stripe configurés
- [ ] Tests effectués

---

## 🐛 Troubleshooting

### Erreur: "Cannot connect to MongoDB"
```bash
# Vérifiez votre MONGO_URI dans .env
# Assurez-vous que l'IP est whitelistée sur Atlas
```

### Erreur: "Stripe API key invalid"
```bash
# Vérifiez que vous utilisez les bonnes clés
# pk_test_xxx pour STRIPE_PUBLIC_KEY
# sk_test_xxx pour STRIPE_SECRET_KEY
```

### Erreur: "Email failed to send"
```bash
# Vérifiez que vous utilisez un App Password Gmail
# Pas votre mot de passe Gmail normal !
# Créez-le sur: https://myaccount.google.com/apppasswords
```

### Erreur: "Payment failed - signature verification"
```bash
# Pour Razorpay: vérifiez RAZORPAY_KEY_SECRET
# Pour Stripe webhook: vérifiez STRIPE_WEBHOOK_SECRET
```

---

## 📊 Statistiques du projet

| Métrique | Valeur |
|----------|--------|
| **Lignes de code** | ~6 200 |
| **Controllers backend** | 6 (Auth, User, Restaurant, MenuItem, Order, Payment) |
| **Pages Frontend** | ~10 |
| **Services** | paiement (Stripe/Razorpay), email, SMS |

---

## 📞 Support

- **Documentation complète**: Voir les fichiers `docs/` 
- **Stripe**: https://support.stripe.com
- **Razorpay**: https://razorpay.com/support
- **Twilio**: https://www.twilio.com/help
- **MongoDB Atlas**: https://www.mongodb.com/community/forums

---

## 📜 Licence

MIT License - Libre d'utilisation pour projets personnels et commerciaux.

---

## 🎉 Remerciements

Projet développé avec ❤️ pour la communauté.

**Ready to launch! 🚀**
