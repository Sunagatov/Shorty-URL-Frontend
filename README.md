<div align="center">
  <br>
  <h1>🔗 Shorty URL Frontend</h1>
  <p><strong>A modern React frontend for URL shortening — clean, fast, and type-safe.</strong></p>
  <p>
    <a href="https://t.me/zufarexplained">💬 Community</a> ·
    <a href="https://github.com/Sunagatov/Shorty-URL-Frontend/issues?q=is%3Aopen+label%3A%22good+first+issue%22">🟢 Good First Issues</a> ·
    <a href="https://github.com/Sunagatov/Shorty-URL-Frontend/issues">🐛 Issues</a>
  </p>

  [![License: CC BY-NC 4.0](https://img.shields.io/badge/license-CC%20BY--NC%204.0-lightgrey.svg)](LICENSE)
  [![GitHub Stars](https://img.shields.io/github/stars/Sunagatov/Shorty-URL-Frontend)](https://github.com/Sunagatov/Shorty-URL-Frontend/stargazers)
  [![Contributors](https://img.shields.io/github/contributors/Sunagatov/Shorty-URL-Frontend)](https://github.com/Sunagatov/Shorty-URL-Frontend/graphs/contributors)
</div>

---

## 🚀 Quick Start

**📋 Prerequisites:** Node.js 18+, npm

```bash
# 1. 📥 Clone
git clone https://github.com/Sunagatov/Shorty-URL-Frontend.git && cd Shorty-URL-Frontend

# 2. 📦 Install dependencies
npm install

# 3. 🔧 Set up environment variables
# Create a .env file with:
# REACT_APP_BACKEND_REST_API_URL=your_backend_url

# 4. ▶️ Start development server
npm start
```

> ⚠️ **Never commit `.env` with real credentials.** It is listed in `.gitignore` — keep it that way.

---

## 🤔 What is this?

Shorty URL Frontend is a React + TypeScript SPA that lets users shorten long URLs, manage their links, and track usage. It communicates with the Shorty URL backend via REST API and supports Google OAuth authentication.

---

## 🛠️ Tech Stack

| 📂 Category | 🔧 Technology |
|---|---|
| 💻 Language | TypeScript 5 |
| ⚛️ Framework | React 19, React Router 7 |
| 📋 Forms | React Hook Form 7 + Zod 4 |
| 🌐 HTTP | Axios |
| 🔑 Auth | JWT + Google OAuth (`@react-oauth/google`) |
| 🎨 Styling | Tailwind CSS 4 |
| ⚡ Build | Vite 8 |
| 🧪 Testing | Vitest, Testing Library |

---

## ✨ Features

| Feature | Description | Spec |
|---|---|---|
| 🔐 **Sign Up** | Create account with email/password, receive JWT tokens | [docs/features/auth-signup.md](docs/features/auth-signup.md) |
| 🔑 **Sign In** | Authenticate with credentials, automatic token refresh | [docs/features/auth-signin.md](docs/features/auth-signin.md) |
| 🔄 **Token Refresh** | Seamless access token renewal via Axios interceptor | [docs/features/auth-refresh-token.md](docs/features/auth-refresh-token.md) |
| 🔗 **Shorten URL** | Convert long URLs to short links with expiration | [docs/features/url-shorten.md](docs/features/url-shorten.md) |
| ↗️ **URL Redirect** | Fast 302 redirects from short URLs to originals | [docs/features/url-redirect.md](docs/features/url-redirect.md) |

> Each feature has a comprehensive spec covering user stories, functional requirements, user flows, data models, security, and acceptance criteria.

---

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── constants/      # Application constants
├── context/        # React contexts (auth, etc.)
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── pages/          # Page components
├── services/       # API and business logic
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|---|---|
| `REACT_APP_BACKEND_REST_API_URL` | ✅ | Backend REST API base URL |

---

## 🧪 Scripts

| Script | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests with Vitest |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |

---

## 🚢 Deployment

```bash
npm run build
```

The `dist/` folder contains optimized files ready for deployment. A `Dockerfile` and `docker-compose.prod.yml` are included for containerized deployments.

---

## 🤝 Contributing

🎉 Contributions are welcome.

| 🎯 Situation | 🚀 Action |
|---|---|
| 🐛 Found a bug | [Open an issue](https://github.com/Sunagatov/Shorty-URL-Frontend/issues/new) with the `bug` label |
| 💡 Want a feature | Start a [Discussion](https://github.com/Sunagatov/Shorty-URL-Frontend/discussions) first |
| 👨‍💻 Ready to code | Pick a [`good first issue`](https://github.com/Sunagatov/Shorty-URL-Frontend/issues?q=is%3Aopen+label%3A%22good+first+issue%22), comment "I'm on it" |
| 🔧 Big change | Comment on the issue before writing code — tickets may have hidden constraints |

---

## 📄 License

📜 [CC BY-NC 4.0](LICENSE) — free for educational and personal use with author attribution. Commercial use requires explicit written permission from the author ([zufar.sunagatov@gmail.com](mailto:zufar.sunagatov@gmail.com)).

---

## 📞 Contact

- 💬 **Telegram community:** [Zufar Explained IT](https://t.me/zufarexplained)
- 👤 **Personal Telegram:** [@lucky_1uck](https://web.telegram.org/k/#@lucky_1uck)
- 📧 **Email:** [zufar.sunagatov@gmail.com](mailto:zufar.sunagatov@gmail.com)
- 🐛 **Issues:** [GitHub Issues](https://github.com/Sunagatov/Shorty-URL-Frontend/issues)

❤️
