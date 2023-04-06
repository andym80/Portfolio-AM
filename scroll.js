document.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.animate-scroll');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var position = element.getBoundingClientRect();
    if (position.top < window.innerHeight) {
      element.classList.add('animate__animated', 'animate__fadeIn');
    }
  }
});
