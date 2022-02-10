import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import movieModal from '../../templates/movieCard';
// import movie-link from '../../templates/mviesCollection'
import FilmotekaApiService from '../../js/api/api-service';
const axios = require('axios').default;
import { gallery } from '../references/refs'


const card = document.querySelector('.movie-item')

gallery.addEventListener('click', getGallery)

const filmotekaLibrary = new FilmotekaApiService();
let movieId = ''
function getGallery(e) {
  e.preventDefault()
  movieId = e.target.dataset.id;



  if (e.target.nodeName !== 'IMG'
    && e.target.nodeName !== 'H2'
    && e.target.nodeName !== 'P'
    && e.target.nodeName !== 'DIV'
    && e.target.nodeName !== 'A'
    && e.target.nodeName !== 'LI') return;
  try {
    filmotekaLibrary.getMovieDetails(movieId).then(data => {



      const marcup = movieModal(data)
      const instance = basicLightbox.create(marcup)
      instance.show();
      // document.body.style.overflow = "hidden";           
      const closeBtn = document.querySelector('.modal__close-btn');


      closeBtn.addEventListener('click', closeModal);
      window.addEventListener('keydown', closeModalHandler);


      // else if (!modal){
      //   console.log(modal)
      //   document.body.style.overflow = "scroll";
      // }
      // if(instance.show() === true){
      //   document.body.style.overflow = "hidden";
      // } 
      // if(instance.close()=== true){
      //   document.body.style.overflow = "scroll";
      // }



      function closeModalHandler(e) {
        if (e.code === 'Escape') {
          instance.close();
          // document.body.style.overflow = "scroll";
          window.removeEventListener('keydown', closeModalHandler);
        }
      }

      function closeModal(e) {
        instance.close();
        // document.body.style.overflow = "scroll";
        window.removeEventListener('keydown', closeModalHandler);
      }

      if (localStorage.getItem('queue') == null) {
        localStorage.setItem('queue', '[]');
      }
      if (localStorage.getItem('watched') == null) {
        localStorage.setItem('watched', '[]');

      }

      let allQueue = JSON.parse(localStorage.getItem('queue'));
      let allWatched = JSON.parse(localStorage.getItem('watched'));

      const addToQueue = document.querySelector('.modal__btn__white');
      const addToWatched = document.querySelector('.modal__btn__orange');

      textButtonQ(movieId);
      textButtonW(movieId)

      function textButtonQ(movieId) {


        if (localStorage.getItem('queue') == null || !allQueue.includes(movieId)) {
          addToQueue.textContent = 'ADD TO QUEUE';
        } else {
          addToQueue.textContent = 'REMOVE FROM QUEUE';
        }

      }

      function textButtonW(movieId) {


        if (localStorage.getItem('watched') == null
          || !allWatched.includes(movieId)) {
          addToWatched.textContent = 'ADD TO WATCHED';
        } else {
          addToWatched.textContent = 'REMOVE FROM WATCHED';
        }

      }



      addToWatched.addEventListener('click', () => {
        // addToWatched.style.backgroundColor = '#FF6B01'
        // addToWatched.style.color = "white"
        // addToWatched.style.border = 'none'
        addToWatched.textContent = 'REMOVE FROM WATCHED';

        // if (localStorage.getItem('watched') == null) {
        //   localStorage.setItem('watched', '[]');

        // }

        if (!allWatched.includes(movieId)) {
          allWatched.push(movieId);
          localStorage.setItem('watched', JSON.stringify(allWatched));
        }
        else if (allWatched.includes(movieId)) {
          let index = allWatched.indexOf(movieId)
          allWatched.splice(index, 1);
          localStorage.setItem('watched', JSON.stringify(allWatched));
          addToWatched.textContent = 'ADD TO WATCHED';
        }
      });



      addToQueue.addEventListener('click', () => {
        // addToQueue.style.backgroundColor = '#FF6B01'
        // addToQueue.style.color = "white"
        // addToQueue.style.border = 'none'
        textButtonQ(movieId)
        addToQueue.textContent = 'REMOVE FROM QUEUE';

        // if (localStorage.getItem('queue') == null) {
        //   localStorage.setItem('queue', '[]');
        // }
        // let allEntries = JSON.parse(localStorage.getItem('queue'));
        if (!allQueue.includes(movieId)) {
          allQueue.push(movieId);
          localStorage.setItem('queue', JSON.stringify(allQueue));
        }
        else if (allQueue.includes(movieId)) {
          let index = allQueue.indexOf(movieId)
          allQueue.splice(index, 1);
          localStorage.setItem('queue', JSON.stringify(allQueue));
          addToQueue.textContent = 'ADD TO QUEUE';
          console.log(allQueue)
        }




      });
      //  active or disable buttons
      // let allEntries = JSON.parse(localStorage.getItem('watched'));

      // if (allEntries.includes(movieId)) {
      //   addToWatched.style.backgroundColor = '#FF6B01'
      //   addToWatched.style.color = "white"
      //   addToWatched.style.border = 'none'
      //   addToWatched.disabled = true;

      // }

      // let allEntrie = JSON.parse(localStorage.getItem('queue'))

      // if (allEntrie.includes(movieId)) {
      //   addToQueue.style.backgroundColor = '#FF6B01'
      //   addToQueue.style.color = "white"
      //   addToQueue.style.border = 'none'


      // }
    })
  } catch (error) {
    console.log(error);
  }

}
