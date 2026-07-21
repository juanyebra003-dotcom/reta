document.addEventListener("DOMContentLoaded", () => {
  // 1. MODAL DE VIDEO AL CARGAR LA PÁGINA
  const modal = document.getElementById("videoModal");
  const closeModal = document.getElementById("closeModal");

  // Mostrar modal tras un breve retraso
  setTimeout(() => {
    modal.classList.add("show");
  }, 1000);

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // 2. SLIDESHOW DE 5 IMÁGENES
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) slide.classList.add("active");
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Cambio automático cada 4 segundos
  setInterval(nextSlide, 4000);

  // 3. EFECTO INTERACTIVO GLOW (SEGUIMIENTO DE RATÓN EN TARJETAS)
  const glowCards = document.querySelectorAll(".glow-card");

  glowCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      // Calcula la posición relativa del ratón dentro de la tarjeta
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Asigna variables CSS personalizadas
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    });
  });
});
// --- LÓGICA DE MODAL Y SLIDER DE PATROCINADORES ---
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('sponsorModal');
  const openBtn = document.getElementById('openSponsorsBtn');
  const closeBtn = document.getElementById('closeSponsorModal');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;

  // Mostrar modal automáticamente a los 2 segundos (opcional)
  setTimeout(() => {
    if(modal) modal.classList.add('active');
  }, 2000);

  if(openBtn) openBtn.addEventListener('click', () => modal.classList.add('active'));
  if(closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  if(nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  if(prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      showSlide(parseInt(e.target.dataset.index));
    });
  });
});
