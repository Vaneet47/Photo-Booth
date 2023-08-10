// Open a database
// create objectstore

let db;
let openRequest = indexedDB.open('myDataBase');

openRequest.addEventListener('success', () => {
  console.log('DB success');
  db = openRequest.result;
});

openRequest.addEventListener('error', () => {
  console.log('DB error');
});

openRequest.addEventListener('upgradeneeded', () => {
  console.log('DB upgraded and also for initial DB creation');
  db = openRequest.result;
  console.log(openRequest);
  console.log(openRequest.result);
  console.log(db);

  db.createObjectStore('video', { keyPath: 'id' });
  db.createObjectStore('image', { keyPath: 'id' });
});
