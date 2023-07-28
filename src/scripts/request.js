import { toast } from "./toast.js";
// Global Vars

const urlBase = "http://localhost:3333";
const user = getUser() || {};
let token = await user;

const headerWithoutToken = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
//

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function getUser() {
  const user = localStorage.getItem("KenziePet:User");
  return user;
}
export async function createUser(dataJSON) {
  const modal = document.querySelector("#modalCadastro");

  const userData = await fetch(`${urlBase}/users`, {
    method: "POST",
    headers: headerWithoutToken,
    body: JSON.stringify(dataJSON),
  });

  const response = await userData.json();
  if (response.id) {
    toast(
      "Conta criada com sucesso, você será direcionado para a página de login",
      "#08C203"
    );
    setTimeout(() => {
      window.open("/index.html", "_parent");
    }, 3000);
  } else if (response.message.includes("Email")) {
    toast("Email, já cadastrado", "#C20803");
  } else {
    toast("Por favor verifica o link de sua imagem", "#C20803");
  }
  return userData;
}
export async function login(dataJSON) {
  const loginData = await fetch(`${urlBase}/session/login`, {
    method: "POST",
    headers: headerWithoutToken,
    body: JSON.stringify(dataJSON),
  });

  const response = await loginData.json();

  if (response.token) {
    setLocalStorage("KenziePet:User", response.token);

    toast("Usuário Logado com Sucesso", "#08C203");

    setTimeout(() => {
      window.open("/src/pages/dashboard.html", "_parent");
    }, 3000);
  } else if (
    response.message.includes("Email") ||
    response.message.includes("password")
  ) {
    toast("Verifique seus Dados", "#C20803");
  }
  return response;
}

//
export async function getAllPets(token) {
  const responseJson = await fetch(`${urlBase}/pets`, {
    method: "GET",
    headers: headerWithoutToken,
  });

  const response = await responseJson.json();

  return response;
}

export async function getAllMyPets(token) {
  const responseJson = await fetch(`${urlBase}/pets/my_pets`, {
    method: "GET",
    headers: headerWithoutToken,
  });

  const response = await responseJson.json();

  return response;
}

export async function getAllMyAdopt(token) {
  const responseJson = await fetch(`${urlBase}/adoptions/myAdoptions`, {
    method: "GET",
    headers: headerWithoutToken,
  });

  const response = await responseJson.json();

  return response;
}
export async function getPetsById(token) {
  const responseJson = await fetch(`${urlBase}/adoptions`, {
    method: "POST",
    headers: headerWithoutToken,
    body: JSON.stringify(responseJson),
  });
  const response = await responseJson.json();

  return response;
}
export async function readProfile(token) {
  const profile = await fetch(`${urlBase}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/js",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return profile;
}

export async function updateProfile(avatar, name, token) {
  const update = await fetch(`${urlBase}/users/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      avatar_url: `${avatar}`,
      name: `${name}`,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return update;
}
export async function deleteProfile(token) {
  const toDelete = await fetch(`${urlBase}/users/profile`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/js",
      Authorization: `Bearer ${token}`,
    },
  }).catch((err) => console.log(err));

  return toDelete;
}
export async function createPet(name, bread, species, avatar, token) {
  const newPet = await fetch(`${urlBase}/pets`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: `${name}`,
      bread: `${bread}`,
      species: `${species}`,
      avatar_url: `${avatar}`,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return newPet;
}
export async function readAllPets(token) {
  const allPets = await fetch(`${urlBase}/pets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/js",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return allPets;
}
export async function readAllMyPets(token) {
  const allMyPets = await fetch(`${urlBase}/pets/my_pets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/js",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return allMyPets;
}
export async function updatePetById(
  name,
  bread,
  species,
  avatar,
  petID,
  token
) {
  const update = await fetch(`${urlBase}/pets/${petID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: `${name}`,
      bread: `${bread}`,
      species: `${species}`,
      avatar_url: `${avatar}`,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return update;
}
export async function deletePetById(petID, token) {
  const toDelete = await fetch(`${urlBase}/pets/${petID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/js",
      Authorization: `Bearer ${token}`,
    },
  }).catch((err) => console.log(err));
  return toDelete;
}

// ADOÇÕES

// // //
export async function createAdopt(correctToken, body) {
  const responseJson = await fetch(`${urlBase}/adoptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${correctToken}`,
    },
    body: JSON.stringify(body),
  });

  const response = await responseJson.json();
  if (!response.ok) {
    toast("Adoção criada com sucesso, Obrigado", "#08C203");
    setTimeout(() => {
      location.reload();
    }, 3000);
  } else {
    toast("Algo deu errado", "#C20803");
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
  return response;
}

//
