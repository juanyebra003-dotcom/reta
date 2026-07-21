/* ==========================================================================
   RETA - LÓGICA JAVASCRIPT COMPLETA RESTAURADA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------------------------
  // 1. SLIDER SHOW PRINCIPAL DEL HERO
  // ----------------------------------------------------------------------
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDots = document.querySelectorAll(".h-dot");
  let currentHeroSlide = 0;

  if (heroSlides.length > 0) {
    const showHeroSlide = (index) => {
      heroSlides.forEach((s) => s.classList.remove("active"));
      heroDots.forEach((d) => d.classList.remove("active"));

      currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
      heroSlides[currentHeroSlide].classList.add("active");
      heroDots[currentHeroSlide].classList.add("active");
    };

    // Cambio automático cada 4 segundos
    setInterval(() => {
      showHeroSlide(currentHeroSlide + 1);
    }, 4000);

    heroDots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        showHeroSlide(parseInt(e.target.dataset.index));
      });
    });
  }

  // ----------------------------------------------------------------------
  // 2. VIDEO MODAL DE BIENVENIDA (VENTANA EMERGENTE AL CARGAR)
  // ----------------------------------------------------------------------
  const videoModal = document.getElementById("videoModal");
  const closeVideoModal = document.getElementById("closeVideoModal");
  const promoVideo = document.getElementById("promoVideo");

  if (videoModal && closeVideoModal) {
    // Abrir automáticamente al cargar la página
    videoModal.classList.add("active");

    closeVideoModal.addEventListener("click", () => {
      videoModal.classList.remove("active");
      if (promoVideo) promoVideo.src = promoVideo.src; // Pausar video
    });

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove("active");
        if (promoVideo) promoVideo.src = promoVideo.src; // Pausar video
      }
    });
  }

  // ----------------------------------------------------------------------
  // 3. CONTADOR ANIMADO (MÉTRICAS / CONTEO RÁPIDO)
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
});
