/* ==========================================================================
   RETA - LÓGICA JAVASCRIPT PRINCIPAL
   ========================================================================== */

// FUNCIÓN GLOBAL PARA CERRAR MODALES
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------------------------
  // 1. SLIDESHOW HERO IZQUIERDO
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
  // 2. MODAL INICIAL (VIDEO DE BIENVENIDA)
  // ----------------------------------------------------------------------
  const videoModal = document.getElementById("videoModal");
  const closeVideoModal = document.getElementById("closeVideoModal");
  const promoVideo = document.getElementById("promoVideo");

  if (videoModal && closeVideoModal) {
    closeVideoModal.addEventListener("click", () => {
      videoModal.classList.remove("active");
      if (promoVideo) promoVideo.src = promoVideo.src;
    });

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove("active");
        if (promoVideo) promoVideo.src = promoVideo.src;
      }
    });
  }

  // ----------------------------------------------------------------------
  // 3. SECUENCIA DE VENTANAS EMERGENTES (20s, 30s, 40s)
  // ----------------------------------------------------------------------
  
  // Ventana 1: Patrocinador 1 a los 20 segundos
  setTimeout(() => {
    const modal1 = document.getElementById("modalSponsor1");
    if (modal1) modal1.classList.add("active");
  }, 20000);

  // Ventana 2: Patrocinador 2 a los 30 segundos
  setTimeout(() => {
    const modal2 = document.getElementById("modalSponsor2");
    if (modal2) modal2.classList.add("active");
  }, 30000);

  // Ventana 3: Promoción RETA a los 40 segundos
  setTimeout(() => {
    const modal3 = document.getElementById("modalPromo");
    if (modal3) modal3.classList.add("active");
  }, 40000);

  // ----------------------------------------------------------------------
  // 4. CONTADOR ANIMADO (MÉTRICAS / CONTEO RÁPIDO)
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
