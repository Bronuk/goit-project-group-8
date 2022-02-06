import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import movieModal from '../../templates/movieCard';
import FilmotekaApiService from '../../js/api/api-service';
const axios = require('axios').default;
import {gallery} from '../references/refs'



gallery.addEventListener('click', getGallery)

const filmotekaLibrary = new FilmotekaApiService();
let movieId = ''
function getGallery (e){
    e.preventDefault()
    if (e.target.nodeName !== 'IMG') return;
       try{ filmotekaLibrary.getMovieDetails(e.target.dataset.id).then(data => {
          movieId = e.target.dataset.id;
          console.log(movieId)
            // const getGanr = getGanres(data, genresJSON)
            const marcup =  movieModal(data)
            const instance = basicLightbox.create(marcup)
            instance.show();           
            const closeBtn = document.querySelector('.modal__close-btn');
      closeBtn.addEventListener('click', closeModal);
      window.addEventListener('keydown', closeModalHandler);
      function closeModalHandler(e) {
        if (e.code === 'Escape') {
            instance.close();
          window.removeEventListener('keydown', closeModalHandler);
        }
      }

      function closeModal(e) {
        instance.close();
        window.removeEventListener('keydown', closeModalHandler);
      }

      const addToWatched = document.querySelector('.modal__btn__orange');
      const addToQueue = document.querySelector('.modal__btn__white');
      addToWatched.addEventListener('click', () => {
        if(localStorage.getItem('watched') == null) {
          localStorage.setItem('watched', '[]');
        }
        let allEntries = JSON.parse(localStorage.getItem('watched'));
        if(!allEntries.includes(movieId)){
          allEntries.push(movieId);
          localStorage.setItem('watched', JSON.stringify(allEntries));
        } 
      });
      addToQueue.addEventListener('click', () => {
        if(localStorage.getItem('queue') == null) {
          localStorage.setItem('queue', '[]');
        }
        let allEntries = JSON.parse(localStorage.getItem('queue'));
        if(!allEntries.includes(movieId)){
          allEntries.push(movieId);
          localStorage.setItem('queue', JSON.stringify(allEntries));
        } 
      });
        })
       }catch (error) {
        console.log(error);
      }

}



