let filteredDataFilms = []; // Declaro la variable en un ámbito superior
let miListaFavs = [];
const filmContainer = document.querySelector(".film-container");

function cerrarNavResponsive() {
  document.querySelector(".toggle").checked = false;
}

function subirHastaArriba() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function cargarTodas() {
  cerrarNavResponsive();
  subirHastaArriba();
  document.querySelector(".main-container h1").innerHTML =
    "TOP-20 Películas populares de la semana";
  const filmContainer = document.querySelector(".film-container");
  filmContainer.innerHTML = "";
  filteredDataFilms.forEach((item) => {
    const index = item.poster_path.substring(1, 8); // genero un ID unico para cada imagen
    const HTMLContent = `<div class="film">
                          <input type="checkbox" id="toggle-${index}" class="toggle">
                          <label for="toggle-${index}">
                            <h2 class="info-film">${item.title}</h2>
                            <div class="container-img-and-descript">
                              <img src="https://image.tmdb.org/t/p/w500${
                                item.poster_path
                              }" draggable="false" alt="Film Image" />
                              <div>  
                                <p class="info-film">${item.overview}</p>
                                <input type="checkbox" id="toggle-icono-${index}" class="toggle-btn-fav" hidden>
                                <label for="toggle-icono-${index}">
                                  <button type="button" class="toggle-fav" id="btn-peli-fav-${index}"></button>
                                </label>
                              </div>
                            </div>  
                            <p class="info-film little-letra">Fecha de lanzamiento: ${
                              item.release_date
                            }</p>
                            <p class="info-film little-letra">Valoración: ${item.vote_average.toFixed(
                              2
                            )} (${item.vote_count})</p>
                          </label>
                        </div>`;
    filmContainer.innerHTML += HTMLContent;
  });
  calcPeliculasAgregadas(); //los botones checkbox de favoritas
}

function mostrarPeliculas(arregloPeliculas) {
  filmContainer.innerHTML = "";
  arregloPeliculas.forEach((item) => {
    const index = item.poster_path.substring(1, 8); // genero un ID unico para cada imagen
    const HTMLContent = `<div class="film">
                          <input type="checkbox" id="toggle-${index}" class="toggle">
                          <label for="toggle-${index}">
                            <h2 class="info-film">${item.title}</h2>
                            <div class="container-img-and-descript">
                              <img src="https://image.tmdb.org/t/p/w500${
                                item.poster_path
                              }" draggable="false" alt="Film Image" />
                              <div>  
                                <p class="info-film">${item.overview}</p>
                                <input type="checkbox" id="toggle-icono-${index}" class="toggle-btn-fav" hidden>
                                <label for="toggle-icono-${index}">
                                  <button type="button" class="toggle-fav" id="btn-peli-fav-${index}"></button>
                                </label>
                              </div>
                            </div>  
                            <p class="info-film little-letra">Fecha de lanzamiento: ${
                              item.release_date
                            }</p>
                            <p class="info-film little-letra">Valoración: ${item.vote_average.toFixed(
                              2
                            )} (${item.vote_count})</p>
                          </label>
                        </div>`;
    filmContainer.innerHTML += HTMLContent;
  });
  calcPeliculasAgregadas();
}

function filtrarPeliculas() {
  const textoBusqueda = document.querySelectorAll("#barra-busqueda");
  textoBusqueda.forEach((texto) => {
    const txtbsq = texto.value.toLowerCase();
    if (txtbsq) {
      if (txtbsq === "") cargarTodas();
      const peliculasFiltradas = filteredDataFilms.filter(
        (pelicula) =>
          pelicula.title.toLowerCase().includes(txtbsq) ||
          pelicula.overview.toLowerCase().includes(txtbsq)
      );
      if (peliculasFiltradas.length > 0) {
        mostrarPeliculas(peliculasFiltradas);
      }
    }
  });
  cerrarNavResponsive();
}

function refrescarPelisFav() {
  for (let peli of filteredDataFilms) {
    if (
      miListaFavs.some((peliFav) => peliFav.poster_path === peli.poster_path)
    ) {
      const index = peli.poster_path.substring(1, 8); // genero un ID unico para cada imagen
      const checkbox = document.getElementById(`toggle-icono-${index}`);
      checkbox.checked = true;
    }
  }
}

