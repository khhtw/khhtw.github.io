document.addEventListener('DOMContentLoaded', () => {
  const targetUrl = 'https://khhtw.github.io/Applyfor';
  const redirectDelay = 3000; // 3 seconds

  // Update manual link
  const manualLink = document.getElementById('manual-link');
  manualLink.href = targetUrl;

  // Perform redirect after delay
  setTimeout(() => {
    window.location.href = targetUrl;
  }, redirectDelay);
});