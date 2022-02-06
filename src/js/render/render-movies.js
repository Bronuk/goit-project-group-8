import { gallery } from '../references/refs';
import moviesCollectionTmpl from '../../templates/moviesCollection.hbs';

function renderAllMovies(movies) {
  const markup = moviesCollectionTmpl(movies);

  gallery.insertAdjacentHTML('beforeend', markup);
}

export { renderAllMovies };
