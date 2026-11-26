ejecutar("ej-buscar", () => {
    const titulo = document.getElementById("catalogo-titulo");
    console.log(titulo.textContent);

    const primera = document.querySelector(".item-oferta");
    console.log("Primera:", primera.textContent);

    const destacada = document.querySelector(".item-oferta.destacado");
    console.log("Destacada:", destacada.textContent);

    const todas = document.querySelectorAll("#catalogo .item-oferta");
    console.log("Cantidad:", todas.length);

    todas.forEach((item, indice) => {
        console.log(`${indice + 1}. ${item.textContent}`);
    });

    const agotado = document.querySelector(".agotado");
    console.log("¿Hay agotados?", agotado);
});

{
    const foto = document.querySelector("#ficha-foto");
    const nombre = document.querySelector("#ficha-nombre");
    const precio = document.querySelector("#ficha-precio");
    const boton = document.querySelector("#ficha-cambiar");

    boton.addEventListener("click", () => {
        nombre.textContent = "Termo Nubo · Bosque";
        precio.textContent = "$ 27.50";
        foto.src = "https://picsum.photos/id/10/320/220";
        foto.alt = "Termo Nubo edición Bosque";
        boton.textContent = "Edición Bosque elegida";
        boton.disabled = true;
    });
}

{
    const comentario = `Gran producto <strong style="color: crimson">¡HACKEADO!</strong>`;

    document.querySelector("#comentario-seguro").textContent = comentario;
    document.querySelector("#comentario-peligroso").innerHTML = comentario;

    document.querySelector("#precio-oferta").innerHTML = "<s>$ 25.00</s> <strong>$ 19.90</strong>";
}

{
    const insignias = document.querySelectorAll(".insignia");

    insignias.forEach((insignia) => {
        const cantidad = Number(insignia.textContent);

        if (cantidad === 0) {
            insignia.classList.add("agotado");
            insignia.textContent = "Agotado";
        } else if (cantidad <= 3) {
            insignia.classList.add("pocas");
            insignia.textContent = `¡Últimas ${cantidad}!`;
        } else {
            insignia.classList.add("disponible");
            insignia.textContent = `${cantidad} disponibles`;
        }

        if (insignia.classList.contains("agotado")) {
            insignia.parentElement.classList.add("sin-stock");
        }
    });
}

{
    const app = document.querySelector("#app-notas");
    const botonTema = document.querySelector("#boton-tema");

    botonTema.addEventListener("click", () => {
        app.classList.toggle("oscuro");

        if (app.classList.contains("oscuro")) {
            botonTema.textContent = "☀️ Modo claro";
        } else {
            botonTema.textContent = "🌙 Modo oscuro";
        }
    });
}

{
    const relleno = document.querySelector("#barra-relleno");
    const texto = document.querySelector("#progreso-texto");
    const botonCompletar = document.querySelector("#completar-leccion");
    const total = 10;
    let completadas = 3;

    const actualizar = () => {
        const porcentaje = (completadas / total) * 100;
        relleno.style.width = `${porcentaje}%`;
        texto.textContent = `${completadas} de ${total} lecciones (${porcentaje}%)`;
        relleno.classList.toggle("completo", completadas === total);
        botonCompletar.disabled = completadas === total;
    };

    actualizar();

    botonCompletar.addEventListener("click", () => {
        completadas++;
        actualizar();
    });
}

{
    const campoClave = document.querySelector("#clave");
    const verClave = document.querySelector("#ver-clave");
    const tipoActual = document.querySelector("#tipo-actual");

    verClave.addEventListener("click", () => {
        const visible = campoClave.getAttribute("type") === "text";

        if (visible) {
            campoClave.setAttribute("type", "password");
            verClave.setAttribute("aria-pressed", "false");
            verClave.textContent = "Mostrar";
        } else {
            campoClave.setAttribute("type", "text");
            verClave.setAttribute("aria-pressed", "true");
            verClave.textContent = "Ocultar";
        }

        tipoActual.textContent = campoClave.getAttribute("type");
    });
}

{
    const listaNotis = document.querySelector("#lista-notis");
    const burbuja = document.querySelector("#burbuja-notis");
    const botonNueva = document.querySelector("#nueva-noti");
    const mensajes = [
        "Marta comentó tu foto",
        "Tu pedido #4821 salió a reparto",
        "Nuevo inicio de sesión desde Lima",
        "Bruno te envió una solicitud",
        "Quedan 2 días de tu prueba gratis",
    ];
    let cantidad = 0;

    botonNueva.addEventListener("click", () => {
        const item = document.createElement("li");
        item.textContent = mensajes[cantidad % mensajes.length];
        listaNotis.prepend(item);

        cantidad++;
        burbuja.textContent = cantidad > 9 ? "9+" : cantidad;
        burbuja.classList.add("activa");
    });
}

