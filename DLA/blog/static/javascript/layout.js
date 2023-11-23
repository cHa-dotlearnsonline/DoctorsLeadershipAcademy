const navbar = document.querySelector('nav');
const all_links = document.querySelectorAll(".nav-font")
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navbar.classList.add('nav-scroll');
    all_links.forEach( link => {
      link.classList.add("changer")
    })
  } else {
    navbar.classList.remove('nav-scroll');
    all_links.forEach(link => {
      link.classList.remove("changer")
    })
  }
});