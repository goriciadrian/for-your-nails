const galleryImages = document.querySelectorAll('.gallery img');

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Închide">×</button>
  <img src="" alt="Imagine galerie">
`;

document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.lightbox-close');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
