import { toast } from "./toast.js";
import { createUser } from "./request.js";
import { renderFooter } from "./footer.js";

export async function userCreateForm() {
  const registerBtn = document.getElementById("registerPage");
  const inputs = document.querySelectorAll(".form__container > form > input");
  const loginUser = {};

  registerBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    inputs.forEach((input) => {
      loginUser[input.id] = input.value;
    });
    if (
      loginUser.name !== "" &&
      loginUser.password !== "" &&
      loginUser.email !== ""
    ) {
      const request = await createUser(loginUser);
    } else {
      toast("Por favor preencha todos os campos", "#C20803");
    }
  });
}

function btnLogin() {
  const btnLogin = document.getElementById("loginIndex");
  btnLogin.addEventListener("click", () => {
    window.open("../../index.html", "_parent");
  });
}
btnLogin();
userCreateForm();
