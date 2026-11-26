ejecutar("ej-basico", () => {
    localStorage.setItem("curso-nombre", "Ana");
    localStorage.setItem("curso-edad", 29);
    localStorage.setItem("curso-premium", true);

    console.log(localStorage.getItem("curso-nombre"));

    const edad = localStorage.getItem("curso-edad");
    console.log(edad, typeof edad);
    console.log("edad + 1 =", edad + 1);
    console.log("Number(edad) + 1 =", Number(edad) + 1);

    const premium = localStorage.getItem("curso-premium");
    console.log(premium, typeof premium);
    console.log("¿es premium?", premium === "true");

    console.log("clave inexistente:", localStorage.getItem("curso-no-existe"));

    localStorage.removeItem("curso-premium");
    console.log("después de removeItem:", localStorage.getItem("curso-premium"));
    console.log("claves guardadas en el sitio:", localStorage.length);
});

ejecutar("ej-json", () => {
    const usuario = { nombre: "Ana", nivel: 3, cursos: ["HTML", "CSS"] };

    localStorage.setItem("curso-usuario-mal", usuario);
    console.log("sin JSON:", localStorage.getItem("curso-usuario-mal"));
    localStorage.removeItem("curso-usuario-mal");

    if (localStorage.getItem("curso-usuario") === null) {
        localStorage.setItem("curso-usuario", JSON.stringify(usuario));
    }

    const texto = localStorage.getItem("curso-usuario");
    console.log("guardado:", texto, "→", typeof texto);

    const recuperado = JSON.parse(texto);
    console.log("nombre:", recuperado.nombre, "· cursos:", recuperado.cursos.length);

    recuperado.cursos.push(`Curso ${recuperado.cursos.length + 1}`);
    localStorage.setItem("curso-usuario", JSON.stringify(recuperado));
    console.log("ahora:", JSON.parse(localStorage.getItem("curso-usuario")).cursos);
});

const visitas = Number(localStorage.getItem("curso-visitas") ?? 0) + 1;
localStorage.setItem("curso-visitas", visitas);
document.querySelector("#visitas-total").textContent = visitas;

const visitaAnterior = localStorage.getItem("curso-ultima-visita") ?? "nunca: ¡es tu primera vez aquí!";
document.querySelector("#visitas-anterior").textContent = `Visita anterior: ${visitaAnterior}`;
localStorage.setItem("curso-ultima-visita", new Date().toLocaleString("es"));

const almacenLocal = document.querySelector("#almacen-local");
const almacenSesion = document.querySelector("#almacen-sesion");
const almacenSumar = document.querySelector("#almacen-sumar");

const mostrarAlmacenes = () => {
    almacenLocal.textContent = localStorage.getItem("curso-clics") ?? 0;
    almacenSesion.textContent = sessionStorage.getItem("curso-clics") ?? 0;
};

almacenSumar.addEventListener("click", () => {
    localStorage.setItem("curso-clics", Number(localStorage.getItem("curso-clics") ?? 0) + 1);
    sessionStorage.setItem("curso-clics", Number(sessionStorage.getItem("curso-clics") ?? 0) + 1);
    mostrarAlmacenes();
});

mostrarAlmacenes();

const temaPanel = document.querySelector("#tema-panel");
const temaBoton = document.querySelector("#tema-boton");
const temaDelSistema = matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro";

const aplicarTema = (tema) => {
    temaPanel.dataset.tema = tema;
    temaBoton.textContent = tema === "oscuro" ? "☀️ Modo claro" : "🌙 Modo oscuro";
};

temaBoton.addEventListener("click", () => {
    const nuevoTema = temaPanel.dataset.tema === "oscuro" ? "claro" : "oscuro";
    aplicarTema(nuevoTema);
    localStorage.setItem("curso-tema", nuevoTema);
});

aplicarTema(localStorage.getItem("curso-tema") ?? temaDelSistema);

const textosPorIdioma = {
    es: { titulo: "Bienvenida", texto: "Gracias por leer nuestro boletín semanal de recetas." },
    en: { titulo: "Welcome", texto: "Thanks for reading our weekly recipe newsletter." },
    pt: { titulo: "Boas-vindas", texto: "Obrigado por ler nosso boletim semanal de receitas." },
};
const prefTamano = document.querySelector("#pref-tamano");
const prefIdioma = document.querySelector("#pref-idioma");
const prefArticulo = document.querySelector("#pref-articulo");
const preferencias = JSON.parse(localStorage.getItem("curso-preferencias")) ?? { tamano: 16, idioma: "es" };

