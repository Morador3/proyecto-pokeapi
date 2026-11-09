// Idicamos los elementos de HTML que vamos a usar
const searchBtn = document.querySelector("#search-btn");
const pokemonInput = document.querySelector("#pokemon-input");
const pokemonContainer = document.querySelector("#pokemon-container");
const errorMessage = document.querySelector("#error-message");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonId = document.querySelector("#pokemon-id");
const pokemonImage = document.querySelector("#pokemon-image");
const pokemonTypes = document.querySelector("#pokemon-types");
const pokemonStats = document.querySelector("#pokemon-stats");
const pokemonHp = document.querySelector("#pokemon-hp");
const cardOverlay = document.querySelector("#card-overlay");

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

// Traducción de las estadísticas de inglés a español
const statsEnEspanol = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque Esp.",
  "special-defense": "Defensa Esp.",
  speed: "Velocidad",
};

// Función que muestra los datos del Pokémon en la tarjeta
const mostrarPokemon = (datos) => {
  pokemonName.textContent = datos.name;
  pokemonId.textContent = `#${datos.id.toString().padStart(3, "0")}`;
  pokemonHp.textContent = `PS ${datos.stats[0].base_stat}`;
  pokemonImage.src =
    datos.sprites.other["official-artwork"].front_default ||
    datos.sprites.front_default;
  pokemonImage.alt = `Imagen de ${datos.name}`;
  const tipoPrincipal = datos.types[0].type.name;
  pokemonContainer.style.setProperty("--card-color", `var(--type-${tipoPrincipal})`);
  pokemonContainer.classList.remove("hidden");
  pokemonTypes.textContent = "";
  datos.types.forEach((tipo) => {
    const etiqueta = document.createElement("span");
    etiqueta.textContent = tiposEnEspanol[tipo.type.name] || tipo.type.name;
    etiqueta.classList.add("type");
    etiqueta.style.backgroundColor = `var(--type-${tipo.type.name}, #777)`;
    pokemonTypes.appendChild(etiqueta);
  });
  pokemonStats.textContent = "";
  datos.stats.forEach((estadistica) => {
    const fila = document.createElement("li");
    fila.classList.add("stat");
    const nombre = document.createElement("span");
    nombre.textContent = statsEnEspanol[estadistica.stat.name] || estadistica.stat.name;
    nombre.classList.add("stat-name");
    const valor = document.createElement("span");
    valor.textContent = estadistica.base_stat;
    valor.classList.add("stat-value");
    const barra = document.createElement("div");
    barra.classList.add("stat-bar");
    const relleno = document.createElement("div");
    relleno.classList.add("stat-fill");
    const porcentaje = Math.round((estadistica.base_stat / 255) * 100);
    relleno.style.width = `${porcentaje}%`;
    barra.appendChild(relleno);
    fila.appendChild(nombre);
    fila.appendChild(valor);
    fila.appendChild(barra);
    pokemonStats.appendChild(fila);
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

// Inclinar la carta en 3D siguiendo al ratón
pokemonContainer.addEventListener("mousemove", (e) => {
  const caja = pokemonContainer.getBoundingClientRect();
  const x = (e.clientX - caja.left) / caja.width;
  const y = (e.clientY - caja.top) / caja.height;
  const giroY = (x - 0.5) * 20;
  const giroX = (0.5 - y) * 20;
  pokemonContainer.style.setProperty("--rx", `${giroX}deg`);
  pokemonContainer.style.setProperty("--ry", `${giroY}deg`);
  pokemonContainer.style.setProperty("--mx", `${x * 100}%`);
  pokemonContainer.style.setProperty("--my", `${y * 100}%`);
});

pokemonContainer.addEventListener("mouseleave", () => {
  pokemonContainer.style.setProperty("--rx", "0deg");
  pokemonContainer.style.setProperty("--ry", "0deg");
});

// Ampliar o reducir la carta:
// Abrir la carta
const abrirCarta = () => {
  pokemonContainer.classList.add("ampliada");
  cardOverlay.classList.remove("hidden");
};

// Cerrar la carta con animación
const cerrarCarta = () => {
  pokemonContainer.classList.add("cerrando");
  cardOverlay.classList.add("cerrando");

  // Cuando termine la animación, devolvemos la carta a su sitio
  pokemonContainer.addEventListener("animationend", () => {
    pokemonContainer.classList.remove("ampliada", "cerrando");
    cardOverlay.classList.remove("cerrando");
    cardOverlay.classList.add("hidden");
  }, { once: true });
};

// Decidir si hay que abrir o cerrar
const alternarCarta = () => {
  if (pokemonContainer.classList.contains("cerrando")) {
    return;
  }

  if (pokemonContainer.classList.contains("ampliada")) {
    cerrarCarta();
  } else {
    abrirCarta();
  }
};

pokemonContainer.addEventListener("click", alternarCarta);
cardOverlay.addEventListener("click", alternarCarta);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && pokemonContainer.classList.contains("ampliada")) {
    alternarCarta();
  }
});



