"use strict";

ejecutar("ej-fetch-basico", async () => {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users/1");
        console.log("Estado:", respuesta.status, "¿ok?", respuesta.ok);
        console.log("Tipo:", respuesta.headers.get("content-type"));

        const usuario = await respuesta.json();
        console.log("Nombre:", usuario.name);
        console.log("Correo:", usuario.email);
        console.log("Ciudad:", usuario.address.city);
        console.log("Empresa:", usuario.company.name);
    } catch (error) {
        console.log("No hay conexión con el servidor 😕", error.message);
    }
});

ejecutar("ej-json", () => {
    const pedido = {
        id: 1042,
        cliente: "Ana Ríos",
        total: 37.5,
        pagado: true,
        productos: ["café", "pan de queso"]
    };

    const texto = JSON.stringify(pedido);
    console.log(texto);
    console.log("Tipo:", typeof texto);

    const deVuelta = JSON.parse(texto);
    console.log("Segundo producto:", deVuelta.productos[1]);

    console.log(JSON.stringify(pedido, null, 2));

    try {
        JSON.parse("{ cliente: 'Ana' }");
    } catch (error) {
        console.log("JSON inválido:", error.name);
    }
});

ejecutar("ej-promesas", async () => {
    const url = "https://jsonplaceholder.typicode.com/todos/5";

    await fetch(url)
        .then((respuesta) => respuesta.json())
        .then((tarea) => console.log("Con then:", tarea.title))
        .catch(() => console.log("Con then: falló la conexión"));

    try {
        const respuesta = await fetch(url);
        const tarea = await respuesta.json();
        console.log("Con await:", tarea.title);
    } catch {
        console.log("Con await: falló la conexión");
    }

    const promesa = fetch(url);
    console.log("Sin await obtengo:", promesa instanceof Promise ? "una Promise" : promesa);
});

ejecutar("ej-response-ok", async () => {
    async function pedirJSON(url) {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP ${respuesta.status}`);
        }
        return respuesta.json();
    }

    const ids = [1, 9999, 3];

    for (const id of ids) {
        try {
            const post = await pedirJSON(`https://jsonplaceholder.typicode.com/posts/${id}`);
            console.log(`✔ Post ${id}:`, post.title.slice(0, 30) + "…");
        } catch (error) {
            console.log(`✖ Post ${id}:`, error.message);
        }
    }
});

ejecutar("ej-tiempos", async () => {
    const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

    console.log("🧾 Pedido recibido");
    await esperar(700);
    console.log("🍕 Horneando pizza…");
    await esperar(700);
    console.log("🛵 En camino");

    let segundos = 3;
    await new Promise((resolver) => {
        const intervalo = setInterval(() => {
            console.log(`Llega en ${segundos}…`);
            segundos--;
            if (segundos === 0) {
                clearInterval(intervalo);
                resolver();
            }
        }, 600);
    });

    console.log("🔔 ¡Ding dong! Pedido entregado");
});

{
    const chisteTexto = document.querySelector("#chiste-texto");
    const chisteRemate = document.querySelector("#chiste-remate");
    const chisteBoton = document.querySelector("#chiste-boton");

    chisteBoton.addEventListener("click", async () => {
        chisteBoton.disabled = true;
        chisteTexto.textContent = "Cargando…";
        chisteRemate.textContent = "";
        try {
            const respuesta = await fetch("https://v2.jokeapi.dev/joke/Any?lang=es&type=twopart&safe-mode");
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const chiste = await respuesta.json();
            chisteTexto.textContent = chiste.setup;
            setTimeout(() => {
                chisteRemate.textContent = chiste.delivery;
            }, 1500);
        } catch {
            chisteTexto.textContent = "😕 No pudimos traer un chiste. ¿Tienes conexión?";
        } finally {
            chisteBoton.disabled = false;
            chisteBoton.textContent = "Otro chiste";
        }
    });
}

