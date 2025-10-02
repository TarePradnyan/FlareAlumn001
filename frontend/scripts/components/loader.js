export async function loadComponent(selector) {
  const container = document.querySelector(selector);
  if (!container) return;
  
  const source = container.getAttribute('data-source');
  if (!source) return;
  
  try {
    const response = await fetch(source);

    if (response.ok) {
      const html = await response.text();
      container.innerHTML = html;
      
      // Initialize any JavaScript for the loaded component
      if (source.includes('navbar.html')) {
        initializeNavbar();
      }
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

function initializeNavbar() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}