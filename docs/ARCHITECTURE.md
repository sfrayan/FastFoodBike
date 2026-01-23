# 🏗️ Architecture - FastFoodBike

## Vue d'ensemble de la stack

### Stack technologique

```
╯───────────────────────────────────────────────╮
│         PRESENTATION LAYER          │
│  React 18 + Vite + Tailwind CSS     │
│  (React Router, Zustand, TanStack) │
╰───────────────────────────────────────────────╯
         │
         │ HTTP/REST + WebSockets
         │
         ╰───────────────────────────────────────────────╮
╯───────────────────────────────────────────────╮
│      APPLICATION LAYER (API)       │
│   Express.js 4.x + Node.js 16+     │
│  Controllers | Services | Routes   │
╰───────────────────────────────────────────────╯
         │
         │ Mongoose ODM
         │
         ╰───────────────────────────────────────────────╮
╯───────────────────────────────────────────────╮
│      DATA & SERVICE LAYER         │
│  MongoDB + Redis + RabbitMQ       │
│  Models | Caching | Queue         │
╰───────────────────────────────────────────────╯
```

## Tech Stack détaillé

### Frontend (Web)

| Composant | Technologie | Version | Raison |
|-----------|-------------|---------|--------|
| **Runtime** | Node.js | 16+ | Stabilité, support LTS |
| **Framework** | React | 18.2 | Components & Hooks |
| **Build** | Vite | 5.0+ | Développement rapide |
| **Router** | React Router | 6.20 | Navigation client-side |
| **Styling** | Tailwind CSS | 3.3+ | Utility-first, rapid dev |
| **State** | Zustand | 4.4+ | Léger, flexible |
| **Data Fetching** | React Query | 5.28 | Caching, sync server state |
| **HTTP** | Axios | 1.6+ | Requests avec interceptors |
| **Real-time** | Socket.io Client | 4.7 | Live tracking, notifications |
| **Forms** | Formik + Yup | 2.4 + 1.3 | Validation & gestion |
| **Icons** | React Icons | 4.13 | SVG icons library |
| **Toast** | React Toastify | 10.0 | Notifications UI |
| **Date** | date-fns | 2.30 | Date formatting |
| **Maps** | Google Maps | API key | Location & routing |
| **Testing** | Vitest + React Testing Lib | 1.1 + 14.1 | Unit & component tests |

### Backend (API)

| Composant | Technologie | Version | Raison |
|-----------|-------------|---------|--------|
| **Runtime** | Node.js | 16+ | JavaScript backend |
| **Framework** | Express.js | 4.18 | Minimal, performant |
| **Database** | MongoDB | - | Document-based, flexible |
| **ODM** | Mongoose | 8.0 | Schema validation |
| **Cache** | Redis | 4.6 | In-memory caching |
| **Queue** | RabbitMQ + amqplib | 0.10 | Async jobs, pub-sub |
| **Auth** | JWT + bcryptjs | 9.1 + 2.4 | Secure authentication |
| **Payment** | Stripe API | 14.7 | Payment processing |
| **Real-time** | Socket.io | 4.7 | WebSockets, live updates |
| **Validation** | Joi + express-validator | 17.11 + 7.0 | Input validation |
| **Email** | Nodemailer | 6.9 | SMTP integration |
| **Security** | Helmet | 7.1 | Security headers |
| **Rate Limit** | express-rate-limit | 7.1 | DDoS protection |
| **Logging** | Winston | 3.11 | Structured logging |
| **Testing** | Mocha + Chai + Sinon | 10.2 + 4.3 + 17.0 | Unit & integration |

### Infrastructure & DevOps

| Composant | Technologie | Description |
|-----------|-------------|-------------|
| **Version Control** | Git + GitHub | Repository & collaboration |
| **CI/CD** | GitHub Actions | Automated testing & deployment |
| **Container** | Docker | Containerization |
| **Orchestration** | Docker Compose | Local dev environment |
| **Frontend Hosting** | Vercel | Optimal React deploys |
| **Backend Hosting** | Heroku | Managed Node.js hosting |
| **Database** | MongoDB Atlas | Cloud MongoDB |
| **Cache** | Redis Cloud | Managed Redis |
| **Queue** | CloudAMQP | Managed RabbitMQ |
| **Monitoring** | Sentry + DataDog | Error & performance tracking |
| **Analytics** | Google Analytics | User analytics |

