# Shorty URL Frontend

A modern, type-safe React application for URL shortening built with TypeScript, following SOLID principles and best practices.

## 🚀 Features

- **Modern React 18** with TypeScript
- **Form Validation** using React Hook Form + Zod
- **Type Safety** with comprehensive TypeScript definitions
- **Authentication** with JWT tokens and refresh token handling
- **Responsive Design** with Tailwind CSS
- **Code Quality** with ESLint and Prettier
- **SOLID Principles** implementation
- **Custom Hooks** for reusable logic
- **Centralized API Management**
- **Error Handling** with user-friendly messages

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── constants/          # Application constants
├── context/           # React contexts
├── hooks/             # Custom React hooks
├── layouts/           # Layout components
├── pages/             # Page components
├── services/          # API and business logic
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🛠️ Available Scripts

### Development
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

### Code Quality
- `npm run lint` - Runs ESLint and fixes issues
- `npm run lint:check` - Checks for linting issues
- `npm run format` - Formats code with Prettier
- `npm run format:check` - Checks code formatting
- `npm run type-check` - Runs TypeScript type checking
- `npm run pre-commit` - Runs all quality checks

## 🔧 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file with:
   ```
   REACT_APP_BACKEND_REST_API_URL=your_backend_url
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

## 🏗️ Architecture

### SOLID Principles Implementation

- **Single Responsibility**: Each component/service has one clear purpose
- **Open/Closed**: Components are open for extension, closed for modification
- **Liskov Substitution**: Interfaces are properly implemented
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Dependencies are injected, not hardcoded

### Key Improvements

1. **Type Safety**: Comprehensive TypeScript types for all data structures
2. **Form Validation**: Zod schemas for robust client-side validation
3. **Error Handling**: Centralized error management with user-friendly messages
4. **Code Organization**: Clear separation of concerns with dedicated folders
5. **Performance**: Optimized re-renders and efficient state management
6. **Maintainability**: Consistent code style with ESLint and Prettier

## 🔐 Authentication

The app implements secure authentication with:
- JWT access tokens
- Refresh token rotation
- Automatic token refresh
- Protected routes
- Secure token storage

## 📱 Responsive Design

Built with mobile-first approach using Tailwind CSS for:
- Responsive layouts
- Consistent design system
- Accessible components
- Modern UI patterns

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🚀 Deployment

Build for production:
```bash
npm run build
```

The build folder contains optimized files ready for deployment.

## 🤝 Contributing

1. Run quality checks before committing:
   ```bash
   npm run pre-commit
   ```

2. Follow the established code style and patterns
3. Add tests for new features
4. Update documentation as needed

## 📄 License

This project is licensed under the MIT License.