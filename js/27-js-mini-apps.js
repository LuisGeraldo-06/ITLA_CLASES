"use strict";

{
    const relojHora = document.querySelector("#reloj-hora");
    const relojFecha = document.querySelector("#reloj-fecha");
    const relojSaludo = document.querySelector("#reloj-saludo");
    const reloj12h = document.querySelector("#reloj-12h");

    function dosDigitos(numero) {
        return String(numero).padStart(2, "0");
    }

    function actualizarReloj() {
        const ahora = new Date();
        const horas24 = ahora.getHours();
        let horas = horas24;
        let sufijo = "";
        if (reloj12h.checked) {
            sufijo = horas24 < 12 ? " a. m." : " p. m.";
            horas = horas24 % 12 || 12;
        }
        relojHora.textContent = `${dosDigitos(horas)}:${dosDigitos(ahora.getMinutes())}:${dosDigitos(ahora.getSeconds())}${sufijo}`;
        relojFecha.textContent = ahora.toLocaleDateString("es", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        if (horas24 < 12) {
            relojSaludo.textContent = "☀️ Buenos días";
        } else if (horas24 < 19) {
            relojSaludo.textContent = "🌇 Buenas tardes";
        } else {
            relojSaludo.textContent = "🌙 Buenas noches";
        }
    }

    reloj12h.checked = localStorage.getItem("reloj-12h") === "si";
    reloj12h.addEventListener("change", () => {
        localStorage.setItem("reloj-12h", reloj12h.checked ? "si" : "no");
        actualizarReloj();
    });

    actualizarReloj();
    setInterval(actualizarReloj, 1000);
}

{
    const carrusel = document.querySelector("#carrusel");
    const carruselPista = document.querySelector("#carrusel-pista");
    const carruselAnterior = document.querySelector("#carrusel-anterior");
    const carruselSiguiente = document.querySelector("#carrusel-siguiente");
    const carruselPuntos = document.querySelector("#carrusel-puntos");

    const diapos = carruselPista.querySelectorAll(".carrusel-diapo");
    let actual = 0;
    let autoplay = null;

    diapos.forEach((diapo, indice) => {
        const punto = document.createElement("button");
        punto.type = "button";
        punto.className = "carrusel-punto";
        punto.setAttribute("aria-label", `Ir a la foto ${indice + 1}`);
        punto.addEventListener("click", () => {
            irA(indice);
            reiniciarAutoplay();
        });
        carruselPuntos.append(punto);
    });
    const puntos = carruselPuntos.querySelectorAll(".carrusel-punto");

    function irA(indice) {
        actual = (indice + diapos.length) % diapos.length;
        carruselPista.style.transform = `translateX(-${actual * 100}%)`;
        puntos.forEach((punto, i) => {
            punto.classList.toggle("activo", i === actual);
        });
    }

    function reiniciarAutoplay() {
        clearInterval(autoplay);
        autoplay = setInterval(() => irA(actual + 1), 3500);
    }

    carruselAnterior.addEventListener("click", () => {
        irA(actual - 1);
        reiniciarAutoplay();
    });

    carruselSiguiente.addEventListener("click", () => {
        irA(actual + 1);
        reiniciarAutoplay();
    });

    carrusel.addEventListener("mouseenter", () => clearInterval(autoplay));
    carrusel.addEventListener("mouseleave", reiniciarAutoplay);

    irA(0);
    reiniciarAutoplay();
}

{
    const quizProgreso = document.querySelector("#quiz-progreso");
    const quizPuntaje = document.querySelector("#quiz-puntaje");
    const quizBarraRelleno = document.querySelector("#quiz-barra-relleno");
    const quizPregunta = document.querySelector("#quiz-pregunta");
    const quizOpciones = document.querySelector("#quiz-opciones");
    const quizMensaje = document.querySelector("#quiz-mensaje");
    const quizSiguiente = document.querySelector("#quiz-siguiente");

    const preguntas = [
        { texto: "¿Qué etiqueta HTML crea un enlace?", opciones: ["<link>", "<a>", "<href>", "<url>"], correcta: 1 },
        { texto: "¿Qué propiedad CSS cambia el color del texto?", opciones: ["font-color", "text-color", "color", "foreground"], correcta: 2 },
        { texto: "¿Qué valor de display activa Flexbox?", opciones: ["block", "grid", "inline", "flex"], correcta: 3 },
        { texto: "¿Qué palabra declara una variable que no se reasigna?", opciones: ["const", "let", "var", "static"], correcta: 0 },
        { texto: "¿Qué devuelve [1, 2, 3].map((n) => n * 2)?", opciones: ["6", "[1, 2, 3]", "[2, 4, 6]", "12"], correcta: 2 },
        { texto: "¿Qué método convierte un objeto en texto JSON?", opciones: ["JSON.parse", "JSON.stringify", "toString", "JSON.text"], correcta: 1 }
    ];
    let indice = 0;
    let puntaje = 0;

    function mostrarPregunta() {
        const pregunta = preguntas[indice];
        quizProgreso.textContent = `Pregunta ${indice + 1} de ${preguntas.length}`;
        quizBarraRelleno.style.width = `${(indice / preguntas.length) * 100}%`;
        quizPregunta.textContent = pregunta.texto;
        quizMensaje.textContent = "";
        quizSiguiente.hidden = true;
        quizOpciones.innerHTML = "";
        pregunta.opciones.forEach((opcion, i) => {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.className = "quiz-opcion";
            boton.textContent = opcion;
            boton.addEventListener("click", () => responder(i));
            quizOpciones.append(boton);
        });
    }

    function responder(elegida) {
        const pregunta = preguntas[indice];
        const botones = quizOpciones.querySelectorAll(".quiz-opcion");
        botones.forEach((boton) => {
            boton.disabled = true;
        });
        botones[pregunta.correcta].classList.add("correcta");
        if (elegida === pregunta.correcta) {
            puntaje++;
            quizPuntaje.textContent = puntaje;
            quizMensaje.textContent = "✅ ¡Correcto!";
        } else {
            botones[elegida].classList.add("incorrecta");
            quizMensaje.textContent = `❌ La respuesta era: ${pregunta.opciones[pregunta.correcta]}`;
        }
        quizSiguiente.textContent = indice === preguntas.length - 1 ? "Ver resultado" : "Siguiente";
        quizSiguiente.hidden = false;
    }

    function mostrarResultado() {
        const record = Math.max(puntaje, Number(localStorage.getItem("quiz-record")));
        localStorage.setItem("quiz-record", record);
        quizProgreso.textContent = "¡Terminado!";
        quizBarraRelleno.style.width = "100%";
        quizPregunta.textContent = `Obtuviste ${puntaje} de ${preguntas.length} 🎉`;
        quizOpciones.innerHTML = "";
        quizMensaje.textContent = `Tu mejor puntaje: ${record} de ${preguntas.length}`;
        quizSiguiente.textContent = "Jugar otra vez";
    }

    quizSiguiente.addEventListener("click", () => {
        if (indice === preguntas.length) {
            indice = 0;
            puntaje = 0;
            quizPuntaje.textContent = 0;
            mostrarPregunta();
            return;
        }
        indice++;
        if (indice === preguntas.length) {
            mostrarResultado();
        } else {
            mostrarPregunta();
        }
    });

    mostrarPregunta();
}

{
    const memoriaMovimientos = document.querySelector("#memoria-movimientos");
    const memoriaTiempo = document.querySelector("#memoria-tiempo");
    const memoriaRecord = document.querySelector("#memoria-record");
    const memoriaReiniciar = document.querySelector("#memoria-reiniciar");
    const memoriaTablero = document.querySelector("#memoria-tablero");
    const memoriaMensaje = document.querySelector("#memoria-mensaje");

    const simbolos = ["🍎", "🍌", "🍇", "🍓", "🍒", "🥝", "🍍", "🥥"];
    let primera = null;
    let bloqueado = false;
    let movimientos = 0;
    let parejas = 0;
    let segundos = 0;
    let cronometro = null;

    function barajar(lista) {
        const copia = [...lista];
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        return copia;
    }

    function pintarRecord() {
        memoriaRecord.textContent = localStorage.getItem("memoria-record") || "—";
    }

    function iniciarJuego() {
        clearInterval(cronometro);
        cronometro = null;
        primera = null;
        bloqueado = false;
        movimientos = 0;
        parejas = 0;
        segundos = 0;
        memoriaMovimientos.textContent = 0;
        memoriaTiempo.textContent = 0;
        memoriaMensaje.textContent = "";
        memoriaTablero.innerHTML = "";
        for (const simbolo of barajar([...simbolos, ...simbolos])) {
            const carta = document.createElement("button");
            carta.type = "button";
            carta.className = "memoria-carta";
            carta.dataset.simbolo = simbolo;
            carta.setAttribute("aria-label", "Carta tapada");
            carta.innerHTML = `
                <span class="memoria-cara memoria-frente">?</span>
                <span class="memoria-cara memoria-dorso">${simbolo}</span>
            `;
            carta.addEventListener("click", () => voltear(carta));
            memoriaTablero.append(carta);
        }
    }

    function tapar(carta) {
        carta.classList.remove("volteada");
        carta.setAttribute("aria-label", "Carta tapada");
    }

    function terminar() {
        clearInterval(cronometro);
        const record = Number(localStorage.getItem("memoria-record"));
        if (!record || movimientos < record) {
            localStorage.setItem("memoria-record", movimientos);
            memoriaMensaje.textContent = `🏆 ¡Nuevo récord! ${movimientos} movimientos en ${segundos} s`;
        } else {
            memoriaMensaje.textContent = `🎉 ¡Completado en ${movimientos} movimientos y ${segundos} s!`;
        }
        pintarRecord();
    }

    function voltear(carta) {
        if (bloqueado || carta === primera || carta.classList.contains("encontrada")) {
            return;
        }
        if (!cronometro) {
            cronometro = setInterval(() => {
                segundos++;
                memoriaTiempo.textContent = segundos;
            }, 1000);
        }
        carta.classList.add("volteada");
        carta.setAttribute("aria-label", carta.dataset.simbolo);
        if (!primera) {
            primera = carta;
            return;
        }
        movimientos++;
        memoriaMovimientos.textContent = movimientos;
        if (primera.dataset.simbolo === carta.dataset.simbolo) {
            primera.classList.add("encontrada");
            carta.classList.add("encontrada");
            primera = null;
            parejas++;
            if (parejas === simbolos.length) {
                terminar();
            }
            return;
        }
        bloqueado = true;
        setTimeout(() => {
            tapar(primera);
            tapar(carta);
            primera = null;
            bloqueado = false;
        }, 800);
    }

    memoriaReiniciar.addEventListener("click", iniciarJuego);
    pintarRecord();
    iniciarJuego();
}

{
    const cronoPantalla = document.querySelector("#crono-pantalla");
    const cronoIniciar = document.querySelector("#crono-iniciar");
    const cronoVuelta = document.querySelector("#crono-vuelta");
    const cronoReiniciar = document.querySelector("#crono-reiniciar");
    const cronoVueltas = document.querySelector("#crono-vueltas");

    let inicio = 0;
    let acumulado = 0;
    let intervalo = null;
    let ultimaVuelta = 0;

    function formatoTiempo(ms) {
        const minutos = Math.floor(ms / 60000);
        const segundos = Math.floor((ms % 60000) / 1000);
        const centesimas = Math.floor((ms % 1000) / 10);
        return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}.${String(centesimas).padStart(2, "0")}`;
    }

    function tiempoTotal() {
        return intervalo ? acumulado + Date.now() - inicio : acumulado;
    }

    function pintar() {
        cronoPantalla.textContent = formatoTiempo(tiempoTotal());
    }

    cronoIniciar.addEventListener("click", () => {
        if (intervalo) {
            acumulado = tiempoTotal();
            clearInterval(intervalo);
            intervalo = null;
            cronoIniciar.textContent = "Continuar";
            cronoVuelta.disabled = true;
        } else {
            inicio = Date.now();
            intervalo = setInterval(pintar, 30);
            cronoIniciar.textContent = "Pausar";
            cronoVuelta.disabled = false;
        }
    });

    cronoVuelta.addEventListener("click", () => {
        const total = tiempoTotal();
        const fila = document.createElement("li");
        fila.innerHTML = `
            <span>Vuelta ${cronoVueltas.children.length + 1}</span>
            <span>+${formatoTiempo(total - ultimaVuelta)}</span>
            <span>${formatoTiempo(total)}</span>
        `;
        ultimaVuelta = total;
        cronoVueltas.prepend(fila);
    });

    cronoReiniciar.addEventListener("click", () => {
        clearInterval(intervalo);
        intervalo = null;
        acumulado = 0;
        ultimaVuelta = 0;
        cronoVueltas.innerHTML = "";
        cronoIniciar.textContent = "Iniciar";
        cronoVuelta.disabled = true;
        pintar();
    });
}

{
    const pomodoro = document.querySelector("#pomodoro");
    const pomodoroModos = document.querySelector("#pomodoro-modos");
    const pomodoroTiempo = document.querySelector("#pomodoro-tiempo");
    const pomodoroProgreso = document.querySelector("#pomodoro-progreso");
    const pomodoroIniciar = document.querySelector("#pomodoro-iniciar");
    const pomodoroReiniciar = document.querySelector("#pomodoro-reiniciar");
    const pomodoroMensaje = document.querySelector("#pomodoro-mensaje");
    const pomodoroHechos = document.querySelector("#pomodoro-hechos");

    let modoActual = pomodoroModos.querySelector(".activo");
    let duracion = 25 * 60;
    let restante = duracion;
    let intervalo = null;

    function pintar() {
        const minutos = String(Math.floor(restante / 60)).padStart(2, "0");
        const segundos = String(restante % 60).padStart(2, "0");
        pomodoroTiempo.textContent = `${minutos}:${segundos}`;
        pomodoroProgreso.style.width = `${(1 - restante / duracion) * 100}%`;
    }

    function detener() {
        clearInterval(intervalo);
        intervalo = null;
        pomodoroIniciar.textContent = "Iniciar";
    }

    function hoy() {
        return new Date().toDateString();
    }

    function leerHechos() {
        const guardado = JSON.parse(localStorage.getItem("pomodoro-hechos")) || {};
        return guardado.fecha === hoy() ? guardado.cantidad : 0;
    }

    function terminar() {
        detener();
        if (modoActual.dataset.tipo === "enfoque") {
            const cantidad = leerHechos() + 1;
            localStorage.setItem("pomodoro-hechos", JSON.stringify({ fecha: hoy(), cantidad }));
            pomodoroHechos.textContent = cantidad;
            pomodoroMensaje.textContent = "⏰ ¡Tiempo! Toma un descanso.";
        } else {
            pomodoroMensaje.textContent = "💪 Fin del descanso. ¡A enfocarse!";
        }
        pomodoro.classList.add("pomodoro-fin");
        setTimeout(() => pomodoro.classList.remove("pomodoro-fin"), 1500);
        restante = duracion;
        pintar();
    }

    function elegirModo(boton) {
        detener();
        modoActual.classList.remove("activo");
        boton.classList.add("activo");
        modoActual = boton;
        duracion = Math.round(Number(boton.dataset.minutos) * 60);
        restante = duracion;
        pomodoroMensaje.textContent = "";
        pintar();
    }

    pomodoroModos.addEventListener("click", (evento) => {
        const boton = evento.target.closest(".pomodoro-modo");
        if (boton) {
            elegirModo(boton);
        }
    });

    pomodoroIniciar.addEventListener("click", () => {
        if (intervalo) {
            detener();
            return;
        }
        pomodoroMensaje.textContent = "";
        pomodoroIniciar.textContent = "Pausar";
        intervalo = setInterval(() => {
            restante--;
            pintar();
            if (restante <= 0) {
                terminar();
            }
        }, 1000);
    });

    pomodoroReiniciar.addEventListener("click", () => {
        detener();
        restante = duracion;
        pintar();
    });

    pomodoroHechos.textContent = leerHechos();
    pintar();
}

{
    const tareasForm = document.querySelector("#tareas-form");
    const tareasNueva = document.querySelector("#tareas-nueva");
    const tareasFiltros = document.querySelector("#tareas-filtros");
    const tareasLista = document.querySelector("#tareas-lista");
    const tareasContador = document.querySelector("#tareas-contador");
    const tareasLimpiar = document.querySelector("#tareas-limpiar");

    let tareas = JSON.parse(localStorage.getItem("tareas-app")) || [
        { id: 1, texto: "Repasar fetch y APIs", hecha: true },
        { id: 2, texto: "Terminar el proyecto final", hecha: false },
        { id: 3, texto: "Publicar el portafolio", hecha: false }
    ];
    let filtro = "todas";

    function guardar() {
        localStorage.setItem("tareas-app", JSON.stringify(tareas));
    }

    function crearFila(tarea) {
        const fila = document.createElement("li");
        fila.className = tarea.hecha ? "tarea hecha" : "tarea";

        const casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.checked = tarea.hecha;
        casilla.setAttribute("aria-label", "Marcar como hecha");
        casilla.addEventListener("change", () => {
            tarea.hecha = casilla.checked;
            guardar();
            pintar();
        });

        const texto = document.createElement("span");
        texto.textContent = tarea.texto;

        const borrar = document.createElement("button");
        borrar.type = "button";
        borrar.className = "tarea-borrar";
        borrar.textContent = "✕";
        borrar.setAttribute("aria-label", "Borrar tarea");
        borrar.addEventListener("click", () => {
            tareas = tareas.filter((t) => t.id !== tarea.id);
            guardar();
            pintar();
        });

        fila.append(casilla, texto, borrar);
        return fila;
    }

    function pintar() {
        const visibles = tareas.filter((tarea) => {
            if (filtro === "pendientes") {
                return !tarea.hecha;
            }
            if (filtro === "hechas") {
                return tarea.hecha;
            }
            return true;
        });
        tareasLista.innerHTML = "";
        for (const tarea of visibles) {
            tareasLista.append(crearFila(tarea));
        }
        if (visibles.length === 0) {
            tareasLista.innerHTML = `<li class="tareas-vacia">No hay tareas aquí 🎉</li>`;
        }
        const pendientes = tareas.filter((tarea) => !tarea.hecha).length;
        tareasContador.textContent = `${pendientes} pendiente${pendientes === 1 ? "" : "s"}`;
    }

    tareasForm.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const texto = tareasNueva.value.trim();
        if (!texto) {
            return;
        }
        tareas.push({ id: Date.now(), texto, hecha: false });
        guardar();
        tareasForm.reset();
        pintar();
    });

    tareasFiltros.addEventListener("click", (evento) => {
        const boton = evento.target.closest("button");
        if (!boton) {
            return;
        }
        filtro = boton.dataset.filtro;
        tareasFiltros.querySelectorAll("button").forEach((b) => {
            b.classList.toggle("activo", b === boton);
        });
        pintar();
    });

    tareasLimpiar.addEventListener("click", () => {
        tareas = tareas.filter((tarea) => !tarea.hecha);
        guardar();
        pintar();
    });

    pintar();
}

{
    const calcPantalla = document.querySelector("#calc-pantalla");
    const calcTeclas = document.querySelector("#calc-teclas");

    let actual = "0";
    let anterior = null;
    let operador = null;
    let esperandoNumero = false;

    function calcular(a, b, op) {
        switch (op) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return b === 0 ? NaN : a / b;
        }
    }

    function escribir(digito) {
        if (esperandoNumero || actual === "0" || actual === "Error") {
            actual = digito === "." ? "0." : digito;
            esperandoNumero = false;
        } else if (digito === "." && actual.includes(".")) {
            return;
        } else if (actual.length < 14) {
            actual += digito;
        }
    }

    function resolver() {
        if (operador === null || esperandoNumero) {
            return;
        }
        const resultado = calcular(anterior, Number(actual), operador);
        actual = Number.isFinite(resultado) ? String(Number(resultado.toPrecision(12))) : "Error";
        operador = null;
        esperandoNumero = true;
    }

    function elegirOperador(op) {
        if (actual === "Error") {
            return;
        }
        resolver();
        anterior = Number(actual);
        operador = op;
        esperandoNumero = true;
    }

    function limpiar() {
        actual = "0";
        anterior = null;
        operador = null;
        esperandoNumero = false;
    }

    calcTeclas.addEventListener("click", (evento) => {
        const tecla = evento.target.closest("button");
        if (!tecla) {
            return;
        }
        const { valor, accion } = tecla.dataset;
        if (valor) {
            escribir(valor);
        } else if (tecla.dataset.operador) {
            elegirOperador(tecla.dataset.operador);
        } else if (accion === "igual") {
            resolver();
        } else if (accion === "limpiar") {
            limpiar();
        } else if (accion === "borrar") {
            actual = actual.length > 1 && !esperandoNumero ? actual.slice(0, -1) : "0";
        } else if (accion === "porcentaje" && actual !== "Error") {
            actual = String(Number(actual) / 100);
        }
        calcPantalla.textContent = actual.replace(".", ",");
    });
}

{
    const pptTu = document.querySelector("#ppt-tu");
    const pptEmpates = document.querySelector("#ppt-empates");
    const pptCompu = document.querySelector("#ppt-compu");
    const pptOpciones = document.querySelector("#ppt-opciones");
    const pptResultado = document.querySelector("#ppt-resultado");
    const pptReiniciar = document.querySelector("#ppt-reiniciar");

    const emojis = { piedra: "✊", papel: "✋", tijera: "✌️" };
    const leGanaA = { piedra: "tijera", papel: "piedra", tijera: "papel" };
    let marcador = JSON.parse(localStorage.getItem("ppt-marcador")) || { tu: 0, compu: 0, empates: 0 };

    function pintarMarcador() {
        pptTu.textContent = marcador.tu;
        pptEmpates.textContent = marcador.empates;
        pptCompu.textContent = marcador.compu;
        localStorage.setItem("ppt-marcador", JSON.stringify(marcador));
    }

    pptOpciones.addEventListener("click", (evento) => {
        const boton = evento.target.closest("button");
        if (!boton) {
            return;
        }
        const tu = boton.dataset.jugada;
        const jugadas = Object.keys(emojis);
        const compu = jugadas[Math.floor(Math.random() * jugadas.length)];
        let mensaje;
        if (tu === compu) {
            marcador.empates++;
            mensaje = "🤝 Empate";
        } else if (leGanaA[tu] === compu) {
            marcador.tu++;
            mensaje = `🎉 ¡Ganaste! ${tu} vence a ${compu}`;
        } else {
            marcador.compu++;
            mensaje = `💻 Gana la compu: ${compu} vence a ${tu}`;
        }
        pptResultado.textContent = `${emojis[tu]} vs ${emojis[compu]} — ${mensaje}`;
        pintarMarcador();
    });

    pptReiniciar.addEventListener("click", () => {
        marcador = { tu: 0, compu: 0, empates: 0 };
        pptResultado.textContent = "¡Elige tu jugada!";
        pintarMarcador();
    });

    pintarMarcador();
}

{
    const claveResultado = document.querySelector("#clave-resultado");
    const claveCopiar = document.querySelector("#clave-copiar");
    const claveBarra = document.querySelector("#clave-barra");
    const claveNivel = document.querySelector("#clave-nivel");
    const claveLargo = document.querySelector("#clave-largo");
    const claveLargoValor = document.querySelector("#clave-largo-valor");
    const claveGenerar = document.querySelector("#clave-generar");

    const grupos = [
        { casilla: document.querySelector("#clave-mayus"), caracteres: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
        { casilla: document.querySelector("#clave-minus"), caracteres: "abcdefghijklmnopqrstuvwxyz" },
        { casilla: document.querySelector("#clave-numeros"), caracteres: "0123456789" },
        { casilla: document.querySelector("#clave-simbolos"), caracteres: "!@#$%&*?-_=+" }
    ];

    function azar(maximo) {
        return crypto.getRandomValues(new Uint32Array(1))[0] % maximo;
    }

    function generar() {
        const largo = Number(claveLargo.value);
        claveLargoValor.textContent = largo;
        const disponibles = grupos
            .filter((grupo) => grupo.casilla.checked)
            .map((grupo) => grupo.caracteres)
            .join("");
        if (!disponibles) {
            claveResultado.textContent = "Marca al menos una opción";
            claveBarra.style.width = "0";
            claveNivel.textContent = "";
            return;
        }
        let clave = "";
        for (let i = 0; i < largo; i++) {
            clave += disponibles[azar(disponibles.length)];
        }
        claveResultado.textContent = clave;

        const bits = Math.round(largo * Math.log2(disponibles.length));
        let nivel = "Débil";
        let color = "#ef4444";
        if (bits >= 100) {
            nivel = "Muy fuerte";
            color = "#16a34a";
        } else if (bits >= 70) {
            nivel = "Fuerte";
            color = "#84cc16";
        } else if (bits >= 45) {
            nivel = "Media";
            color = "#f59e0b";
        }
        claveBarra.style.width = `${Math.min(bits, 120) / 1.2}%`;
        claveBarra.style.background = color;
        claveNivel.textContent = `${nivel} · ${bits} bits de entropía`;
    }

    claveCopiar.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(claveResultado.textContent);
            claveCopiar.textContent = "¡Copiada!";
        } catch {
            claveCopiar.textContent = "No se pudo";
        }
        setTimeout(() => {
            claveCopiar.textContent = "Copiar";
        }, 1500);
    });

    claveLargo.addEventListener("input", generar);
    claveGenerar.addEventListener("click", generar);
    for (const grupo of grupos) {
        grupo.casilla.addEventListener("change", generar);
    }

    generar();
}

{
    const unidadesTipo = document.querySelector("#unidades-tipo");
    const unidadesValor = document.querySelector("#unidades-valor");
    const unidadesDe = document.querySelector("#unidades-de");
    const unidadesA = document.querySelector("#unidades-a");
    const unidadesResultado = document.querySelector("#unidades-resultado");

    const magnitudes = {
        longitud: { nombre: "Longitud", unidades: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, ft: 0.3048, in: 0.0254 } },
        peso: { nombre: "Peso", unidades: { kg: 1, g: 0.001, lb: 0.45359237, oz: 0.0283495 } },
        volumen: { nombre: "Volumen", unidades: { L: 1, mL: 0.001, gal: 3.785411784, taza: 0.24 } },
        temperatura: { nombre: "Temperatura", unidades: { "°C": 1, "°F": 1, K: 1 } }
    };
    const aCelsius = { "°C": (v) => v, "°F": (v) => ((v - 32) * 5) / 9, K: (v) => v - 273.15 };
    const desdeCelsius = { "°C": (c) => c, "°F": (c) => (c * 9) / 5 + 32, K: (c) => c + 273.15 };

    for (const [clave, magnitud] of Object.entries(magnitudes)) {
        unidadesTipo.add(new Option(magnitud.nombre, clave));
    }

    function convertir() {
        const valor = Number(unidadesValor.value);
        const tipo = unidadesTipo.value;
        const de = unidadesDe.value;
        const a = unidadesA.value;
        let resultado;
        if (tipo === "temperatura") {
            resultado = desdeCelsius[a](aCelsius[de](valor));
        } else {
            const factores = magnitudes[tipo].unidades;
            resultado = (valor * factores[de]) / factores[a];
        }
        const formato = { maximumFractionDigits: 4 };
        unidadesResultado.textContent = `${valor.toLocaleString("es", formato)} ${de} = ${resultado.toLocaleString("es", formato)} ${a}`;
    }

    function llenarUnidades() {
        const unidades = Object.keys(magnitudes[unidadesTipo.value].unidades);
        unidadesDe.innerHTML = "";
        unidadesA.innerHTML = "";
        for (const unidad of unidades) {
            unidadesDe.add(new Option(unidad, unidad));
            unidadesA.add(new Option(unidad, unidad));
        }
        unidadesA.selectedIndex = 1;
        convertir();
    }

    unidadesTipo.addEventListener("change", llenarUnidades);
    unidadesValor.addEventListener("input", convertir);
    unidadesDe.addEventListener("change", convertir);
    unidadesA.addEventListener("change", convertir);

    llenarUnidades();
}

{
    const palabrasTexto = document.querySelector("#palabras-texto");
    const palabrasTotal = document.querySelector("#palabras-total");
    const palabrasCaracteres = document.querySelector("#palabras-caracteres");
    const palabrasSinEspacios = document.querySelector("#palabras-sin-espacios");
    const palabrasOraciones = document.querySelector("#palabras-oraciones");
    const palabrasLectura = document.querySelector("#palabras-lectura");
    const palabrasFrecuentes = document.querySelector("#palabras-frecuentes");

    function analizar() {
        const texto = palabrasTexto.value;
        const palabras = texto.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
        const oraciones = texto.split(/[.!?]+/).filter((parte) => parte.trim() !== "");
        const minutos = palabras.length / 200;

        palabrasTotal.textContent = palabras.length;
        palabrasCaracteres.textContent = texto.length;
        palabrasSinEspacios.textContent = texto.replace(/\s/g, "").length;
        palabrasOraciones.textContent = oraciones.length;
        palabrasLectura.textContent = minutos < 1 ? `${Math.ceil(minutos * 60)} s` : `${Math.ceil(minutos)} min`;

        const conteo = {};
        for (const palabra of palabras) {
            if (palabra.length > 3) {
                conteo[palabra] = (conteo[palabra] || 0) + 1;
            }
        }
        const top = Object.entries(conteo)
            .filter(([, veces]) => veces > 1)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        palabrasFrecuentes.textContent = top.length
            ? `Más repetidas: ${top.map(([palabra, veces]) => `${palabra} (${veces})`).join(", ")}`
            : "";

        localStorage.setItem("palabras-borrador", texto);
    }

    palabrasTexto.value = localStorage.getItem("palabras-borrador") || "";
    palabrasTexto.addEventListener("input", analizar);
    analizar();
}

{
    const lienzoColor = document.querySelector("#lienzo-color");
    const lienzoGrosor = document.querySelector("#lienzo-grosor");
    const lienzoBorrador = document.querySelector("#lienzo-borrador");
    const lienzoLimpiar = document.querySelector("#lienzo-limpiar");
    const lienzoDescargar = document.querySelector("#lienzo-descargar");
    const lienzoCanvas = document.querySelector("#lienzo-canvas");

    const contexto = lienzoCanvas.getContext("2d");
    let dibujando = false;
    let borrador = false;

    function fondoBlanco() {
        contexto.fillStyle = "#ffffff";
        contexto.fillRect(0, 0, lienzoCanvas.width, lienzoCanvas.height);
    }

    function posicion(evento) {
        const caja = lienzoCanvas.getBoundingClientRect();
        return {
            x: ((evento.clientX - caja.left) * lienzoCanvas.width) / caja.width,
            y: ((evento.clientY - caja.top) * lienzoCanvas.height) / caja.height
        };
    }

    lienzoCanvas.addEventListener("pointerdown", (evento) => {
        dibujando = true;
        lienzoCanvas.setPointerCapture(evento.pointerId);
        const { x, y } = posicion(evento);
        contexto.strokeStyle = borrador ? "#ffffff" : lienzoColor.value;
        contexto.lineWidth = Number(lienzoGrosor.value);
        contexto.lineCap = "round";
        contexto.lineJoin = "round";
        contexto.beginPath();
        contexto.moveTo(x, y);
        contexto.lineTo(x, y);
        contexto.stroke();
    });

    lienzoCanvas.addEventListener("pointermove", (evento) => {
        if (!dibujando) {
            return;
        }
        const { x, y } = posicion(evento);
        contexto.lineTo(x, y);
        contexto.stroke();
    });

    lienzoCanvas.addEventListener("pointerup", () => {
        dibujando = false;
    });

    lienzoCanvas.addEventListener("pointercancel", () => {
        dibujando = false;
    });

    lienzoBorrador.addEventListener("click", () => {
        borrador = !borrador;
        lienzoBorrador.setAttribute("aria-pressed", borrador);
    });

    lienzoLimpiar.addEventListener("click", fondoBlanco);

    lienzoDescargar.addEventListener("click", () => {
        const enlace = document.createElement("a");
        enlace.href = lienzoCanvas.toDataURL("image/png");
        enlace.download = "mi-dibujo.png";
        enlace.click();
    });

    fondoBlanco();
}

{
    const carritoCatalogo = document.querySelector("#carrito-catalogo");
    const carritoUnidades = document.querySelector("#carrito-unidades");
    const carritoLista = document.querySelector("#carrito-lista");
    const carritoCupon = document.querySelector("#carrito-cupon");
    const carritoCodigo = document.querySelector("#carrito-codigo");
    const carritoSubtotal = document.querySelector("#carrito-subtotal");
    const carritoDescuento = document.querySelector("#carrito-descuento");
    const carritoImpuesto = document.querySelector("#carrito-impuesto");
    const carritoTotal = document.querySelector("#carrito-total");
    const carritoPagar = document.querySelector("#carrito-pagar");
    const carritoMensaje = document.querySelector("#carrito-mensaje");

    const productos = [
        { id: 1, nombre: "Taza Café Lunar", precio: 12.5, imagen: "https://picsum.photos/id/30/300/200" },
        { id: 2, nombre: "Cuaderno Brisa", precio: 8.9, imagen: "https://picsum.photos/id/24/300/200" },
        { id: 3, nombre: "Cámara Retro Nébula", precio: 89.99, imagen: "https://picsum.photos/id/250/300/200" },
        { id: 4, nombre: "Mochila Sendero", precio: 45, imagen: "https://picsum.photos/id/103/300/200" },
        { id: 5, nombre: "Lámpara Faro", precio: 27.75, imagen: "https://picsum.photos/id/225/300/200" },
        { id: 6, nombre: "Planta Verdi", precio: 15, imagen: "https://picsum.photos/id/152/300/200" }
    ];
    const cupones = { JS10: 0.1, CURSO20: 0.2 };
    const dinero = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD" });
    let carrito = JSON.parse(localStorage.getItem("carrito-app")) || [];
    let descuento = 0;

    carritoCatalogo.innerHTML = productos.map((producto) => `
        <article class="carrito-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            <h4>${producto.nombre}</h4>
            <p>${dinero.format(producto.precio)}</p>
            <button type="button" data-agregar="${producto.id}">Agregar</button>
        </article>
    `).join("");

    function pintarCarrito() {
        let subtotal = 0;
        let unidades = 0;
        carritoLista.innerHTML = "";
        for (const item of carrito) {
            const producto = productos.find((p) => p.id === item.id);
            subtotal += producto.precio * item.cantidad;
            unidades += item.cantidad;
            carritoLista.innerHTML += `
                <li>
                    <span>${producto.nombre}</span>
                    <span class="carrito-controles">
                        <button type="button" data-cambio="-1" data-id="${item.id}" aria-label="Quitar uno">−</button>
                        <strong>${item.cantidad}</strong>
                        <button type="button" data-cambio="1" data-id="${item.id}" aria-label="Agregar uno">+</button>
                        <button type="button" data-cambio="eliminar" data-id="${item.id}" aria-label="Eliminar">🗑</button>
                    </span>
                    <span>${dinero.format(producto.precio * item.cantidad)}</span>
                </li>
            `;
        }
        if (carrito.length === 0) {
            carritoLista.innerHTML = `<li class="carrito-vacio">Tu carrito está vacío.</li>`;
        }
        const montoDescuento = subtotal * descuento;
        const impuesto = (subtotal - montoDescuento) * 0.07;
        carritoUnidades.textContent = unidades;
        carritoSubtotal.textContent = dinero.format(subtotal);
        carritoDescuento.textContent = `−${dinero.format(montoDescuento)}`;
        carritoImpuesto.textContent = dinero.format(impuesto);
        carritoTotal.textContent = dinero.format(subtotal - montoDescuento + impuesto);
        carritoPagar.disabled = carrito.length === 0;
        localStorage.setItem("carrito-app", JSON.stringify(carrito));
    }

    function cambiarCantidad(id, cambio) {
        const item = carrito.find((i) => i.id === id);
        if (item) {
            item.cantidad += cambio;
        } else {
            carrito.push({ id, cantidad: 1 });
        }
        carrito = carrito.filter((i) => i.cantidad > 0);
        pintarCarrito();
    }

    carritoCatalogo.addEventListener("click", (evento) => {
        const boton = evento.target.closest("[data-agregar]");
        if (boton) {
            cambiarCantidad(Number(boton.dataset.agregar), 1);
            carritoMensaje.textContent = "";
        }
    });

    carritoLista.addEventListener("click", (evento) => {
        const boton = evento.target.closest("[data-cambio]");
        if (!boton) {
            return;
        }
        const id = Number(boton.dataset.id);
        if (boton.dataset.cambio === "eliminar") {
            carrito = carrito.filter((i) => i.id !== id);
            pintarCarrito();
        } else {
            cambiarCantidad(id, Number(boton.dataset.cambio));
        }
    });

    carritoCupon.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const codigo = carritoCodigo.value.trim().toUpperCase();
        if (cupones[codigo]) {
            descuento = cupones[codigo];
            carritoMensaje.textContent = `🏷️ Cupón ${codigo}: ${descuento * 100} % de descuento`;
        } else {
            descuento = 0;
            carritoMensaje.textContent = "Ese cupón no existe.";
        }
        pintarCarrito();
    });

    carritoPagar.addEventListener("click", () => {
        carritoMensaje.textContent = `✅ ¡Gracias por tu compra! Pagaste ${carritoTotal.textContent}.`;
        carrito = [];
        descuento = 0;
        carritoCodigo.value = "";
        pintarCarrito();
    });

    pintarCarrito();
}

{
    const gastosForm = document.querySelector("#gastos-form");
    const gastosDescripcion = document.querySelector("#gastos-descripcion");
    const gastosMonto = document.querySelector("#gastos-monto");
    const gastosCategoria = document.querySelector("#gastos-categoria");
    const gastosTotal = document.querySelector("#gastos-total");
    const gastosCategorias = document.querySelector("#gastos-categorias");
    const gastosLista = document.querySelector("#gastos-lista");

    const colores = { Comida: "#f59e0b", Transporte: "#3b82f6", Casa: "#8b5cf6", Ocio: "#ec4899", Salud: "#10b981" };
    const dinero = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD" });
    let gastos = JSON.parse(localStorage.getItem("gastos-app")) || [
        { id: 1, descripcion: "Supermercado", monto: 54.3, categoria: "Comida", fecha: "02/11/2026" },
        { id: 2, descripcion: "Pasaje de bus", monto: 2.5, categoria: "Transporte", fecha: "03/11/2026" },
        { id: 3, descripcion: "Cine", monto: 9, categoria: "Ocio", fecha: "05/11/2026" }
    ];

    function pintar() {
        const total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);
        gastosTotal.textContent = dinero.format(total);

        const porCategoria = {};
        for (const gasto of gastos) {
            porCategoria[gasto.categoria] = (porCategoria[gasto.categoria] || 0) + gasto.monto;
        }
        gastosCategorias.innerHTML = Object.entries(porCategoria)
            .sort((a, b) => b[1] - a[1])
            .map(([categoria, monto]) => `
                <div class="gastos-cat">
                    <span>${categoria}</span>
                    <div class="gastos-barra">
                        <div style="width: ${(monto / total) * 100}%; background: ${colores[categoria]}"></div>
                    </div>
                    <strong>${dinero.format(monto)}</strong>
                </div>
            `)
            .join("");

        gastosLista.innerHTML = "";
        for (const gasto of [...gastos].reverse()) {
            const fila = document.createElement("li");
            fila.innerHTML = `
                <span class="gastos-punto" style="background: ${colores[gasto.categoria]}"></span>
                <span></span>
                <strong>${dinero.format(gasto.monto)}</strong>
                <button type="button" class="gastos-borrar" aria-label="Borrar gasto">✕</button>
            `;
            fila.children[1].textContent = `${gasto.descripcion} · ${gasto.categoria} · ${gasto.fecha}`;
            fila.querySelector(".gastos-borrar").addEventListener("click", () => {
                gastos = gastos.filter((g) => g.id !== gasto.id);
                pintar();
            });
            gastosLista.append(fila);
        }
        if (gastos.length === 0) {
            gastosLista.innerHTML = `<li>Aún no registras gastos.</li>`;
        }
        localStorage.setItem("gastos-app", JSON.stringify(gastos));
    }

    gastosForm.addEventListener("submit", (evento) => {
        evento.preventDefault();
        gastos.push({
            id: Date.now(),
            descripcion: gastosDescripcion.value.trim(),
            monto: Number(gastosMonto.value),
            categoria: gastosCategoria.value,
            fecha: new Date().toLocaleDateString("es")
        });
        gastosForm.reset();
        gastosDescripcion.focus();
        pintar();
    });

    pintar();
}

{
    const adivinaIntentos = document.querySelector("#adivina-intentos");
    const adivinaForm = document.querySelector("#adivina-form");
    const adivinaNumero = document.querySelector("#adivina-numero");
    const adivinaProbar = document.querySelector("#adivina-probar");
    const adivinaPista = document.querySelector("#adivina-pista");
    const adivinaHistorial = document.querySelector("#adivina-historial");
    const adivinaNuevo = document.querySelector("#adivina-nuevo");
    const adivinaRecord = document.querySelector("#adivina-record");

    const maxIntentos = 7;
    let secreto = 0;
    let restantes = 0;

    function pintarRecord() {
        const record = localStorage.getItem("adivina-record");
        adivinaRecord.textContent = record ? `${record} intento(s)` : "—";
    }

    function nuevoJuego() {
        secreto = Math.floor(Math.random() * 100) + 1;
        restantes = maxIntentos;
        adivinaIntentos.textContent = restantes;
        adivinaPista.textContent = "";
        adivinaHistorial.innerHTML = "";
        adivinaNumero.value = "";
        adivinaNumero.disabled = false;
        adivinaProbar.disabled = false;
        adivinaNuevo.hidden = true;
    }

    function terminar(mensaje) {
        adivinaPista.textContent = mensaje;
        adivinaNumero.disabled = true;
        adivinaProbar.disabled = true;
        adivinaNuevo.hidden = false;
    }

    adivinaForm.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const intento = Number(adivinaNumero.value);
        restantes--;
        adivinaIntentos.textContent = restantes;

        const ficha = document.createElement("li");
        ficha.textContent = intento;
        adivinaHistorial.append(ficha);
        adivinaNumero.value = "";

        if (intento === secreto) {
            ficha.className = "exacto";
            const usados = maxIntentos - restantes;
            const record = Number(localStorage.getItem("adivina-record"));
            if (!record || usados < record) {
                localStorage.setItem("adivina-record", usados);
                pintarRecord();
            }
            terminar(`🎉 ¡Sí! Era el ${secreto}. Lo lograste en ${usados} intento(s).`);
            return;
        }

        ficha.className = intento < secreto ? "bajo" : "alto";
        if (restantes === 0) {
            terminar(`😢 Se acabaron los intentos. Era el ${secreto}.`);
            return;
        }
        const distancia = Math.abs(intento - secreto);
        let temperatura = "🧊 Frío";
        if (distancia <= 5) {
            temperatura = "🔥 ¡Muy caliente!";
        } else if (distancia <= 15) {
            temperatura = "🌡️ Tibio";
        }
        adivinaPista.textContent = `${intento < secreto ? "⬆️ Es mayor" : "⬇️ Es menor"} que ${intento}. ${temperatura}`;
    });

    adivinaNuevo.addEventListener("click", nuevoJuego);
    pintarRecord();
    nuevoJuego();
}

{
    const recetasBuscar = document.querySelector("#recetas-buscar");
    const recetasCategoria = document.querySelector("#recetas-categoria");
    const recetasTiempo = document.querySelector("#recetas-tiempo");
    const recetasTiempoValor = document.querySelector("#recetas-tiempo-valor");
    const recetasVeggie = document.querySelector("#recetas-veggie");
    const recetasFavoritas = document.querySelector("#recetas-favoritas");
    const recetasConteo = document.querySelector("#recetas-conteo");
    const recetasLista = document.querySelector("#recetas-lista");

    const recetas = [
        { id: 1, nombre: "Panqueques de avena", categoria: "Desayuno", minutos: 15, vegetariana: true, ingredientes: ["avena", "huevo", "leche", "banano"], imagen: "https://picsum.photos/id/1080/400/240" },
        { id: 2, nombre: "Sancocho de gallina", categoria: "Almuerzo", minutos: 60, vegetariana: false, ingredientes: ["gallina", "ñame", "culantro", "maíz"], imagen: "https://picsum.photos/id/292/400/240" },
        { id: 3, nombre: "Tacos de frijol", categoria: "Cena", minutos: 20, vegetariana: true, ingredientes: ["tortilla", "frijol", "aguacate", "queso"], imagen: "https://picsum.photos/id/312/400/240" },
        { id: 4, nombre: "Arepas con queso", categoria: "Desayuno", minutos: 25, vegetariana: true, ingredientes: ["harina de maíz", "queso", "mantequilla"], imagen: "https://picsum.photos/id/429/400/240" },
        { id: 5, nombre: "Ceviche de corvina", categoria: "Almuerzo", minutos: 30, vegetariana: false, ingredientes: ["corvina", "limón", "cebolla", "ají"], imagen: "https://picsum.photos/id/431/400/240" },
        { id: 6, nombre: "Tortilla de papas", categoria: "Cena", minutos: 35, vegetariana: true, ingredientes: ["papa", "huevo", "cebolla"], imagen: "https://picsum.photos/id/488/400/240" },
        { id: 7, nombre: "Arroz con leche", categoria: "Postre", minutos: 40, vegetariana: true, ingredientes: ["arroz", "leche", "canela", "azúcar"], imagen: "https://picsum.photos/id/493/400/240" },
        { id: 8, nombre: "Pollo al curry", categoria: "Cena", minutos: 45, vegetariana: false, ingredientes: ["pollo", "curry", "coco", "arroz"], imagen: "https://picsum.photos/id/674/400/240" },
        { id: 9, nombre: "Brownies de cacao", categoria: "Postre", minutos: 50, vegetariana: true, ingredientes: ["cacao", "harina", "huevo", "azúcar"], imagen: "https://picsum.photos/id/835/400/240" },
        { id: 10, nombre: "Ensalada tropical", categoria: "Almuerzo", minutos: 15, vegetariana: true, ingredientes: ["lechuga", "mango", "aguacate", "limón"], imagen: "https://picsum.photos/id/102/400/240" }
    ];
    let favoritas = JSON.parse(localStorage.getItem("recetas-favoritas")) || [];

    function normalizar(texto) {
        return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    }

    function filtrar() {
        const texto = normalizar(recetasBuscar.value.trim());
        const maximo = Number(recetasTiempo.value);
        recetasTiempoValor.textContent = maximo;

        const visibles = recetas.filter((receta) => {
            const dondeBuscar = normalizar([receta.nombre, ...receta.ingredientes].join(" "));
            return dondeBuscar.includes(texto)
                && (recetasCategoria.value === "" || receta.categoria === recetasCategoria.value)
                && receta.minutos <= maximo
                && (!recetasVeggie.checked || receta.vegetariana)
                && (!recetasFavoritas.checked || favoritas.includes(receta.id));
        });

        recetasConteo.textContent = `${visibles.length} de ${recetas.length} recetas`;
        recetasLista.innerHTML = visibles.map((receta) => {
            const esFavorita = favoritas.includes(receta.id);
            return `
                <article class="receta">
                    <img src="${receta.imagen}" alt="${receta.nombre}" loading="lazy">
                    <button type="button" class="receta-favorita" data-id="${receta.id}" aria-pressed="${esFavorita}" aria-label="Favorita">${esFavorita ? "❤️" : "🤍"}</button>
                    <h4>${receta.nombre}</h4>
                    <p>${receta.categoria} · ⏱ ${receta.minutos} min ${receta.vegetariana ? "· 🌱" : ""}</p>
                    <p class="receta-ingredientes">${receta.ingredientes.join(", ")}</p>
                </article>
            `;
        }).join("") || `<p>Ninguna receta coincide. Prueba con otros filtros.</p>`;
    }

    recetasLista.addEventListener("click", (evento) => {
        const boton = evento.target.closest(".receta-favorita");
        if (!boton) {
            return;
        }
        const id = Number(boton.dataset.id);
        if (favoritas.includes(id)) {
            favoritas = favoritas.filter((f) => f !== id);
        } else {
            favoritas.push(id);
        }
        localStorage.setItem("recetas-favoritas", JSON.stringify(favoritas));
        filtrar();
    });

    for (const control of [recetasBuscar, recetasCategoria, recetasTiempo, recetasVeggie, recetasFavoritas]) {
        control.addEventListener("input", filtrar);
    }

    filtrar();
}

{
    const kanbanForm = document.querySelector("#kanban-form");
    const kanbanTexto = document.querySelector("#kanban-texto");
    const kanbanTablero = document.querySelector("#kanban-tablero");
    const zonas = kanbanTablero.querySelectorAll(".kanban-columna");

    const columnas = ["pendiente", "curso", "hecho"];
    let tarjetas = JSON.parse(localStorage.getItem("kanban-app")) || [
        { id: 1, texto: "Diseñar la portada", columna: "hecho" },
        { id: 2, texto: "Conectar la API del clima", columna: "curso" },
        { id: 3, texto: "Escribir los textos", columna: "pendiente" },
        { id: 4, texto: "Publicar el proyecto", columna: "pendiente" }
    ];

    function guardar() {
        localStorage.setItem("kanban-app", JSON.stringify(tarjetas));
    }

    function crearTarjeta(tarjeta) {
        const elemento = document.createElement("li");
        elemento.className = "kanban-tarjeta";
        elemento.draggable = true;
        elemento.dataset.id = tarjeta.id;
        elemento.innerHTML = `
            <span class="kanban-texto"></span>
            <div class="kanban-acciones">
                <button type="button" class="kanban-izquierda" aria-label="Mover a la columna anterior">←</button>
                <button type="button" class="kanban-borrar" aria-label="Borrar tarjeta">✕</button>
                <button type="button" class="kanban-derecha" aria-label="Mover a la columna siguiente">→</button>
            </div>
        `;
        elemento.querySelector(".kanban-texto").textContent = tarjeta.texto;
        elemento.querySelector(".kanban-izquierda").disabled = tarjeta.columna === columnas[0];
        elemento.querySelector(".kanban-derecha").disabled = tarjeta.columna === columnas[columnas.length - 1];
        return elemento;
    }

    function pintar() {
        for (const zona of zonas) {
            const propias = tarjetas.filter((tarjeta) => tarjeta.columna === zona.dataset.columna);
            const lista = zona.querySelector(".kanban-lista");
            lista.innerHTML = "";
            for (const tarjeta of propias) {
                lista.append(crearTarjeta(tarjeta));
            }
            zona.querySelector(".kanban-contador").textContent = propias.length;
        }
    }

    function moverA(id, columna) {
        const tarjeta = tarjetas.find((t) => t.id === id);
        if (tarjeta && columnas.includes(columna)) {
            tarjeta.columna = columna;
            guardar();
            pintar();
        }
    }

    kanbanTablero.addEventListener("click", (evento) => {
        const boton = evento.target.closest("button");
        if (!boton) {
            return;
        }
        const id = Number(boton.closest(".kanban-tarjeta").dataset.id);
        const tarjeta = tarjetas.find((t) => t.id === id);
        const posicion = columnas.indexOf(tarjeta.columna);
        if (boton.classList.contains("kanban-borrar")) {
            tarjetas = tarjetas.filter((t) => t.id !== id);
            guardar();
            pintar();
        } else if (boton.classList.contains("kanban-izquierda")) {
            moverA(id, columnas[posicion - 1]);
        } else {
            moverA(id, columnas[posicion + 1]);
        }
    });

    kanbanTablero.addEventListener("dragstart", (evento) => {
        const tarjeta = evento.target.closest(".kanban-tarjeta");
        evento.dataTransfer.setData("text/plain", tarjeta.dataset.id);
        tarjeta.classList.add("arrastrando");
    });

    kanbanTablero.addEventListener("dragend", (evento) => {
        evento.target.classList.remove("arrastrando");
    });

    for (const zona of zonas) {
        zona.addEventListener("dragover", (evento) => {
            evento.preventDefault();
            zona.classList.add("encima");
        });
        zona.addEventListener("dragleave", (evento) => {
            if (!zona.contains(evento.relatedTarget)) {
                zona.classList.remove("encima");
            }
        });
        zona.addEventListener("drop", (evento) => {
            evento.preventDefault();
            zona.classList.remove("encima");
            moverA(Number(evento.dataTransfer.getData("text/plain")), zona.dataset.columna);
        });
    }

    kanbanForm.addEventListener("submit", (evento) => {
        evento.preventDefault();
        tarjetas.push({ id: Date.now(), texto: kanbanTexto.value.trim(), columna: "pendiente" });
        guardar();
        kanbanForm.reset();
        pintar();
    });

    pintar();
}
