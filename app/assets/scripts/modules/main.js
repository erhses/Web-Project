var mainList = document.getElementById("mainList"),
  mediaButton = document.getElementById("media"),
  navigationImage = document.querySelector(".navigation__img")

mediaButton.onclick = function () {
  "use strict";

  mainList.classList.toggle("show_list");
  mediaButton.classList.toggle("active");
  document.body.classList.toggle("menu-open");
  if (navigationImage.style.display === "none") {
    navigationImage.style.display = "block";
} else {
    navigationImage.style.display = "none";
}
};

