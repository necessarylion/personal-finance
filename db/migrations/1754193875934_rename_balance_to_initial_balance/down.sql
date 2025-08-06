-- Rollback: Rename initial_balance column back to balance in accounts table
ALTER TABLE accounts RENAME COLUMN initial_balance TO balance; 