# Personal Finance API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Currently, the API uses a simple user ID (hardcoded as 1) for demonstration. In a production environment, implement proper JWT authentication.

## API Endpoints

### Users

#### GET /users
List all users.

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /users
Create a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Accounts

#### GET /accounts
List all accounts for the authenticated user.

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Main Checking",
    "type": "checking",
    "balance": 2500.50,
    "currency": "USD",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /accounts
Create a new account.

**Request Body:**
```json
{
  "name": "Savings Account",
  "type": "savings",
  "balance": 5000.00,
  "currency": "USD",
  "is_active": true
}
```

**Response:**
```json
{
  "id": 2,
  "user_id": 1,
  "name": "Savings Account",
  "type": "savings",
  "balance": 5000.00,
  "currency": "USD",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### GET /accounts/:id
Get account details.

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "name": "Main Checking",
  "type": "checking",
  "balance": 2500.50,
  "currency": "USD",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Categories

#### GET /categories
List all categories for the authenticated user.

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Groceries",
    "type": "expense",
    "color": "#FF6B6B",
    "icon": "shopping-cart",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /categories
Create a new category.

**Request Body:**
```json
{
  "name": "Salary",
  "type": "income",
  "color": "#4ECDC4",
  "icon": "dollar-sign"
}
```

#### GET /categories/type/:type
Get categories by type (income or expense).

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Groceries",
    "type": "expense",
    "color": "#FF6B6B",
    "icon": "shopping-cart",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Transactions

#### GET /transactions
List all transactions for the authenticated user.

**Query Parameters:**
- `limit` (optional): Number of transactions to return (default: 50)
- `offset` (optional): Number of transactions to skip (default: 0)

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "account_id": 1,
    "category_id": 1,
    "amount": 50.25,
    "type": "expense",
    "description": "Grocery shopping",
    "date": "2024-01-15",
    "is_recurring": false,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### POST /transactions
Create a new transaction.

**Request Body:**
```json
{
  "account_id": 1,
  "category_id": 1,
  "amount": 50.25,
  "type": "expense",
  "description": "Grocery shopping",
  "date": "2024-01-15",
  "is_recurring": false
}
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "account_id": 1,
  "category_id": 1,
  "amount": 50.25,
  "type": "expense",
  "description": "Grocery shopping",
  "date": "2024-01-15",
  "is_recurring": false,
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

#### GET /transactions/account/:accountId
Get transactions by account.

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "account_id": 1,
    "category_id": 1,
    "amount": 50.25,
    "type": "expense",
    "description": "Grocery shopping",
    "date": "2024-01-15",
    "is_recurring": false,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### GET /transactions/category/:categoryId
Get transactions by category.

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "account_id": 1,
    "category_id": 1,
    "amount": 50.25,
    "type": "expense",
    "description": "Grocery shopping",
    "date": "2024-01-15",
    "is_recurring": false,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### GET /transactions/date-range
Get transactions by date range.

**Query Parameters:**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "account_id": 1,
    "category_id": 1,
    "amount": 50.25,
    "type": "expense",
    "description": "Grocery shopping",
    "date": "2024-01-15",
    "is_recurring": false,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### GET /transactions/stats
Get transaction statistics.

**Query Parameters:**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

**Response:**
```json
[
  {
    "type": "income",
    "total_amount": 5000.00,
    "transaction_count": 2
  },
  {
    "type": "expense",
    "total_amount": 1250.75,
    "transaction_count": 8
  }
]
```

### Budgets

#### GET /budgets
List all budgets for the authenticated user.

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "amount": 500.00,
    "period": "monthly",
    "start_date": "2024-01-01",
    "end_date": null,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /budgets
Create a new budget.

**Request Body:**
```json
{
  "category_id": 1,
  "amount": 500.00,
  "period": "monthly",
  "start_date": "2024-01-01",
  "is_active": true
}
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "category_id": 1,
  "amount": 500.00,
  "period": "monthly",
  "start_date": "2024-01-01",
  "end_date": null,
  "is_active": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### GET /budgets/category/:categoryId
Get budget by category.

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "category_id": 1,
  "amount": 500.00,
  "period": "monthly",
  "start_date": "2024-01-01",
  "end_date": null,
  "is_active": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### GET /budgets/active
Get active budgets.

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "amount": 500.00,
    "period": "monthly",
    "start_date": "2024-01-01",
    "end_date": null,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /budgets/category/:categoryId/progress
Get budget progress for a category.

**Query Parameters:**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

**Response:**
```json
{
  "budget_amount": 500.00,
  "spent_amount": 250.75,
  "remaining_amount": 249.25,
  "percentage_used": 50.15
}
```

## Error Responses

### Validation Error (422)
```json
{
  "code": "VALIDATION_EXCEPTION",
  "message": "Validation failed",
  "status": 422,
  "errors": [
    {
      "field": "email",
      "rule": "email",
      "message": "The email field must be a valid email address"
    }
  ]
}
```

### Not Found Error (404)
```json
{
  "code": "NOT_FOUND",
  "message": "Resource not found",
  "status": 404
}
```

### Server Error (500)
```json
{
  "code": "INTERNAL_SERVER_ERROR",
  "message": "An unexpected error occurred",
  "status": 500
}
```

## Data Types

### Account Types
- `checking`: Checking account
- `savings`: Savings account
- `credit`: Credit card
- `investment`: Investment account
- `cash`: Cash

### Transaction Types
- `income`: Income transaction
- `expense`: Expense transaction
- `transfer`: Transfer between accounts

### Category Types
- `income`: Income category
- `expense`: Expense category

### Budget Periods
- `monthly`: Monthly budget
- `yearly`: Yearly budget

### Recurring Frequencies
- `daily`: Daily recurring transaction
- `weekly`: Weekly recurring transaction
- `monthly`: Monthly recurring transaction
- `yearly`: Yearly recurring transaction 