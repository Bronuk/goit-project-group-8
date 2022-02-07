import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import FilmotekaApiService from '../js/api/api-service';
import '../js/references/refs';
import { renderAllMovies } from '../js/render/render-movies';
import genresJSON from './data/genres.json';
import { getMoviesWithYearAndGenres } from '../js/processing/moviesDataAdaptation';

const filmoteka = new FilmotekaApiService();

const pagination = new Pagination('#tui-pagination-container', {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 10,
  page: 1,
});

const page = pagination.getCurrentPage();

fetchMovies(page).then(data => {
  pagination.reset(data.total);
  const newMovies = getMoviesWithYearAndGenres(data.movies, genresJSON);
  renderAllMovies(newMovies);
});

pagination.on('afterMove', popular);

function popular(event) {
  const currentPage = event.page;

  fetchMovies(currentPage).then(data => {
    const newMovies = getMoviesWithYearAndGenres(data.movies, genresJSON);

    document.querySelector('.movies-list').innerHTML = '';

    renderAllMovies(newMovies);
  });
}
function fetchMovies(page) {
  return filmoteka
    .getDataTrends(page)
    .then(data => ({ movies: data.results, total: data.total_pages }));
}
