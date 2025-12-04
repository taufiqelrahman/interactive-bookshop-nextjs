# Interactive Bookshop Next.js 🚀📚

[![Build Status](https://img.shields.io/github/actions/workflow/status/taufiqelrahman/interactive-bookshop-nextjs/ci.yml?branch=master)](https://github.com/taufiqelrahman/interactive-bookshop-nextjs/actions)
[![Good First Issue](https://img.shields.io/badge/good%20first%20issue-friendly-brightgreen)](https://github.com/taufiqelrahman/interactive-bookshop-nextjs/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
[![Node Version](https://img.shields.io/badge/node-22.x-brightgreen)](https://nodejs.org/)
![TypeScript](https://img.shields.io/badge/TS-4.9.5%20strict-blue)
![Next.js](https://img.shields.io/badge/Next.js-12.3.4-black)
![React](https://img.shields.io/badge/React-18.2.0-blue)

**Interactive Bookshop Next.js** is an open-source web application for creating **personalized children's books** with e-commerce support. Built with a **Next.js 12 + React 18 + Redux + Shopify + PWA** stack with **TypeScript strict mode**, it's ideal for learning modern full-stack development and contributing to a real project.

---

## ✨ Features

- **Character Customization**: Personalize characters with appearances, traits, and occupations
- **Interactive Story Builder**: Real-time preview of book pages
- **E-commerce Integration**: Shopify Buy SDK for cart & order management
- **REST API Integration**: Axios for clean API communication
- **PWA Ready**: Offline-first, installable, push notifications
- **Error Tracking**: Integrated Sentry for logging & monitoring
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Multi-language Support**: Internationalization via next-i18next
- **Type-Safe**: Full TypeScript strict mode with 300+ type fixes
- **Modern Stack**: Next.js 12 + React 18 for improved performance

---

## 🛠 Tech Stack

**Frontend**

- Next.js 12.3.4 (SSR/SSG with Pages Router)
- React 18.2.0 + TypeScript 4.9.5 (strict mode)
- Redux Toolkit 2.8.2 + Thunk
- Tailwind CSS 2.2.19 + Styled-JSX 5.0.7
- React Hook Form 4.7.1
- React-Select 3.0.8 & React-Toastify 5.5.0

**Backend & Services**

- Express.js custom server
- REST API via Axios
- Shopify Buy SDK
- Sentry for error monitoring

**Dev & Testing**

- Jest + React Testing Library (unit tests)
- Playwright (E2E tests)
- ESLint + Prettier
- Husky + lint-staged
- Bundle Analyzer

**Deployment**

- Docker containerization
- PWA features

---

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x+
- pnpm package manager

### Installation

```bash
git clone https://github.com/<your-username>/interactive-bookshop-nextjs.git
cd interactive-bookshop-nextjs
pnpm install
cp .env.example .env.local
# Configure your API endpoint, Shopify API keys, Sentry DSN, etc.
pnpm run tinker
```

Visit http://localhost:3000 to explore the app.

⸻

### 📜 Scripts

```bash
# Development
pnpm run dev              # Start dev server
pnpm run tinker           # Dev + lint concurrently
pnpm run build            # Production build
pnpm run start            # Start production server
pnpm run deploy           # Build + start

# Testing
pnpm run test             # Run unit tests
pnpm run test:e2e         # Run E2E tests with Playwright
pnpm run test:e2e:ui      # Run E2E tests in UI mode
pnpm run test:e2e:debug   # Debug E2E tests

# Code Quality
pnpm run lint             # ESLint & Stylelint
pnpm run format           # Prettier formatting
pnpm run analyze          # Bundle analysis
```

See [E2E Testing Guide](./docs/E2E_TESTING.md) for detailed testing documentation.

⸻

## 🏗 Project Structure

```bash
├── components/      # Atoms, Molecules, Organisms
├── pages/           # Next.js pages & API routes
├── e2e/             # Playwright E2E tests
├── store/           # Redux store & slices
├── services/        # API, Shopify, Sentry
├── lib/             # Utilities
├── styles/          # Global styles
├── public/          # Static assets
├── config/          # App configuration
├── docs/            # Documentation
└── .github/         # CI/CD workflows
```

⸻

## 🌍 Internationalization

- Built with next-i18next
- Supports multiple languages

## 📱 PWA Features

- Offline-first
- Installable
- Push notifications

⸻

## 🤝 Contributing

We ❤️ contributions!

- Check out good first issues here
- Fork the repo & create a branch:

```bash
git checkout -b feature/amazing-feature
```

- Commit & push your changes:

```bash
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

- Open a Pull Request to main.

### Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Keep code clean & formatted

⸻

## 📄 License

MIT License

## 🐛 Bug Reports & Feature Requests

Submit via [GitHub Issues](https://github.com/taufiqelrahman/interactive-bookshop-nextjs/issues).

⸻

Made with ❤️ for building interactive, personalized storybooks with a modern full-stack stack.
