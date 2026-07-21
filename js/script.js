/* ==========================================================================
   RETA - LÓGICA JAVASCRIPT PRINCIPAL
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------------------------
  // 1. CONTADOR ANIMADO (MÉTRICAS / CONTEO RÁPIDO)
  // ----------------------------------------------------------------------
  const statNumbers = document.querySelectorAll(".stat-number");

  if (statNumbers.length > 0) {
    const runCounter = () => {
      statNumbers.forEach((stat) => {
        const target = +stat.getAttribute("data-target");
        let count = 0;
        const speed = target / 40;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            stat.innerText = Math.ceil(count).toLocaleString();
            setTimeout(updateCount, 30);
          } else {
            stat.innerText = target.toLocaleString() + "+";
          }
        };

        updateCount();
      });
    };

    runCounter();
  }

  // ----------------------------------------------------------------------
  // 2. MODAL Y SLIDER DE PATROCINADORES (`usuarios.html`)
  // ----------------------------------------------------------------------
  const modal = document.getElementById("sponsorModal");
  const openBtn = document.getElementById("openSponsorsBtn");
  const closeBtn = document.getElementById("closeSponsorModal");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  let currentSlide = 0;

  if (modal) {
    // Abrir automáticamente a los 2.5 segundos de carga
    setTimeout(() => {
      modal.classList.add("active");
    }, 2500);

    if (openBtn) openBtn.addEventListener("click", () => modal.classList.add("active"));
    if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("active"));

    // Cerrar si hace clic fuera del contenido
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });

    const showSlide = (index) => {
      slides.forEach((s) => s.classList.remove("active"));
      dots.forEach((d) => d.classList.remove("active"));

      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");
    };

    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.index));
      });
    });
  }

  // ----------------------------------------------------------------------
  // 3. CAPTURA DE FORMULARIO DE LOGIN (SIMULACIÓN DE VALIDACIÓN)
  // ----------------------------------------------------------------------
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const role = document.getElementById("role").value;

      loginMessage.style.color = "#00d4ff";
      loginMessage.innerText = `Validando credenciales para ${email} como (${role.toUpperCase()})...`;

      setTimeout(() => {
        loginMessage.style.color = "#48bb78";
        loginMessage.innerText = "¡Acceso concedido! Redirigiendo al panel...";
      }, 1500);
    });
  }
});
