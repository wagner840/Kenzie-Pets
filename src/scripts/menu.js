export function showMenu() {
  const menu = document.getElementById("menu");
  const nav = document.getElementById("nav__menu");

  menu.addEventListener("click", (event) => {
    if (nav.style.display == "block") {
      nav.style.display = "none";
      menu.innerHTML = "menu";
    } else {
      nav.style.display = "block";
      menu.innerHTML = "close";
    }
  });
}

showMenu();
