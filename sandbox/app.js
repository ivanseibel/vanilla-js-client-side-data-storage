let database;

const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const newContactForm = document.querySelector('form');

window.onload = () => {
  let request = window.indexedDB.open('contacts', 1);

  request.onerror = () => {
    console.log('Failed on open indexedDB database!');
  }

  request.onsuccess = () => {
    database = request.result;
    console.log('Success on open indexedDB database!');
  }

  request.onupgradeneeded = (e) => {
    database = e.target.result;
    let objectStore = database.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('firstName', 'firstName', { unique: false });
    objectStore.createIndex('lastName', 'lastName', { unique: false });
    console.log('Success on upgrade indexedDB database!');
  }
}