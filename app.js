// Idicamos los elementos de HTML que vamos a usar
const searchBtn = document.querySelector("#search-btn");
const pokemonInput = document.querySelector("#pokemon-input");
const pokemonContainer = document.querySelector("#pokemon-container");
const errorMessage = document.querySelector("#error-message");

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
    console.log(datos);
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




