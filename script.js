document.addEventListener('DOMContentLoaded', function() {
  // Loader
  setTimeout(() => {
      const loader = document.getElementById('loader');
      loader.style.opacity = '0';
      setTimeout(() => {
          loader.style.display = 'none';
      }, 500);
  }, 2500);

  // Wishes Carousel
  const wishes = [
      "May Allah's blessings be with you today and always. Eid Mubarak!",
      "On this special day, may Allah bless you with peace, happiness, and prosperity.",
      "Wishing you a joyous Eid filled with love, laughter, and delicious food!",
      "May this Eid bring joy and love to your heart and create beautiful memories.",
      "Eid Mubarak! May Allah accept our good deeds, forgive our transgressions, and ease our suffering.",
      "May the divine blessings of Allah bring you hope, faith, and joy on Eid and forever. Eid Mubarak!"
  ];

  let currentWishIndex = 0;
  const wishText = document.querySelector('.wish-text');
  const prevWishBtn = document.getElementById('prev-wish');
  const nextWishBtn = document.getElementById('next-wish');
  const carouselIndicators = document.getElementById('carousel-indicators');

  // Create indicators
  wishes.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      carouselIndicators.appendChild(indicator);
  });

  // Update wish display
  function updateWish() {
      wishText.classList.remove('fade-in');
      void wishText.offsetWidth; // Trigger reflow
      wishText.textContent = wishes[currentWishIndex];
      wishText.classList.add('fade-in');

      document.querySelectorAll('.indicator').forEach((indicator, index) => {
          if (index === currentWishIndex) {
              indicator.classList.add('active');
          } else {
              indicator.classList.remove('active');
          }
      });
  }

  // Initialize first wish
  updateWish();

  prevWishBtn.addEventListener('click', () => {
      currentWishIndex = (currentWishIndex - 1 + wishes.length) % wishes.length;
      updateWish();
  });

  nextWishBtn.addEventListener('click', () => {
      currentWishIndex = (currentWishIndex + 1) % wishes.length;
      updateWish();
  });

  // Auto-rotate wishes
  setInterval(() => {
      currentWishIndex = (currentWishIndex + 1) % wishes.length;
      updateWish();
  }, 5000);

  // Copy UPI ID
  const copyUpiBtn = document.getElementById('copy-upi');
    copyUpiBtn.addEventListener('click', () => {
        const upiId = 'shkshaadu@oksbi';

        if (navigator.clipboard && navigator.clipboard.writeText) {
            // Modern browsers
            navigator.clipboard.writeText(upiId)
                .then(() => {
                    showCopySuccess();
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                    fallbackCopy(upiId);
                });
        } else {
            // Older browsers or mobile fallback
            fallbackCopy(upiId);
        }
    });

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess();
            } else {
                showCopyFailed();
            }
        } catch (err) {
            console.error('Fallback: Could not copy text: ', err);
            showCopyFailed();
        }
        document.body.removeChild(textArea);
    }

    function showCopySuccess() {
        copyUpiBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyUpiBtn.innerHTML = '<i class="fas fa-copy"></i> Copy UPI ID';
        }, 2000);
    }

    function showCopyFailed() {
        alert('Copy failed. Please copy the UPI ID manually.');
    }

  // Create floating elements
  const floatingElementsContainer = document.getElementById('floating-elements');
  
  // Create stars
  for (let i = 0; i < 15; i++) {
      createFloatingElement('star', i);
  }
  
  // Create moons
  for (let i = 0; i < 5; i++) {
      createFloatingElement('moon', i + 15);
  }
  
  // Create patterns
  for (let i = 0; i < 8; i++) {
      createFloatingElement('pattern', i + 20);
  }

  function createFloatingElement(type, id) {
      const element = document.createElement('div');
      element.classList.add('floating-element');
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size
      let size;
      if (type === 'star') {
          size = Math.random() * 1.5 + 0.5;
      } else if (type === 'moon') {
          size = Math.random() * 2 + 1;
      } else {
          size = Math.random() * 3 + 2;
      }
      
      // Random speed
      const speed = type === 'star' ? 
                          (Math.random() * 0.5 + 0.1) : 
                          type === 'moon' ? 
                          (Math.random() * 0.3 + 0.05) : 
                          (Math.random() * 0.2 + 0.05);
      
      // Random rotation
      const rotation = Math.random() * 360;
      const rotationSpeed = (Math.random() - 0.5) * (type === 'star' ? 2 : type === 'moon' ? 1.5 : 1);
      
      // Set styles
      element.style.left = `${x}%`;
      element.style.top = `${y}%`;
      element.style.transform = `rotate(${rotation}deg)`;
      
      // Add content based on type
      if (type === 'star') {
          element.innerHTML = `<i class="fas fa-star" style="font-size: ${size}rem; color: #fcd34d;"></i>`;
      } else if (type === 'moon') {
          element.innerHTML = `<i class="fas fa-moon" style="font-size: ${size}rem; color: #fef3c7;"></i>`;
      } else {
          element.innerHTML = `<div style="width: ${size}rem; height: ${size}rem; border-radius: 50%; border: 1px solid rgba(252, 211, 77, 0.3);"></div>`;
      }
      
      // Add to container
      floatingElementsContainer.appendChild(element);
      
      // Animation data
      element.dataset.speed = speed;
      element.dataset.rotation = rotation;
      element.dataset.rotationSpeed = rotationSpeed;
  }

  // Animate floating elements
  let lastTime = 0;
  
  function animateElements(time) {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;
      
      const elements = document.querySelectorAll('.floating-element');
      elements.forEach(element => {
          // Get current position
          const currentY = parseFloat(element.style.top);
          const speed = parseFloat(element.dataset.speed);
          
          // Update position
          let newY = currentY - speed * (delta / 60);
          if (newY < -10) newY = 110;
          
          // Update rotation
          const currentRotation = parseFloat(element.dataset.rotation);
          const rotationSpeed = parseFloat(element.dataset.rotationSpeed);
          const newRotation = (currentRotation + rotationSpeed * (delta / 60)) % 360;
          
          // Apply new values
          element.style.top = `${newY}%`;
          element.style.transform = `rotate(${newRotation}deg)`;
          element.dataset.rotation = newRotation;
      });
      
      requestAnimationFrame(animateElements);
  }
  
  requestAnimationFrame(animateElements);
});