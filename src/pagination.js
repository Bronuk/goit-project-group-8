import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { fetchMovies } from "./js/api/api-service.js";
import { renderMovieCard } from "./js/render/render-movies.js";

const pagination = new Pagination('#tui-pagination-container', {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
    page: 1,
   centerAlign: true,
    usageStatistics: false,
});

const page = pagination.getCurrentPage();
fetchMovie(page).then(data => {
    pagination.reset(data.total);
});
pagination.on('afterMove', popular);

function popular(event) {
  const currentPage = event.page;
  fetchMovie(currentPage).then(data => data);
}

function fetchMovie(page) {
  return fetch(
    `https://api.themoviedb.org/3/movie/week?api_key=fa50958034c24b0612c0304f24903582&page=${page}&per_page=20`,
  )
    .then(res => res.json())
    .then(data => ({  total: data.totalItems }));
}




