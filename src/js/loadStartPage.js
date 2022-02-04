import '../sass/main.scss';
import FilmotekaApiService from '../js/api/api-service';
import { renderAllMovies } from '../js/render/render-movies';

document.addEventListener('DOMContentLoaded', loadStartPage);

const filmotekaLibrary = new FilmotekaApiService();

function loadStartPage() {
  try {
    filmotekaLibrary.getDataTrends().then(data => {
      renderAllMovies(data.results);
    });
  } catch (error) {
    console.log(error);
  }
}

export { loadStartPage };
