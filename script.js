const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll('a[href^="#"]');
const header = document.querySelector(".site-header");

function closeMenu() {
  menuToggle.classList.remove("active");
  navMenu.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    closeMenu();

    const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

document.addEventListener("click", (event) => {
  const clickedInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
  if (!clickedInside && navMenu.classList.contains("active")) closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) closeMenu();
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (data.success) {
        alert("Mensagem enviada com sucesso!");
        form.reset();
    } else {
        alert("Erro ao enviar a mensagem.");
        console.log(data);
    }
});