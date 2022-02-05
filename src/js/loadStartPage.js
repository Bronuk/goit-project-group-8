import '../sass/main.scss';
import FilmotekaApiService from '../js/api/api-service';
import { renderAllMovies } from '../js/render/render-movies';
import genresJSON from './data/genres.json';
import { getMoviesWithYearAndGenres } from '../js/processing/moviesDataAdaptation';

document.addEventListener('DOMContentLoaded', loadStartPage);

const filmotekaLibrary = new FilmotekaApiService();

function loadStartPage() {
  try {
    filmotekaLibrary.getDataTrends().then(data => {
      const newMovies = getMoviesWithYearAndGenres(data.results, genresJSON);

      renderAllMovies(newMovies);
    });
  } catch (error) {
    console.log(error);
  }
}

export { loadStartPage };
