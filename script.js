const root = document.documentElement;
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const mpesaForm = document.querySelector("#mpesaForm");
const mpesaStatus = document.querySelector("#mpesaStatus");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

function updateThemeIcon() {
  const icon = themeToggle.querySelector("i");
  const isLight = root.dataset.theme === "light";
  icon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

updateThemeIcon();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector("i").className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector("i").className = "fa-solid fa-bars";
  });
});

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeIcon();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields before sending.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:japhetcheremo@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = "Opening your email app...";
  contactForm.reset();
});

mpesaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const phone = document.querySelector("#mpesaPhone").value.trim();
  const amount = Number(document.querySelector("#mpesaAmount").value);

  if (!phone || !amount || amount < 1) {
    mpesaStatus.textContent = "Enter a valid phone number and amount.";
    return;
  }

  mpesaStatus.textContent = `M-Pesa STK push simulation sent to ${phone} for KES ${amount}.`;
  mpesaForm.reset();
});