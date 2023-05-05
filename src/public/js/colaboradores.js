function colaborado(id, nombres, cargo, descripcion, email, linkedin) {
  var html = ' <div class="text-center"> <h2 > ' + nombres + ' </h2>';
  html += '<h5 class="text-muted"> ' + cargo + ' </h5>';
  html += '<p> ' + descripcion + '</p>';
  html +=
    '<a href="' +
    linkedin +
    '" target="_blank" class="btn btn-outline-primary border-0"> <i class="fa-brands fa-linkedin fa-2x"></i> </a>';
  html +=
    '<a class="btn btn-outline-primary border-0" href="mailto:' +
    email +
    '"target="_blank"> <i class="fa-solid fa-envelope fa-2x"></i> </a>';
  html +=
    '<a href="mailto:' +
    email +
    '"onclick="copiarCorreo(' +
    "'" +
    email +
    "'" +
    ')"target="_blank">' +
    email +
    '</a> </div>';
  document.getElementById('descipcion').innerHTML = html;
}

function copiarCorreo(correo) {
  navigator.clipboard.writeText(correo);
}

function cambiarFondo(direccion) {
  const carousel = document.getElementById("carousel-inner");
  const currentSlide = carousel.querySelector(".active");
  var nextIndicator = null;
  var nextSlide = null;
  if (direccion){
    nextSlide = currentSlide.nextElementSibling ? currentSlide.nextElementSibling : carousel.firstElementChild;
  }else{
    nextSlide = currentSlide.previousElementSibling ? currentSlide.previousElementSibling : carousel.lastElementChild;
  }
  // const nextSlide = direccion ? currentSlide.previousElementSibling : currentSlide.nextElementSibling;
  currentSlide.classList.remove("active");
  nextSlide.classList.add("active");
  
  const indicators = document.getElementById("hero-carousel-indicators");

  const currentIndicator = indicators.querySelector(".active");
  if (direccion){
    nextIndicator = currentIndicator.nextElementSibling ? currentIndicator.nextElementSibling : indicators.firstElementChild;
  }else{
    nextIndicator = currentIndicator.previousElementSibling ? currentIndicator.previousElementSibling : indicators.lastElementChild;
  }
  currentIndicator.classList.remove("active");
  nextIndicator.classList.add("active");

}

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }


  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });


})()