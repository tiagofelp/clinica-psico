/* CLÍNICA — configure o WhatsApp geral da recepção abaixo. */
const CONFIG = {
  whatsapp: "", // DDI + DDD + número, somente dígitos. Ex.: 5511999999999
  mensagem: "Olá! Gostaria de saber mais sobre os atendimentos da clínica."
};

const year = document.getElementById("current-year");
if (year) year.textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("site-nav");
function closeMenu() {
  if (!menuButton || !menu) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  menu.classList.remove("open");
}
if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    menu.classList.toggle("open", !isOpen);
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

const header = document.querySelector(".site-header");
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 12);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const phone = String(CONFIG.whatsapp).replace(/\D/g, "");
const validPhone = /^55\d{10,11}$/.test(phone);
let selectedProfessional = "";
function currentMessage() {
  return selectedProfessional
    ? `Olá! Gostaria de consultar horários com ${selectedProfessional}.`
    : CONFIG.mensagem;
}
function updateWhatsAppLinks() {
  document.querySelectorAll("[data-wa]").forEach((link) => {
    if (validPhone) {
      link.href = `https://wa.me/${phone}?text=${encodeURIComponent(currentMessage())}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("title");
    } else {
      link.href = "#contato";
      link.title = "Configure o WhatsApp da recepção no arquivo script.js";
    }
  });
}
updateWhatsAppLinks();

document.querySelectorAll("[data-professional]").forEach((link) => {
  link.addEventListener("click", () => {
    selectedProfessional = link.dataset.professional || "";
    updateWhatsAppLinks();
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
