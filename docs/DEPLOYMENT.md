# 🚀 Guide de Déploiement - FastFoodBike

## Table des matières

1. [Architecture de déploiement](#architecture-de-d%C3%A9ploiement)
2. [Prérequisits](#pr%C3%A9requisits)
3. [Déploiement Backend](#d%C3%A9ploiement-backend)
4. [Déploiement Frontend](#d%C3%A9ploiement-frontend)
5. [Configuration des domaines](#configuration-des-domaines)
6. [SSL/HTTPS](#ssllhttps)
7. [Monitoring et logs](#monitoring-et-logs)
8. [Rollback et récupération](#rollback-et-r%C3%A9cup%u00e9ration)

## Architecture de déploiement

```
╯───────────────────────────────────────────────────────────────────────╮
│                   Users                                │
╰──────────────────────────────────────────────────────────────────────╯
       │
       ├───────────────────────────────────────────────────────────────────────┐
       │            CDN (Vercel)                                  │
       │    Frontend (React)                              │
       │    Hosted on Vercel                               │
       │╰───────────────────────────────────────────────────────────────────────├
       │
       ├───────────────────────────────────────────────────────────────────────┐
       │    API Gateway (Heroku)                                │
       │    Backend (Node.js/Express)                      │
       │╰───────────────────────────────────────────────────────────────────────├
       │
       └───────────────────────────────────────────────────────────────────────┐
            Databases & Services                                    │
            - MongoDB (Atlas)                                        │
            - Redis (Redis Cloud)                                    │
            - RabbitMQ (CloudAMQP)                                   │
            - Monitoring (DataDog)                                   │
        ╰───────────────────────────────────────────────────────────────────────┝
```

## Prérequisits

### Comptes et services

- [ ] **Heroku** - Pour l'API backend (https://heroku.com)
- [ ] **Vercel** - Pour le frontend (https://vercel.com)
- [ ] **MongoDB Atlas** - Cloud database (https://www.mongodb.com/cloud)
- [ ] **Redis Cloud** - Cache management (https://redis.com/cloud)
- [ ] **CloudAMQP** - Message queue (https://www.cloudamqp.com)
- [ ] **GitHub** - Source control et CI/CD
- [ ] **Domain provider** - Registrar pour votre domaine

### Outils locaux

```bash
# Heroku CLI
brew tap heroku/brew && brew install heroku
# ou
npm install -g heroku

# Vercel CLI
npm install -g vercel

# GitHub CLI
brew install gh
```

## Déploiement Backend

### Pas 1 : Créer une app Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create fastfoodbike-api

# Add buildpacks
heroku buildpacks:add heroku/nodejs -a fastfoodbike-api
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-pgbouncer -a fastfoodbike-api
```

### Pas 2 : Configurer les variables d'environnement

```bash
# Set config vars
heroku config:set NODE_ENV=production -a fastfoodbike-api
heroku config:set JWT_SECRET=$(openssl rand -base64 32) -a fastfoodbike-api
heroku config:set STRIPE_SECRET_KEY=sk_live_... -a fastfoodbike-api
heroku config:set DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/fastfoodbike -a fastfoodbike-api
heroku config:set REDIS_URL=redis://user:password@redis-service.redis.cloud:12345 -a fastfoodbike-api

# Verify
heroku config -a fastfoodbike-api
```

### Pas 3 : Déployer avec Git

```bash
# Add Heroku remote
heroku git:remote -a fastfoodbike-api

# Deploy
git push heroku master

# View logs
heroku logs --tail -a fastfoodbike-api
```

### Pas 4 : Configurer les domaines

```bash
# Add domain
heroku domains:add api.fastfoodbike.com -a fastfoodbike-api

# Get DNS target
heroku domains -a fastfoodbike-api
```

Mise à jour DNS chez votre registrar :
```
api.fastfoodbike.com CNAME fastfoodbike-api.herokuapp.com
```

## Déploiement Frontend

### Pas 1 : Connecter le repository Vercel

```bash
# CLI deployment
vercel

# Follow prompts
# - Link to existing project or create new
# - Set production domain
```

### Pas 2 : Configurer les variables d'environnement

Dans Vercel Dashboard :
1. Settings > Environment Variables
2. Ajouter :
   - `REACT_APP_API_URL` = `https://api.fastfoodbike.com`
   - `REACT_APP_STRIPE_PUBLIC_KEY` = `pk_live_...`
   - `REACT_APP_MAPS_API_KEY` = `...`

### Pas 3 : Déployer

```bash
# Deploy to production
vercel --prod
```

## Configuration des domaines

### Domaine racine (example.com)

1. Créer un record A vers CloudFlare ou Vercel
2. CloudFlare (recommandé) :
   - Name: `@`
   - Type: `CNAME`
   - Content: `cname.vercel-dns.com`

### Sous-domaines

```dns
; Frontend
www.fastfoodbike.com   CNAME cname.vercel-dns.com

; Backend API
api.fastfoodbike.com   CNAME fastfoodbike-api.herokuapp.com

; Documentation
docs.fastfoodbike.com  CNAME sfrayan.github.io

; Mail (si applicable)
mail.fastfoodbike.com  MX 10 mail.fastfoodbike.com
```

## SSL/HTTPS

### Heroku
```bash
# Automatic SSL (gratuit)
heroku certs:auto:enable -a fastfoodbike-api

# Verify
heroku certs -a fastfoodbike-api
```

### Vercel
- Automatique avec domaine Vercel
- SSL gratuit pour domaines custom

### CloudFlare (optionnel)
1. Create account
2. Add domain
3. Change nameservers
4. Enable flexible SSL (gratuit)

## Monitoring et logs

### Heroku Logs
```bash
# View recent logs
heroku logs -a fastfoodbike-api

# Tail logs (real-time)
heroku logs --tail -a fastfoodbike-api

# Filter by source
heroku logs --source app -a fastfoodbike-api
```

### Vercel Analytics
```bash
# Visit dashboard
vercel projects
```

### Application Performance Monitoring (APM)

#### DataDog (recommandé)

```bash
# Install agent
npm install --save dd-trace

# Configure in backend
```

```javascript
// backend/src/index.js
const tracer = require('dd-trace').init({
  hostname: process.env.DD_AGENT_HOST,
  port: process.env.DD_AGENT_PORT,
});
```

#### New Relic
```bash
npm install newrelic
```

### Error Tracking

#### Sentry
```bash
npm install @sentry/node
```

```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## Rollback et récupération

### Heroku Rollback

```bash
# View release history
heroku releases -a fastfoodbike-api

# Rollback to previous version
heroku releases:rollback -a fastfoodbike-api

# Rollback to specific version
heroku releases:rollback v12 -a fastfoodbike-api
```

### Vercel Rollback

1. Vercel Dashboard > Deployments
2. Cliquer sur le déploiement précédent
3. Cliquer "Redeploy"

### Database Backups

#### MongoDB Atlas
```bash
# Backup
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/fastfoodbike" --out backup/

# Restore
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/fastfoodbike" backup/
```

#### Scheduled Backups
- MongoDB Atlas : Automatic daily backups
- Enable Point-In-Time Recovery (PITR)

## Checklis de production

- [ ] SSL certificat activé et configuré
- [ ] Domaines custom configurés
- [ ] Variables d'environnement définies
- [ ] Base de données sauvegardée
- [ ] Monitoring et logging activés
- [ ] CDN configuré pour les assets
- [ ] Rate limiting activé
- [ ] Authentification 2FA sur les comptes
- [ ] Firewall/WAF configuré
- [ ] Plan de récupération testé

## Support

- Heroku Support: https://help.heroku.com
- Vercel Support: https://vercel.com/support
- MongoDB Help: https://docs.mongodb.com
