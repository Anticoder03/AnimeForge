 const htmlEl = document.documentElement;
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeSwitch = document.getElementById('theme-switch');

  // Apply saved theme on load
  if (localStorage.getItem('theme') === 'dark') {
    htmlEl.classList.add('dark');
    if (themeSwitch) themeSwitch.checked = true;
  }

  // Handle theme switch
  if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
      htmlEl.classList.toggle('dark');
      localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Toggle mobile menu
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }