import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import movieModal from '../../templates/movieCard';
import FilmotekaApiService from '../../js/api/api-service';
const axios = require('axios').default;
 import {gallery} from '../references/refs'






gallery.addEventListener('click', getGallery)

const filmotekaLibrary = new FilmotekaApiService();

function getGallery (e){
    e.preventDefault()
    if (e.target.nodeName !== 'IMG') return;
       try{ filmotekaLibrary.getMovieDetails(e.target.dataset.id).then(data => {
        console.log(data)
            // const getGanr = getGanres(data, genresJSON)
            const marcup =  movieModal(data)
            const instance = basicLightbox.create(marcup)
            instance.show()

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
        })
       }catch (error) {
        console.log(error);
      }




    

}