{
    const pokeForm = document.querySelector("#poke-form");
    const pokeNombre = document.querySelector("#poke-nombre");
    const pokeTarjeta = document.querySelector("#poke-tarjeta");

    async function buscarPokemon(nombre) {
        const busqueda = encodeURIComponent(nombre.trim().toLowerCase());
        pokeTarjeta.className = "poke-tarjeta";
        pokeTarjeta.textContent = "Buscando…";
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`);
            if (respuesta.status === 404) {
                pokeTarjeta.className = "poke-tarjeta aviso-error";
                pokeTarjeta.textContent = `No existe ningún Pokémon llamado «${nombre}».`;
                return;
            }
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const poke = await respuesta.json();
            const tipos = poke.types.map((t) => `<span class="poke-tipo">${t.type.name}</span>`).join("");
            const stats = poke.stats.map((s) => `<li>${s.stat.name}: <strong>${s.base_stat}</strong></li>`).join("");
            pokeTarjeta.innerHTML = `
                <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                <div>
                    <h3>#${poke.id} ${poke.name}</h3>
                    <p>${tipos}</p>
                    <p>Altura: ${poke.height / 10} m · Peso: ${poke.weight / 10} kg</p>
                    <ul>${stats}</ul>
                </div>
            `;
        } catch {
            pokeTarjeta.className = "poke-tarjeta aviso-error";
            pokeTarjeta.textContent = "No pudimos conectar con la PokéAPI. Intenta de nuevo.";
        }
    }

    pokeForm.addEventListener("submit", (evento) => {
        evento.preventDefault();
        buscarPokemon(pokeNombre.value);
    });

    buscarPokemon(pokeNombre.value);
}

{
    const climaCiudad = document.querySelector("#clima-ciudad");
    const climaPanel = document.querySelector("#clima-panel");

    const climaTextos = {
        0: "☀️ Despejado",
        1: "🌤️ Casi despejado",
        2: "⛅ Parcialmente nublado",
        3: "☁️ Nublado",
        45: "🌫️ Niebla",
        51: "🌦️ Llovizna",
        61: "🌧️ Lluvia ligera",
        63: "🌧️ Lluvia",
        65: "🌧️ Lluvia fuerte",
        80: "🌦️ Chubascos",
        95: "⛈️ Tormenta"
    };

    async function mostrarClima() {
        const [latitud, longitud] = climaCiudad.value.split(",");
        const parametros = new URLSearchParams({
            latitude: latitud,
            longitude: longitud,
            current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
            timezone: "auto"
        });
        climaPanel.textContent = "Consultando el clima…";
        try {
            const respuesta = await fetch(`https://api.open-meteo.com/v1/forecast?${parametros}`);
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            const actual = datos.current;
            climaPanel.innerHTML = `
                <p class="clima-temp">${Math.round(actual.temperature_2m)} °C</p>
                <p>${climaTextos[actual.weather_code] || "🌡️ Código " + actual.weather_code}</p>
                <p>💧 Humedad ${actual.relative_humidity_2m} % · 💨 Viento ${actual.wind_speed_10m} km/h</p>
                <p class="estado">Hora local: ${actual.time.slice(11)}</p>
            `;
        } catch {
            climaPanel.innerHTML = `<p class="aviso-error">No pudimos consultar el clima. Revisa tu conexión.</p>`;
        }
    }

    climaCiudad.addEventListener("change", mostrarClima);
    mostrarClima();
}

{
    const perfilesPais = document.querySelector("#perfiles-pais");
    const perfilesBoton = document.querySelector("#perfiles-boton");
    const perfilesLista = document.querySelector("#perfiles-lista");

    function mostrarEsqueletos(cantidad) {
        perfilesLista.innerHTML = "";
        for (let i = 0; i < cantidad; i++) {
            perfilesLista.innerHTML += `
                <div class="perfil esqueleto">
                    <div class="esqueleto-foto"></div>
                    <div class="esqueleto-linea"></div>
                    <div class="esqueleto-linea corta"></div>
                </div>
            `;
        }
    }

    async function generarPerfiles() {
        mostrarEsqueletos(3);
        const parametros = new URLSearchParams({ results: 3, nat: perfilesPais.value });
        try {
            const respuesta = await fetch(`https://randomuser.me/api/?${parametros}`);
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            perfilesLista.innerHTML = datos.results.map((persona) => `
                <div class="perfil">
                    <img src="${persona.picture.large}" alt="Foto de ${persona.name.first}">
                    <h3>${persona.name.first} ${persona.name.last}</h3>
                    <p>${persona.dob.age} años · ${persona.location.city}</p>
                    <p class="perfil-correo">${persona.email}</p>
                </div>
            `).join("");
        } catch {
            perfilesLista.innerHTML = `<p class="aviso-error">No se pudieron generar los perfiles. Revisa tu conexión.</p>`;
        }
    }

    perfilesBoton.addEventListener("click", generarPerfiles);
    perfilesPais.addEventListener("change", generarPerfiles);
    generarPerfiles();
}

