let cart = [];
document.addEventListener('DOMContentLoaded', function() {
    function toggleNav() {
      var navItems = document.querySelector('.nav-items');
      navItems.classList.toggle('active');  
    }
  
    document.querySelector('.hamburger-menu').addEventListener('click', toggleNav);
  });

function addToCart() {
    console.log("Added to cart:", cart);
    alert("added");
  }

  document.getElementsByClassName("card__button").addEventListener("click", addToCart());