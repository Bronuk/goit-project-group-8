import { gallery } from './references/refs'
import FilmotekaApiService from '../js/api/api-service';
const filmoteka = new FilmotekaApiService();
import { getYear } from '../js/processing/moviesDataAdaptation';
import movieFromLocal from '../templates/movieFromLocal.hbs'
import genresJSON from './data/genres.json';
import { get } from 'lodash';


const watchedBtn = document.querySelector('.watchedBtn');
const queueBtn = document.querySelector('.queueBtn')

const greetings = `<div class="greetings">
                    <p class="greetings_greet">Hello my friend!</p>
                    <p class="greetings_text">Please choose some movies from Homepage. See you later! ;)</p>
                </div>`;

const hiMessage = `<div class="greetings">
                    <p class="greetings_greet">Hello my friend!</p>
                    <p class="greetings_text">Please choose one of categories above! ;)</p>
                </div>`;




watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn.addEventListener('click', onQueueBtnClick);

startPage()
function startPage() {
  gallery.innerHTML = hiMessage;
}

function onWatchedBtnClick() {
  let watchedFilm = JSON.parse(localStorage.getItem('watched'))
  gallery.innerHTML = '';

  if (localStorage.getItem('watched') === null) {
    gallery.innerHTML = greetings;
    return
  }

  for (const all of watchedFilm) {
    try {
      filmoteka.getMovieDetails(all).then(data => {
        ({ ...data })

        data.release_date = getYear(data.release_date);
        data.genres = data.genres.slice(0, 3)
        renderAllMovies(data);
      })
    } catch (error) {
      console.log(error);
    }
  }

}

function onQueueBtnClick() {
  let queueFilm = JSON.parse(localStorage.getItem('queue'))
  gallery.innerHTML = '';

  if (localStorage.getItem('queue') === null) {
    gallery.innerHTML = greetings;
    return
  }


  for (const all of queueFilm) {
    try {
      filmoteka.getMovieDetails(all).then(data => {
        ({ ...data })

        data.release_date = getYear(data.release_date);
        data.genres = data.genres.slice(0, 3)
        renderAllMovies(data);
      })
    } catch (error) {
      console.log(error);
    }
  }
}

function renderAllMovies(movies) {
  const markup = movieFromLocal(movies);
  gallery.insertAdjacentHTML('beforeend', markup);
}
