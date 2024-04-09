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
}, 5000)
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
    }, 5000)
}

// Click event listener for thumbnails
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        handleThumbnailClick(index);
    })
})
