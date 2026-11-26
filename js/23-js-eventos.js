{
    const botonMenu = document.querySelector("#boton-menu");
    const menuSitio = document.querySelector("#menu-sitio");

    botonMenu.addEventListener("click", () => {
        const abierto = menuSitio.classList.toggle("abierto");
        botonMenu.classList.toggle("activo", abierto);
        botonMenu.setAttribute("aria-expanded", abierto);
    });
}

{
    const valor = document.querySelector("#contador-valor");
    const totalEntradas = document.querySelector("#contador-total");
    const botonRestar = document.querySelector("#restar");
    const botonSumar = document.querySelector("#sumar");
    const botonReiniciar = document.querySelector("#reiniciar");
    const precio = 45;
    const maximo = 6;
    let cantidad = 0;

    const pintar = () => {
        valor.textContent = cantidad;
        totalEntradas.textContent = `Total: $ ${cantidad * precio}`;
        botonRestar.disabled = cantidad === 0;
        botonSumar.disabled = cantidad === maximo;
    };

    botonSumar.addEventListener("click", () => {
        cantidad++;
        pintar();
    });

    botonRestar.addEventListener("click", () => {
        cantidad--;
        pintar();
    });

    botonReiniciar.addEventListener("click", () => {
        cantidad = 0;
        pintar();
    });

    pintar();
}

{
    const tarjeta = document.querySelector("#tarjeta-clic");
    const favorito = document.querySelector("#favorito-tarjeta");
    const enlaceFicha = document.querySelector("#enlace-ficha");
    const registro = document.querySelector("#registro-evento");

    tarjeta.addEventListener("click", (evento) => {
        registro.textContent = `Abriendo el producto · target: ${evento.target.tagName} · currentTarget: ${evento.currentTarget.tagName}`;
    });

    favorito.addEventListener("click", (evento) => {
        evento.stopPropagation();
        favorito.classList.toggle("marcado");
        registro.textContent = "Favorito cambiado. stopPropagation() evitó que la tarjeta se abriera.";
    });

    enlaceFicha.addEventListener("click", (evento) => {
        evento.preventDefault();
        registro.textContent = "preventDefault() canceló la navegación del enlace.";
    });
}

{
    const botonLike = document.querySelector("#boton-like");
    const likes = document.querySelector("#likes");
    const fotoPost = document.querySelector("#post-foto");
    const corazonGrande = document.querySelector("#corazon-grande");
    let cantidadLikes = 128;
    let meGusta = false;

    const cambiarLike = (nuevoValor) => {
        meGusta = nuevoValor;
        cantidadLikes += meGusta ? 1 : -1;
        botonLike.textContent = meGusta ? "♥" : "♡";
        botonLike.classList.toggle("activo", meGusta);
        botonLike.setAttribute("aria-pressed", meGusta);
        likes.textContent = `${cantidadLikes} me gusta`;
    };

    botonLike.addEventListener("click", () => {
        cambiarLike(!meGusta);
    });

    fotoPost.addEventListener("dblclick", () => {
        if (!meGusta) {
            cambiarLike(true);
        }
        corazonGrande.classList.add("animar");
    });

    corazonGrande.addEventListener("animationend", () => {
        corazonGrande.classList.remove("animar");
    });
}

{
    const textoPost = document.querySelector("#texto-post");
    const contadorCaracteres = document.querySelector("#contador-caracteres");
    const vistaPrevia = document.querySelector("#vista-previa");
    const visibilidad = document.querySelector("#visibilidad");
    const avisoVisibilidad = document.querySelector("#aviso-visibilidad");
    const avisos = {
        publico: "Cualquier persona podrá verlo.",
        amigos: "Solo tus amigos podrán verlo.",
        privado: "Solo tú podrás verlo.",
    };

    textoPost.addEventListener("input", () => {
        const largo = textoPost.value.length;
        contadorCaracteres.textContent = `${largo} / 140`;
        contadorCaracteres.classList.toggle("casi-lleno", largo >= 120);
        vistaPrevia.textContent = textoPost.value || "Tu publicación aparecerá aquí.";
    });

    visibilidad.addEventListener("change", () => {
        avisoVisibilidad.textContent = avisos[visibilidad.value];
    });
}

