localStorage.setItem('name', 'John Doe');
localStorage.setItem('age', '30');

localStorage.removeItem('age');

const name = localStorage.getItem('name');
const h1 = document.querySelector('#title');

h1.textContent = name ? `Hello ${name}` : 'Hello nobody';