const aplicarPreferencias = () => {
    const textos = textosPorIdioma[preferencias.idioma];
    prefTamano.value = preferencias.tamano;
    prefIdioma.value = preferencias.idioma;
    document.querySelector("#pref-tamano-valor").textContent = `${preferencias.tamano} px`;
    document.querySelector("#pref-titulo").textContent = textos.titulo;
    document.querySelector("#pref-texto").textContent = textos.texto;
    prefArticulo.style.fontSize = `${preferencias.tamano}px`;
    prefArticulo.lang = preferencias.idioma;
    localStorage.setItem("curso-preferencias", JSON.stringify(preferencias));
};

prefTamano.addEventListener("input", () => {
    preferencias.tamano = prefTamano.valueAsNumber;
    aplicarPreferencias();
});

prefIdioma.addEventListener("change", () => {
    preferencias.idioma = prefIdioma.value;
    aplicarPreferencias();
});

aplicarPreferencias();

const cookiesBanner = document.querySelector("#cookies-banner");
const cookiesEstado = document.querySelector("#cookies-estado");

const mostrarAvisoCookies = () => {
    const decision = localStorage.getItem("curso-cookies");
    cookiesBanner.hidden = decision !== null;
    cookiesEstado.textContent = decision ? `Elección guardada: ${decision}` : "Todavía no elegiste.";
};

const guardarDecision = (decision) => {
    localStorage.setItem("curso-cookies", decision);
    mostrarAvisoCookies();
};

document.querySelector("#cookies-aceptar").addEventListener("click", () => {
    guardarDecision("todas");
});

document.querySelector("#cookies-rechazar").addEventListener("click", () => {
    guardarDecision("solo necesarias");
});

document.querySelector("#cookies-reiniciar").addEventListener("click", () => {
    localStorage.removeItem("curso-cookies");
    mostrarAvisoCookies();
});

mostrarAvisoCookies();

const notasTexto = document.querySelector("#notas-texto");
const notasEstado = document.querySelector("#notas-estado");
let notasEspera;

notasTexto.value = localStorage.getItem("curso-notas") ?? "";
notasEstado.textContent = notasTexto.value ? "Notas recuperadas." : "Sin notas todavía.";

notasTexto.addEventListener("input", () => {
    notasEstado.textContent = "Escribiendo…";
    clearTimeout(notasEspera);
    notasEspera = setTimeout(() => {
        localStorage.setItem("curso-notas", notasTexto.value);
        notasEstado.textContent = `✓ Guardado a las ${new Date().toLocaleTimeString("es")}`;
    }, 500);
});

const postulacion = document.querySelector("#postulacion");
const postEstado = document.querySelector("#post-estado");
const borrador = JSON.parse(localStorage.getItem("curso-borrador"));

if (borrador) {
    for (const [campo, valor] of Object.entries(borrador)) {
        postulacion.elements[campo].value = valor;
    }
    postEstado.textContent = "✍️ Recuperamos tu borrador.";
}

postulacion.addEventListener("input", () => {
    const datos = Object.fromEntries(new FormData(postulacion));
    localStorage.setItem("curso-borrador", JSON.stringify(datos));
});

postulacion.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.removeItem("curso-borrador");
    postulacion.reset();
    postEstado.textContent = "¡Postulación enviada! El borrador se borró.";
});

document.querySelector("#post-descartar").addEventListener("click", () => {
    localStorage.removeItem("curso-borrador");
    postulacion.reset();
    postEstado.textContent = "Borrador descartado.";
});

const tareasForm = document.querySelector("#tareas-form");
const tareasNueva = document.querySelector("#tareas-nueva");
const tareasLista = document.querySelector("#tareas-lista");
const tareas = JSON.parse(localStorage.getItem("curso-tareas")) ?? [
    { texto: "Repasar FormData", hecha: true },
    { texto: "Probar localStorage", hecha: false },
];

