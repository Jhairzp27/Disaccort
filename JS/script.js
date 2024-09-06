// =========  HEADER ================
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
}

// CONTROL CLIC EN OTRO LUGARES
document.addEventListener('click', function(event) {
    const targetElement = event.target;
    const isClickInsideMenu = dropDownMenu.contains(targetElement);
    const isClickInsideToggleBtn = toggleBtn.contains(targetElement);

    if (!isClickInsideMenu && !isClickInsideToggleBtn) {
        if (dropDownMenu.classList.contains('open')) {
            dropDownMenu.classList.remove('open');
            toggleBtnIcon.classList = 'fa-solid fa-bars';
        }
    }
});

// HEADER MOVIBLE CON CAMBIO DE EFECTO
window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    if (window.scrollY === 0) {
        header.classList.remove('scrolled');
    } else {
        header.classList.add('scrolled');
    }
});

// ============== GALLERY =======
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
    event.stopPropagation(); // Evitar que el evento se propague al documento
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
    event.stopPropagation(); // Evitar que el evento se propague al documento
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 9000)
// Function to show slider
function showSlider(keepMenuOpen = false){
    // console.log('showSlider() function called');
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    if (!keepMenuOpen && dropDownMenu.classList.contains('open') && dropDownMenu.contains(event.target)) {
        dropDownMenu.classList.remove('open');
        toggleBtnIcon.classList = 'fa-solid fa-bars';
        // console.log('Dropdown menu closed');
    }
}

// Function to handle thumbnail click
function handleThumbnailClick(index) {
    clearInterval(refreshInterval); // Stop interval when thumbnail is clicked
    itemActive = index;
    showSlider(true); // Set keepMenuOpen to true
    refreshInterval = setInterval(() => { // Restart interval after clicking thumbnail
        next.click();
    }, 9000)
}

// Click event listener for thumbnails
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        handleThumbnailClick(index);
    })
})


//===================FOOTER==========
var yearElement = document.getElementById('year');
var currentYear = new Date().getFullYear();
yearElement.textContent = '@' + currentYear + '| Todos los derechos reservados';


//==============REDIRECCION SUAVE===================
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

//======================ABOUT US==========================
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

            // Define la posición de desplazamiento deseada para las tarjetas
            const desiredScrollPositionCards = sectionTop + (sectionHeight * 0.8);

            // Define la posición de desplazamiento deseada para la imagen
            const desiredScrollPositionImage = sectionTop + (sectionHeight * 1.15);

            // Verificar si el usuario ha llegado a la posición deseada para las tarjetas
            if (scrollPosition > desiredScrollPositionCards) {
                aboutSection.classList.add('show');
                cardsContainer.classList.add('show');
            } else {
                aboutSection.classList.remove('show');
                cardsContainer.classList.remove('show');
            }

            // Verificar si el usuario ha llegado a la posición deseada para la imagen
            if (scrollPosition > desiredScrollPositionImage) {
                scrollImage.style.opacity = '0.2';
                scrollImageText.style.opacity = '1';
            } else {
                scrollImage.style.opacity = '1';
                scrollImageText.style.opacity = '0';
            }

            // Añadir clase 'scrolled' al hacer scroll
            if (window.scrollY > 50) {
                aboutSection.classList.add('scrolled');
                sectionTitle.classList.add('scrolled'); // Agregar clase al título
            } else {
                aboutSection.classList.remove('scrolled');
                sectionTitle.classList.remove('scrolled'); // Quitar clase del título
            }
        });
    }
});

// =====================SERVICES======================
document.addEventListener('DOMContentLoaded', function () {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const timelineLineFilled = document.querySelector('.timeline-line-filled');

    function checkTimelineItems() {
        let activeCount = 0;

        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const itemMiddle = rect.top + rect.height / 2;
            const windowMiddle = window.innerHeight / 2;

            if (itemMiddle < windowMiddle) {
                item.classList.add('active');
                timelineNodes[index].classList.add('active'); // Activar nodo correspondiente
                activeCount++;
            } else {
                item.classList.remove('active');
                timelineNodes[index].classList.remove('active'); // Desactivar nodo correspondiente
            }
        });

        updateTimelineLineFilled(activeCount);
    }

    function updateTimelineLineFilled(activeCount) {
        const totalItems = timelineItems.length;
        const progressHeight = (activeCount / totalItems) * 100;
        timelineLineFilled.style.height = `${progressHeight}%`;
    }

    checkTimelineItems();
    window.addEventListener('scroll', debounce(checkTimelineItems, 100));
});

// Función de debounce para optimizar el evento de scroll
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

//===========ABOUT US===============
const testimonials = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
}

setInterval(nextTestimonial, 5000); // Cambia de testimonio cada 5 segundos
