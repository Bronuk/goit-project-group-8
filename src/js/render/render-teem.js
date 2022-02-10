import teamOfList from '../data/teem';
import teamCardTpl from '../../templates/teemModal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const teamList = document.querySelector('.team-list');

const modal = basicLightbox.create(document.querySelector('.lightbox'), {
  onShow: () => {
    document.body.classList.add('body-lightbox');
    window.addEventListener('keydown', onKeyPressEsc);
  },
  onClose: () => {
    document.body.classList.remove('body-lightbox');
    window.removeEventListener('keydown', onKeyPressEsc);
  },
});

teem.addEventListener('click', modal.show);
markupTeamCards(teamOfList);

function markupTeamCards(team) {
  teamList.insertAdjacentHTML('beforeend', teamCardTpl(team));
}

function onKeyPressEsc(e) {
  if (e.code === 'Escape') {
    modal.close();
  }
}
