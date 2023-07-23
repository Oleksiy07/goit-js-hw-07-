import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  )
  .join('');
galleryList.insertAdjacentHTML('beforeend', markup);

galleryList.addEventListener('click', onClick);

function onClick(evt) {
  const { target } = evt;
  if (!target.classList.contains('gallery__image')) {
    return;
  }
  evt.preventDefault();
  const instance = basicLightbox.create(`
    <img src="${target.dataset.source}" width="800" height="600">
    `);

  instance.show();

  if (instance.visible()) {
    galleryList.addEventListener('keydown', evt => {
      if (evt.code === 'Escape') {
        instance.close();
      }
    });
  }
}
