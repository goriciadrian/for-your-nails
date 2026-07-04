(() => {
  const images = Array.from(document.querySelectorAll('.gallery img'));
  if (!images.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <button class="lightbox-btn lightbox-close" type="button" aria-label="Închide galeria">×</button>
    <button class="lightbox-btn lightbox-prev" type="button" aria-label="Imaginea anterioară">‹</button>
    <figure class="lightbox-figure">
      <img class="lightbox-image" src="" alt="">
    </figure>
    <button class="lightbox-btn lightbox-next" type="button" aria-label="Imaginea următoare">›</button>
  `;
  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector('.lightbox-image');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + images.length) % images.length;
    const selected = images[currentIndex];
    imgEl.src = selected.currentSrc || selected.src;
    imgEl.alt = selected.alt || 'Imagine galerie For Your Nails';
  }

  function open(index) {
    show(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
    setTimeout(() => { imgEl.src = ''; }, 180);
  }

  images.forEach((image, index) => {
    image.setAttribute('role', 'button');
    image.setAttribute('tabindex', '0');
    image.addEventListener('click', () => open(index));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(index);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', (event) => { event.stopPropagation(); show(currentIndex - 1); });
  nextBtn.addEventListener('click', (event) => { event.stopPropagation(); show(currentIndex + 1); });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.classList.contains('lightbox-figure')) close();
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(currentIndex - 1);
    if (event.key === 'ArrowRight') show(currentIndex + 1);
  });
})();
