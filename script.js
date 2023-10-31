document.addEventListener('DOMContentLoaded', function() {
    function toggleNav() {
      var navItems = document.querySelector('.nav-items');
      navItems.classList.toggle('active');
    }
  
    document.querySelector('.hamburger-menu').addEventListener('click', toggleNav);
  });
  