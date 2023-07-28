import { getUser } from "./request.js";
import { readProfile } from "./request.js";
import { updateProfile } from "./request.js";
import { deleteProfile } from "./request.js";
import { createPet } from "./request.js";
import { readAllPets } from "./request.js";
import { readAllMyPets } from "./request.js";
import { updatePetById } from "./request.js";
import { deletePetById } from "./request.js";
import { logout } from "./security.js";
import {
  createModalCadastroPet,
  createModalEditPerfil,
  closeModalDeletePerfil,
} from "./modal.js";
import { toast } from "./toast.js";

const user = (await getUser()) || {};
let token = user;

function btnHome() {
  const btnHome = document.getElementById("btnHome");
  btnHome.addEventListener("click", () => {
    window.open("./dashboard.html", "_parent");
    s;
  });
}

btnHome();

async function renderMyInfo() {
  if (token == {}) {
    let perfilSection = document.getElementById("perfilSection");
    let profile = await readProfile(correctToken);
    perfilSection.insertAdjacentHTML(
      "beforeend",
      `
      <div>ERRO! TOKEN NÃO ENCONTRADO</div>
    `
    );
  } else {
    let correctToken = token.slice(1);
    correctToken = token.slice(0, -1).slice(1);
    let perfilSection = document.getElementById("perfilSection");
    let profile = await readProfile(correctToken);
    perfilSection.insertAdjacentHTML(
      "beforeend",
      `
    <div>
    <img src="${profile.avatar_url}" alt="" id="perfilImg">
    </div>
    <div id="perfilInfo">
        <h2>Dados pessoais</h2>
        <p id="userName">Nome: ${profile.name}</p>
        <p id="userEmail">Email: ${profile.email}</p>
        <p id="userDate">Data de Nascimento: Não informada</p>
        <div id="btnDiv">
            <button id="btnAtualizarPerfil">Atualizar Informações</button>
            <button id="btnDeletePerfil">Deletar conta</button>
        </div>
    </div>
    `
    );
  }
  //atualizar Perfil
  const modalWrapper = document.querySelector("#wrapper-editPerfil");
  const btn = document.querySelector("#btnAtualizarPerfil");
  btn.addEventListener("click", () => {
    modalWrapper.innerHTML = "";
    createModalEditPerfil();

    modalWrapper.classList.toggle("modalEditPerfil");
    modalWrapper.classList.toggle("abrirEditPerfil");
    editPerfilForm();
  });

  //Deletar Conta

  const modal = document.querySelector("#modalDeletarConta");
  const btnDelete = document.querySelector("#btnDeletePerfil");
  btnDelete.addEventListener("click", () => {
    modal.showModal();
  });

  // Fechar Deletar Conta
  closeModalDeletePerfil();

  let btnConfirmDelete = document.getElementById("btnConfirmDelete");
  btnConfirmDelete.addEventListener("click", () => {
    let correctToken = token.slice(1);
    correctToken = token.slice(0, -1).slice(1);
    deleteProfile(correctToken);
    toast("Conta Deletada!", "red");
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
  });
}

renderMyInfo();

function editPerfilForm() {
  const profileEditInfos = {};

  const inputs = document.querySelectorAll("#form_editPerfil > input");

  console.log(inputs);

  inputs.forEach((input) => {
    profileEditInfos[input.id] = input.value;
  });
}

async function renderMyPets() {
  let correctToken = token.slice(1);
  correctToken = token.slice(0, -1).slice(1);
  let myPets = document.getElementById("myPets");
  let readPets = await readAllMyPets(correctToken);
  if (readPets.length == 0) {
    myPets.innerHTML = "";
    myPets.insertAdjacentHTML(
      "beforeend",
      `
        
         <h1 id="NoPet">VOCÊ AINDA NÃO POSSUI NENHUM PET! :(</h1>
         
         <h2>Clique no botão acima e cadastre seu primero Pet! :)</h2>
        
        `
    );
    let btnMakeNewPet = document.getElementById("makeNewPet");
    btnMakeNewPet.style.alignSelf = "center";
  } else {
    myPets.innerHTML = "";
    readPets.forEach((element) => {
      let adotavel;
      if (element.available_for_adoption) {
        adotavel = "Sim";
      } else {
        adotavel = "Não";
      }

      myPets.insertAdjacentHTML(
        "beforeend",
        `
        <div id="${element.id}">
            <div id="divPetImg">
            <img src=${element.avatar_url} alt="" id="petImg">
            </div>

            <div id="petInfo">
            <p id="petName">Nome: ${element.name}</p>
            <p id="species">Espécie: ${element.species}</p>
            <p id="adopt">Adotável: ${adotavel}</p>
            <button id="btnAtualizarPet" data-petID="${element.id}" >Atualizar</button>
            </div>
        </div>
        `
      );
    });
  }
  // Modal Atualiazar Pet

  const btn = document.querySelectorAll("#btnAtualizarPet");
  const modal = document.querySelector("#modalAtualizarPet");

  btn.forEach((element) => {
    element.addEventListener("click", (event) => {
      let petID = document.getElementById("petID");
      petID.innerText = element.dataset.petid;
      modal.showModal();
    });
  });

  let btnConfirmUpdatePet = document.getElementById("btnConfirmUpdatePet");
  btnConfirmUpdatePet.addEventListener("click", async (event) => {
    event.preventDefault();
    let correctToken = token.slice(1);
    correctToken = token.slice(0, -1).slice(1);
    let petID = document.getElementById("petID").innerText;
    let name = document.getElementById("Name").value;
    let bread = document.getElementById("Breed").value;
    let species = document.getElementById("selectSpecies").value;
    let avatar = document.getElementById("avatar_url").value;
    let request = await updatePetById(
      name,
      bread,
      species,
      avatar,
      petID,
      correctToken
    );
    if (request.message === "'bread' field is required") {
      toast("Insira uma raça", "red");
    } else if (request.message === "'name' field is required") {
      toast("Insira um nome!", "red");
    } else if (request.message === "'avatar_url' is required") {
      toast("Insira um Avatar!", "red");
    } else if (request.message === "please inform a valid image link") {
      toast("Insira um Avatar Válido!", "red");
    } else {
      toast("Pet Atualizado!", "green");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  });

  const btn2 = document.querySelector(".modal__X--AtualizarPet");
  const modal2 = document.querySelector("#modalAtualizarPet");

  btn2.addEventListener("click", (event) => {
    modal2.close();
  });
}

logout();
renderMyPets();
