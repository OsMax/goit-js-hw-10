import API from './js/cat-api';

const catSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

const pError = document.querySelector('.error');
const pLoad = document.querySelector('.loader');

fetchCatsAll();

catSelect.addEventListener('change', chooseCat);

function fetchCatsAll() {
  API.fetchBreeds()
    .then(cats => renderCatList(cats))
    .catch(error => console.log(error));
}

function renderCatList(cats) {
  const markup = cats
    .map(cat => {
      return `<option value ='${cat.id}'>${cat.name}</option>`;
    })
    .join('');
  catSelect.innerHTML = markup;
}

function chooseCat(e) {
  API.fetchCatByBreed(e.target.value)
    .then(cat => {
      renderCatInfo(cat);
    })
    .catch(error => console.log(error));
}

function renderCatInfo(cat) {
  console.log(cat);
  let inf = `
    <img src="${cat[0].url}" alt="${cat[0].breeds[0].name}" width="600"/>
    <div>
      <h2>${cat[0].breeds[0].name}</h2>
      <p>${cat[0].breeds[0].description}</p>
      <p><b>Temperament:&nbsp;</b><span>${cat[0].breeds[0].temperament}</span></p>
    </div>`;
  catInfo.innerHTML = inf;
}
