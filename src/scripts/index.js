import { toast } from "./toast.js";
import { renderFooter } from "./footer.js";
import { login, getUser } from "./request.js";

// Global vars
const user = (await getUser()) || {};
let token = user;

//

function loginForm() {
  const loginBtn = document.getElementById("loginPage");
  const inputs = document.querySelectorAll(".form__container > form > input");
  const loginUser = {};

  loginBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    inputs.forEach((input) => {
      loginUser[input.id] = input.value;
    });

    if (loginUser.password !== "" && loginUser.email !== "") {
      const request = login(loginUser);
    } else if (loginUser.password == "" || loginUser.email == "") {
      toast("Por favor preencha seu email e senha", "#C20803");
    }
  });
}
loginForm();

function btnCad() {
  const btnCadastro = document.getElementById("cadastroIndex");
  btnCadastro.addEventListener("click", () => {
    window.open("../src/pages/cadastro.html", "_parent");
  });
}
btnCad();
