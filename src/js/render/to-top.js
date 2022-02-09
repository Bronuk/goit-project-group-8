import throttle from 'lodash.throttle';

const upButton = document.querySelector('[data-up-btn]');

window.addEventListener('scroll', throttle(hideElOnScroll(upButton), 250));
upButton.addEventListener('click', toPageTopOnClick);

function hideElOnScroll(el) {
  return function hideOnScroll(e) {
    if (scrollY < document.documentElement.clientHeight) {
      el.classList.add('visually-hidden');
    } else {
      el.classList.remove('visually-hidden');
    }
  };
}
function toPageTopOnClick(e) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