{
    const productos = [
        { nombre: "Taza Nubo", precio: 18, foto: 30, nuevo: false },
        { nombre: "Té Andino", precio: 12.5, foto: 225, nuevo: true },
        { nombre: "Café Altura", precio: 24, foto: 431, nuevo: false },
        { nombre: "Cafetera Gota", precio: 59.9, foto: 1060, nuevo: true },
    ];
    const grilla = document.querySelector("#grilla-productos");

    productos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";

        const imagen = document.createElement("img");
        imagen.src = `https://picsum.photos/id/${producto.foto}/240/160`;
        imagen.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.className = "precio";
        precio.textContent = `$ ${producto.precio.toFixed(2)}`;

        tarjeta.append(imagen, titulo, precio);

        if (producto.nuevo) {
            const etiqueta = document.createElement("span");
            etiqueta.className = "etiqueta-nuevo";
            etiqueta.textContent = "Nuevo";
            tarjeta.prepend(etiqueta);
        }

        grilla.append(tarjeta);
    });
}

{
    const fotos = [
        { id: 1015, titulo: "Río entre montañas", autor: "Ana Ríos" },
        { id: 1016, titulo: "Cañón al atardecer", autor: "Bruno Sol" },
        { id: 1018, titulo: "Valle verde", autor: "Carla Núñez" },
        { id: 1039, titulo: "Cascada escondida", autor: "Diego Mar" },
    ];
    const grande = document.querySelector("#galeria-grande");
    const pie = document.querySelector("#galeria-pie");
    const miniaturas = document.querySelector("#miniaturas");

    fotos.forEach((foto) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "miniatura";
        boton.dataset.foto = foto.id;
        boton.dataset.autor = foto.autor;

        const imagen = document.createElement("img");
        imagen.src = `https://picsum.photos/id/${foto.id}/120/80`;
        imagen.alt = foto.titulo;

        boton.append(imagen);
        miniaturas.append(boton);

        boton.addEventListener("click", () => {
            grande.src = `https://picsum.photos/id/${boton.dataset.foto}/480/300`;
            grande.alt = imagen.alt;
            pie.textContent = `${imagen.alt} · Foto de ${boton.dataset.autor}`;

            document.querySelectorAll(".miniatura").forEach((otra) => {
                otra.classList.remove("activa");
            });
            boton.classList.add("activa");
        });
    });

    miniaturas.firstElementChild.classList.add("activa");
}

{
    const estudiantes = [
        { nombre: "Lucía Paredes", parcial: 16, final: 18 },
        { nombre: "Mateo Quispe", parcial: 9, final: 11 },
        { nombre: "Sofía Linares", parcial: 14, final: 12 },
        { nombre: "Tomás Vera", parcial: 8, final: 9 },
        { nombre: "Valeria Soto", parcial: 19, final: 20 },
    ];

    const promedios = estudiantes.map((estudiante) => (estudiante.parcial + estudiante.final) / 2);

    const filas = estudiantes.map((estudiante, indice) => {
        const promedio = promedios[indice];
        const estado = promedio >= 11 ? "aprobado" : "desaprobado";

        return `
            <tr class="${estado}">
                <td>${estudiante.nombre}</td>
                <td>${estudiante.parcial}</td>
                <td>${estudiante.final}</td>
                <td>${promedio.toFixed(1)}</td>
                <td>${estado}</td>
            </tr>
        `;
    });

    document.querySelector("#cuerpo-notas").innerHTML = filas.join("");

    const suma = promedios.reduce((total, promedio) => total + promedio, 0);
    document.querySelector("#promedio-curso").textContent = (suma / promedios.length).toFixed(1);
}

{
    const contactos = [
        { nombre: "Rosa Delgado", correo: "rosa@correo.test", color: "#8b5cf6" },
        { nombre: "Andrés Molina", correo: "andres@correo.test", color: "#f97316" },
        { nombre: "Carla Núñez", correo: "carla@correo.test", color: "#0ea5e9" },
        { nombre: "Bruno Sol", correo: "bruno@correo.test", color: "#22c55e" },
    ];
    const listaContactos = document.querySelector("#lista-contactos");

    contactos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    contactos.forEach((contacto) => {
        const iniciales = contacto.nombre
            .split(" ")
            .map((parte) => parte[0])
            .join("")
            .toUpperCase();

        const item = document.createElement("li");

        const avatar = document.createElement("span");
        avatar.className = "avatar";
        avatar.textContent = iniciales;
        avatar.style.backgroundColor = contacto.color;

        const nombre = document.createElement("strong");
        nombre.textContent = contacto.nombre;

        const correo = document.createElement("small");
        correo.textContent = contacto.correo;

        const datos = document.createElement("div");
        datos.append(nombre, correo);

        item.append(avatar, datos);
        listaContactos.append(item);
    });

    document.querySelector("#total-contactos").textContent = `${contactos.length} contactos`;
}

