import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showLoadMoreButton, 
  hideLoadMoreButton 
} from "./js/render-functions.js";

let currentPage = 1;
let currentSearchQuery = '';
let totalHits = 0;

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');
hideLoadMoreButton(); 

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
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentSearchQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({ message: "Sorry, no images found.", position: 'topRight' });
    } else {
      createGallery(data.hits);
      totalHits = data.totalHits;
      checkLoadMoreButton(data.hits.length); 
    }
  } catch (error) {
    console.error("Fetch error during submit:", error); 
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
    checkLoadMoreButton(data.hits.length); 

    smoothScroll(); 
  } catch (error) {
    console.error("Fetch error during load more:", error); 
    iziToast.error({ message: "Error fetching images.", position: 'topRight' });
  } finally {
    hideLoader();
  }
});


function checkLoadMoreButton(loadedImagesCount) {
  const totalRendered = document.querySelectorAll('.gallery-item').length;

  if (totalRendered >= totalHits || loadedImagesCount < 15) {
    hideLoadMoreButton();
    iziToast.info({ message: "You've reached the end of the results.", position: 'topRight' });
  } else {
    showLoadMoreButton();
  }
}


function smoothScroll() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth'
  });
}
