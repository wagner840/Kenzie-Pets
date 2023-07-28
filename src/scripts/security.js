import { getUser } from "./request.js";

// variaveis globais
const user = await getUser();
let token = user;

if (!token) {
  location.replace("/");
}

// Login / LogOut
export function logout() {
  const btnLogOut = document.getElementById("btnLogOut");
  btnLogOut.addEventListener("click", () => {
    localStorage.clear("KenziePet:User");
    window.open("/", "_parent");
  });
}
