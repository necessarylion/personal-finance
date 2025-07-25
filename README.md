# Personal Finance API

A comprehensive personal finance management API built with Bun, TypeScript, and PostgreSQL. This API provides endpoints for managing users, accounts, transactions, categories, and budgets.

## Features

- **User Management**: Create, update, and manage user accounts
- **Account Management**: Track multiple financial accounts (checking, savings, credit, investment, cash)
- **Transaction Tracking**: Record income, expenses, and transfers with categories
- **Category Management**: Organize transactions with custom categories
- **Budget Management**: Set and track budgets for categories with progress monitoring
- **Clean Architecture**: Repository pattern with dependency injection
- **Data Validation**: Comprehensive input validation using VineJS
- **Database Migrations**: Automated database schema management

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **Validation**: VineJS
- **Dependency Injection**: TypeDI
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Docker and Docker Compose
- Bun (for local development)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-finance
   ```

2. **Start the database and Redis**
   ```bash
   docker-compose up -d
   ```

3. **Install dependencies**
   ```bash
   bun install
   ```

4. **Run database migrations**
   ```bash
   bun run migration:run
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Users
- `GET /users` - List all users
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Accounts
- `GET /accounts` - List all accounts for the authenticated user
- `POST /accounts` - Create a new account
- `GET /accounts/:id` - Get account details
- `PUT /accounts/:id` - Update an account
- `DELETE /accounts/:id` - Delete an account

### Categories
- `GET /categories` - List all categories for the authenticated user
- `POST /categories` - Create a new category
- `GET /categories/:id` - Get category details
- `PUT /categories/:id` - Update a category
- `DELETE /categories/:id` - Delete a category
- `GET /categories/type/:type` - Get categories by type (income/expense)

### Transactions
- `GET /transactions` - List all transactions for the authenticated user
- `POST /transactions` - Create a new transaction
- `GET /transactions/:id` - Get transaction details
- `PUT /transactions/:id` - Update a transaction
- `DELETE /transactions/:id` - Delete a transaction
- `GET /transactions/account/:accountId` - Get transactions by account
- `GET /transactions/category/:categoryId` - Get transactions by category
- `GET /transactions/date-range` - Get transactions by date range
- `GET /transactions/stats` - Get transaction statistics

### Budgets
- `GET /budgets` - List all budgets for the authenticated user
- `POST /budgets` - Create a new budget
- `GET /budgets/:id` - Get budget details
- `PUT /budgets/:id` - Update a budget
- `DELETE /budgets/:id` - Delete a budget
- `GET /budgets/category/:categoryId` - Get budget by category
- `GET /budgets/active` - Get active budgets
- `GET /budgets/category/:categoryId/progress` - Get budget progress

## Data Models

### User
```typescript
{
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
```

### Account
```typescript
{
  id: number;
  user_id: number;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'cash';
  balance: number;
  currency: string;
  is_active: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
```

### Category
```typescript
{
  id: number;
  user_id: number;
  name: string;
  type: 'income' | 'expense';
  color?: string;
  icon?: string;
  is_active: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
```

### Transaction
```typescript
{
  id: number;
  user_id: number;
  account_id: number;
  category_id: number;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  description: string;
  date: Date;
  is_recurring: boolean;
  recurring_frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
```

### Budget
```typescript
{
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  period: 'monthly' | 'yearly';
  start_date: Date;
  end_date?: Date;
  is_active: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/personal_finance
REDIS_URL=redis://localhost:6379
```

## Development

### Running Tests
```bash
bun test
```

### Linting
```bash
bun run lint
```

### Building
```bash
bun run build
```

### Database Migrations
```bash
# Run migrations
bun run migration:run

# Rollback migrations
bun run migration:rollback
```

## Architecture

The application follows a clean architecture pattern with:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Handle data access and persistence
- **Models**: Define data structures
- **Validators**: Validate input data
- **Middleware**: Handle cross-cutting concerns

All dependencies are injected using TypeDI for better testability and maintainability.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
