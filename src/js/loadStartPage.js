import '../sass/main.scss';
import FilmotekaApiService from '../js/api/api-service';
import Pagination from 'tui-pagination';
import genresJSON from './data/genres.json';
import { renderAllMovies } from '../js/render/render-movies';
import { getMoviesWithYearAndGenres } from '../js/processing/moviesDataAdaptation';
import { debounce } from 'lodash';
import { input, gallery, paginationContainer } from '../js/references/refs';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 400;
const filmoteka = new FilmotekaApiService();

const pagination = new Pagination('#tui-pagination-container', {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 7,
  page: 1,
});

const page = pagination.getCurrentPage();

pagination.on('afterMove', popular);
getPopular();

input.addEventListener('input', debounce(onInputHandler, DEBOUNCE_DELAY, { trailing: true }));

function onInputHandler(event) {
  event.preventDefault();

  if (event.target.value !== '') {
    filmoteka.query = event.target.value.trim();

    resetRender();
    pagination.off('afterMove', popular);
    pagination.on('afterMove', searchMov);
    getSearch(filmoteka.query);
  } else {
    event.target.value = '';

    resetRender();
    setPaginationVisible();

    pagination.off('afterMove', searchMov);
    getPopular();
    pagination.on('afterMove', popular);
  }
}

/*---------------------------------------------*/

async function getPopular() {
  fetchMoviesTrends(page).then(data => {
    pagination.reset(data.total);
    const newMovies = getMoviesWithYearAndGenres(data.movies, genresJSON);

    checkIfEmptyBeforeRender(newMovies);
  });
}

async function getSearch(searchQuery) {
  fetchMoviesSearch(searchQuery, page).then(data => {
    pagination.reset(data.total);
    const newMovies = getMoviesWithYearAndGenres(data.movies, genresJSON);

    checkIfEmptyBeforeRender(newMovies);
  });
}

/*---------------------------------------------*/

function checkIfEmptyBeforeRender(movies) {
  if (movies.length === 0) {
    // console.log('No matches found!');
    Notify.failure('Sorry, there are no movies matching your search query. Please try again');

    setPaginationInvisible();
  } else {
    renderAllMovies(movies);
  }
}

/*---------------------------------------------*/

function searchMov(event) {
  const currentPage = event.page;

  fetchMoviesSearch(filmoteka.searchquery, currentPage).then(data => {
    const newMovies = getMoviesWithYearAndGenres(data.movies, genresJSON);

    resetRender();

    renderAllMovies(newMovies);
  });
}

function fetchMoviesSearch(searchText, selPage) {
  return filmoteka
    .getDataSearch(searchText, selPage)
    .then(data => ({ movies: data.results, total: data.total_pages }));
}

/*---------------------------------------------*/

function popular(event) {
  const currentPage = event.page;

  fetchMoviesTrends(currentPage).then(data => {
    const newMovies = getMoviesWithYearAndGenres(data.movies, genresJSON);

    resetRender();

    renderAllMovies(newMovies);
  });
}

function fetchMoviesTrends(selPage) {
  return filmoteka
    .getDataTrends(selPage)
    .then(data => ({ movies: data.results, total: data.total_pages }));
}

function setPaginationInvisible() {
  paginationContainer.classList.add('visually-hidden');
}

function setPaginationVisible() {
  paginationContainer.classList.remove('visually-hidden');
}

function resetRender() {
  gallery.innerHTML = '';
}