{
    const buscarCorreo = document.querySelector("#buscar-correo");
    const ultimaTecla = document.querySelector("#ultima-tecla");
    let posicion = 0;

    const seleccionar = (nuevaPosicion) => {
        const correos = document.querySelectorAll(".correo");
        posicion = Math.min(Math.max(nuevaPosicion, 0), correos.length - 1);

        correos.forEach((correo, indice) => {
            correo.classList.toggle("seleccionado", indice === posicion);
        });
    };

    document.addEventListener("keydown", (evento) => {
        if (evento.target.matches("input, textarea, select") || evento.ctrlKey || evento.metaKey) {
            return;
        }

        if (evento.key === "j") {
            seleccionar(posicion + 1);
        } else if (evento.key === "k") {
            seleccionar(posicion - 1);
        } else if (evento.key === "e") {
            const correo = document.querySelectorAll(".correo")[posicion];
            if (correo) {
                correo.remove();
                seleccionar(posicion);
            }
        } else if (evento.key === "/") {
            evento.preventDefault();
            buscarCorreo.focus();
        } else {
            return;
        }

        ultimaTecla.textContent = `Última tecla: ${evento.key}`;
    });
}

{
    const tooltip = document.querySelector("#tooltip");
    const barrasVenta = document.querySelectorAll(".barra-venta");

    barrasVenta.forEach((barra) => {
        barra.addEventListener("mouseenter", () => {
            tooltip.textContent = `${barra.dataset.mes}: $ ${barra.dataset.ventas}`;
            tooltip.hidden = false;
        });

        barra.addEventListener("mousemove", (evento) => {
            tooltip.style.left = `${evento.clientX + 14}px`;
            tooltip.style.top = `${evento.clientY + 14}px`;
        });

        barra.addEventListener("mouseleave", () => {
            tooltip.hidden = true;
        });
    });
}

{
    const pestanas = document.querySelectorAll(".pestana");
    const paneles = document.querySelectorAll(".panel-pestana");

    pestanas.forEach((pestana) => {
        pestana.addEventListener("click", () => {
            pestanas.forEach((otra) => {
                otra.setAttribute("aria-selected", "false");
            });
            paneles.forEach((panel) => {
                panel.hidden = true;
            });

            pestana.setAttribute("aria-selected", "true");
            const panelElegido = document.getElementById(pestana.getAttribute("aria-controls"));
            panelElegido.hidden = false;
        });
    });
}

{
    const botonAbrirModal = document.querySelector("#abrir-modal");
    const botonCerrarModal = document.querySelector("#cerrar-modal");
    const fondoModal = document.querySelector("#modal-fondo");

    const abrirModal = () => {
        fondoModal.hidden = false;
        botonCerrarModal.focus();
    };

    const cerrarModal = () => {
        fondoModal.hidden = true;
        botonAbrirModal.focus();
    };

    botonAbrirModal.addEventListener("click", abrirModal);
    botonCerrarModal.addEventListener("click", cerrarModal);

    fondoModal.addEventListener("click", (evento) => {
        if (evento.target === fondoModal) {
            cerrarModal();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && !fondoModal.hidden) {
            cerrarModal();
        }
    });
}

{
    const preguntasAcordeon = document.querySelectorAll(".acordeon-pregunta");

    preguntasAcordeon.forEach((pregunta) => {
        pregunta.addEventListener("click", () => {
            const estabaAbierta = pregunta.getAttribute("aria-expanded") === "true";

            preguntasAcordeon.forEach((otra) => {
                otra.setAttribute("aria-expanded", "false");
                otra.parentElement.nextElementSibling.hidden = true;
            });

            if (!estabaAbierta) {
                pregunta.setAttribute("aria-expanded", "true");
                pregunta.parentElement.nextElementSibling.hidden = false;
            }
        });
    });
}

{
    const desplegable = document.querySelector("#desplegable-cuenta");
    const botonCuenta = document.querySelector("#boton-cuenta");
    const menuCuenta = document.querySelector("#menu-cuenta");

    botonCuenta.addEventListener("click", () => {
        const abrir = menuCuenta.hidden;
        menuCuenta.hidden = !abrir;
        botonCuenta.setAttribute("aria-expanded", abrir);
    });

    document.addEventListener("click", (evento) => {
        if (!desplegable.contains(evento.target)) {
            menuCuenta.hidden = true;
            botonCuenta.setAttribute("aria-expanded", "false");
        }
    });
}

