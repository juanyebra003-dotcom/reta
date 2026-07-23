/* ==========================================================================
   RETA - LÓGICA JAVASCRIPT PRINCIPAL Y UNIFICADA
   ========================================================================== */

// FUNCIÓN GLOBAL PARA CERRAR MODALES
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }
}

// CAMBIO DE PASOS EN EL WIZARD DE REGISTRO (registro.html)
function goToStep(stepNumber) {
  const steps = document.querySelectorAll(".wizard-step");
  const dots = document.querySelectorAll(".step-indicator");

  if (steps.length > 0) {
    steps.forEach((step, index) => {
      step.style.display = (index === stepNumber - 1) ? "block" : "none";
      if (index === stepNumber - 1) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === stepNumber - 1) {
        dot.classList.add("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------------------------
  // 1. SLIDESHOW HERO IZQUIERDO (index.html)
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
  // 2. MODAL INICIAL - VIDEO DE BIENVENIDA (index.html)
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
  // 3. SECUENCIA DE VENTANAS EMERGENTES / POPUPS (20s, 30s, 40s)
  // ----------------------------------------------------------------------
  setTimeout(() => {
    const modal1 = document.getElementById("modalSponsor1");
    if (modal1) modal1.classList.add("active");
  }, 20000);

  setTimeout(() => {
    const modal2 = document.getElementById("modalSponsor2");
    if (modal2) modal2.classList.add("active");
  }, 30000);

  setTimeout(() => {
    const modal3 = document.getElementById("modalPromo");
    if (modal3) modal3.classList.add("active");
  }, 40000);

  // ----------------------------------------------------------------------
  // 4. INTERACTIVIDAD PARA ESTAMPAS PANINI (index.html)
  // ----------------------------------------------------------------------
  const stickers = document.querySelectorAll('.panini-sticker');

  stickers.forEach(sticker => {
    sticker.addEventListener('click', () => {
      stickers.forEach(s => {
        if (s !== sticker) s.classList.remove('zoomed');
      });
      sticker.classList.toggle('zoomed');
    });
  });

  // ----------------------------------------------------------------------
  // 5. CONTADOR ANIMADO - MÉTRICAS (index.html)
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
  // 6. MANEJO DEL REGISTRO WIZARD / INE / OCR / MENOR DE EDAD (registro.html)
  // ----------------------------------------------------------------------
  const methodIne = document.getElementById("methodIne");
  const methodMinor = document.getElementById("methodMinor");
  const ineSection = document.getElementById("ineOcrSection");
  const minorSection = document.getElementById("minorSection");
  const optionIneLabel = document.getElementById("optionIneLabel");
  const optionMinorLabel = document.getElementById("optionMinorLabel");

  if (methodIne && methodMinor) {
    methodIne.addEventListener("change", () => {
      if (ineSection) ineSection.style.display = "block";
      if (minorSection) minorSection.style.display = "none";
      if (optionIneLabel) optionIneLabel.classList.add("active");
      if (optionMinorLabel) optionMinorLabel.classList.remove("active");
    });

    methodMinor.addEventListener("change", () => {
      if (ineSection) ineSection.style.display = "none";
      if (minorSection) minorSection.style.display = "block";
      if (optionIneLabel) optionIneLabel.classList.remove("active");
      if (optionMinorLabel) optionMinorLabel.classList.add("active");
    });
  }

  // MANEJO DE VISTA PREVIA INE / OCR SINO ESTÁ PRESENTE EN EL HTML
  const ineFileInput = document.getElementById("ineFileInput");
  const ocrStatus = document.getElementById("ocrStatus");

  if (ineFileInput) {
    ineFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        if (ocrStatus) {
          ocrStatus.style.color = "#00d4ff";
          ocrStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando INE vía OCR... Extrayendo datos biográficos...';
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const previewImg = document.getElementById("playerPhotoPreview");
          if (previewImg) previewImg.src = event.target.result;
        };
        reader.readAsDataURL(file);

        setTimeout(() => {
          if (ocrStatus) {
            ocrStatus.style.color = "#48bb78";
            ocrStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> ¡INE Adjuntada con Éxito!';
          }
        }, 1200);
      }
    });
  }

  // Previsualización al subir foto manual
  const playerPhotoInput = document.getElementById("playerPhotoInput");
  if (playerPhotoInput) {
    playerPhotoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const previewImg = document.getElementById("playerPhotoPreview");
          if (previewImg) previewImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

/* ==========================================================================
   LÓGICA DE AUDITORÍA IP Y TÉRMINOS LEGALES
   ========================================================================== */

let userPublicIP = "Obteniendo IP...";

async function fetchUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    userPublicIP = data.ip;
  } catch (error) {
    userPublicIP = "192.168.1.1 (IP Local)";
  }
}

fetchUserIP();

function openTermsModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById("termsModal");
  if (modal) {
    modal.style.display = "flex";
    modal.classList.add("active");
  }
}

function acceptTermsFromModal() {
  const checkbox = document.getElementById("acceptTermsCheckbox");
  if (checkbox) {
    checkbox.checked = true;
    triggerIpAudit();
  }
  closeModal("termsModal");
}

function triggerIpAudit() {
  const ipText = document.getElementById("ipAuditText");
  if (ipText) {
    const now = new Date().toLocaleString("es-MX");
    ipText.style.display = "flex";
    ipText.innerHTML = `<i class="fa-solid fa-shield-halved"></i> Registro Aceptado Legalmente | IP: ${userPublicIP} | Fecha: ${now}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const acceptTermsCheckbox = document.getElementById("acceptTermsCheckbox");
  if (acceptTermsCheckbox) {
    acceptTermsCheckbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        triggerIpAudit();
      } else {
        const ipText = document.getElementById("ipAuditText");
        if (ipText) ipText.style.display = "none";
      }
    });
  }
});
