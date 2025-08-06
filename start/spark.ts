import database from '#config/database';
import { spark } from 'bun-spark';

export default spark(database);
