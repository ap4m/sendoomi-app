import { openDB } from 'idb';

const DB_NAME = 'sendoomi-db';
const STORE_NAME = 'ingested_links';
const DB_VERSION = 1;

/**
 * Initializes the IndexedDB database and object store.
 */
export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('timestamp', 'timestamp');
      }
    },
  });
}

/**
 * Persists a new ingested link.
 * 
 * @param {object} data - { title, text, link }
 */
export async function saveLink(data) {
  const db = await initDB();
  return db.add(STORE_NAME, {
    ...data,
    timestamp: Date.now(),
  });
}

/**
 * Retrieves all saved links, sorted by timestamp (newest first).
 */
export async function getAllLinks() {
  const db = await initDB();
  const items = await db.getAllFromIndex(STORE_NAME, 'timestamp');
  return items.reverse(); // Newest first
}

/**
 * Clears all links from the store.
 */
export async function clearAllLinks() {
  const db = await initDB();
  return db.clear(STORE_NAME);
}
