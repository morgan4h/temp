/**
 * Channel Portal Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // UI Elements
  const cardsContainer = document.getElementById('cardsContainer');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  /**
   * Main Card Click Handler (Event Delegation)
   */
  cardsContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.channel-card');
    if (!card) return;

    const type = card.dataset.type;
    const title = card.dataset.title || 'Channel Info';
    const url = card.dataset.url;
    const desc = card.dataset.desc || 'This channel content is coming soon!';

    if (type === 'active' && url) {
      navigateTo(url);
    } else {
      openModal(title, desc);
    }
  });

  /**
   * Navigation Controller
   * @param {string} targetUrl 
   */
  function navigateTo(targetUrl) {
    window.location.href = targetUrl;
  }

  /**
   * Opens custom Modal Dialog
   * @param {string} title 
   * @param {string} description 
   */
  function openModal(title, description) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalBackdrop.classList.add('is-open');
  }

  /**
   * Closes Modal Dialog
   */
  function closeModal() {
    modalBackdrop.classList.remove('is-open');
  }

  // Modal Event Listeners
  modalCloseBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside the modal box
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Keyboard shortcut: Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });
});