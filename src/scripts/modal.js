import { createPet, createUser, login } from "./request.js"
import { toast } from "./toast.js"
import { updateProfile } from "./request.js"
import { getUser } from "./request.js";
const user = (await getUser()) || {};
let token = user;
// Modais de Login

function createModalLogin() {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal__container--login");

  const header = document.createElement("div");
  header.classList.add("modal__header");

  const x = document.createElement("span");
  x.innerText = "X";
  x.classList.add("modal__X--login");

  const title = document.createElement("h2");
  title.innerText = "Login";

  const form = document.createElement("form");

  const email = document.createElement("input");
  email.placeholder = "E-mail";
  email.id = "email";
  email.type = "email";

  const password = document.createElement("input");
  password.placeholder = "Senha";
  password.id = "password";
  password.type = "password";

  const button = document.createElement("button");
  button.innerText = "Entrar";
  button.classList.add("btnModalLogin");

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const inputs = document.querySelectorAll(
      ".modal__container--login > form > input"
    );
    const loginUser = {};

    inputs.forEach((input) => {
      loginUser[input.id] = input.value;
    });

    form.append(email, password, button);
    if (loginUser.password !== "" && loginUser.email !== "") {
      const request = login(loginUser);
    } else if (loginUser.password == "" || loginUser.email == "") {
      toast("Por favor preencha seu email e senha", "#C20803");
    }
  });

  form.append(email, password, button);

  const description = document.createElement("p");
  description.innerText = "Não tem cadastro?";

  const spanToStyle = document.createElement("span");

  const spanToCLick = document.createElement("span");
  spanToCLick.innerText = " Clique aqui ";
  spanToCLick.classList.add("spanToClick", "spanLogin");

  const spanToDoNothing = document.createElement("span");
  spanToDoNothing.innerText = "para se cadastrar";

  spanToStyle.append(spanToCLick);
  description.append(spanToStyle, spanToDoNothing);

  modalContainer.append(header, x, title, form, description);

  return modalContainer;
}

export function renderModalLogin() {
  const modal = document.querySelector("#modalLogin");
  // const button = document.querySelector(".btnLogin");
  const modalContent = createModalLogin();

  modal.innerHTML = "";
  modal.appendChild(modalContent);
  modal.showModal();
  closeModalLogin();
  sendToRegisterModal();
}

function closeModalLogin() {
  const modalBtn = document.querySelector(".modal__X--login");
  const modal = document.querySelector("#modalLogin");

  modalBtn.addEventListener("click", (e) => {
    modal.close();
  });

  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modalLogin")) {
      modal.close();
    }
  });
}

function sendToRegisterModal() {
  const spanCliqueAqui = document.querySelector(".spanLogin");
  const modalRegister = document.querySelector("#modalCadastro");
  const modalLogin = document.querySelector("#modalLogin");

  spanCliqueAqui.addEventListener("click", () => {
    modalLogin.close();
    setTimeout(modalRegister.showModal(), 2000);
  });
}

// Modais de Register

function createModalRegister() {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal__container--register");

  const header = document.createElement("div");
  header.classList.add("modal__header");

  const x = document.createElement("span");
  x.innerText = "X";
  x.classList.add("modal__X--register");

  const title = document.createElement("h2");
  title.innerText = "Cadastrar";

  const form = document.createElement("form");

  const name = document.createElement("input");
  name.placeholder = "Nome";
  name.id = "name";

  const email = document.createElement("input");
  email.placeholder = "E-mail";
  email.id = "email";

  const password = document.createElement("input");
  password.placeholder = "Senha";
  password.id = "password";

  const avatar = document.createElement("input");
  avatar.placeholder = "Avatar? Coloque uma url válida";
  avatar.id = "avatar_url";

  const button = document.createElement("button");
  button.innerText = "Cadastrar";

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const inputs = document.querySelectorAll(
      ".modal__container--register > form > input"
    );
    const loginUser = {};

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

  form.append(name, email, password, avatar, button);

  const description = document.createElement("p");
  description.innerText = "Já tem cadastro?";

  const spanToStyle = document.createElement("span");

  const spanToCLick = document.createElement("span");
  spanToCLick.innerText = " Clique aqui ";
  spanToCLick.classList.add("spanToClick", "spanRegister");

  const spanToDoNothing = document.createElement("span");
  spanToDoNothing.innerText = "para logar";

  spanToStyle.append(spanToCLick);
  description.append(spanToStyle, spanToDoNothing);

  modalContainer.append(header, x, title, form, description);

  return modalContainer;
}

export function renderModalRegister() {
  const modal = document.querySelector("#modalCadastro");

  const modalContent = createModalRegister();

  modal.innerHTML = "";
  modal.appendChild(modalContent);
  modal.showModal();
  closeModalRegister();
  sendToLoginModal();
}

function closeModalRegister() {
  const modalBtn = document.querySelector(".modal__X--register");
  const modal = document.querySelector("#modalCadastro");

  modalBtn.addEventListener("click", (e) => {
    modal.close();
  });

  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modalCadastro")) {
      modal.close();
    }
  });
  modal.close();
}