{
    const perrosRaza = document.querySelector("#perros-raza");
    const perrosOtras = document.querySelector("#perros-otras");
    const perrosEstado = document.querySelector("#perros-estado");
    const perrosGaleria = document.querySelector("#perros-galeria");

    async function cargarFotos() {
        perrosEstado.textContent = "Buscando perritos…";
        perrosGaleria.innerHTML = "";
        try {
            const respuesta = await fetch(`https://dog.ceo/api/breed/${perrosRaza.value}/images/random/6`);
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            perrosGaleria.innerHTML = datos.message
                .map((url) => `<img src="${url}" alt="Perro de raza ${perrosRaza.value}" loading="lazy">`)
                .join("");
            perrosEstado.textContent = "";
        } catch {
            perrosEstado.textContent = "🐶💤 No pudimos traer las fotos. Intenta otra vez.";
        }
    }

    async function cargarRazas() {
        try {
            const respuesta = await fetch("https://dog.ceo/api/breeds/list/all");
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            const razas = Object.keys(datos.message);
            perrosRaza.innerHTML = razas.map((raza) => `<option value="${raza}">${raza}</option>`).join("");
            perrosRaza.value = "beagle";
            perrosRaza.disabled = false;
            perrosOtras.disabled = false;
            cargarFotos();
        } catch {
            perrosEstado.textContent = "No pudimos cargar la lista de razas. Recarga la página para reintentar.";
        }
    }

    perrosRaza.addEventListener("change", cargarFotos);
    perrosOtras.addEventListener("click", cargarFotos);
    cargarRazas();
}

{
    const conversorMonto = document.querySelector("#conversor-monto");
    const conversorDe = document.querySelector("#conversor-de");
    const conversorA = document.querySelector("#conversor-a");
    const conversorInvertir = document.querySelector("#conversor-invertir");
    const conversorResultado = document.querySelector("#conversor-resultado");
    const conversorFecha = document.querySelector("#conversor-fecha");

    const monedas = ["USD", "EUR", "MXN", "COP", "PEN", "CLP", "ARS", "BRL", "GBP", "JPY"];
    let tasas = null;

    for (const moneda of monedas) {
        conversorDe.add(new Option(moneda, moneda));
        conversorA.add(new Option(moneda, moneda));
    }
    conversorDe.value = "USD";
    conversorA.value = "MXN";

    function convertir() {
        if (!tasas) {
            return;
        }
        const monto = Number(conversorMonto.value);
        const resultado = (monto / tasas[conversorDe.value]) * tasas[conversorA.value];
        const formato = new Intl.NumberFormat("es", { style: "currency", currency: conversorA.value });
        conversorResultado.textContent = `${monto} ${conversorDe.value} = ${formato.format(resultado)}`;
    }

    async function cargarTasas() {
        conversorResultado.textContent = "Cargando tasas de cambio…";
        try {
            const respuesta = await fetch("https://open.er-api.com/v6/latest/USD");
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            tasas = datos.rates;
            const fecha = new Date(datos.time_last_update_unix * 1000);
            conversorFecha.textContent = `Tasas actualizadas el ${fecha.toLocaleString("es")}`;
            convertir();
        } catch {
            conversorResultado.textContent = "No se pudieron cargar las tasas. Revisa tu conexión.";
        }
    }

    conversorMonto.addEventListener("input", convertir);
    conversorDe.addEventListener("change", convertir);
    conversorA.addEventListener("change", convertir);
    conversorInvertir.addEventListener("click", () => {
        const de = conversorDe.value;
        conversorDe.value = conversorA.value;
        conversorA.value = de;
        convertir();
    });

    cargarTasas();
}