{
    const productos = [
        { id: "p1", nombre: "Taza Nubo", precio: 18 },
        { id: "p2", nombre: "Té Andino", precio: 12.5 },
        { id: "p3", nombre: "Café Altura", precio: 24 },
        { id: "p4", nombre: "Cafetera Gota", precio: 59.9 },
    ];
    const carrito = [];
    const catalogo = document.querySelector("#catalogo-carrito");
    const carritoItems = document.querySelector("#carrito-items");
    const carritoCantidad = document.querySelector("#carrito-cantidad");
    const carritoTotal = document.querySelector("#carrito-total");

    catalogo.innerHTML = productos.map((producto) => `
        <li>
            <span>${producto.nombre} · $ ${producto.precio.toFixed(2)}</span>
            <button type="button" class="agregar" data-id="${producto.id}">Agregar</button>
        </li>
    `).join("");

    const pintarCarrito = () => {
        carritoItems.innerHTML = carrito.map((item, indice) => `
            <li>
                ${item.nombre}
                <button type="button" class="quitar" data-indice="${indice}" aria-label="Quitar ${item.nombre}">×</button>
            </li>
        `).join("");

        const total = carrito.reduce((suma, item) => suma + item.precio, 0);
        carritoCantidad.textContent = carrito.length;
        carritoTotal.textContent = `$ ${total.toFixed(2)}`;
    };

    catalogo.addEventListener("click", (evento) => {
        const boton = evento.target.closest(".agregar");

        if (!boton) {
            return;
        }

        const producto = productos.find((p) => p.id === boton.dataset.id);
        carrito.push(producto);
        pintarCarrito();
    });

    carritoItems.addEventListener("click", (evento) => {
        const boton = evento.target.closest(".quitar");

        if (!boton) {
            return;
        }

        carrito.splice(Number(boton.dataset.indice), 1);
        pintarCarrito();
    });
}

{
    const formTarea = document.querySelector("#form-tarea");
    const campoTarea = document.querySelector("#nueva-tarea");
    const listaTareas = document.querySelector("#lista-tareas");
    const tareasPendientes = document.querySelector("#tareas-pendientes");

    const contarPendientes = () => {
        const pendientes = listaTareas.querySelectorAll(".tarea:not(.hecha)").length;
        tareasPendientes.textContent = `${pendientes} pendiente(s)`;
    };

    const agregarTarea = (texto) => {
        const casilla = document.createElement("input");
        casilla.type = "checkbox";

        const etiqueta = document.createElement("label");
        etiqueta.append(casilla, ` ${texto}`);

        const borrar = document.createElement("button");
        borrar.type = "button";
        borrar.className = "tarea-borrar";
        borrar.textContent = "Eliminar";

        const item = document.createElement("li");
        item.className = "tarea";
        item.append(etiqueta, borrar);
        listaTareas.append(item);
        contarPendientes();
    };

    formTarea.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const texto = campoTarea.value.trim();

        if (texto === "") {
            return;
        }

        agregarTarea(texto);
        campoTarea.value = "";
        campoTarea.focus();
    });

    listaTareas.addEventListener("change", (evento) => {
        const tarea = evento.target.closest(".tarea");
        tarea.classList.toggle("hecha", evento.target.checked);
        contarPendientes();
    });

    listaTareas.addEventListener("click", (evento) => {
        if (evento.target.matches(".tarea-borrar")) {
            evento.target.closest(".tarea").remove();
            contarPendientes();
        }
    });

    agregarTarea("Repasar la lección del DOM");
    agregarTarea("Practicar eventos");
}

{
    const codigoCupon = document.querySelector("#codigo-cupon");
    const botonCupon = document.querySelector("#copiar-cupon");
    const enlaceReferido = document.querySelector("#enlace-referido");

    botonCupon.addEventListener("click", () => {
        navigator.clipboard.writeText(codigoCupon.textContent);
        botonCupon.textContent = "¡Copiado!";
        botonCupon.classList.add("copiado");

        setTimeout(() => {
            botonCupon.textContent = "Copiar";
            botonCupon.classList.remove("copiado");
        }, 2000);
    });

    enlaceReferido.addEventListener("focus", () => {
        enlaceReferido.select();
    });
}

