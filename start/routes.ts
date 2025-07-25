import UserController from '#controllers/user.controller';
import AccountController from '#controllers/account.controller';
import CategoryController from '#controllers/category.controller';
import TransactionController from '#controllers/transaction.controller';
import BudgetController from '#controllers/budget.controller';
import Route from '#core/route';

// User routes
Route.group('/users', () => {
  Route.get('/', [UserController, 'index']);
  Route.post('/', [UserController, 'create']);
  Route.put('/:id', [UserController, 'update']);
  Route.delete('/:id', [UserController, 'destroy']);
});

// Account routes
Route.group('/accounts', () => {
  Route.get('/', [AccountController, 'index']);
  Route.post('/', [AccountController, 'create']);
  Route.get('/:id', [AccountController, 'show']);
  Route.put('/:id', [AccountController, 'update']);
  Route.delete('/:id', [AccountController, 'destroy']);
});

// Category routes
Route.group('/categories', () => {
  Route.get('/', [CategoryController, 'index']);
  Route.post('/', [CategoryController, 'create']);
  Route.get('/:id', [CategoryController, 'show']);
  Route.put('/:id', [CategoryController, 'update']);
  Route.delete('/:id', [CategoryController, 'destroy']);
  Route.get('/type/:type', [CategoryController, 'getByType']);
});

// Transaction routes
Route.group('/transactions', () => {
  Route.get('/', [TransactionController, 'index']);
  Route.post('/', [TransactionController, 'create']);
  Route.get('/:id', [TransactionController, 'show']);
  Route.put('/:id', [TransactionController, 'update']);
  Route.delete('/:id', [TransactionController, 'destroy']);
  Route.get('/account/:accountId', [TransactionController, 'getByAccount']);
  Route.get('/category/:categoryId', [TransactionController, 'getByCategory']);
  Route.get('/date-range', [TransactionController, 'getByDateRange']);
  Route.get('/stats', [TransactionController, 'getStats']);
});

// Budget routes
Route.group('/budgets', () => {
  Route.get('/', [BudgetController, 'index']);
  Route.post('/', [BudgetController, 'create']);
  Route.get('/:id', [BudgetController, 'show']);
  Route.put('/:id', [BudgetController, 'update']);
  Route.delete('/:id', [BudgetController, 'destroy']);
  Route.get('/category/:categoryId', [BudgetController, 'getByCategory']);
  Route.get('/active', [BudgetController, 'getActive']);
  Route.get('/category/:categoryId/progress', [BudgetController, 'getProgress']);
});
