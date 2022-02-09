import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import movieModal from '../../templates/movieCard';
// import movie-link from '../../templates/mviesCollection'
import FilmotekaApiService from '../../js/api/api-service';
const axios = require('axios').default;
import {gallery} from '../references/refs'


const card = document.querySelector('.movie-item') 

gallery.addEventListener('click', getGallery)

const filmotekaLibrary = new FilmotekaApiService();
let movieId = ''
function getGallery (e){
    e.preventDefault()
    movieId = e.target.dataset.id;
    
    if (e.target.nodeName !== 'IMG' 
    && e.target.nodeName !== 'H2' 
    && e.target.nodeName !== 'P' 
    && e.target.nodeName !== 'DIV'
    && e.target.nodeName !== 'A'
    && e.target.nodeName !== 'LI') return;
       try{ filmotekaLibrary.getMovieDetails(movieId).then(data => {
          
          
          
            const marcup =  movieModal(data)
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

      



      const addToWatched = document.querySelector('.modal__btn__orange');
      const addToQueue = document.querySelector('.modal__btn__white');
      addToWatched.addEventListener('click', () => {
        addToWatched.style.backgroundColor = '#FF6B01'
        addToWatched.style.color="white"
        addToWatched.style.border = 'none'

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
        addToQueue.style.backgroundColor = '#FF6B01'
        addToQueue.style.color="white"
        addToQueue.style.border = 'none'
        if(localStorage.getItem('queue') == null) {
          localStorage.setItem('queue', '[]');
        }
        let allEntries = JSON.parse(localStorage.getItem('queue'));
        if(!allEntries.includes(movieId)){
          allEntries.push(movieId);
          localStorage.setItem('queue', JSON.stringify(allEntries));
        } 
      });
      //  active or disable buttons
      let allEntries = JSON.parse(localStorage.getItem('watched'));

      if(allEntries.includes(movieId)){
        addToWatched.style.backgroundColor = '#FF6B01'
        addToWatched.style.color="white"
        addToWatched.style.border = 'none'
        addToWatched.disabled = true;
        
      }

      let allEntrie = JSON.parse(localStorage.getItem('queue'))

      if(allEntrie.includes(movieId)){
        addToQueue.style.backgroundColor = '#FF6B01'
        addToQueue.style.color="white"
        addToQueue.style.border = 'none'
        addToQueue.disabled = true;
        
      }
        })
       }catch (error) {
        console.log(error);
      }

}



