
const hamburger = document.querySelector('.hamburger');
const close = document.querySelector('.closeNav');
const navList = document.querySelector('.navList');
const navLink = document.querySelectorAll('.navLink')

hamburger.addEventListener('click', () => {
  navList.classList.toggle('show');
});

close.addEventListener('click', () => {
  navList.classList.remove('show');
});

navLink.forEach((element) => element.addEventListener('click', () => {
  navList.classList.remove('show');
}));



