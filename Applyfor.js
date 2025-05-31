function generateInvitationCode() { 
    const now = new Date(); 
    const year = now.getFullYear(); 
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0'); 
    const hour = String(now.getHours()).padStart(2, '0'); 
    return `KHTW${year}${month}${day}${hour}`; 
}

function generateQRCode(code) {
    const qrCodeContainer = document.getElementById('qr-code-container');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code
    
    const qr = qrcode(0, 'M');
    qr.addData(code);
    qr.make();
    
    const imgTag = qr.createImgTag(5);
    qrCodeContainer.innerHTML = imgTag;
}

function updateCountdownAndCode() {
    const now = new Date();
    const codeDisplay = document.getElementById('invitation-code-display');
    const countdownDisplay = document.getElementById('countdown-display');
    
    // Generate and display current invitation code
    const currentCode = generateInvitationCode();
    codeDisplay.textContent = currentCode;
    
    // Calculate time until next hour
    const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0);
    const timeRemaining = nextHour - now;
    
    // Convert to minutes and seconds
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    
    // Display countdown
    countdownDisplay.textContent = `下次更新剩餘 ${minutes} 分 ${seconds} 秒`;
}

function copyInvitationCode() {
    const codeDisplay = document.getElementById('invitation-code-display');
    const copyFeedback = document.getElementById('copy-feedback');
    
    // Copy the code to clipboard
    navigator.clipboard.writeText(codeDisplay.textContent).then(() => {
        // Show feedback
        copyFeedback.textContent = '已複製邀請碼';
        copyFeedback.classList.add('show');
        
        // Remove feedback after 2 seconds
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('複製失敗', err);
        copyFeedback.textContent = '複製失敗';
        copyFeedback.classList.add('show');
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    });
}

function toggleQRCode() {
    const qrCodeModal = document.getElementById('qr-code-modal');
    const currentCode = document.getElementById('invitation-code-display').textContent;
    
    // Generate QR Code
    generateQRCode(currentCode);
    
    // Show modal
    qrCodeModal.style.display = 'flex';
}

function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial update
    updateCountdownAndCode();
    
    // Update every second
    setInterval(updateCountdownAndCode, 1000);
    
    // Add copy button functionality
    const copyBtn = document.getElementById('copy-code-btn');
    copyBtn.addEventListener('click', copyInvitationCode);
    
    // Add QR code toggle functionality
    const showQRBtn = document.getElementById('show-qr-btn');
    showQRBtn.addEventListener('click', toggleQRCode);

    // Dark mode toggle button
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleDarkMode);

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Prevent double-tap zoom on mobile
    const preventZoom = (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    };

    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventZoom, { passive: false });

    // Optional: Disable zooming
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Side Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    menuToggle.addEventListener('click', () => {
        sideMenu.classList.add('open');
        menuOverlay.classList.add('open');
    });

    closeMenu.addEventListener('click', () => {
        sideMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
    });

    menuOverlay.addEventListener('click', () => {
        sideMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
    });

    // Instructions Modal
    const instructionsModal = document.getElementById('instructions-modal');
    const instructionsLink = document.getElementById('instructions-link');
    const closeModal = document.querySelector('.close-modal');

    instructionsLink.addEventListener('click', () => {
        instructionsModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        instructionsModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === instructionsModal) {
            instructionsModal.style.display = 'none';
        }
    });

    // Prevent page copying and screenshots
    const preventCopy = (e) => {
        e.preventDefault();
    };

    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Disable text selection
    document.addEventListener('selectstart', preventCopy);
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';

    // Disable copying
    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCopy);

    // Detect DevTools opening
    const checkDevTools = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            console.clear();
            // Optional: Take additional actions if DevTools are detected
        }
    };

    window.addEventListener('resize', checkDevTools);

    // Back to Landing Page Button
    const backToLandingBtn = document.getElementById('back-to-landing');
    backToLandingBtn.addEventListener('click', () => {
        // Replace with the actual URL of your landing page
        window.location.href = 'index.html';
    });

    // QR Code Modal
    const qrCodeModal = document.getElementById('qr-code-modal');
    const qrCodeCloseBtn = qrCodeModal.querySelector('.close-modal');
    
    qrCodeCloseBtn.addEventListener('click', () => {
        qrCodeModal.style.display = 'none';
    });
    
    // Close QR code modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === qrCodeModal) {
            qrCodeModal.style.display = 'none';
        }
    });
});