// Common JavaScript for language selection and shared functionality

// Store information about whether language has been selected
function isLanguageAlreadySelected() {
  return localStorage.getItem('languageSelected') === 'true';
}

// Create language selection modal
function createLanguageModal() {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'language-modal-overlay';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'language-modal';
  
  const modalHeader = document.createElement('div');
  modalHeader.className = 'language-modal-header';
  
  const modalTitle = document.createElement('h2');
  modalTitle.textContent = 'Select Your Language';
  modalHeader.appendChild(modalTitle);
  
  const modalBody = document.createElement('div');
  modalBody.className = 'language-modal-body';
  
  const languageText = document.createElement('p');
  languageText.textContent = 'Choose your preferred language to explore our site:';
  languageText.innerHTML += '<br><span class="arabic-text">اختر لغتك المفضلة لاستكشاف موقعنا:</span>';
  modalBody.appendChild(languageText);
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'language-buttons';
  
  const englishButton = document.createElement('button');
  englishButton.className = 'language-btn en-btn';
  englishButton.textContent = 'English';
  englishButton.addEventListener('click', function() {
    selectLanguage('en');
    closeModal(modalOverlay);
  });
  
  const arabicButton = document.createElement('button');
  arabicButton.className = 'language-btn ar-btn';
  arabicButton.textContent = 'العربية';
  arabicButton.addEventListener('click', function() {
    selectLanguage('ar');
    closeModal(modalOverlay);
  });
  
  buttonContainer.appendChild(englishButton);
  buttonContainer.appendChild(arabicButton);
  
  modalBody.appendChild(buttonContainer);
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalOverlay.appendChild(modalContent);
  
  document.body.appendChild(modalOverlay);
  
  // Add animation class after a small delay (for transition effect)
  setTimeout(() => {
    modalOverlay.classList.add('active');
    modalContent.classList.add('active');
  }, 10);
  
  return modalOverlay;
}

function closeModal(modalElement) {
  if (modalElement) {
    modalElement.classList.remove('active');
    
    // Remove after animation completes
    setTimeout(() => {
      if (modalElement.parentNode) {
        modalElement.parentNode.removeChild(modalElement);
      }
    }, 500);
  }
}

function selectLanguage(lang) {
  localStorage.setItem('languageSelected', 'true');
  localStorage.setItem('preferredLanguage', lang);
  
  // Update the language (assuming this function exists in the page)
  if (typeof updateLanguage === 'function') {
    updateLanguage(lang);
  } else {
    // If updateLanguage is not defined, reload the page to apply language
    location.reload();
  }
}

// Show language selection modal on first visit
function showLanguageSelectionModal() {
  if (!isLanguageAlreadySelected()) {
    createLanguageModal();
  }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add the CSS for the modal
  const style = document.createElement('style');
  style.textContent = `
    /* Language Selection Modal */
    .language-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .language-modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    
    .language-modal {
      background-color: var(--card-bg, #ffffff);
      border-radius: var(--border-radius, 16px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      width: 90%;
      max-width: 500px;
      padding: 2rem;
      transform: translateY(-20px);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .language-modal.active {
      transform: translateY(0);
      opacity: 1;
    }
    
    .language-modal-header {
      margin-bottom: 1.5rem;
      text-align: center;
    }
    
    .language-modal-header h2 {
      color: var(--primary-color, #6c5ce7);
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0;
    }
    
    .language-modal-body p {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      line-height: 1.5;
      color: var(--text-color, #333);
    }
    
    .arabic-text {
      font-size: 1.1rem;
      display: block;
      margin-top: 0.5rem;
      direction: rtl;
    }
    
    .language-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
    
    .language-btn {
      background: var(--btn-gradient, linear-gradient(to right, #6c5ce7, #a29bfe));
      color: white;
      border: none;
      border-radius: 30px;
      padding: 0.8rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .language-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(108, 92, 231, 0.4);
    }
    
    .ar-btn {
      font-family: 'Inter', sans-serif;
    }
    
    /* Responsive Adjustments */
    @media (max-width: 768px) {
      .language-modal {
        padding: 1.5rem;
      }
      
      .language-modal-header h2 {
        font-size: 1.5rem;
      }
      
      .language-modal-body p, 
      .arabic-text {
        font-size: 0.9rem;
      }
      
      .language-btn {
        padding: 0.7rem 1.5rem;
        font-size: 0.9rem;
      }
      
      .language-buttons {
        gap: 0.8rem;
      }
    }
    
    /* Dark Theme Support */
    [data-theme="dark"] .language-modal {
      background-color: var(--card-bg, #1e1e1e);
    }
    
    [data-theme="dark"] .language-modal-header h2 {
      color: var(--primary-color, #a29bfe);
    }
    
    [data-theme="dark"] .language-modal-body p {
      color: var(--text-color, #f1f1f1);
    }
  `;
  
  document.head.appendChild(style);
  
  // Show language selection modal if needed
  showLanguageSelectionModal();
});
