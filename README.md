# Interactive Bookshop Next.js 🚀📚

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Node Version](https://img.shields.io/badge/node-22.x-brightgreen)](https://nodejs.org/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/taufiqelrahman/interactive-bookshop-nextjs/ci.yml?branch=main)](https://github.com/taufiqelrahman/interactive-bookshop-nextjs/actions)
[![Good First Issue](https://img.shields.io/badge/good%20first%20issue-friendly-brightgreen)](https://github.com/taufiqelrahman/interactive-bookshop-nextjs/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

**Interactive Bookshop Next.js** is an open-source web application for creating **personalized children's books** with e-commerce support. Built with a **Next.js + Redux + GraphQL + Shopify + PWA** stack, it’s ideal for learning modern full-stack development and contributing to a real project.

---

## ✨ Features

- **Character Customization**: Personalize characters with appearances, traits, and occupations
- **Interactive Story Builder**: Real-time preview of book pages
- **E-commerce Integration**: Shopify Buy SDK for cart & order management
- **GraphQL API**: Apollo Client for clean queries & mutations
- **PWA Ready**: Offline-first, installable, push notifications
- **Error Tracking**: Integrated Sentry for logging & monitoring
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Multi-language Support**: Internationalization via next-i18next

---

## 🛠 Tech Stack

**Frontend**

- Next.js 11.1.4 (SSR/SSG)
- React 17 + TypeScript
- Redux Toolkit + Thunk
- Tailwind CSS + Styled-JSX
- React Hook Form
- React-Select & React-Toastify

**Backend & Services**

- Express.js custom server
- GraphQL API via Apollo Client
- Shopify Buy SDK
- Sentry for error monitoring

**Dev & Testing**

- Jest + React Testing Library (unit, integration, E2E)
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
# Configure your GraphQL endpoint, Shopify API keys, Sentry DSN, etc.
pnpm run tinker
```

Visit http://localhost:3000 to explore the app.

⸻

### 📜 Scripts

```bash
- pnpm run dev - Start dev server
- pnpm run tinker - Dev + lint concurrently
- pnpm run build - Production build
- pnpm run start - Start server
- pnpm run deploy - Build + start
- pnpm run test - Run tests
- pnpm run lint - ESLint & Stylelint
- pnpm run analyze - Bundle analysis
```

⸻

## 🏗 Project Structure

```bash
├── components/      # Atoms, Molecules, Organisms
├── pages/           # Next.js pages & API routes
├── store/           # Redux store & slices
├── services/        # GraphQL, Shopify, Sentry
├── lib/             # Utilities
├── styles/          # Global styles
├── public/          # Static assets & demo screenshot
├── config/          # App configuration
└── _mocks/          # Test mocks
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
