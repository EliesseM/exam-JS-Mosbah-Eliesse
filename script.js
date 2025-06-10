class Animal {
  constructor(nom, description, categorie, image) {
    this.nom = nom;
    this.description = description;
    this.categorie = categorie;
    this.image = image;
  }
}

let animaux = [];

function loadAnimaux() {
  const saved = localStorage.getItem("animaux");
  if (saved) {
    const parsed = JSON.parse(saved);
    // reconstruire les instances de Animal
    animaux = parsed.map(
      (a) => new Animal(a.nom, a.description, a.categorie, a.image)
    );
  } else {
    animaux = [
      new Animal("Lion", "Roi de la savane", "terrestre", "images/lion.jpg"),
      new Animal("Saumon", "Vit dans l'eau", "aquatique", "images/saumon.webp"),
      new Animal("Aigle", "Oiseau majestueux", "volant", "images/aigle.jpeg"),
    ];
  }
}

function saveAnimaux() {
  localStorage.setItem("animaux", JSON.stringify(animaux));
}

loadAnimaux();

console.log(animaux);

const animalsContainer = document.getElementById("animals");

function displayAnimals(list) {
  animalsContainer.innerHTML = "";
  list.forEach((animal) => {
    const div = document.createElement("div");
    div.classList.add("animal");
    div.innerHTML = `
      <h3>${animal.nom}</h3>
      <p>${animal.description}</p>
      <p><strong>Catégorie :</strong> ${animal.categorie}</p>
      <img src="${animal.image}" alt="${animal.nom}" />
    `;
    animalsContainer.appendChild(div);
  });
}

displayAnimals(animaux);

document.getElementById("filter").addEventListener("change", (e) => {
  const value = e.target.value;
  if (value === "all") {
    displayAnimals(animaux);
  } else {
    const filtered = animaux.filter((a) => a.categorie === value);
    displayAnimals(filtered);
  }
});

document.getElementById("animalForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const categorie = document
    .getElementById("category")
    .value.trim()
    .toLowerCase();
  const image = document.getElementById("image").value.trim();
  const error = document.getElementById("error");

  if (!["terrestre", "aquatique", "volant"].includes(categorie)) {
    error.textContent =
      "Catégorie inconnue. Utilisez terrestre, aquatique ou volant.";
    return;
  }

  const nouvelAnimal = new Animal(nom, description, categorie, image);
  animaux.push(nouvelAnimal);
  saveAnimaux();
  displayAnimals(animaux);

  this.reset();
  error.textContent = "";
});

document.getElementById("reset").addEventListener("click", () => {
  localStorage.removeItem("animaux");
  location.reload();
});
