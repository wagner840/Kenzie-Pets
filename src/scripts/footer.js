export function renderFooter() {
  const footer = document.querySelector("#footer");

  const div = document.createElement("div");
  const p = document.createElement("p");
  const small = document.createElement("small");
  const span = document.createElement("span");

  const aGit = document.createElement("a");

  div.classList.add("copyright");

  small.innerText = "T15 - M2 - Jan/2023 -  ";

  aGit.href =
    "https://github.com/Kenzie-Academy-Brasil-Developers/T15-Rafael-Projeto-em-Equipe-Equipe-7";
  aGit.innerText = "S8-01 🏆 Projeto em Equipe";

  p.append(small);

  small.append(span, aGit);
  div.appendChild(p);

  footer.appendChild(div);

  return footer;
}
renderFooter();
