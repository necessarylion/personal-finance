#!/bin/bash

# Test script for Personal Finance API
# Make sure the server is running on http://localhost:3000

BASE_URL="http://localhost:3333"

echo "🧪 Testing Personal Finance API"
echo "================================"

# Test 1: Create a user
echo "1. Creating a user..."
USER_RESPONSE=$(curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }')
echo "User created: $USER_RESPONSE"

# Test 2: Create an account
echo "2. Creating an account..."
ACCOUNT_RESPONSE=$(curl -s -X POST "$BASE_URL/accounts" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Main Checking",
    "type": "checking",
    "balance": 2500.00,
    "currency": "USD",
    "is_active": true
  }')
echo "Account created: $ACCOUNT_RESPONSE"

# Test 3: Create a category
echo "3. Creating a category..."
CATEGORY_RESPONSE=$(curl -s -X POST "$BASE_URL/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Groceries",
    "type": "expense",
    "color": "#FF6B6B",
    "icon": "shopping-cart"
  }')
echo "Category created: $CATEGORY_RESPONSE"

# Test 4: Create a transaction
echo "4. Creating a transaction..."
TRANSACTION_RESPONSE=$(curl -s -X POST "$BASE_URL/transactions" \
  -H "Content-Type: application/json" \
  -d '{
    "account_id": 1,
    "category_id": 1,
    "amount": 50.25,
    "type": "expense",
    "description": "Grocery shopping",
    "date": "2024-01-15",
    "is_recurring": false
  }')
echo "Transaction created: $TRANSACTION_RESPONSE"

# Test 5: Create a budget
echo "5. Creating a budget..."
BUDGET_RESPONSE=$(curl -s -X POST "$BASE_URL/budgets" \
  -H "Content-Type: application/json" \
  -d '{
    "category_id": 1,
    "amount": 500.00,
    "period": "monthly",
    "start_date": "2024-01-01",
    "is_active": true
  }')
echo "Budget created: $BUDGET_RESPONSE"

# Test 6: List all resources
echo "6. Listing all resources..."
echo "Users:"
curl -s "$BASE_URL/users" | jq '.'

echo "Accounts:"
curl -s "$BASE_URL/accounts" | jq '.'

echo "Categories:"
curl -s "$BASE_URL/categories" | jq '.'

echo "Transactions:"
curl -s "$BASE_URL/transactions" | jq '.'

echo "Budgets:"
curl -s "$BASE_URL/budgets" | jq '.'

echo "✅ API tests completed!" 