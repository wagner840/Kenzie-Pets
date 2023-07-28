import { showMenu } from "./menu.js";
import { renderFooter } from "./footer.js";
import { getAllPets, getUser, createAdopt } from "./request.js";
import { logout } from "./security.js";

// Global var
const user = (await getUser()) || {};
let token = user;

let correctToken = token.slice(1);
correctToken = token.slice(0, -1).slice(1);

if (!token) {
  window.location.replace("../../index.html");
}

function btnPerfil() {
  const btnPerfil = document.getElementById("btnPerfil");
  btnPerfil.addEventListener("click", () => {
    window.open("../pages/perfil.html", "_parent");
    s;
  });
}

btnPerfil();

export async function renderCardsHome(allPets) {
  const dashPage = document.getElementById("petCardHome");

  const pets = await getAllPets(token);

  // console.log(pets);

  dashPage.innerHTML = "";

  pets.forEach((e) => {
    if (e.available_for_adoption === true) {
      const li = document.createElement("li");
      const imgAvatar = document.createElement("img");
      const div = document.createElement("div");
      const h1 = document.createElement("h1");
      const spanRaca = document.createElement("span");
      const spanSpecies = document.createElement("span");
      const btnAdotar = document.createElement("button");

      imgAvatar.src = e.avatar_url;
      imgAvatar.alt = e.name;

      h1.innerText = e.name;
      spanRaca.innerText = e.bread;
      spanSpecies.innerText = e.species;

      btnAdotar.innerText = "Me Adote?";
      btnAdotar.id = "btnAdopt";

      const body = {
        pet_id: e.id,
      };

      // console.log(allAdopt);

      btnAdotar.addEventListener("click", (event) => {
        event.preventDefault();

        // console.log(correctToken);
        // console.log(token);

        console.log(e.id);

        createAdopt(correctToken, body);
      });

      h1.classList.add("text-2", "purple100");
      spanRaca.classList.add("text-3", "gray200");
      spanSpecies.classList.add("text-3", "gray200");
      btnAdotar.classList.add(
        "btn",
        "btnAdotar",
        "white100",
        "back-green100",
        "text-4"
      );

      div.append(h1, spanRaca, spanSpecies);
      li.append(imgAvatar, div, btnAdotar);
      dashPage.appendChild(li);
    }
  });
}

//
renderCardsHome();
logout();