const guardarTareas = () => {
    localStorage.setItem("curso-tareas", JSON.stringify(tareas));
};

const pintarTareas = () => {
    tareasLista.innerHTML = "";
    tareas.forEach((tarea, posicion) => {
        const item = document.createElement("li");
        item.className = "tarea";
        item.classList.toggle("hecha", tarea.hecha);

        const etiqueta = document.createElement("label");
        const casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.checked = tarea.hecha;
        casilla.addEventListener("change", () => {
            tarea.hecha = casilla.checked;
            guardarTareas();
            pintarTareas();
        });
        etiqueta.append(casilla, tarea.texto);

        const borrar = document.createElement("button");
        borrar.type = "button";
        borrar.textContent = "✕";
        borrar.setAttribute("aria-label", `Borrar «${tarea.texto}»`);
        borrar.addEventListener("click", () => {
            tareas.splice(posicion, 1);
            guardarTareas();
            pintarTareas();
        });

        item.append(etiqueta, borrar);
        tareasLista.append(item);
    });
    const pendientes = tareas.filter((tarea) => !tarea.hecha).length;
    document.querySelector("#tareas-resumen").textContent = `${pendientes} pendiente(s) de ${tareas.length}`;
};

tareasForm.addEventListener("submit", (event) => {
    event.preventDefault();
    tareas.push({ texto: tareasNueva.value.trim(), hecha: false });
    guardarTareas();
    pintarTareas();
    tareasForm.reset();
});

pintarTareas();

const comprasForm = document.querySelector("#compras-form");
const comprasProducto = document.querySelector("#compras-producto");
const comprasCantidad = document.querySelector("#compras-cantidad");
const comprasLista = document.querySelector("#compras-lista");
const compras = JSON.parse(localStorage.getItem("curso-compras")) ?? { Pan: 2, Manzanas: 6 };

const guardarCompras = () => {
    localStorage.setItem("curso-compras", JSON.stringify(compras));
};

const botonCantidad = (producto, cambio) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = cambio > 0 ? "+" : "−";
    boton.setAttribute("aria-label", `${cambio > 0 ? "Uno más de" : "Uno menos de"} ${producto}`);
    boton.addEventListener("click", () => {
        compras[producto] += cambio;
        if (compras[producto] <= 0) {
            delete compras[producto];
        }
        guardarCompras();
        pintarCompras();
    });
    return boton;
};

const pintarCompras = () => {
    comprasLista.innerHTML = "";
    for (const [producto, cantidad] of Object.entries(compras)) {
        const item = document.createElement("li");
        const nombre = document.createElement("span");
        nombre.textContent = producto;
        const numero = document.createElement("strong");
        numero.textContent = cantidad;
        item.append(nombre, botonCantidad(producto, -1), numero, botonCantidad(producto, 1));
        comprasLista.append(item);
    }
    const unidades = Object.values(compras).reduce((suma, cantidad) => suma + cantidad, 0);
    document.querySelector("#compras-total").textContent = `${Object.keys(compras).length} productos · ${unidades} unidades`;
};

comprasForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const producto = comprasProducto.value.trim();
    compras[producto] = (compras[producto] ?? 0) + comprasCantidad.valueAsNumber;
    guardarCompras();
    pintarCompras();
    comprasForm.reset();
    comprasProducto.focus();
});

pintarCompras();

const carritoLista = document.querySelector("#carrito-lista");
const carrito = JSON.parse(localStorage.getItem("curso-carrito")) ?? [];

const pintarCarrito = () => {
    carritoLista.innerHTML = "";
    for (const item of carrito) {
        const fila = document.createElement("li");
        fila.textContent = `${item.cantidad} × ${item.nombre} — $${(item.precio * item.cantidad).toFixed(2)}`;
        carritoLista.append(fila);
    }
    const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    document.querySelector("#carrito-cantidad").textContent = unidades;
    document.querySelector("#carrito-total").textContent = `$${total.toFixed(2)}`;
    localStorage.setItem("curso-carrito", JSON.stringify(carrito));
};