{
    const postsLista = document.querySelector("#posts-lista");
    const postsAnterior = document.querySelector("#posts-anterior");
    const postsSiguiente = document.querySelector("#posts-siguiente");
    const postsInfo = document.querySelector("#posts-info");

    const porPagina = 4;
    let pagina = 1;
    let totalPaginas = 1;

    async function cargarPagina() {
        postsLista.innerHTML = `<li class="estado">Cargando página ${pagina}…</li>`;
        postsAnterior.disabled = true;
        postsSiguiente.disabled = true;
        const parametros = new URLSearchParams({ _page: pagina, _limit: porPagina });
        try {
            const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts?${parametros}`);
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const total = Number(respuesta.headers.get("X-Total-Count"));
            totalPaginas = Math.ceil(total / porPagina);
            const posts = await respuesta.json();
            postsLista.innerHTML = posts.map((post) => `
                <li>
                    <strong>#${post.id} ${post.title}</strong>
                    <p>${post.body}</p>
                </li>
            `).join("");
            postsInfo.textContent = `Página ${pagina} de ${totalPaginas}`;
            postsAnterior.disabled = pagina === 1;
            postsSiguiente.disabled = pagina === totalPaginas;
        } catch {
            postsLista.innerHTML = `
                <li class="aviso-error">
                    No pudimos cargar las publicaciones.
                    <button type="button" class="posts-reintentar">Reintentar</button>
                </li>
            `;
        }
    }

    postsAnterior.addEventListener("click", () => {
        pagina--;
        cargarPagina();
    });

    postsSiguiente.addEventListener("click", () => {
        pagina++;
        cargarPagina();
    });

    postsLista.addEventListener("click", (evento) => {
        if (evento.target.classList.contains("posts-reintentar")) {
            cargarPagina();
        }
    });

    cargarPagina();
}

{
    const ciudadBusqueda = document.querySelector("#ciudad-busqueda");
    const ciudadEstado = document.querySelector("#ciudad-estado");
    const ciudadResultados = document.querySelector("#ciudad-resultados");
    const ciudadPedidos = document.querySelector("#ciudad-pedidos");
    const ciudadCancelados = document.querySelector("#ciudad-cancelados");

    let controlador = null;
    let pedidos = 0;
    let cancelados = 0;

    function debounce(funcion, espera) {
        let temporizador;
        return () => {
            clearTimeout(temporizador);
            temporizador = setTimeout(funcion, espera);
        };
    }

    async function buscarCiudades() {
        const texto = ciudadBusqueda.value.trim();
        if (controlador) {
            controlador.abort();
        }
        if (texto.length < 2) {
            ciudadResultados.innerHTML = "";
            ciudadEstado.textContent = "Escribe al menos 2 letras.";
            return;
        }
        controlador = new AbortController();
        const parametros = new URLSearchParams({ name: texto, count: 6, language: "es" });
        ciudadEstado.textContent = `Buscando «${texto}»…`;
        pedidos++;
        ciudadPedidos.textContent = pedidos;
        try {
            const respuesta = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${parametros}`, {
                signal: controlador.signal
            });
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            const ciudades = datos.results || [];
            ciudadEstado.textContent = ciudades.length ? `${ciudades.length} resultados` : "Sin resultados.";
            ciudadResultados.innerHTML = ciudades.map((ciudad) => `
                <li>
                    <img src="https://flagcdn.com/24x18/${(ciudad.country_code || "un").toLowerCase()}.png" alt="">
                    <strong>${ciudad.name}</strong>, ${ciudad.admin1 || ""} (${ciudad.country || "?"})
                </li>
            `).join("");
        } catch (error) {
            if (error.name === "AbortError") {
                cancelados++;
                ciudadCancelados.textContent = cancelados;
                return;
            }
            ciudadEstado.textContent = "No pudimos buscar. Revisa tu conexión.";
        }
    }

    ciudadBusqueda.addEventListener("input", debounce(buscarCiudades, 400));
}

