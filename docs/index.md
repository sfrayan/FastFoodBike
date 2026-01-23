# 🚴‍♂️ FastFoodBike Documentation

Welcome to the official documentation for **FastFoodBike** - A modern food delivery platform on bikes.

## 🚀 Quick Links

- [📖 Setup Guide](./SETUP.md) - Get started locally
- [🔌 API Documentation](./API.md) - REST API reference
- [🤝 Contribute](../CONTRIBUTING.md) - Contribution guidelines
- [🗙️ Project Board](https://github.com/sfrayan/FastFoodBike/projects/1)

## 📚 Table of Contents

### Getting Started
1. **[Installation](./SETUP.md)** - How to set up your development environment
2. **[Configuration](./SETUP.md#configuration-de-lenvironnement)** - Environment variables and setup
3. **[Database](./SETUP.md#base-de-donn%C3%A9es)** - Database setup options

### Development
1. **[API Overview](./API.md)** - API endpoints and usage
2. **[Architecture](./ARCHITECTURE.md)** - System architecture
3. **[Security](./SECURITY.md)** - Security best practices

### Deployment
1. **[Docker Setup](../docker-compose.yml)** - Docker configuration
2. **[CI/CD Pipeline](../.github/workflows/)** - Automated testing and deployment
3. **[Production Guide](./DEPLOYMENT.md)** - Production deployment

## 🌡️ Features

### For Customers
- 🔍 Search and browse restaurants
- 🛒 Add items to cart and checkout
- 📍 Real-time delivery tracking
- 💳 Secure payment processing
- ⭐ Rate and review orders

### For Restaurants
- 📊 Dashboard management
- 📝 Menu management
- 📦 Order management
- 📈 Analytics and reporting
- 🔔 Real-time notifications

### For Delivery Drivers
- 📍 Route optimization
- 💰 Earnings tracking
- 🗺️ GPS integration
- 💬 Direct customer communication
- 📊 Order history

## 🛠️ Tech Stack

- **Frontend**: React, React Native, Flutter
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, PostgreSQL
- **Cache**: Redis
- **Message Queue**: RabbitMQ
- **DevOps**: Docker, GitHub Actions
- **Deployment**: Heroku, Vercel, Railway

## 📁 Project Structure

```
FastFoodBike/
├── backend/          # API server
├── frontend/         # Web application
├── mobile/           # Mobile apps
├── docs/             # Documentation
├── .github/          # GitHub Actions & configs
└── docker-compose.yml # Local development setup
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Docker (optional)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/sfrayan/FastFoodBike.git
cd FastFoodBike

# Start services with Docker
docker-compose up -d

# Install backend dependencies
cd backend
npm install
npm run dev

# In another terminal, install frontend dependencies
cd ../frontend
npm install
npm start
```

For detailed setup instructions, see [Setup Guide](./SETUP.md).

## 📦 API Documentation

The API is fully documented with examples. Start here:

- [Authentication](./API.md#authentification)
- [Restaurants](./API.md#restaurants)
- [Orders](./API.md#commandes)
- [Deliveries](./API.md#livraisons)
- [Users](./API.md#utilisateurs)

For interactive API documentation, visit: `http://localhost:5000/api/docs`

## 📔 Contributing

We welcome contributions! Please read our [Contributing Guide](../CONTRIBUTING.md) first.

### Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 🔍 CI/CD Pipeline

Our automated workflows ensure code quality:

- ✅ Unit & integration tests
- 🔍 ESLint & code quality checks
- 📦 Docker image builds
- 📘 Documentation deployment
- 🚀 Automated production deployment

See [Workflows](.github/workflows/) for details.

## 🎆 Roadmap

- [ ] Real-time GPS tracking
- [ ] AI-powered route optimization
- [ ] Payment gateway integrations
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app launch

## 📞 Support

- 💬 [GitHub Discussions](https://github.com/sfrayan/FastFoodBike/discussions)
- 📧 Email support
- 📚 [Wiki](https://github.com/sfrayan/FastFoodBike/wiki)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

Thanks to all contributors and the amazing open-source community!

---

**Last updated**: January 23, 2026