{
    const destinos = [
        { foto: 1043, nombre: "Lago Turquesa" },
        { foto: 1044, nombre: "Costa Brava Sur" },
        { foto: 1047, nombre: "Ciudad Vieja" },
        { foto: 1050, nombre: "Playa Larga" },
    ];
    const slider = document.querySelector("#slider");
    const sliderImagen = document.querySelector("#slider-imagen");
    const sliderTexto = document.querySelector("#slider-texto");
    const sliderPuntos = document.querySelector("#slider-puntos");
    let actual = 0;

    const mostrar = (indice) => {
        actual = (indice + destinos.length) % destinos.length;
        const destino = destinos[actual];

        sliderImagen.src = `https://picsum.photos/id/${destino.foto}/480/260`;
        sliderImagen.alt = destino.nombre;
        sliderTexto.textContent = `${actual + 1} / ${destinos.length} · ${destino.nombre}`;

        sliderPuntos.querySelectorAll("button").forEach((punto, i) => {
            punto.classList.toggle("activo", i === actual);
        });
    };

    destinos.forEach((destino, indice) => {
        const punto = document.createElement("button");
        punto.type = "button";
        punto.setAttribute("aria-label", `Ir a ${destino.nombre}`);
        punto.addEventListener("click", () => mostrar(indice));
        sliderPuntos.append(punto);
    });

    document.querySelector("#slider-anterior").addEventListener("click", () => mostrar(actual - 1));
    document.querySelector("#slider-siguiente").addEventListener("click", () => mostrar(actual + 1));

    slider.addEventListener("keydown", (evento) => {
        if (evento.key === "ArrowLeft") {
            mostrar(actual - 1);
        } else if (evento.key === "ArrowRight") {
            mostrar(actual + 1);
        }
    });

    mostrar(0);
}

{
    const articulo = document.querySelector("#articulo-scroll");
    const lecturaRelleno = document.querySelector("#lectura-relleno");
    const volverArriba = document.querySelector("#volver-arriba");

    articulo.addEventListener("scroll", () => {
        const recorrido = articulo.scrollTop;
        const maximo = articulo.scrollHeight - articulo.clientHeight;
        lecturaRelleno.style.width = `${(recorrido / maximo) * 100}%`;
    });

    window.addEventListener("scroll", () => {
        volverArriba.hidden = window.scrollY < 600;
    });

    volverArriba.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

{
    const anchoVentana = document.querySelector("#ancho-ventana");
    const altoVentana = document.querySelector("#alto-ventana");
    const tipoPantalla = document.querySelector("#tipo-pantalla");

    const medir = () => {
        const ancho = window.innerWidth;
        anchoVentana.textContent = ancho;
        altoVentana.textContent = window.innerHeight;

        if (ancho < 600) {
            tipoPantalla.textContent = "📱 móvil";
        } else if (ancho < 1024) {
            tipoPantalla.textContent = "📟 tablet";
        } else {
            tipoPantalla.textContent = "🖥️ escritorio";
        }
    };

    medir();
    window.addEventListener("resize", medir);
}

{
    const botonRegalo = document.querySelector("#reclamar-regalo");
    const mensajeRegalo = document.querySelector("#mensaje-regalo");
    const botonRaspar = document.querySelector("#raspar");
    const mensajeRaspar = document.querySelector("#mensaje-raspar");
    const resultados = ["Sigue intentando", "Envío gratis", "Sigue intentando"];
    let puntos = 0;
    let intentos = 0;

    botonRegalo.addEventListener("click", () => {
        puntos += 50;
        mensajeRegalo.textContent = `Tienes ${puntos} puntos.`;
    }, { once: true });

    const raspar = () => {
        mensajeRaspar.textContent = `Intento ${intentos + 1}: ${resultados[intentos]}`;
        intentos++;

        if (intentos === resultados.length) {
            botonRaspar.removeEventListener("click", raspar);
            botonRaspar.textContent = "Sin intentos";
            botonRaspar.classList.add("agotado");
        }
    };

    botonRaspar.addEventListener("click", raspar);
}