{
    const secciones = [
        { texto: "Inicio", url: "#inicio" },
        { texto: "Tienda", url: "#tienda" },
        { texto: "Ofertas", url: "#ofertas", nuevo: true },
        { texto: "Blog", url: "#blog" },
        { texto: "Contacto", url: "#contacto" },
    ];
    const paginaActual = "#tienda";
    const menu = document.querySelector("#menu-principal");

    secciones.forEach((seccion) => {
        const enlace = document.createElement("a");
        enlace.href = seccion.url;
        enlace.textContent = seccion.texto;

        if (seccion.url === paginaActual) {
            enlace.setAttribute("aria-current", "page");
        }

        if (seccion.nuevo) {
            enlace.classList.add("con-novedad");
        }

        const item = document.createElement("li");
        item.append(enlace);
        menu.append(item);
    });
}

{
    const campoBusqueda = document.querySelector("#buscar-faq");
    const botonBuscar = document.querySelector("#boton-buscar-faq");
    const preguntas = document.querySelectorAll(".faq li");
    const resumen = document.querySelector("#faq-resumen");

    const resaltar = () => {
        const termino = campoBusqueda.value.trim().toLowerCase();
        let coincidencias = 0;

        preguntas.forEach((pregunta) => {
            const coincide = termino !== "" && pregunta.textContent.toLowerCase().includes(termino);
            pregunta.classList.toggle("resaltado", coincide);

            if (coincide) {
                coincidencias++;
            }
        });

        resumen.textContent = `${coincidencias} resultado(s) para "${termino}"`;
    };

    resaltar();
    botonBuscar.addEventListener("click", resaltar);
}

{
    const listaArchivos = document.querySelector("#lista-archivos");
    const estadoArchivos = document.querySelector("#estado-archivos");

    const contar = () => {
        estadoArchivos.textContent = `${listaArchivos.children.length} archivo(s) en la lista`;
    };

    contar();

    document.querySelector("#quitar-errores").addEventListener("click", () => {
        document.querySelectorAll(".archivo.error").forEach((archivo) => {
            archivo.remove();
        });
        contar();
    });

    document.querySelector("#quitar-primero").addEventListener("click", () => {
        const primero = listaArchivos.firstElementChild;

        if (primero) {
            primero.remove();
        }
        contar();
    });

    document.querySelector("#vaciar-archivos").addEventListener("click", () => {
        listaArchivos.replaceChildren();
        contar();
    });
}

{
    const resenas = [
        { autor: "Paula G.", estrellas: 5, texto: "Llegó en dos días y la calidad es excelente." },
        { autor: "Iván R.", estrellas: 3, texto: "Buen producto, pero la caja vino golpeada." },
        { autor: "Rocío M.", estrellas: 4, texto: "Cumple lo que promete. Lo volvería a comprar." },
    ];
    const plantilla = document.querySelector("#plantilla-resena");
    const contenedorResenas = document.querySelector("#lista-resenas");

    resenas.forEach((resena) => {
        const copia = plantilla.content.cloneNode(true);

        copia.querySelector(".resena-autor").textContent = resena.autor;
        copia.querySelector(".resena-estrellas").textContent = "★".repeat(resena.estrellas) + "☆".repeat(5 - resena.estrellas);
        copia.querySelector(".resena-texto").textContent = resena.texto;

        contenedorResenas.append(copia);
    });
}

ejecutar("ej-recorrer", () => {
    const cantidad = document.querySelector(".cantidad-item");
    console.log("Empiezo en:", cantidad.tagName, cantidad.textContent);

    const item = cantidad.parentElement;
    console.log("Su padre es un", item.tagName);

    const lista = item.parentElement;
    console.log("La lista tiene", lista.children.length, "productos");

    for (const hijo of lista.children) {
        console.log(" -", hijo.querySelector(".nombre-item").textContent);
    }

    console.log("Último:", lista.lastElementChild.textContent);
    console.log("Hermano siguiente:", item.nextElementSibling.textContent);

    const pedido = cantidad.closest(".pedido");
    console.log("Número de pedido:", pedido.dataset.numero);
    console.log("¿Está dentro de un .carrito?", cantidad.closest(".carrito"));
});

{
    const ruta = "/tienda/hogar/cocina/sartenes-antiadherentes";
    const partes = ruta.split("/").filter((parte) => parte !== "");
    const migas = document.querySelector("#migas");
    let acumulado = "";

    document.querySelector("#ruta-actual").textContent = ruta;

    partes.forEach((parte, indice) => {
        acumulado += `/${parte}`;
        const texto = parte.replaceAll("-", " ");
        const nombre = texto[0].toUpperCase() + texto.slice(1);
        const item = document.createElement("li");

        if (indice === partes.length - 1) {
            const actual = document.createElement("span");
            actual.textContent = nombre;
            actual.setAttribute("aria-current", "page");
            item.append(actual);
        } else {
            const enlace = document.createElement("a");
            enlace.href = acumulado;
            enlace.textContent = nombre;
            item.append(enlace);
        }

        migas.append(item);
    });
}
