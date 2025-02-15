// Menu functionality for left-side slide-out
function initializeMenu() {
  const menuIcon = document.getElementById('menuIcon');
  const navMenu = document.getElementById('navMenu');

  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
      navMenu.classList.remove('active');
      menuIcon.classList.remove('active');
    }
  });

  // Close menu on resize if needed
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove('active');
      menuIcon.classList.remove('active');
    }
  });
}

// Show result message
function showResult(message, type) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = message;
  resultDiv.className = `result ${type} animate__animated animate__fadeInUp`;
  resultDiv.style.display = 'block';
}

// Form submission handling with hCaptcha validation
function handleFormSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const submitButton = document.getElementById('submitBtn');
  const progressBar = document.querySelector('.progress-bar');
  const progress = document.querySelector('.progress');
  const captchaResponse = hcaptcha.getResponse();

  if (!captchaResponse) {
    showResult(
      '<i class="fas fa-exclamation-triangle"></i> 請先完成驗證。',
      'error'
    );
    return;
  }

  // Disable submit button and show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 發送中...';
  progressBar.style.display = 'block';
  gsap.to(progress, { duration: 2, width: '100%', ease: 'power1.inOut' });
  document.querySelector('.loading-overlay').style.display = 'flex';

  // API call simulation using a dummy endpoint
  fetch(
    'https://script.google.com/macros/s/AKfycbysOHsdczbIUsgjjd-oqMwuomf_AtrA2jzbRbRgnkoBRul_gvtMgK_L1T7Myk_Ddoqc/exec',
    {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${encodeURIComponent(email)}&h-captcha-response=${encodeURIComponent(captchaResponse)}`
    }
  )
    .then(() => {
      showResult(
        '<i class="fas fa-check-circle"></i> 邀請碼已發送到您的郵箱，請查收。',
        'success'
      );
      showInfoModal();
      startCountdown(28800); // 8 hours countdown
    })
    .catch((error) => {
      console.error('Error:', error);
      showResult(
        `<i class="fas fa-times-circle"></i> 發送失敗: ${error.message}`,
        'error'
      );
      document.querySelector('.card').classList.add('shake');
    })
    .finally(() => {
      // Reset button and progress bar
      submitButton.disabled = false;
      submitButton.innerHTML = '發送邀請碼';
      gsap.to(progressBar, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          progressBar.style.display = 'none';
          progress.style.width = '0%';
        }
      });
      document.querySelector('.loading-overlay').style.display = 'none';
      // Reset the hCaptcha widget
      if (typeof hcaptcha !== 'undefined') {
        hcaptcha.reset();
      }
    });
}

// Countdown timer functionality
function startCountdown(count) {
  let counter = count;
  const countdownDiv = document.getElementById('countdown');
  countdownDiv.style.display = 'block';
  const intervalId = setInterval(() => {
    const hours = Math.floor(counter / 3600);
    const minutes = Math.floor((counter % 3600) / 60);
    const seconds = counter % 60;
    countdownDiv.textContent = `您可以在 ${hours} 小時 ${minutes} 分 ${seconds} 秒後再次申請邀請碼。`;
    counter--;
    if (counter < 0) {
      clearInterval(intervalId);
      countdownDiv.style.display = 'none';
    }
  }, 1000);
}

// Show info modal
function showInfoModal() {
  const modal = document.getElementById('infoModal');
  const closeBtn = modal.querySelector('.close');
  modal.style.display = 'flex';

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Disable specific shortcut keys and detect developer tools
document.addEventListener('keydown', (e) => {
  if (
    e.ctrlKey &&
    (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' || e.key === 'x' || e.key === 'X')
  ) {
    e.preventDefault();
  }
});

// Check for developer tools open and refresh page if detected
setInterval(() => {
  const devToolsOpened = () => {
    const threshold = 160;
    return window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
  };
  if (devToolsOpened()) {
    document.body.innerHTML = '<h1>請勿使用開發者工具！</h1>';
    window.location.reload();
  }
}, 1000);

// Initialize events on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeMenu();
  document.getElementById('invitationForm').addEventListener('submit', handleFormSubmit);
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});
