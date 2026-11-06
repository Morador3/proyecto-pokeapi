// Idicamos los elementos de HTML que vamos a usar
const searchBtn = document.querySelector("#search-btn");
const pokemonInput = document.querySelector("#pokemon-input");
const pokemonContainer = document.querySelector("#pokemon-container");
const errorMessage = document.querySelector("#error-message");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonId = document.querySelector("#pokemon-id");
const pokemonImage = document.querySelector("#pokemon-image");
const pokemonTypes = document.querySelector("#pokemon-types");

// Traducción de los tipos de inglés a español
const tiposEnEspanol = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  electric: "Eléctrico",
  grass: "Planta",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psíquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada",
};

// Función que muestra los datos del Pokémon en la tarjeta
const mostrarPokemon = (datos) => {
  console.log(datos);
  pokemonName.textContent = datos.name;
  pokemonId.textContent = `#${datos.id.toString().padStart(3, "0")}`;
  pokemonImage.src =
    datos.sprites.other["official-artwork"].front_default ||
    datos.sprites.front_default;
  pokemonImage.alt = `Imagen de ${datos.name}`;
  pokemonContainer.classList.remove("hidden");
  pokemonTypes.textContent = "";
  datos.types.forEach((tipo) => {
    const etiqueta = document.createElement("span");
    etiqueta.textContent = tiposEnEspanol[tipo.type.name] || tipo.type.name;
    etiqueta.classList.add("type");
    etiqueta.style.backgroundColor = `var(--type-${tipo.type.name}, #777)`;
    pokemonTypes.appendChild(etiqueta);
  });
};

// Función que pide los datos de un Pokémon a la PokéAPI
const obtenerPokemon = async (termino) => {
  try {
    errorMessage.classList.add("hidden");
    const url = `https://pokeapi.co/api/v2/pokemon/${termino.toLowerCase()}`;
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error("Pokémon no encontrado");
    }
    const datos = await respuesta.json();
    mostrarPokemon(datos);
  } catch (error) {
    console.error(error);
    pokemonContainer.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
};

// Función que lee lo que ha escrito el usuario
const buscar = () => {
  const termino = pokemonInput.value.trim();
  if (termino === "") {
    return;
    }
  obtenerPokemon(termino);
};
searchBtn.addEventListener("click", buscar);
pokemonInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscar();
  }
});




