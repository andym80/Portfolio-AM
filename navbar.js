// OPEN/CLOSE HAMBURGER MENU

// const hamburger = document.querySelector('.hamburger');
// const close = document.querySelector('.closenav');
// const navList = document.querySelector('.navList');
// const navLink = document.querySelectorAll('.nav-link');
// hamburger.addEventListener('click', () => {
//   nav.classList.add('active');
// });

// close.addEventListener('click', () => {
//   nav.classList.remove('active');
// });

// navLink.forEach((element) => element.addEventListener('click', () => {
//   nav.classList.remove('active');
// }));


function classToggle() {
  const navs = document.querySelectorAll('.Navbar__Items')

  navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
}

document.querySelector('.Navbar__Link-toggle')
  .addEventListener('click', classToggle);


// mobileMenu = () => {
//   hamburger.classList.toggle("active");
//   navMenu.classList.toggle("active");
// }

// hamburger.addEventListener("click", mobileMenu);

// navLink.forEach(n => n.addEventListener("click", closeMenu));

// function closeMenu() {
//     hamburger.classList.remove("active");
//     navMenu.classList.remove("active");
// }

// // CLOSE NAVMENU ON SCROLL

// window.addEventListener("scroll", () => {
// 	hamburger.classList.remove("active");
// 	navMenu.classList.remove("active");
// })