{
    const postForm = document.querySelector("#post-form");
    const postTitulo = document.querySelector("#post-titulo");
    const postCuerpo = document.querySelector("#post-cuerpo");
    const postEnviar = document.querySelector("#post-enviar");
    const postMensaje = document.querySelector("#post-mensaje");
    const postJson = document.querySelector("#post-json");

    postForm.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        postEnviar.disabled = true;
        postEnviar.textContent = "Publicando…";
        const nueva = {
            title: postTitulo.value.trim(),
            body: postCuerpo.value.trim(),
            userId: 1
        };
        try {
            const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nueva)
            });
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const creada = await respuesta.json();
            postMensaje.textContent = `✅ Publicada con id ${creada.id} (estado ${respuesta.status})`;
            postJson.textContent = JSON.stringify(creada, null, 2);
            postForm.reset();
        } catch {
            postMensaje.textContent = "❌ No se pudo publicar. Tus datos siguen en el formulario.";
        } finally {
            postEnviar.disabled = false;
            postEnviar.textContent = "Publicar";
        }
    });
}

{
    const githubForm = document.querySelector("#github-form");
    const githubUsuario = document.querySelector("#github-usuario");
    const githubPerfil = document.querySelector("#github-perfil");

    async function verPerfil(usuario) {
        githubPerfil.textContent = "Cargando perfil…";
        try {
            const respuesta = await fetch(`https://api.github.com/users/${encodeURIComponent(usuario.trim())}`);
            if (respuesta.status === 404) {
                githubPerfil.textContent = "Ese usuario no existe en GitHub.";
                return;
            }
            if (respuesta.status === 403) {
                githubPerfil.textContent = "GitHub limita a 60 consultas por hora. Prueba más tarde.";
                return;
            }
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const perfil = await respuesta.json();
            githubPerfil.innerHTML = `
                <img src="${perfil.avatar_url}" alt="Avatar de ${perfil.login}">
                <div>
                    <h3></h3>
                    <p class="github-bio"></p>
                    <p>📦 ${perfil.public_repos} repos · 👥 ${perfil.followers.toLocaleString("es")} seguidores · 📅 desde ${new Date(perfil.created_at).getFullYear()}</p>
                    <a href="${perfil.html_url}" target="_blank" rel="noopener">Ver en GitHub ↗</a>
                </div>
            `;
            githubPerfil.querySelector("h3").textContent = perfil.name || perfil.login;
            githubPerfil.querySelector(".github-bio").textContent = perfil.bio || "Sin biografía.";
        } catch {
            githubPerfil.textContent = "No pudimos conectar con GitHub. Revisa tu conexión.";
        }
    }

    githubForm.addEventListener("submit", (evento) => {
        evento.preventDefault();
        verPerfil(githubUsuario.value);
    });

    verPerfil(githubUsuario.value);
}

{
    const paisSelect = document.querySelector("#pais-select");
    const paisFicha = document.querySelector("#pais-ficha");

    async function pedirJSON(url) {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP ${respuesta.status}`);
        }
        return respuesta.json();
    }

    async function mostrarPais() {
        const opcion = paisSelect.selectedOptions[0];
        const codigo = opcion.value;
        const { capital, moneda, coordenadas } = opcion.dataset;
        const [latitud, longitud] = coordenadas.split(",");
        const busqueda = new URLSearchParams({ name: capital, count: 1, language: "es", countryCode: codigo });
        const clima = new URLSearchParams({ latitude: latitud, longitude: longitud, current: "temperature_2m" });

        paisFicha.innerHTML = `<p class="estado">Cargando la ficha de ${opcion.text}…</p>`;
        const inicio = performance.now();
        try {
            const [geo, tiempo, cambio] = await Promise.all([
                pedirJSON(`https://geocoding-api.open-meteo.com/v1/search?${busqueda}`),
                pedirJSON(`https://api.open-meteo.com/v1/forecast?${clima}`),
                pedirJSON("https://open.er-api.com/v6/latest/USD")
            ]);
            const lugar = geo.results[0];
            const milisegundos = Math.round(performance.now() - inicio);
            paisFicha.innerHTML = `
                <img src="https://flagcdn.com/w160/${codigo.toLowerCase()}.png" alt="Bandera de ${opcion.text}">
                <div>
                    <h3>${opcion.text}</h3>
                    <p>🏛️ Capital: ${lugar.name} (${(lugar.population || 0).toLocaleString("es")} hab.)</p>
                    <p>🕒 Zona horaria: ${lugar.timezone}</p>
                    <p>🌡️ Ahora en la capital: ${Math.round(tiempo.current.temperature_2m)} °C</p>
                    <p>💵 1 USD = ${cambio.rates[moneda].toLocaleString("es")} ${moneda}</p>
                    <p class="estado">3 pedidos en paralelo en ${milisegundos} ms</p>
                </div>
            `;
        } catch {
            paisFicha.innerHTML = `<p class="aviso-error">No pudimos armar la ficha. Revisa tu conexión.</p>`;
        }
    }

    paisSelect.addEventListener("change", mostrarPais);
    mostrarPais();
}

