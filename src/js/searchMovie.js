import '../sass/main.scss';
import FilmotekaApiService from '../js/api/api-service';
import { renderAllMovies } from '../js/render/render-movies';
import genresJSON from './data/genres.json';
import { getMoviesWithYearAndGenres } from '../js/processing/moviesDataAdaptation';
import { debounce } from 'lodash';
import { input, gallery } from '../js/references/refs';

const DEBOUNCE_DELAY = 400;
const filmoteka = new FilmotekaApiService();

input.addEventListener('input', debounce(onInputHandler, DEBOUNCE_DELAY, { trailing: true }));

function onInputHandler(event) {
  event.preventDefault();

  if (event.target.value !== '') {
    filmoteka.query = event.target.value.trim();

    filmoteka.getDataSearch(filmoteka.query, filmoteka.page).then(data => {
      const newMovies = getMoviesWithYearAndGenres(data.results, genresJSON);

      renderAllMovies(newMovies);
    });
    resetRender();
  } else {
    event.target.value = '';

    resetRender();

    filmoteka.getDataTrends().then(data => {
      const newMovies = getMoviesWithYearAndGenres(data.results, genresJSON);

      renderAllMovies(newMovies);
    });
  }

  console.log(event.target.value);
}

function resetRender() {
  gallery.innerHTML = '';
}
