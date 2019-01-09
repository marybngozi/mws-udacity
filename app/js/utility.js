
const dbPromise = idb.open('restaurants-store', 1, (db) => {
  if (!db.objectStoreNames.contains('restaurants')) {
    db.createObjectStore('restaurants', {keyPath: 'id'});
  }
  /* if (!db.objectStoreNames.contains('sync-posts')) {
    db.createObjectStore('sync-posts', {keyPath: 'id'});
  } */
})

function writeData(stall, data) {
  return dbPromise.then(db => {
    const tx = db.transaction(stall, 'readwrite');
    const store = tx.objectStore(stall);
    store.put(data);
    return tx.complete;
  })
}

function readAllData(stall) {
  return dbPromise.then(db => {
    const tx = db.transaction(stall, 'readonly');
    const store = tx.objectStore(stall);
    return store.getAll();
  })
}

function clearAllData(stall) {
  return dbPromise.then(db => {
    const tx = db.transaction(stall, 'readwrite');
    const store = tx.objectStore(stall)
    store.clear();
    return tx.complete;
  })
}

function deleteItemFrmData(stall, id) {
  dbPromise.then(db => {
    const tx = db.transaction(stall, 'readwrite');
    const store = tx.objectStore(stall);
    store.delete(id);
    return tx.complete;
  })
  .then(() => {
    console.log('Item Deleted');
  })
}