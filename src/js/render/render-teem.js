import * as basicLightbox from 'basiclightbox';
import data from '../data/teem.json';
import teamCardTpl from '../../templates/teemModal.hbs';

teem.addEventListener('click', onTeamModalShow);

function onTeamModalShow(e) {
  const teamCardsMarkup = teamCardTpl(data);
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onCloseEsc);

  function onClick(e) {
    e.target.classList.value === 'cards-container js-team list' ||
    e.target.classList.value === 'team__title' ||
    e.target.classList.value === 'team__title_accent' ||
    e.target.classList.value === 'basicLightbox'
      ? teamModal.close()
      : teamModal.show();
  }

  function onCloseEsc(e) {
    e.code === 'Escape' ? teamModal.close() : teamModal.show();
  }

  const teamModal = basicLightbox.create(teamCardsMarkup, {
    onShow: () => {
      document.body.style.overflow = 'hidden';
    },
    onClose: () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onCloseEsc);
    },
  });

  teamModal.show();
}