## Structure du Backend

```
backend/
├── src/
│   ├── index.js                    # Entry point
│   ├── config/
│   │   ├── database.js            # MongoDB connection
│   │   ├── redis.js              # Redis client
│   │   ├── rabbitmq.js           # RabbitMQ connection
│   │   ├── stripe.js             # Stripe config
│   │   └── logger.js             # Winston logger
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Restaurant.js         # Restaurant schema
│   │   ├── Order.js              # Order schema
│   │   ├── MenuItem.js           # MenuItem schema
│   │   ├── Delivery.js           # Delivery schema
│   │   └── Review.js             # Review schema
│   ├── routes/
│   │   ├── auth.js               # Authentication endpoints
│   │   ├── users.js              # User endpoints
│   │   ├── restaurants.js        # Restaurant endpoints
│   │   ├── orders.js             # Order endpoints
│   │   ├── deliveries.js         # Delivery endpoints
│   │   └── reviews.js            # Review endpoints
│   ├── controllers/
│   │   ├── AuthController.js     # Auth logic
│   │   ├── UserController.js     # User logic
│   │   ├── OrderController.js    # Order logic
│   │   └── DeliveryController.js # Delivery logic
│   ├── services/
│   │   ├── AuthService.js        # Auth business logic
│   │   ├── StripeService.js      # Payment processing
│   │   ├── EmailService.js       # Email sending
│   │   ├── NotificationService.js # Notifications
│   │   └── GeolocationService.js # Maps & routing
│   ├── middleware/
│   │   ├── auth.js               # JWT validation
│   │   ├── errorHandler.js       # Error handling
│   │   ├── validation.js         # Input validation
│   │   └── rateLimit.js          # Rate limiting
│   ├── utils/
│   │   ├── validators.js         # Validation helpers
│   │   ├── constants.js          # App constants
│   │   ├── helpers.js            # Helper functions
│   │   └── errors.js             # Custom error classes
│   ├── queue/
│   │   ├── consumers/
│   │   │   ├── emailConsumer.js
│   │   │   └── notificationConsumer.js
│   │   └── producers/
│   │       ├── emailProducer.js
│   │       └── notificationProducer.js
│   ├── sockets/
│   │   ├── handlers.js           # Socket.io event handlers
│   │   └── middleware.js         # Socket middleware
│   ├── scripts/
│   │   ├── seed.js               # Database seeding
│   │   └── migrate.js            # Database migrations
│   └── tests/
│       ├── unit/
│       ├── integration/
│       └── fixtures/
├── package.json
├── .env.example
├── .eslintrc.json
├── .prettierrc.json
├── Dockerfile
└── nodemon.json
```

## Structure du Frontend

```
frontend/
├── src/
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Root component
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Restaurants.jsx
│   │   ├── RestaurantDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderTracking.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Loading.jsx
│   │   ├── restaurants/
│   │   │   ├── RestaurantCard.jsx
│   │   │   ├── RestaurantList.jsx
│   │   │   └── RestaurantFilter.jsx
│   │   ├── orders/
│   │   │   ├── OrderCard.jsx
│   │   │   ├── OrderList.jsx
│   │   │   └── OrderTracker.jsx
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   └── CartSummary.jsx
│   │   ├── map/
│   │   │   ├── Map.jsx
│   │   │   └── DeliveryMap.jsx
│   │   └── auth/
│   │       ├── LoginForm.jsx
│   │       └── RegisterForm.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useOrders.js
│   │   ├── useFetch.js
│   │   └── useGeolocation.js
│   ├── services/
│   │   ├── api.js                # Axios instance + interceptors
│   │   ├── authApi.js            # Auth endpoints
│   │   ├── restaurantApi.js      # Restaurant endpoints
│   │   ├── orderApi.js           # Order endpoints
│   │   └── socket.js             # Socket.io setup
│   ├── store/
│   │   ├── authStore.js          # Auth state (Zustand)
│   │   ├── cartStore.js          # Cart state
│   │   └── uiStore.js            # UI state
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tailwind.config.js
│   │   └── postcss.config.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── config/
│   │   ├── api.js
│   │   └── constants.js
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── mocks/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── robots.txt
├── package.json
├── .env.example
├── vite.config.js
├── vitest.config.js
├── .eslintrc.json
└── .prettierrc.json
```