function calcPeliculasAgregadas() {
  refrescarPelisFav(); //le "recuerda" las peliculas que ya están guardadas en favoritos
  const btnAddFav = document.querySelectorAll('button[id^="btn-peli-fav-"]');
  btnAddFav.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation(); // Evitar la propagación del clic al label padre
      const index = this.id.split("-").pop(); // Obtener el ID del checkbox correspondiente
      const checkbox = document.getElementById(`toggle-icono-${index}`);
      // Filtrar el array y obtener el primer (y único) objeto que coincide
      const pelicula = filteredDataFilms.find((peli) =>
        peli.poster_path.startsWith(`/${index}`)
      );
      if (pelicula) {
        if (!checkbox.checked) {
          // Agregar el objeto directamente si no está seleccionado
          if (
            !miListaFavs.find(
              (peli) => peli.poster_path === pelicula.poster_path
            )
          )
            miListaFavs.push(pelicula);
        } else {
          // Eliminar el objeto si está seleccionado
          const peliculaIndex = miListaFavs.findIndex(
            (peli) => peli.poster_path === pelicula.poster_path
          );
          if (peliculaIndex !== -1) {
            miListaFavs.splice(peliculaIndex, 1);
          }
        }
      }
      checkbox.checked = !checkbox.checked; // Alternar el estado del checkbox
    });
  });
}

function mostrarPeliculasFav() {
  document.querySelector(".main-container h1").innerHTML =
    "Mis peliculas favoritas";
  filmContainer.innerHTML = "";

  let delay = 0;

  function agregarPelicula(peli) {
    setTimeout(() => {
      const filmFavContainer = document.createElement("div");
      filmFavContainer.classList.add("film-fav-container");
      filmFavContainer.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${peli.poster_path}" draggable="false" alt="Film Image" />
        <h3>${peli.title}</h3>
        <button class="btn-elim-fav" id="${peli.poster_path}">🗑</button>
      `;
      filmContainer.appendChild(filmFavContainer);

      // Agregar evento click al botón de eliminar
      filmFavContainer
        .querySelector(".btn-elim-fav")
        .addEventListener("click", quitarFav);
    }, delay);
    delay += 300; // Aumenta el retraso para la siguiente película (300 ms)
  }

  // Renderizar la lista de películas favoritas con animación en cascada
  for (const peli of miListaFavs) {
    agregarPelicula(peli);
  }

  // Función para eliminar una película favorita
  function quitarFav(event) {
    const posterPath = event.target.getAttribute("id");
    const index = miListaFavs.findIndex(
      (peli) => peli.poster_path === posterPath
    );
    if (index !== -1) {
      miListaFavs.splice(index, 1); // Eliminar la película de la lista
      mostrarPeliculasFav(); // Volver a mostrar la lista actualizada
    }
  }
  // Agregar evento click a los botones de eliminar
  const btnElimFav = document.querySelectorAll(".btn-elim-fav");
  btnElimFav.forEach((btnElim) => btnElim.addEventListener("click", quitarFav));
}

function animarPeliculasFav() {
  const arrayPelisFav = document.querySelectorAll(".film-fav-container");
  arrayPelisFav.forEach((peliFav) => {
    console.log(peliFav);
  });
}

const botonesBarraBusqueda = document.querySelectorAll("#btn-barra-busqueda");
botonesBarraBusqueda.forEach((btn) => {
  btn.addEventListener("click", filtrarPeliculas);
});

const barraBusqueda = document.querySelectorAll("#barra-busqueda");
barraBusqueda.forEach((barra) => {
  barra.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      filtrarPeliculas();
    }
  });
});

document.querySelectorAll(".inicio").forEach((btnInicio) => {
  //uso el forEach porque repito dos veces los botones Inicio y Mi Lista
  btnInicio.addEventListener("click", cargarTodas); //porque tengo el nav y el nav responsive
});

document.querySelectorAll(".mi-lista").forEach((miLista) => {
  miLista.addEventListener("click", () => {
    cerrarNavResponsive();
    mostrarPeliculasFav();
    animarPeliculasFav();
  });
});

/* ------------------- COMIENZA FUNCION FECTH ----------------------- */

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${apiKey}`,
  },
};

async function fetchAndRenderMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1",
      options
    );

    if (!response.ok) {
      throw new Error("La solicitud no fue exitosa");
    }

    const data = await response.json();
    let dataFilms = data.results; /* array devuelto por la API */

    // Usando el método map para obtener un nuevo array con los objetos filtrados
    filteredDataFilms = dataFilms.map((item) => {
      return {
        title: item.title,
        overview: item.overview,
        release_date: item.release_date,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        vote_count: item.vote_count,
      };
    });

    cargarTodas(); //cargo todas las pelis una vez
  } catch (error) {
    console.error("Error al consumir la API:", error);
  }
}
/* ------------------- FINALIZA FUNCION FECTH ----------------------- */

fetchAndRenderMovies();
