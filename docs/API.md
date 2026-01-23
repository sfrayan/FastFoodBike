# 🔌 Documentation API - FastFoodBike

## Vue d'ensemble

L'API FastFoodBike est une API REST construite avec Node.js/Express, offrant des endpoints pour gérer les utilisateurs, restaurants, commandes et livraisons.

### Base URL

- **Développement** : `http://localhost:5000/api`
- **Production** : `https://api.fastfoodbike.com/api`

### Authentification

Tous les endpoints (sauf `/auth/login` et `/auth/register`) nécessitent un token JWT dans le header `Authorization`.

```bash
Authorization: Bearer <your_jwt_token>
```

## Endpoints Principal

### Authéntication

#### Inscription
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "firstName": "John",
  "lastName": "Doe",
  "role": "customer"  // customer | restaurant | delivery
}

Réponse 201:
{
  "token": "eyJhbGc...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "role": "customer"
  }
}
```

#### Connexion
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}

Réponse 200:
{
  "token": "eyJhbGc...",
  "user": { ... }
}
```

#### Renouveler le token
```http
POST /auth/refresh
Authorization: Bearer <refresh_token>

Réponse 200:
{
  "token": "eyJhbGc..."
}
```

### Restaurants

#### Lister les restaurants
```http
GET /restaurants?page=1&limit=10&search=pizza&city=Paris

Réponse 200:
{
  "data": [
    {
      "id": "restaurant_123",
      "name": "Pizza Palace",
      "description": "Authentic Italian pizza",
      "rating": 4.5,
      "address": "123 Main St, Paris",
      "deliveryTime": 30,
      "deliveryFee": 2.99,
      "minimumOrder": 10,
      "tags": ["pizza", "italian"],
      "image": "https://..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

#### Obtenir détails d'un restaurant
```http
GET /restaurants/:id

Réponse 200:
{
  "id": "restaurant_123",
  "name": "Pizza Palace",
  "menu": [
    {
      "id": "item_1",
      "name": "Margherita Pizza",
      "description": "Fresh mozzarella, basil, tomato",
      "price": 12.99,
      "image": "https://...",
      "available": true
    }
  ]
}
```

### Commandes

#### Créer une commande
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "restaurantId": "restaurant_123",
  "items": [
    {
      "menuItemId": "item_1",
      "quantity": 2,
      "specialInstructions": "Extra cheese"
    }
  ],
  "deliveryAddress": {
    "street": "456 Elm St",
    "city": "Paris",
    "zipCode": "75001"
  },
  "paymentMethod": "card"
}

Réponse 201:
{
  "id": "order_456",
  "status": "confirmed",
  "totalPrice": 34.97,
  "estimatedDeliveryTime": 35
}
```

#### Lister les commandes de l'utilisateur
```http
GET /orders?status=active&limit=10
Authorization: Bearer <token>

Réponse 200:
{
  "data": [
    {
      "id": "order_456",
      "restaurantName": "Pizza Palace",
      "status": "in_delivery",
      "totalPrice": 34.97,
      "estimatedDeliveryTime": 15,
      "deliveryDriver": {
        "id": "driver_789",
        "name": "John Smith",
        "location": { "latitude": 48.8566, "longitude": 2.3522 }
      }
    }
  ]
}
```

#### Annuler une commande
```http
POST /orders/:id/cancel
Authorization: Bearer <token>

Réponse 200:
{
  "id": "order_456",
  "status": "cancelled",
  "refund": 34.97
}
```

### Livraisons

#### Accepter une livraison (pour les livreurs)
```http
POST /deliveries/:id/accept
Authorization: Bearer <token>

Réponse 200:
{
  "id": "delivery_123",
  "orderId": "order_456",
  "status": "accepted",
  "earnings": 3.50
}
```

#### Mettre à jour la localisation
```http
POST /deliveries/:id/location
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": 48.8566,
  "longitude": 2.3522
}

Réponse 200:
{
  "success": true
}
```

### Utilisateurs

#### Obtenir le profil
```http
GET /users/profile
Authorization: Bearer <token>

Réponse 200:
{
  "id": "user_123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+33123456789",
  "address": "123 Main St, Paris",
  "role": "customer",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Mettre à jour le profil
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Johnny",
  "phone": "+33123456789"
}

Réponse 200:
{
  "success": true,
  "user": { ... }
}
```

## Codes d'état HTTP

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## Format de réponse d'erreur

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Description de l'erreur",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  }
}
```

## Rate Limiting

- 100 requêtes par minute pour l'authentification
- 1000 requêtes par minute pour les utilisateurs authentifiés

Headers de réponse :
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642254600
```

## Pagination

Pour les listes, utilisez les paramètres query :
- `page` : Numéro de page (défaut: 1)
- `limit` : Nombre de résultats par page (défaut: 20, max: 100)
- `sort` : Champ de tri (ex: `-createdAt`)

## Websockets (Temps réel)

### Connexion
```javascript
const socket = io('http://localhost:5000', {
  auth: {
    token: 'your_jwt_token'
  }
});
```

### Événements

#### Suivi de livraison
```javascript
// S'abonner
socket.emit('order:track', { orderId: 'order_456' });

// Écouter les mises à jour
socket.on('delivery:updated', (data) => {
  console.log('Driver location:', data.location);
});
```

## Exemples cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password"
  }'
```

### Créer une commande
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": "restaurant_123",
    "items": [{"menuItemId": "item_1", "quantity": 2}],
    "deliveryAddress": {...}
  }'
```

## Documentation Swagger

Consultez la documentation interactive sur :
```
http://localhost:5000/api/docs
```