## Flux de données

### Authentification

```
User Login
    │
    └─> Frontend (React)
        └─> API POST /auth/login
            └─> Backend (Express)
                └─> Validate credentials
                └─> Hash password (bcryptjs)
                └─> Generate JWT token
                └─> Cache session (Redis)
                └─> Return token to client
            └─> Frontend stores token (localStorage)
            └─> Redirect to dashboard
```

### Création de commande

```
User Checkout
    │
    └─> Frontend (React)
        └─> API POST /orders
            └─> Backend (Express)
                └─> Validate items & address
                └─> Process payment (Stripe)
                └─> Create Order document (MongoDB)
                └─> Publish event to RabbitMQ
                └─> Cache order (Redis)
                └─> Send confirmation email (async via queue)
                └─> Return order data
            └─> Frontend shows confirmation
            └─> Subscribe to Socket.io updates
                └─> Real-time order status
```

### Suivi de livraison

```
Delivery Driver Accept Order
    │
    └─> Mobile app updates location (GPS)
        └─> API POST /deliveries/:id/location
            └─> Backend Socket.io emit event
                └─> Cache location (Redis)
                └─> Broadcast to all connected clients
            └─> Frontend receive Socket event
                └─> Update map in real-time
                └─> Show ETA
```

## Patterns d'architecture

### MVC + Service Layer

```
Request
   │
   └─> Route
       └─> Middleware (Auth, Validation)
           └─> Controller
               └─> Service (Business Logic)
                   └─> Model (Data Access)
                       └─> Database
                           └─> Response
```

### Event-Driven avec RabbitMQ

```
Order Created Event
   │
   └─> Producer (OrderService)
       └─> RabbitMQ Exchange
           └─> Email Queue
           │  └─> Consumer (EmailService)
           │      └─> Send confirmation
           │
           └─> Notification Queue
              └─> Consumer (NotificationService)
                  └─> Push notification
```

### Caching Strategy (Redis)

```
Request data
   │
   └─> Check Redis cache
       │
       ├─> Cache Hit → Return cached data
       │
       └─> Cache Miss
           └─> Query MongoDB
           └─> Store in Redis (TTL)
           └─> Return to client
```

## Sécurité

### Frontend
- HTTPS only
- Secure token storage (localStorage with sameSite cookies)
- CSRF protection
- XSS prevention (sanitize inputs)
- CSP headers

### Backend
- JWT avec secret fort
- Rate limiting (100-1000 req/min)
- Input validation (Joi + express-validator)
- SQL injection protection (Mongoose)
- CORS policy stricte
- Helmet.js security headers
- HTTPS mandatory
- Secrets management (environment variables)

## Performance

### Frontend
- Code splitting avec React.lazy
- Image optimization (next-gen formats)
- Lazy loading images
- Caching assets (Service Workers)
- Bundle size monitoring

### Backend
- Database indexing (MongoDB)
- Connection pooling
- Redis caching
- Async processing (RabbitMQ)
- Pagination for large datasets
- Compression (gzip)

## Scaling

### Horizontal Scaling
- Multiple Node.js instances (load balancer)
- MongoDB sharding
- Redis cluster
- RabbitMQ clustering

### Monitoring
- Application logs (Winston)
- Error tracking (Sentry)
- Performance monitoring (DataDog)
- Health checks endpoint
- Uptime monitoring

## Préconfiguration recommandée

### Développement
```bash
docker-compose up -d
cd backend && npm install && npm run dev
# Terminal 2
cd frontend && npm install && npm run dev
```

### Production
```bash
# Backend: Heroku
git push heroku main

# Frontend: Vercel
vercel --prod

# Database: MongoDB Atlas
# Cache: Redis Cloud
# Queue: CloudAMQP
```

## Prérequisits pour commencer

- [ ] Node.js 16+ installé
- [ ] MongoDB local ou Atlas créé
- [ ] Redis local ou Redis Cloud
- [ ] Docker & Docker Compose
- [ ] Git configuré
- [ ] Compte Stripe (test keys)
- [ ] Google Maps API key

## Prochaines étapes

1. Suivre [SETUP.md](./SETUP.md)
2. Initialiser les services avec docker-compose
3. Créer les modèles MongoDB
4. Développer les endpoints API
5. Construire les composants React
6. Intégrer les tests
7. Déployer en production
