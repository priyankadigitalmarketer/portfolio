/*=========================================
        MOBILE MENU TOGGLE
=========================================*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


/*=========================================
        STICKY HEADER SHADOW
=========================================*/

window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

});