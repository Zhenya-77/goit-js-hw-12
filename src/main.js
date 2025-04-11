import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-function.js";


let currentPage = 1;
let currentSearchQuery = '';
let totalHits = 0;

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const searchText = form.elements['search-text'].value.trim();
  if (!searchText) {
    iziToast.warning({ message: "Please enter a search term", position: 'topRight' });
    return;
  }

  currentSearchQuery = searchText;
  currentPage = 1;  
  clearGallery();    
  showLoader();      

  try {
    const data = await getImagesByQuery(currentSearchQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({ message: "Sorry, no images found.", position: 'topRight' });
    } else {
      createGallery(data.hits);
      totalHits = data.totalHits;
      checkLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: "Error fetching images.", position: 'topRight' });
  } finally {
    hideLoader();
  }
});


loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentSearchQuery, currentPage);
    
    createGallery(data.hits);
    totalHits = data.totalHits;
    checkLoadMoreButton();

    smoothScroll();  
  } catch (error) {
    iziToast.error({ message: "Error fetching images.", position: 'topRight' });
  } finally {
    hideLoader();
  }
});


function checkLoadMoreButton() {
  if (galleryContainer.children.length >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({ message: "You've reached the end of the results.", position: 'topRight' });
  } else {
    showLoadMoreButton();
  }
}


function smoothScroll() {
  const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,  
    behavior: 'smooth'
  });
}
