// Image Modal JavaScritp


document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.querySelector('.modal-prev');
  const modalNext = document.querySelector('.modal-next');
  const thumbs = document.querySelectorAll('.thumb');

  let currentIndex = 0;
  const imageList = Array.from(thumbs).map(thumb => thumb.getAttribute('data-full'));
  console.log('imageList:', imageList); // debug

  function openImage(index) {
    currentIndex = index;
    const fullSrc = imageList[currentIndex];
    console.log('Opening image:', currentIndex, fullSrc); // debug

    modalImg.src = fullSrc;
    modal.style.display = 'flex';
    modalImg.classList.add('fade-in');

    modalImg.addEventListener('animationend', () => {
      modalImg.classList.remove('fade-in');
    }, { once: true });
  }

  function closeModal() {
    modal.classList.add('fade-out');
    modal.addEventListener('animationend', () => {
      modal.style.display = 'none';
      modal.classList.remove('fade-out');
      modalImg.src = '';
    }, { once: true });
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      openImage(index);
    });
  });

  modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    openImage(currentIndex);
  });

  modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % imageList.length;
    openImage(currentIndex);
  });

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
	