function sendToLoginModal() {
  const spanCliqueAqui = document.querySelector(".spanRegister");
  const modalRegister = document.querySelector("#modalCadastro");
  const modalLogin = document.querySelector("#modalLogin");

  spanCliqueAqui.addEventListener("click", () => {
    modalRegister.close();
    setTimeout(modalLogin.showModal(), 2000);
  });
}

export function closeModalDeletePerfil() {
  const X = document.querySelector(".modal__X--DeletarConta");
  const modal = document.querySelector("#modalDeletarConta");
  if (X) {
    X.addEventListener("click", () => {
      modal.close();
    });
  }
}


export function createModalCadastroPet(){
  const modalWrapper = document.querySelector('#modalCadastrarPet')
  if(modalWrapper){
  modalWrapper.insertAdjacentHTML('beforeend',`
  <div class="modal__container--cadastroPet">
  <div class="modal__header"></div>
  <span class="modal__X--cadastrarPet">X</span>
  <h2 class=".text-2">Cadastrar Pet</h2>
  <form>
      <input  class="inputCadastrarPet" placeholder="Nome" id="Name2">
      <input  class="inputCadastrarPet" placeholder="Raça" id="Breed2">
  <select name="species" id="selectSpecies2">
      <option value="Cachorro">Cachorro</option>
      <option value="Gato">Gato</option>
      <option value="Aves">Aves</option>
      <option value="Repteis">Répteis</option>
  </select>
<input  class="inputCadastrarPet" placeholder="Avatar? Coloque uma url válida" id="avatar_url2">
<button id="btnConfirmRegister">Cadastrar</button>

</form>
</div>
  `)
  closeModalCadastroPet()
  
  
}

 }
 function abrirModalCadastroPet(){
  const button = document.querySelector('#makeNewPet')
const modalWrapper = document.querySelector('#modalCadastrarPet')
button.addEventListener('click',()=>{
  createModalCadastroPet()
  function ConfirmPetRegister(){
    let btnConfirmRegister = document.getElementById("btnConfirmRegister")
    btnConfirmRegister.addEventListener("click", async (event)=>{
      event.preventDefault()
      let correctToken = token.slice(1)
      correctToken = token.slice(0, -1).slice(1)
      let name = document.getElementById("Name2").value
      let bread = document.getElementById("Breed2").value
      let species = document.getElementById("selectSpecies2").value
      let avatar = document.getElementById("avatar_url2").value
      let request = await createPet(name, bread, species, avatar, correctToken)
      if(request.message === "'bread' field is required"){
        toast("Insira uma raça", "red")
      }else if(request.message === "'name' field is required"){
        toast("Insira um nome!", "red")
      }else if(request.message === "'avatar_url' is required"){
        toast("Insira um Avatar!", "red")
      }else if(request.message === 'please inform a valid image link'){
        toast("Insira um Avatar Válido!", "red")
      }else{
        toast("Pet Cadastrado!", "green")
        setTimeout(()=>{
          location.reload()
        },2000)
      }
      
     
    })
   }
   ConfirmPetRegister()
 
  modalWrapper.showModal()
})

}
abrirModalCadastroPet()
function closeModalCadastroPet(){
  const X = document.querySelector('.modal__X--cadastrarPet')
  const modalWrapper = document.querySelector('#modalCadastrarPet')
   X.addEventListener('click', ()=>{
    modalWrapper.close()
    modalWrapper.innerHTML=''
   })
 }




 
 export function createModalEditPerfil(){
  const modalWrapper = document.querySelector('.modalEditPerfil')
 
 if(modalWrapper){
  modalWrapper.insertAdjacentHTML('beforeend',`
  <div class="modal__container--editPerfil">
  <div class="modal__header">
  <span class="modal__X--editPerfil">X</span>
  </div>
  <h2>Atualizar Perfil</h2>
  <form id='form_editPerfil'>
      <input placeholder="Nome" id="name">
      <input placeholder="Avatar? Coloque uma url válida" id="avatar_url">
      <button id="confirmEditPerfil">Atualizar</button>
</form>
</div>
  `
    );
    closeModalEditPerfil();
    let confirmEditPerfil = document.getElementById("confirmEditPerfil");
    let newName = document.getElementById("name");
    let newAvatar = document.getElementById("avatar_url");
    confirmEditPerfil.addEventListener("click", async (event) => {
      event.preventDefault();
      let correctToken = token.slice(1);
      correctToken = token.slice(0, -1).slice(1);
      if (!newName.value || !newAvatar.value) {
        toast("Preencha todos os campos", "red");
      } else {
        setTimeout(() => {
          let req = updateProfile(newAvatar.value, newName.value, correctToken);
          toast("Perfil editado", "green");
          location.reload();
        }, 2000);
      }
    });
  }
}
function closeModalEditPerfil() {
  const X = document.querySelector(".modal__X--editPerfil");
  const modalWrapper = document.querySelector(".modalEditPerfil");

  console.log(modalWrapper);

  X.addEventListener("click", () => {
    modalWrapper.classList.toggle("abrirEditPerfil");
    modalWrapper.classList.toggle("modalEditPerfil");
    modalWrapper.innerHTML = "";
  });
}