{
    const reintentoFallar = document.querySelector("#reintento-fallar");
    const reintentoBoton = document.querySelector("#reintento-boton");
    const reintentoRegistro = document.querySelector("#reintento-registro");
    const reintentoResultado = document.querySelector("#reintento-resultado");

    const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));
    let fallosSimulados = 0;

    function anotar(texto) {
        const linea = document.createElement("li");
        linea.textContent = texto;
        reintentoRegistro.append(linea);
    }

    async function pedirConReintentos(url, intentos) {
        for (let intento = 1; intento <= intentos; intento++) {
            try {
                anotar(`Intento ${intento}…`);
                if (fallosSimulados > 0) {
                    fallosSimulados--;
                    throw new Error("Servidor no disponible (simulado)");
                }
                const respuesta = await fetch(url, { signal: AbortSignal.timeout(5000) });
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP ${respuesta.status}`);
                }
                return await respuesta.json();
            } catch (error) {
                anotar(`✖ ${error.message}`);
                if (intento === intentos) {
                    throw error;
                }
                anotar(`Esperando ${intento} s antes de reintentar…`);
                await esperar(intento * 1000);
            }
        }
    }

    reintentoBoton.addEventListener("click", async () => {
        reintentoBoton.disabled = true;
        reintentoRegistro.innerHTML = "";
        reintentoResultado.textContent = "";
        fallosSimulados = reintentoFallar.checked ? 2 : 0;
        const id = Math.floor(Math.random() * 10) + 1;
        try {
            const usuario = await pedirConReintentos(`https://jsonplaceholder.typicode.com/users/${id}`, 3);
            reintentoResultado.textContent = `✅ ${usuario.name} — trabaja en ${usuario.company.name}`;
        } catch {
            reintentoResultado.textContent = "😕 No se pudo después de 3 intentos. Prueba más tarde.";
        } finally {
            reintentoBoton.disabled = false;
        }
    });
}

{
    const vivoBoton = document.querySelector("#vivo-boton");
    const vivoCuenta = document.querySelector("#vivo-cuenta");
    const vivoLista = document.querySelector("#vivo-lista");

    const cadaSegundos = 5;
    let segundos = cadaSegundos;
    let intervalo = null;

    function agregarItem(html) {
        const item = document.createElement("li");
        item.innerHTML = html;
        vivoLista.prepend(item);
        if (vivoLista.children.length > 5) {
            vivoLista.lastElementChild.remove();
        }
    }

    async function nuevoRegistro() {
        const hora = new Date().toLocaleTimeString("es");
        try {
            const respuesta = await fetch("https://randomuser.me/api/?nat=es,mx,br&inc=name,picture,location");
            if (!respuesta.ok) {
                throw new Error(`Error HTTP ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            const persona = datos.results[0];
            agregarItem(`
                <img src="${persona.picture.thumbnail}" alt="">
                <span><strong>${persona.name.first} ${persona.name.last}</strong> se registró desde ${persona.location.city}</span>
                <time>${hora}</time>
            `);
        } catch {
            agregarItem(`<span>⚠️ Sin conexión, reintentamos en el próximo ciclo</span><time>${hora}</time>`);
        }
    }

    function tic() {
        segundos--;
        if (segundos === 0) {
            segundos = cadaSegundos;
            nuevoRegistro();
        }
        vivoCuenta.textContent = `Próxima actualización en ${segundos} s`;
    }

    vivoBoton.addEventListener("click", () => {
        if (intervalo) {
            clearInterval(intervalo);
            intervalo = null;
            vivoBoton.textContent = "▶ Reanudar";
            vivoCuenta.textContent = "En pausa";
        } else {
            intervalo = setInterval(tic, 1000);
            vivoBoton.textContent = "⏸ Pausar";
        }
    });

    nuevoRegistro();
    intervalo = setInterval(tic, 1000);
}
