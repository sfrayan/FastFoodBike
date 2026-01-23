# 🔐 GitHub Secrets Configuration

Guide complet pour configurer tous les secrets nécessaires pour le CI/CD.

## ⚙️ Aller à

Settings > Secrets and variables > Actions > New repository secret

## 📋 Secrets obligatoires

### 1. Heroku (Backend Deployment)

```
HEROKU_API_KEY
  Description: Clé API Heroku
  Valeur: Depuis https://dashboard.heroku.com/account/applications/authorizations
  
HEROKU_EMAIL
  Description: Email du compte Heroku
  Valeur: your-email@example.com
  
HEROKU_APP_NAME
  Description: Nom de l'app Heroku
  Valeur: fastfoodbike-api (ou votre nom)
```

### 2. Vercel (Frontend Deployment)

```
VERCEL_TOKEN
  Description: Token d'authentification Vercel
  Valeur: Depuis https://vercel.com/account/tokens
  
VERCEL_ORG_ID
  Description: Organisation ID (si organisation, sinon user ID)
  Valeur: Depuis les paramètres du compte
  
VERCEL_PROJECT_ID
  Description: ID du projet Vercel
  Valeur: À créer et récupérer via CLI ou dashboard
```

### 3. Database & Services

```
MONGODB_URI
  Description: MongoDB Atlas connection string
  Valeur: mongodb+srv://user:pass@cluster.mongodb.net/fastfoodbike
  
REDIS_URL
  Description: Redis Cloud connection URL
  Valeur: redis://:password@host:port
  
RABBITMQ_URL
  Description: CloudAMQP connection URL
  Valeur: amqp://user:pass@host/vhost
```

### 4. Paiement & Services externes

```
STRIPE_SECRET_KEY
  Description: Clé secrète Stripe
  Valeur: sk_live_... (production) ou sk_test_... (test)
  
STRIPE_PUBLIC_KEY
  Description: Clé publique Stripe
  Valeur: pk_live_... (production) ou pk_test_... (test)
  
STRIPE_WEBHOOK_SECRET
  Description: Secret pour webhooks Stripe
  Valeur: whsec_... (généré dans Stripe dashboard)
```

### 5. Services externes (Email, SMS, etc.)

```
SMTP_HOST
  Description: Serveur SMTP
  Valeur: smtp.gmail.com ou autre
  
SMTP_USER
  Description: Email SMTP
  Valeur: your-email@gmail.com
  
SMTP_PASS
  Description: Mot de passe SMTP (App Password pour Gmail)
  Valeur: votre-app-password
  
SMTP_FROM
  Description: Email "from"
  Valeur: noreply@fastfoodbike.com
```

### 6. Google Maps & Geolocation

```
GOOGLE_MAPS_API_KEY
  Description: Google Maps API key
  Valeur: Depuis Google Cloud Console
```

### 7. Monitoring & Logging

```
SENTRY_DSN
  Description: Sentry DSN pour error tracking
  Valeur: https://key@sentry.io/project
  
DATADOG_API_KEY
  Description: Clé API DataDog
  Valeur: Depuis DataDog dashboard
```

### 8. CI/CD & Notifications

```
SLACK_WEBHOOK_URL
  Description: Slack incoming webhook pour notifications
  Valeur: https://hooks.slack.com/services/...
  
DISCORD_WEBHOOK_URL
  Description: Discord webhook pour notifications
  Valeur: https://discord.com/api/webhooks/...
  
GHUB_TOKEN
  Description: GitHub token avec accès aux secrets
  Valeur: Généré depuis GitHub Developer settings
```

### 9. Sécurité & Scanning

```
SNYK_TOKEN
  Description: Snyk token pour vulnerability scanning
  Valeur: Depuis https://app.snyk.io/account/settings/api
  
SODEPENDENT_TOKEN
  Description: Dependabot token (optionnel)
  Valeur: Généré automatiquement par GitHub
```

### 10. JWT & Authentification

```
JWT_SECRET
  Description: Secret JWT pour le backend
  Valeur: Longue chaîne aléatoire (min 32 chars)
  Exemple: crypto.randomBytes(32).toString('hex')
  
JWT_REFRESH_SECRET
  Description: Secret pour refresh tokens
  Valeur: Longue chaîne aléatoire (min 32 chars)
```

## 🖣️ Checklist

- [ ] Heroku API Key
- [ ] Heroku Email
- [ ] Heroku App Name
- [ ] Vercel Token
- [ ] Vercel Org ID
- [ ] Vercel Project ID
- [ ] MongoDB URI
- [ ] Redis URL
- [ ] RabbitMQ URL
- [ ] Stripe Secret Key
- [ ] Stripe Public Key
- [ ] Stripe Webhook Secret
- [ ] SMTP Host
- [ ] SMTP User
- [ ] SMTP Pass
- [ ] SMTP From
- [ ] Google Maps API Key
- [ ] Sentry DSN
- [ ] DataDog API Key
- [ ] Slack Webhook
- [ ] Discord Webhook
- [ ] Snyk Token
- [ ] JWT Secret
- [ ] JWT Refresh Secret

## 💡 Bonnes pratiques

### Sécurité
- ⚠️ **JAMAIS** commiter les secrets dans le code
- ⚠️ Utiliser UNIQUEMENT les GitHub Secrets
- ⚠️ Rotation régulière des clés
- ⚠️ Secrets séparés pour dev/staging/prod
- ⚠️ Audit des accès aux secrets

### Nommage
- PrefixerPar l'env : `PROD_`, `STAGING_`, etc.
- CamelCase : `HEROKU_API_KEY` (pas `heroku_api_key`)
- Descriptif : `STRIPE_WEBHOOK_SECRET` (pas `KEY1`)

### Rotation
```
# Chaque secret doit être changé tous les 90 jours
# Ou immédiatement si compromis détecté

# Pour les tokens : implémenter une expiration
# Pour les clés : générer de nouvelles clés régulièrement
```

## 🚀 Utilisation dans les Workflows

### Backend
```yaml
env:
  NODE_ENV: production
  DATABASE_URL: ${{ secrets.MONGODB_URI }}
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
  STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
```

### Frontend
```yaml
env:
  VITE_STRIPE_PUBLIC_KEY: ${{ secrets.STRIPE_PUBLIC_KEY }}
  VITE_API_URL: https://api.fastfoodbike.com
```

### Heroku Deploy
```yaml
env:
  HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
  HEROKU_EMAIL: ${{ secrets.HEROKU_EMAIL }}
  HEROKU_APP_NAME: ${{ secrets.HEROKU_APP_NAME }}
```

### Vercel Deploy
```yaml
env:
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📚 Documentation externe

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Heroku API Keys](https://devcenter.heroku.com/articles/platform-api-quickstart)
- [Vercel Tokens](https://vercel.com/account/tokens)
- [Stripe API Keys](https://stripe.com/docs/keys)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 📧 Support

Si vous avez des questions :
- 📖 Lire [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md)
- 🐛 Créer une issue GitHub
- 💬 GitHub Discussions

---

**Une fois configuré, les workflows CI/CD tourneront automatiquement !** 🚀
