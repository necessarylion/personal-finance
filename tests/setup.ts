import { Migration } from '#core/migration';

export async function setupTestDatabase() {
  try {
    const migration = new Migration();
    await migration.up();
    console.log('Test database setup completed');
  } catch (error) {
    console.error('Test database setup failed:', error);
    throw error;
  }
} 