document.querySelectorAll(".agregar-carrito").forEach((boton) => {
    boton.addEventListener("click", () => {
        const enCarrito = carrito.find((item) => item.id === boton.dataset.id);
        if (enCarrito) {
            enCarrito.cantidad++;
        } else {
            carrito.push({
                id: boton.dataset.id,
                nombre: boton.dataset.nombre,
                precio: Number(boton.dataset.precio),
                cantidad: 1,
            });
        }
        pintarCarrito();
    });
});

document.querySelector("#carrito-vaciar").addEventListener("click", () => {
    carrito.length = 0;
    pintarCarrito();
});

pintarCarrito();

const corazones = document.querySelectorAll(".corazon");
const favoritos = JSON.parse(localStorage.getItem("curso-favoritos")) ?? [];

const pintarFavoritos = () => {
    corazones.forEach((corazon) => {
        const esFavorita = favoritos.includes(corazon.dataset.receta);
        corazon.setAttribute("aria-pressed", esFavorita);
        corazon.textContent = esFavorita ? "♥" : "♡";
    });
    const resumen = document.querySelector("#favoritos-resumen");
    resumen.textContent = favoritos.length > 0 ? `Tienes ${favoritos.length} receta(s) en favoritos.` : "Aún no tienes favoritas.";
};

corazones.forEach((corazon) => {
    corazon.addEventListener("click", () => {
        const receta = corazon.dataset.receta;
        const posicion = favoritos.indexOf(receta);
        if (posicion === -1) {
            favoritos.push(receta);
        } else {
            favoritos.splice(posicion, 1);
        }
        localStorage.setItem("curso-favoritos", JSON.stringify(favoritos));
        pintarFavoritos();
    });
});

pintarFavoritos();

const historialActual = document.querySelector("#historial-actual");
const historialLista = document.querySelector("#historial-lista");
let historial = JSON.parse(localStorage.getItem("curso-historial")) ?? [];

const pintarHistorial = () => {
    historialLista.innerHTML = "";
    for (const producto of historial) {
        const item = document.createElement("li");
        item.textContent = producto;
        historialLista.append(item);
    }
};

document.querySelectorAll(".ver-producto").forEach((boton) => {
    boton.addEventListener("click", () => {
        const producto = boton.dataset.producto;
        historialActual.textContent = `Estás viendo: ${producto}`;
        historial = [producto, ...historial.filter((visto) => visto !== producto)].slice(0, 4);
        localStorage.setItem("curso-historial", JSON.stringify(historial));
        pintarHistorial();
    });
});

historialActual.textContent = historial.length > 0 ? `La última vez viste: ${historial[0]}` : "Elige un producto para verlo.";
pintarHistorial();

const juegoTiempo = document.querySelector("#juego-tiempo");
const juegoClicsTexto = document.querySelector("#juego-clics");
const juegoRecordTexto = document.querySelector("#juego-record");
const juegoBoton = document.querySelector("#juego-boton");
const juegoMensaje = document.querySelector("#juego-mensaje");
let juegoRecord = Number(localStorage.getItem("curso-record") ?? 0);
let juegoClics = 0;
let jugando = false;

juegoRecordTexto.textContent = juegoRecord;

const terminarJuego = () => {
    jugando = false;
    juegoBoton.disabled = true;
    if (juegoClics > juegoRecord) {
        juegoRecord = juegoClics;
        localStorage.setItem("curso-record", juegoRecord);
        juegoRecordTexto.textContent = juegoRecord;
        juegoMensaje.textContent = `🏆 ¡Nuevo récord: ${juegoClics} clics!`;
    } else {
        juegoMensaje.textContent = `Hiciste ${juegoClics} clics. Tu récord sigue en ${juegoRecord}.`;
    }
    setTimeout(() => {
        juegoBoton.disabled = false;
        juegoBoton.textContent = "Jugar otra vez";
    }, 1000);
};

juegoBoton.addEventListener("click", () => {
    if (jugando) {
        juegoClics++;
        juegoClicsTexto.textContent = juegoClics;
        return;
    }
    jugando = true;
    juegoClics = 0;
    juegoClicsTexto.textContent = 0;
    juegoMensaje.textContent = "";
    juegoBoton.textContent = "¡Clic! ¡Clic! ¡Clic!";
    const inicio = Date.now();
    const reloj = setInterval(() => {
        const restante = Math.max(0, 5000 - (Date.now() - inicio));
        juegoTiempo.textContent = (restante / 1000).toFixed(1);
        if (restante === 0) {
            clearInterval(reloj);
            terminarJuego();
        }
    }, 100);
});

