# 🔐 Configuration des Secrets GitHub

Ce document explique comment configurer les secrets nécessaires pour le CI/CD et le déploiement.

## Accès aux secrets

1. Allez sur **Settings** > **Secrets and variables** > **Actions**
2. Cliquez sur **New repository secret**
3. Ajoutez chaque secret avec son nom et sa valeur

## Secrets obligatoires

### 1. **HEROKU_API_KEY**
- Description: Clé API Heroku pour le déploiement
- Où l'obtenir: [Account Settings Heroku](https://dashboard.heroku.com/account/applications/authorizations)
- Format: `long-alphanumeric-string`

### 2. **HEROKU_EMAIL**
- Description: Email associé au compte Heroku
- Format: `your-email@example.com`

### 3. **HEROKU_APP_NAME**
- Description: Nom de votre application Heroku
- Format: `fastfoodbike-api` ou similaire

### 4. **VERCEL_TOKEN**
- Description: Token d'authentification Vercel
- Où l'obtenir: [Vercel Account Settings](https://vercel.com/account/tokens)
- Format: Long token

### 5. **VERCEL_ORG_ID**
- Description: ID d'organisation Vercel
- Où l'obtenir: Affiché dans l'URL ou accès Vercel
- Format: `team_xxxxx` ou ID numérique

### 6. **VERCEL_PROJECT_ID**
- Description: ID du projet Vercel
- Où l'obtenir: Affiché dans les paramètres du projet
- Format: `prj_xxxxx` ou ID numérique

### 7. **SLACK_WEBHOOK_URL**
- Description: URL du webhook Slack pour les notifications
- Où l'obtenir: [Slack API](https://api.slack.com/messaging/webhooks)
- Format: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX`

### 8. **SNYK_TOKEN**
- Description: Token Snyk pour la scécurisation
- Où l'obtenir: [Snyk Account Settings](https://app.snyk.io/account/settings)
- Format: Long token

### 9. **PRODUCTION_API_URL**
- Description: URL de l'API en production
- Format: `https://api.fastfoodbike.com` ou URL de votre serveur

### 10. **REGISTRY**
- Description: URL du registre Docker (si utilisé)
- Format: `ghcr.io`, `docker.io`, ou registre privé
- Optionnel: Only if using Docker image registry

## Variables d'environnement sensêbles

### Backend (.env)
Assurez-vous que ces variables sont définies :

```env
# Authentication
JWT_SECRET=your_super_secret_key_minimum_32_chars
JWT_EXPIRES_IN=7d

# Database
DATABASE_URL=mongodb://user:password@host/database
# ou
DATABASE_URL=postgresql://user:password@host/database

# Payment (Stripe)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-specific-password

# Maps
MAPS_API_KEY=your_google_maps_api_key

# Redis
REDIS_URL=redis://:password@host:6379/0

# RabbitMQ
RABBITMQ_URL=amqp://user:password@host:5672
```

### Frontend (.env.production)

```env
REACT_APP_API_URL=https://api.fastfoodbike.com
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_...
REACT_APP_MAPS_API_KEY=your_maps_api_key
```

## Exemple de configuration complète

### Pas 1 : Créer les secrets

```bash
# Via GitHub CLI
gh secret set HEROKU_API_KEY --body "your_api_key"
gh secret set HEROKU_EMAIL --body "your-email@example.com"
gh secret set HEROKU_APP_NAME --body "fastfoodbike-api"
gh secret set VERCEL_TOKEN --body "your_vercel_token"
gh secret set VERCEL_ORG_ID --body "team_xxxxx"
gh secret set VERCEL_PROJECT_ID --body "prj_xxxxx"
gh secret set SLACK_WEBHOOK_URL --body "https://hooks.slack.com/..."
gh secret set SNYK_TOKEN --body "your_snyk_token"
gh secret set PRODUCTION_API_URL --body "https://api.fastfoodbike.com"
```

### Pas 2 : Vérifier les secrets

```bash
gh secret list
```

## Sécurité

### 🔐 Bonnes pratiques

1. **Ne jamais commiter les secrets**
   - Utilisez `.gitignore` pour `.env` fichiers
   - Vérifiez les secrets dans le code avant commit

2. **Rotation régulière**
   - Changez les clés tous les 3 mois
   - Marquez les anciennes clés comme "revokées"

3. **Permissions minimales**
   - Créez des tokens avec les permissions nécessaires seulement
   - Utilisez des roles spécifiques pour le déploiement

4. **Monitoring**
   - Vérifiez régulièrement l'accès aux secrets
   - Activez les logs d'audit

## Troubleshooting

### ❌ "Secret not found"
- Vérifiez le nom exact (case-sensitive)
- Vérifiez que le secret a été sauvegardé

### ❌ "Unauthorized" lors du déploiement
- Vérifiez que le token est valide
- Vérifiez les permissions du token
- Régénérez le token si nécessaire

### ❌ Webhook Slack ne fonctionne pas
- Vérifiez l'URL du webhook
- Vérifiez que le canal Slack existe
- Vérifiez les permissions du bot

## Outils utiles

- [GitHub CLI](https://cli.github.com/) - Manage secrets from terminal
- [Vercel CLI](https://vercel.com/cli) - Deploy to Vercel
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) - Deploy to Heroku
- [1Password](https://1password.com/) - Secure secret management
- [HashiCorp Vault](https://www.vaultproject.io/) - Enterprise secret management

## Ressources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Best Practices for Secrets](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/)
