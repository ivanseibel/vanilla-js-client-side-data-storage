const db = new Dexie('my-database');
db.version(1).stores({
  contacts: '++id, firstName, lastName',
});

db.contacts.put({
  id: 2,
  firstName: 'John',
  lastName: 'Doe',
});