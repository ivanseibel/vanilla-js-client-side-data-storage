let database;

const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const newContactForm = document.querySelector('form');
const refreshContactsButton = document.querySelector('#refreshContacts');
const contactsList = document.querySelector('#contactsList');

window.onload = () => {
  let request = window.indexedDB.open('contacts', 1);

  request.onerror = () => {
    console.log('Failed on open indexedDB database!');
  }

  request.onsuccess = () => {
    database = request.result;
    displayContacts();
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

const addData = (e) => {
  e.preventDefault();

  let transaction = database.transaction(['contacts'], 'readwrite');
  let objectStore = transaction.objectStore('contacts');

  let firstName = firstNameInput.value;
  let lastName = lastNameInput.value;

  let request = objectStore.add({ firstName, lastName });

  request.onsuccess = () => {
    firstNameInput.value = '';
    lastNameInput.value = '';
    displayContacts();
    console.log('Success on add data!');
  }

  request.onerror = () => {
    console.log('Failed on add data!');
  }
}

newContactForm.addEventListener('submit', addData);

const deleteContact = (id) => {
  let transaction = database.transaction(['contacts'], 'readwrite');
  let objectStore = transaction.objectStore('contacts');

  let request = objectStore.delete(Number(id));

  request.onsuccess = (e) => {
    displayContacts();
    console.log('Success on delete data!');
  }

  request.onerror = () => {
    console.log('Failed on delete data!');
  }

}

const displayContacts = () => {
  let transaction = database.transaction(['contacts'], 'readonly');
  let objectStore = transaction.objectStore('contacts');
  contactsList.innerHTML = '';

  let request = objectStore.openCursor();

  request.onsuccess = () => {
    let cursor = request.result;

    if (cursor) {
      let li = document.createElement('li');
      let contactName = document.createElement('span');
      let deleteButton = document.createElement('button');

      contactName.textContent = `${cursor.value.firstName} ${cursor.value.lastName}`;

      deleteButton.setAttribute('data-contact-id', cursor.value.id);
      deleteButton.className = 'deleteButton';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteContact(deleteButton.getAttribute('data-contact-id'));
      });

      li.appendChild(deleteButton);
      li.appendChild(contactName);

      contactsList.appendChild(li);

      cursor.continue();
    } else {
      if (!contactsList.hasChildNodes()) {
        let li = document.createElement('li');
        li.innerHTML = 'No contacts found!';
        contactsList.appendChild(li);
      }
    }
  }
}

refreshContactsButton.addEventListener('click', displayContacts);
