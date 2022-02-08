import { gallery } from './references/refs'
import FilmotekaApiService from '../js/api/api-service';
const filmoteka = new FilmotekaApiService();
import { getMoviesWithYearAndGenres } from '../js/processing/moviesDataAdaptation';
import movieFromLocal from '../templates/movieFromLocal.hbs'

const watchedBtn = document.querySelector('.watchedBtn');
const queueBtn = document.querySelector('.queueBtn')

const greetings = `<div class="greetings">
                    <p class="greetings_greet">Hello my friend!</p>
                    <p class="greetings_text">Please choose some movies from Homepage. See you later! ;)</p>
                </div>`;


let watchedFilm = JSON.parse(localStorage.getItem('watched'))
let queueFilm = JSON.parse(localStorage.getItem('queue'))

watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn.addEventListener('click', onQueueBtnClick);


function onWatchedBtnClick() {
  gallery.innerHTML = '';

  if (localStorage.getItem('watched') === null) {
    gallery.innerHTML = greetings;
    return
  }

  for (const all of watchedFilm) {
    try {
      filmoteka.getMovieDetails(all).then(data => {
        ({ ...data, release_date: data.release_date.split('-')[0] })
        console.log(data)
        renderAllMovies(data);
      })
    } catch (error) {
      console.log(error);
    }
  }

}

function onQueueBtnClick() {
  gallery.innerHTML = '';

  if (localStorage.getItem('queue') === null) {
    gallery.innerHTML = greetings;
    return
  }

  for (const all of queueFilm) {
    try {
      filmoteka.getMovieDetails(all).then(data => {
        ({ ...data, release_date: data.release_date.split('-')[0] })
        console.log(data)
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
