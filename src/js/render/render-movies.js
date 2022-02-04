import { moviesGallery } from '../references/refs';
import moviesCollectionTmpl from '../../templates/moviesCollection.hbs';

function renderAllMovies(movies) {
  const markup = moviesCollectionTmpl(movies);

  moviesGallery.insertAdjacentHTML('beforeend', markup);
}

export { renderAllMovies };
