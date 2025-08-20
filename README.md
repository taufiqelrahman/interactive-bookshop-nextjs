# WhenIGrowUp 📚

WhenIGrowUp is a modern web application for creating personalized children's books. Built with Next.js, TypeScript, and a comprehensive tech stack, it allows users to customize characters and create unique storybooks for children.

## ✨ Features

- **Character Customization**: Personalize characters with different appearances, occupations, and traits
- **Interactive Book Creation**: Dynamic form-based book generation
- **Multi-language Support**: Internationalization with next-i18next
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Progressive Web App**: PWA capabilities for offline usage
- **Real-time Preview**: Live book preview as users customize
- **E-commerce Integration**: Shopping cart and order management
- **User Accounts**: Authentication and user profile management

## 🛠 Tech Stack

### Frontend

- **Next.js 9.1.1** - React framework with SSR/SSG
- **React 16.11** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Styled-JSX** - CSS-in-JS styling
- **Redux** - State management with Redux Thunk

### Backend & Services

- **Express.js** - Custom server
- **GraphQL** - API with Apollo Client
- **Shopify Buy SDK** - E-commerce integration
- **Sentry** - Error tracking

### Development & Testing

- **Jest** - Testing framework
- **ESLint & Prettier** - Code formatting and linting
- **Husky** - Git hooks
- **Bundle Analyzer** - Performance optimization

### Deployment

- **Docker** - Containerization
- **PWA** - Progressive Web App features

## 🚀 Quick Start

### Prerequisites

- Node.js 22.17 or higher
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/taufiqelrahman/whenigrowup.git
cd whenigrowup
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:

```bash
pnpm run tinker
```

The application will be available at `http://localhost:3000`.

## 📜 Available Scripts

### Development

- `pnpm run dev` - Start development server with debugging
- `pnpm run tinker` - Run linting and development server concurrently
- `pnpm run debug` - Start server without debugging

### Building & Deployment

- `pnpm run build` - Build production application
- `pnpm run start` - Start production server
- `pnpm run deploy` - Build and start production server

### Testing & Quality

- `pnpm run test` - Run tests in watch mode with coverage
- `pnpm run test:ci` - Run tests for CI/CD
- `pnpm run test:e2e` - Run end-to-end tests
- `pnpm run lint` - Run ESLint and Stylelint

### Utilities

- `pnpm run analyze` - Analyze bundle size
- `pnpm run sitemap` - Generate sitemap

## 🏗 Project Structure

```
├── components/           # React components
│   ├── atoms/           # Basic UI components
│   ├── molecules/       # Composite components
│   └── organisms/       # Complex components
├── pages/               # Next.js pages and API routes
├── store/               # Redux store configuration
├── services/            # API and GraphQL services
├── lib/                 # Utility functions
├── styles/              # Global styles and fonts
├── public/              # Static assets
├── config/              # Application configuration
└── _mocks/              # Test mocks
```

## 🎨 Component Architecture

The project follows Atomic Design principles:

- **Atoms**: Basic building blocks (Button, TextField, etc.)
- **Molecules**: Simple combinations (FormTextField, CartItem, etc.)
- **Organisms**: Complex components (BookForm, NavBar, etc.)

## 🧪 Testing

The project includes comprehensive testing:

- Unit tests for components
- Integration tests
- E2E testing
- Coverage reporting

Run tests:

```bash
pnpm run test        # Development with watch mode
pnpm run test:ci     # CI/CD mode
```

## 🐳 Docker Deployment

Build and run with Docker:

```bash
docker build -t whenigrowup .
docker run -p 3000:3000 whenigrowup
```

Or use docker-compose:

```bash
docker-compose up
```

## 🌍 Internationalization

The app supports multiple languages using next-i18next. Language files are configured in `i18n.js`.

## 📱 PWA Features

- Offline functionality
- App-like experience
- Push notifications support
- Installable on devices

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```
# Add your environment variables here
NODE_ENV=development
# GraphQL endpoint
# Shopify configuration
# Sentry DSN
# Other API keys
```

## 📈 Performance Optimizations

- Image optimization with next-optimized-images
- CSS purging with PurgeCSS
- Bundle analysis
- Lazy loading components
- Progressive loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure code passes linting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Taufiq Rahman** - [@taufiqelrahman](https://github.com/taufiqelrahman)

## 🐛 Bug Reports & Feature Requests

Please use the [Issues](https://github.com/taufiqelrahman/whenigrowup/issues) section to report bugs or request features.

---

Made with ❤️ for creating magical stories for children
