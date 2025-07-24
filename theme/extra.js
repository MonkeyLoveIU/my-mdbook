// theme/extra.js
document.addEventListener('DOMContentLoaded', function () {
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
});
