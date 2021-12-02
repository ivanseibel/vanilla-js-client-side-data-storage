const form = document.querySelector('form');
const input = document.querySelector('input');
const submitName = document.querySelector('#submitName');
const removeName = document.querySelector('#removeName');
const title = document.querySelector('#title');

const updateTitle = () => {
  const name = sessionStorage.getItem('name');
  title.textContent = name ? `Hello ${name}` : 'Hello nobody';
};


form.addEventListener('submit', (e) => {
  e.preventDefault();
});

submitName.addEventListener('click', (e) => {
  sessionStorage.setItem('name', input.value);
  updateTitle();
});

removeName.addEventListener('click', (e) => {
  sessionStorage.removeItem('name');
  updateTitle();
});

updateTitle();