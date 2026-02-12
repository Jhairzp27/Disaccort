// ========= HEADER ================
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = toggleBtn.querySelector('i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.addEventListener('click', () => {
  const isOpen = dropDownMenu.classList.toggle('open');
  toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

// CONTROL CLIC EN OTRO LUGARES
document.addEventListener('click', (event) => {
  if (
    !dropDownMenu.contains(event.target) &&
    !toggleBtn.contains(event.target) &&
    dropDownMenu.classList.contains('open')
  ) {
    dropDownMenu.classList.remove('open');
    toggleBtnIcon.className = 'fa-solid fa-bars';
  }
});

// HEADER MOVIBLE CON CAMBIO DE EFECTO
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.classList.toggle('scrolled', window.scrollY !== 0);
});

// ============== GALLERY =======
const items = document.querySelectorAll('.slider .list .item');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const thumbnails = document.querySelectorAll('.thumbnail .item');

let itemActive = 0;
const countItem = items.length;

const showSlider = (keepMenuOpen = false) => {
  document.querySelector('.slider .list .item.active').classList.remove('active');
  document.querySelector('.thumbnail .item.active').classList.remove('active');
  items[itemActive].classList.add('active');
  thumbnails[itemActive].classList.add('active');

  if (!keepMenuOpen && dropDownMenu.classList.contains('open')) {
    dropDownMenu.classList.remove('open');
    toggleBtnIcon.className = 'fa-solid fa-bars';
  }
};

const changeSlide = (direction) => {
  itemActive = (itemActive + direction + countItem) % countItem;
  showSlider();
};

next.addEventListener('click', () => changeSlide(1));
prev.addEventListener('click', () => changeSlide(-1));

let refreshInterval = setInterval(() => next.click(), 10000);

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    clearInterval(refreshInterval);
    itemActive = index;
    showSlider(true);
    refreshInterval = setInterval(() => next.click(), 9000);
  });
});

// =============== FOOTER ==========
document.getElementById('year').textContent =
  `@${new Date().getFullYear()} | Todos los derechos reservados`;

// ============== REDIRECCION SUAVE ================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetElement = document.getElementById(link.getAttribute('href').substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// ============= ABOUT US =============
document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('.about-section');
  const cardsContainer = document.querySelector('.cards-container');
  const scrollImage = document.querySelector('.scroll-image');
  const scrollImageText = document.querySelector('.scroll-image-text');
  const sectionTitle = document.querySelector('.section-title');

  if (aboutSection && cardsContainer && scrollImage && scrollImageText && sectionTitle) {
    document.addEventListener('scroll', () => {
      const sectionTop = aboutSection.offsetTop;
      const sectionHeight = aboutSection.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;

      const showClass = (element, addClass) => {
        element.classList.toggle('show', addClass);
      };

      showClass(aboutSection, scrollPosition > sectionTop + sectionHeight * 0.8);
      showClass(cardsContainer, scrollPosition > sectionTop + sectionHeight * 0.8);
      scrollImage.style.opacity = scrollPosition > sectionTop + sectionHeight * 1.15 ? '0.2' : '1';
      scrollImageText.style.opacity =
        scrollPosition > sectionTop + sectionHeight * 1.15 ? '1' : '0';
      sectionTitle.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
});

// ===================== SERVICES ======================
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineNodes = document.querySelectorAll('.timeline-node');
  const timelineLineFilled = document.querySelector('.timeline-line-filled');
  const counters = document.querySelectorAll('.counter-number');

  // Función de animación de los contadores
  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.parentElement.getAttribute('data-target');
      const updateCount = () => {
        const current = +counter.innerText;
        const increment = Math.ceil(target / 100); // Incremento gradual
        if (current < target) {
          counter.innerText = current + increment;
          setTimeout(updateCount, 50);
        } else {
          counter.innerText = target; // Asegura que termine en el número correcto
        }
      };
      updateCount();
    });
  };

  // Función para activar los contadores al hacer scroll
  const checkCounters = () => {
    const triggerBottom = window.innerHeight / 1.3; // Ajustar cuando se activa
    const countersContainer = document.querySelector('.counter-container');
    const containerTop = countersContainer.getBoundingClientRect().top;
    if (containerTop < triggerBottom) {
      animateCounters();
      window.removeEventListener('scroll', checkCounters); // Remover evento una vez activado
    }
  };

  window.addEventListener('scroll', checkCounters);

  // Lógica de la línea de tiempo
  const activationOffset = 200;
  const updateTimelineLineFilled = (activeCount) => {
    timelineLineFilled.style.height = `${(activeCount / timelineItems.length) * 100}%`;
  };

  const checkTimelineItems = () => {
    let activeCount = 0;
    const windowMiddle = window.innerHeight / 2;
    timelineItems.forEach((item, index) => {
      const itemMiddle = item.getBoundingClientRect().top + item.clientHeight / 2;
      const isActive = itemMiddle < windowMiddle + activationOffset;
      item.classList.toggle('active', isActive);
      timelineNodes[index].classList.toggle('active', isActive);
      if (isActive) activeCount++;
    });
    updateTimelineLineFilled(activeCount);
  };

  window.addEventListener('scroll', debounce(checkTimelineItems, 20));
  checkTimelineItems();
});

// Debounce function for scroll optimization
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// =========== TESTIMONIALS CAROUSEL ===========
document.addEventListener('DOMContentLoaded', () => {
  // const carousel = document.querySelector('.testimonials-carousel');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  let currentIndex = 0;
  let autoSlideInterval;

  const updateCarousel = () => {
    cards.forEach((card, index) => {
      card.classList.remove('left', 'right', 'active', 'inactive');
      const relativeIndex = (index - currentIndex + cards.length) % cards.length;
      card.classList.add(
        relativeIndex === 0
          ? 'active'
          : relativeIndex === 1
            ? 'right'
            : relativeIndex === cards.length - 1
              ? 'left'
              : 'inactive'
      );
    });
  };

  const changeSlide = (direction) => {
    currentIndex = (currentIndex + direction + cards.length) % cards.length;
    updateCarousel();
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => changeSlide(1), 9000);
  };

  nextButton.addEventListener('click', () => {
    changeSlide(1);
    clearInterval(autoSlideInterval);
    startAutoSlide();
  });

  prevButton.addEventListener('click', () => {
    changeSlide(-1);
    clearInterval(autoSlideInterval);
    startAutoSlide();
  });

  updateCarousel();
  startAutoSlide();
});

//=======================BOTON DE REDIRECCIONAMIENTO============
// Número de teléfono
const phoneNumber = '593987883014'; // Reemplaza con tu número de WhatsApp

// Obtener todos los botones con la clase 'read-more'
var buttons = document.querySelectorAll('.read-more');

// Asignar la función a cada botón
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    var message = this.getAttribute('data-message'); // Obtener el mensaje del atributo data-message
    var url = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
  });

  // Agregar el evento touchstart para dispositivos móviles
  button.addEventListener('touchstart', function () {
    var message = this.getAttribute('data-message');
    var url = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
  });
});
