import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  try {
    console.log('Put to the database');
    const contentDb = await openDB('jate', 1);
    const tx = contentDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.add({ content: content });
    const result = await request;
    console.log('Data saved to the database', result);
  } catch (err) {
    console.error(err);
  }
};

export const getDb = async () => {
  try {
    console.log('GET from the database');
    const contentDb = await openDB('jate', 1);
    const tx = contentDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

initdb();
