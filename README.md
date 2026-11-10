# Explorador de Pokémon

Aplicación web que permite buscar cualquier Pokémon por su nombre o su número de la Pokédex y ver su información en forma de **carta coleccionable**, con efectos 3D, brillo holográfico y animaciones. Los datos se obtienen en tiempo real de la [PokéAPI](https://pokeapi.co/).

Proyecto realizado para practicar HTML, CSS y JavaScript nativo (sin frameworks).

## Funcionalidades

**Búsqueda**
- Búsqueda por nombre (`pikachu`, `Mr Mime`) o por número (`25`), con el botón o con la tecla Enter.
- Aviso de "Buscando Pokémon…" mientras llegan los datos.
- Mensajes de error distintos si el Pokémon no existe o si falla la conexión.

**La carta**
- Nombre, número de la Pokédex, PS, imagen oficial, tipos, estadísticas base, altura y peso.
- Tipos y estadísticas traducidos al español.
- Marco con los colores de los tipos del Pokémon (degradado si tiene dos).
- Barras de estadísticas proporcionales al valor de cada una.
- Proporciones reales de una carta de TCG (63 × 88 mm).
- Textura de papel, trama de impresión, reflejo en el marco y sombras realistas.

**Efectos**
- Inclinación 3D de la carta siguiendo al ratón.
- Brillo holográfico que se mueve con el cursor.
- Al hacer clic, la carta se amplía girando y muestra su reverso durante el giro.
- Animación de cierre (clic en la carta, en el fondo o tecla Escape).

**Adaptación y accesibilidad**
- Diseño responsivo para móvil, tablet y ordenador.
- Los efectos de ratón se desactivan en pantallas táctiles.
- Textos alternativos en las imágenes y avisos de error accesibles para lectores de pantalla.

## Tecnologías utilizadas

- **HTML** semántico.
- **CSS**: Flexbox, variables CSS, degradados, transformaciones 3D, animaciones con `@keyframes`, pseudoelementos y media queries.
- **JavaScript (Vanilla JS)**: manipulación del DOM, eventos, `fetch` con `async/await` y control de errores con `try...catch...finally`.
- **[PokéAPI](https://pokeapi.co/)** como fuente de datos.
- **Google Fonts** (Cabin Condensed y Jost).
- **Git y GitHub** para el control de versiones, con un flujo de ramas `feature` → `develop` → `main`.

## Cómo ejecutar el proyecto

No necesita instalación ni dependencias.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   ```
2. Abre la carpeta del proyecto.
3. Abre el archivo `index.html` en el navegador.

   También puedes abrirlo con la extensión **Live Server** de Visual Studio Code: clic derecho sobre `index.html` → *Open with Live Server*.

Es necesaria conexión a internet, porque los datos se piden a la PokéAPI en cada búsqueda.

## Estructura del proyecto

```
├── index.html   → Estructura de la página
├── style.css    → Estilos, diseño de la carta y adaptación a pantallas
├── app.js       → Búsqueda, conexión con la PokéAPI y efectos de la carta
└── README.md    → Este archivo
```

## Créditos

- Datos e imágenes de los Pokémon: [PokéAPI](https://pokeapi.co/).
- Pokémon y sus nombres son marcas registradas de Nintendo, Creatures Inc. y GAME FREAK Inc. Este es un proyecto educativo sin ánimo de lucro y no está afiliado a ellos. El diseño de la carta es original.

## Autor

**Carlos (Morador3)** — [GitHub](https://github.com/Morador3)