const pomoReloj = document.querySelector("#pomo-reloj");
const pomoHoy = new Date().toLocaleDateString("es");
const pomoGuardado = JSON.parse(localStorage.getItem("curso-pomodoro")) ?? { fecha: pomoHoy, sesiones: 0 };
const pomoDia = pomoGuardado.fecha === pomoHoy ? pomoGuardado : { fecha: pomoHoy, sesiones: 0 };
let pomoIntervalo;

const formatearReloj = (segundos) => {
    const minutos = String(Math.floor(segundos / 60)).padStart(2, "0");
    const resto = String(segundos % 60).padStart(2, "0");
    return `${minutos}:${resto}`;
};

const pintarSesiones = () => {
    document.querySelector("#pomo-sesiones").textContent = pomoDia.sesiones;
    document.querySelector("#pomo-tomates").textContent = "🍅".repeat(pomoDia.sesiones);
};

const empezarPomodoro = (segundos) => {
    clearInterval(pomoIntervalo);
    let restantes = segundos;
    pomoReloj.textContent = formatearReloj(restantes);
    pomoIntervalo = setInterval(() => {
        restantes--;
        pomoReloj.textContent = formatearReloj(restantes);
        if (restantes === 0) {
            clearInterval(pomoIntervalo);
            pomoDia.sesiones++;
            localStorage.setItem("curso-pomodoro", JSON.stringify(pomoDia));
            pintarSesiones();
            pomoReloj.textContent = "¡Descanso! ☕";
        }
    }, 1000);
};

document.querySelector("#pomo-iniciar").addEventListener("click", () => {
    empezarPomodoro(25 * 60);
});

document.querySelector("#pomo-demo").addEventListener("click", () => {
    empezarPomodoro(5);
});

pintarSesiones();

const pizarraTexto = document.querySelector("#pizarra-texto");
const pizarraAviso = document.querySelector("#pizarra-aviso");

pizarraTexto.value = localStorage.getItem("curso-pizarra") ?? "";

pizarraTexto.addEventListener("input", () => {
    localStorage.setItem("curso-pizarra", pizarraTexto.value);
});

window.addEventListener("storage", (event) => {
    if (event.key !== "curso-pizarra") {
        return;
    }
    pizarraTexto.value = event.newValue ?? "";
    pizarraAviso.textContent = `Cambio recibido de otra pestaña a las ${new Date().toLocaleTimeString("es")}`;
});

const inspectorFilas = document.querySelector("#inspector-filas");
const inspectorTotal = document.querySelector("#inspector-total");

const clavesDelCurso = () => Object.keys(localStorage).filter((clave) => clave.startsWith("curso-")).sort();

const pintarInspector = () => {
    inspectorFilas.innerHTML = "";
    let caracteres = 0;
    for (const clave of clavesDelCurso()) {
        const valor = localStorage.getItem(clave);
        caracteres += clave.length + valor.length;

        const fila = inspectorFilas.insertRow();
        fila.insertCell().textContent = clave;
        fila.insertCell().textContent = valor.length > 40 ? `${valor.slice(0, 40)}…` : valor;
        fila.insertCell().textContent = `${valor.length} car.`;

        const borrar = document.createElement("button");
        borrar.type = "button";
        borrar.textContent = "Borrar";
        borrar.setAttribute("aria-label", `Borrar ${clave}`);
        borrar.addEventListener("click", () => {
            localStorage.removeItem(clave);
            pintarInspector();
        });
        fila.insertCell().append(borrar);
    }
    const kilobytes = (caracteres * 2) / 1024;
    inspectorTotal.textContent = `${clavesDelCurso().length} claves · unos ${kilobytes.toFixed(1)} KB de los ~5 MB disponibles`;
};

document.querySelector("#inspector-actualizar").addEventListener("click", pintarInspector);

document.querySelector("#inspector-borrar").addEventListener("click", () => {
    for (const clave of clavesDelCurso()) {
        localStorage.removeItem(clave);
    }
    pintarInspector();
    inspectorTotal.textContent = "Listo. Recarga la página para empezar de cero.";
});

pintarInspector();
