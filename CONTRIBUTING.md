# 🤝 Guide de Contribution - FastFoodBike

Merci d'envisager de contribuer à FastFoodBike ! Ce document vous guidera à travers le processus.

## Table des matières

1. [Code de conduite](#code-de-conduite)
2. [Comment contribuer](#comment-contribuer)
3. [Processus de pull request](#processus-de-pull-request)
4. [Standards de code](#standards-de-code)
5. [Tests](#tests)
6. [Commit messages](#commit-messages)
7. [Documentation](#documentation)

## Code de conduite

Ce projet adoptã le [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). En participant, vous êtes censé(e) respecter ce code.

### Notre engagement

Dans l'intérêt de favoriser un environnement ouvert et accueillant, nous nous engageons à :

- Utiliser un langage bienveillant et inclusif
- Respecter les points de vue et expériences différentes
- Accepter les critiques constructives
- Nous concentrer sur ce qui est meilleur pour la communauté
- Montrer de l'empathie envers les autres membres

## Comment contribuer

### Rapporter des bugs

Avant de créer un rapport de bug, consultez la liste des issues car vous pourriez découvrir que le bug a déjà été signalé.

Quand vous signalez un bug, veuillez inclure :

- **Un titre clair et descriptif**
- **Une description précise du comportement observé**
- **Un exemple concret montrant les étapes de reproduction**
- **Le comportement attendu et ce qui s'est réellement produit**
- **Des captures d'écran ou GIF si possible**
- **Votre environnement** (OS, version Node.js, etc.)

### Suggérer des améliorations

Les suggestions de fonctionnalités sont toujours bienvenues. Quand vous en suggérez une :

- **Utilisez un titre clair et descriptif**
- **Fournissez une description détaillée de la fonctionnalité suggérée**
- **Décrivez le comportement actuel et le comportement souhaité**
- **Expliquez pourquoi cette amélioration serait utile**
- **Listez d'autres applications qui implémentent cette fonctionnalité si possible**

## Processus de pull request

### Étapes préalables

1. **Fork le repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/FastFoodBike.git
   cd FastFoodBike
   ```

2. **Créer une branche de travail**
   ```bash
   git checkout -b feature/nom-de-la-feature
   # ou
   git checkout -b bugfix/nom-du-bug
   ```

3. **Installer les dépendances**
   ```bash
   cd backend
   npm install
   npm run dev
   
   # Dans un autre terminal
   cd frontend
   npm install
   npm start
   ```

### Avant de soumettre la PR

1. **Vérifiez que votre code passe les tests**
   ```bash
   npm test
   npm run lint
   ```

2. **Mettez à jour la documentation**
   - Modifiez le README.md si nécessaire
   - Ajoutez des commentaires dans le code
   - Mettez à jour la documentation API

3. **Rebasez sur main**
   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

4. **Poussez vos changements**
   ```bash
   git push origin feature/nom-de-la-feature
   ```

### Soumettre la PR

1. Ouvrez une Pull Request sur GitHub
2. Remplissez le template de PR complétement
3. Répondez aux commentaires des reviewers
4. Faites les changements demandés
5. Attendez l'approbation (pas de force-push après review)

### Template de PR

```markdown
## Description
Dcrivez les changements apportés.

## Type de changement
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Performance improvement

## Tests
- [ ] J'ai testé localement
- [ ] Les tests passent
- [ ] J'ai ajouté de nouveaux tests

## Checklist
- [ ] Mon code suit les conventions du projet
- [ ] J'ai commenté mon code
- [ ] J'ai mis à jour la documentation
- [ ] Je n'ai pas de warnings ou erreurs

## Screenshots (si applicable)
```

## Standards de code

### Backend (Node.js/Express)

- Utilisez **ES6+** (const/let, arrow functions, etc.)
- Organisez en **services, routes, controllers, models**
- Respectez les **conventions de nommage camelCase**
- Maximum **80 caractères par ligne**
- Utilisez **async/await** au lieu des promises quand possible

```javascript
// ❌ Mauvais
var getUserData = function(id) {
  return User.findById(id).then(function(user) {
    return user.getData();
  });
};

// ✅ Bon
const getUserData = async (id) => {
  const user = await User.findById(id);
  return user.getData();
};
```

### Frontend (React)

- Préférez les **composants fonctionnels** avec hooks
- Utilisez **PropTypes** ou **TypeScript**
- Organisez en **components, pages, hooks, services**
- Utilisez des **noms explicites** pour les variables et fonctions

```jsx
// ❌ Mauvais
const Comp = ({ p }) => {
  const [d, sd] = useState();
  return <div>{d}</div>;
};

// ✅ Bon
const UserCard = ({ userId }) => {
  const [userData, setUserData] = useState();
  return <div>{userData?.name}</div>;
};
```

### ESLint & Prettier

```bash
# Format le code
npm run format

# Vérifier les lint erreurs
npm run lint

# Corriger automatiquement
npm run lint:fix
```

## Tests

### Couverture minimale

- **Backend** : 80% de couverture
- **Frontend** : 75% de couverture

### Lancer les tests

```bash
# Tous les tests
npm test

# Avec coverage
npm run test:coverage

# En mode watch
npm test -- --watch
```

### Écrire de bons tests

```javascript
// ✅ Bon test
describe('UserService', () => {
  it('should create a user with valid data', async () => {
    const userData = {
      email: 'test@example.com',
      firstName: 'John'
    };
    
    const user = await UserService.create(userData);
    
    expect(user.email).toBe('test@example.com');
    expect(user.id).toBeDefined();
  });
});
```

## Commit messages

Utilisez le format [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: Nouvelle fonctionnalité
- **fix**: Correction de bug
- **docs**: Documentation
- **style**: Formatage, point-virgule, etc.
- **refactor**: Refonte sans changer la fonctionnalité
- **perf**: Amélioration de performance
- **test**: Ajout ou modification de tests
- **ci**: Changements CI/CD

### Exemples

```bash
# Bons commits
git commit -m "feat(auth): add JWT token refresh endpoint"
git commit -m "fix(orders): prevent duplicate order submission"
git commit -m "docs(api): update authentication section"

# Mauvais commits
git commit -m "fixed stuff"
git commit -m "update"
```

## Documentation

### Fichiers à mettre à jour

- **README.md** : Vue d'ensemble et guide de démarrage
- **docs/API.md** : Documentation API
- **docs/SETUP.md** : Guide d'installation
- **Code comments** : Commentaires pour le code complexe

### Style de documentation

```markdown
# Section

Une brève description.

## Sous-section

Utilisez des exemples clairs :

\`\`\`bash
# Exemple de code
\`\`\`
```

## Aide supplementaire

- 💬 [GitHub Discussions](https://github.com/sfrayan/FastFoodBike/discussions)
- 📧 [Email](mailto:dev@fastfoodbike.com)
- 📚 [Wiki](https://github.com/sfrayan/FastFoodBike/wiki)

## Remerciements

Merci de votre contribution à FastFoodBike ! 🙏
