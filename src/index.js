import './styles.css';
import ApiService from './js/apiService';
import refs from './js/refs';
import card from './templates/card.hbs';




const newService = new ApiService();

refs.searchForm.addEventListener('submit', searchImages);
let Flag = false;


function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}



function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', card(images));
}



function searchImages(event) {
  Flag = false;
  event.preventDefault();
  newService.query = event.currentTarget.elements.query.value;

  if (newService.query === '') {
    return alert('enter something...');
  }

  newService.resetPage();
      clearImagesContainer();
      
  newService.fetchImages().then(img => {
    appendImagesMarkup(img);
    newService.incrementPage();
  });
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newService.query && Flag) {
      newService.fetchImages().then(img => {
        appendImagesMarkup(img);
        newService.incrementPage();
      });
    }
  });
  Flag = true;
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '500px',
});
observer.observe(refs.sentinel);