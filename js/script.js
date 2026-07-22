/* ==========================================================================
   RETA - LÓGICA JAVASCRIPT PRINCIPAL Y UNIFICADA
   ========================================================================== */

// FUNCIÓN GLOBAL PARA CERRAR MODALES
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}

// CAMBIO DE PASOS EN EL WIZARD DE REGISTRO (registro.html)
function goToStep(stepNumber) {
  const steps = document.querySelectorAll(".wizard-step");
  const dots = document.querySelectorAll(".step-indicator");

  if (steps.length > 0) {
    steps.forEach((step, index) => {
      step.classList.remove("active");
      if (index === stepNumber - 1) {
        step.classList.add("active");
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

  // SIMULACIÓN DE ESCANEO OCR DE LA INE
  const ineDropzone = document.getElementById("ineDropzone");
  const ineFileInput = document.getElementById("ineFileInput");
  const ocrStatus = document.getElementById("ocrStatus");

  if (ineDropzone && ineFileInput) {
    ineDropzone.addEventListener("click", () => ineFileInput.click());

    ineFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        if (ocrStatus) {
          ocrStatus.style.color = "#00d4ff";
          ocrStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Escaneando INE vía OCR... Extrayendo datos personales...';
        }

        // Vista previa de la fotografía extraída
        const reader = new FileReader();
        reader.onload = (event) => {
          const previewImg = document.getElementById("playerPhotoPreview");
          if (previewImg) previewImg.src = event.target.result;
        };
        reader.readAsDataURL(file);

        // Autocompletar datos tras el OCR (Simulado)
        setTimeout(() => {
          if (document.getElementById("firstName")) document.getElementById("firstName").value = "CARLOS";
          if (document.getElementById("lastName")) document.getElementById("lastName").value = "FLORES MENDOZA";
          if (document.getElementById("curp")) document.getElementById("curp").value = "FLMC980417HGTXRR09";
          if (document.getElementById("age")) document.getElementById("age").value = "28";
          if (document.getElementById("gender")) document.getElementById("gender").value = "Masculino";
          if (document.getElementById("stateRes")) document.getElementById("stateRes").value = "Guanajuato";
          if (document.getElementById("cityRes")) document.getElementById("cityRes").value = "Moroleón";

          if (ocrStatus) {
            ocrStatus.style.color = "#48bb78";
            ocrStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> ¡INE Escaneada con Éxito! Campos autocompletados.';
          }
        }, 1800);
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

  // ----------------------------------------------------------------------
  // 7. GENERACIÓN DE CREDENCIAL DIGITAL VIRTUAL CON CÓDIGO ÚNICO + QR
  // ----------------------------------------------------------------------
  window.processFinalRegistration = function () {
    const firstName = (document.getElementById("firstName")?.value || "JUGADOR").toUpperCase();
    const lastName = (document.getElementById("lastName")?.value || "RETA").toUpperCase();
    const dorsal = document.getElementById("dorsalNumber")?.value || "10";
    
    const leagueSelect = document.getElementById("leagueSelect");
    let stateKey = "GTO";
    let tournamentKey = "001";
    let leagueName = "LIGA PREMIER RETA";

    if (leagueSelect && leagueSelect.selectedIndex !== -1) {
      const selectedOption = leagueSelect.options[leagueSelect.selectedIndex];
      stateKey = selectedOption.getAttribute("data-state") || "GTO";
      tournamentKey = selectedOption.getAttribute("data-tournament") || "001";
      leagueName = selectedOption.text;
    }

    const teamSelect = document.getElementById("teamSelect");
    let teamName = "Equipo RETA";
    let teamLogoUrl = "";

    if (teamSelect && teamSelect.selectedIndex !== -1) {
      const teamOption = teamSelect.options[teamSelect.selectedIndex];
      teamName = teamOption.text;
      teamLogoUrl = teamOption.getAttribute("data-logo") || "";
    }

    const category = document.getElementById("categorySelect")?.value || "Libre";
    const branch = document.getElementById("branchSelect")?.value || "Varonil";
    const blood = document.getElementById("bloodType")?.value || "O+";
    const allergies = document.getElementById("allergiesSelect")?.value || "Ninguna";

    // Generar código único RETA-XXXX-YYYY-ZZZ
    const consecutive = Math.floor(1000 + Math.random() * 9000);
    const uniqueCode = `RETA-${consecutive}-${stateKey}-${tournamentKey}`;

    // Actualizar campos de la credencial virtual
    if (document.getElementById("credPlayerName")) document.getElementById("credPlayerName").innerText = `${firstName} ${lastName}`;
    if (document.getElementById("credUniqueCode")) document.getElementById("credUniqueCode").innerText = uniqueCode;
    if (document.getElementById("credLeagueName")) document.getElementById("credLeagueName").innerText = leagueName;
    if (document.getElementById("credTeamName")) document.getElementById("credTeamName").innerText = teamName;
    if (document.getElementById("credCatBranch")) document.getElementById("credCatBranch").innerText = `${category} / ${branch}`;
    if (document.getElementById("credDorsal")) document.getElementById("credDorsal").innerText = `#${dorsal}`;
    if (document.getElementById("credBlood")) document.getElementById("credBlood").innerText = blood;
    if (document.getElementById("credAllergies")) document.getElementById("credAllergies").innerText = allergies;

    const previewPhoto = document.getElementById("playerPhotoPreview");
    if (previewPhoto && document.getElementById("credPlayerPhoto")) {
      document.getElementById("credPlayerPhoto").src = previewPhoto.src;
    }

    if (document.getElementById("credTeamLogo")) {
      document.getElementById("credTeamLogo").src = teamLogoUrl;
    }

    // Generar el código QR vinculado
    const supabaseRecordUrl = `https://reta.app/validar?code=${uniqueCode}`;
    if (document.getElementById("credQrCode")) {
      document.getElementById("credQrCode").src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(supabaseRecordUrl)}`;
    }

    // Pasar al último paso (Paso 4: Credencial)
    goToStep(4);
  };
});
/* ==========================================================================
   LÓGICA DE AUDITORÍA IP, TÉRMINOS LEGALES Y CREDENCIAL CON ESCUDO AMPLIA
   ========================================================================== */

let userPublicIP = "Obteniendo IP...";

// Función para obtener la dirección IP pública del usuario mediante servicio API gratuito
async function fetchUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    userPublicIP = data.ip;
  } catch (error) {
    userPublicIP = "192.168.1.1 (IP Local)";
  }
}

// Ejecutar obtención de IP al cargar la página
fetchUserIP();

function openTermsModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById("termsModal");
  if (modal) modal.classList.add("active");
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

// Validación del Paso 1 antes de avanzar
function validateStep1AndProceed() {
  const emailCheckbox = document.getElementById("verifyEmailCheckbox");
  const termsCheckbox = document.getElementById("acceptTermsCheckbox");

  if (!emailCheckbox || !emailCheckbox.checked) {
    alert("Por favor confirma que tu correo electrónico es válido.");
    return;
  }

  if (!termsCheckbox || !termsCheckbox.checked) {
    alert("Debes aceptar los Términos, Condiciones y Deslinde de Responsabilidad para continuar.");
    return;
  }

  goToStep(2);
}
