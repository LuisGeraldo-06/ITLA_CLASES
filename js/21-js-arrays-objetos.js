ejecutar("ej-crear", () => {
    const compras = ["leche", "pan", "huevos", "café"];

    console.log("Lista:", compras);
    console.log("Cantidad:", compras.length);
    console.log("Primero:", compras[0]);
    console.log("Último:", compras[compras.length - 1]);
    console.log("Último con at(-1):", compras.at(-1));
    console.log("Posición 10:", compras[10]);

    compras[1] = "pan integral";
    console.log("Después de cambiar el índice 1:", compras);

    const mezcla = ["Ana", 25, true, null];
    console.log(mezcla, "| typeof:", typeof mezcla, "| ¿Es array?", Array.isArray(mezcla));
});

ejecutar("ej-fila", () => {
    const fila = ["Turno 1", "Turno 2"];

    fila.push("Turno 3");
    console.log("Llega alguien al final:", fila);

    fila.unshift("Turno P");
    console.log("Preferencial al inicio:", fila);

    const atendido = fila.shift();
    console.log("Atendiendo a:", atendido, "| Quedan:", fila);

    const seRetira = fila.pop();
    console.log("Se fue el último:", seRetira, "| Quedan:", fila);

    console.log(`Personas esperando: ${fila.length}`);
});

ejecutar("ej-playlist", () => {
    const playlist = ["Intro", "Luna llena", "Ruta 9", "Café de noche", "Olas", "Final feliz"];

    const proximas = playlist.slice(1, 4);
    console.log("Próximas 3:", proximas);
    console.log("La playlist sigue con", playlist.length, "canciones");

    const quitadas = playlist.splice(2, 1);
    console.log("Quitada:", quitadas, "→", playlist);

    playlist.splice(1, 0, "Nueva canción");
    console.log("Insertada en la posición 1:", playlist);

    console.log("Como texto:", playlist.join(" · "));

    const favoritas = ["Faro", "Olas"];
    const todas = [...playlist, ...favoritas];
    console.log("Unidas con spread:", todas);

    const copia = [...playlist];
    copia.pop();
    console.log("Copia:", copia.length, "| Original:", playlist.length);
});

ejecutar("ej-buscar", () => {
    const invitados = ["Lucía", "Mateo", "Sofía", "Mateo", "Camila", "Lucía"];

    console.log("¿Viene Sofía?", invitados.includes("Sofía"));
    console.log("¿Viene Bruno?", invitados.includes("Bruno"));
    console.log("Primera vez de Mateo:", invitados.indexOf("Mateo"));
    console.log("Última vez de Mateo:", invitados.lastIndexOf("Mateo"));
    console.log("Posición de Bruno:", invitados.indexOf("Bruno"));

    const sinRepetir = [...new Set(invitados)];
    console.log("Sin duplicados:", sinRepetir);
    console.log(`${invitados.length} inscripciones, ${sinRepetir.length} personas`);

    const carrito = new Set();
    carrito.add("SKU-101");
    carrito.add("SKU-205");
    carrito.add("SKU-101");
    console.log("Carrito:", carrito, "| Productos distintos:", carrito.size);
    console.log("¿Tiene SKU-205?", carrito.has("SKU-205"));
});

ejecutar("ej-recorrer", () => {
    const pendientes = ["Pagar la luz", "Comprar regalo", "Llamar al dentista"];

    for (const tarea of pendientes) {
        console.log("☐", tarea);
    }

    pendientes.forEach((tarea, indice) => {
        console.log(`${indice + 1}. ${tarea}`);
    });

    const duraciones = [215, 187, 242, 199, 260];
    let segundos = 0;
    for (const duracion of duraciones) {
        segundos += duracion;
    }
    const minutos = Math.floor(segundos / 60);
    const resto = String(segundos % 60).padStart(2, "0");
    console.log(`Playlist: ${duraciones.length} canciones, ${minutos}:${resto} min`);
});

ejecutar("ej-objeto", () => {
    const producto = {
        nombre: "Mochila Andes 30L",
        precio: 189.9,
        stock: 12,
        colores: ["negro", "verde"],
        "en oferta": true,
        precioConDescuento(porcentaje) {
            return this.precio - this.precio * porcentaje / 100;
        },
    };

    console.log(producto.nombre);
    console.log(producto["precio"]);
    const campo = "stock";
    console.log(`${campo}:`, producto[campo]);
    console.log("¿En oferta?", producto["en oferta"]);
    console.log("Primer color:", producto.colores[0]);

    producto.stock -= 1;
    producto.marca = "Cumbre";
    delete producto["en oferta"];
    console.log(producto);

    console.log("Con 10% de descuento:", producto.precioConDescuento(10).toFixed(2));
    console.log("¿Garantía?", producto.garantia, "| ¿Tiene marca?", "marca" in producto);
});

ejecutar("ej-desestructurar", () => {
    const usuario = {
        nombre: "Renata Paz",
        correo: "renata@correo.com",
        edad: 29,
        direccion: { ciudad: "Arequipa", pais: "Perú" },
    };

    const { nombre, correo } = usuario;
    console.log(nombre, "-", correo);

    const { edad: edadUsuario, plan = "Gratis" } = usuario;
    console.log("Edad:", edadUsuario, "| Plan:", plan);

    const { direccion: { ciudad } } = usuario;
    console.log("Ciudad:", ciudad);

    function tarjetaPerfil({ nombre, edad, plan = "Gratis" }) {
        return `👤 ${nombre} (${edad}) · Plan ${plan}`;
    }

    console.log(tarjetaPerfil(usuario));
    console.log(tarjetaPerfil({ nombre: "Iván Soto", edad: 41, plan: "Pro" }));

    const [primero, segundo, ...demas] = ["oro", "plata", "bronce", "4.º", "5.º"];
    console.log(primero, segundo, demas);
});

ejecutar("ej-entries", () => {
    const ficha = {
        pantalla: "6.5 pulgadas",
        bateria: "5000 mAh",
        memoria: "128 GB",
        camara: "50 MP",
    };

    console.log("Claves:", Object.keys(ficha));
    console.log("Valores:", Object.values(ficha));
    console.log("Cantidad de datos:", Object.keys(ficha).length);

    console.log("📱 Celular Nova X");
    for (const [clave, valor] of Object.entries(ficha)) {
        console.log(`${clave.padEnd(10, ".")} ${valor}`);
    }

    const stock = { talla_s: 4, talla_m: 0, talla_l: 9 };
    let totalPrendas = 0;
    for (const cantidad of Object.values(stock)) {
        totalPrendas += cantidad;
    }
    console.log("Prendas en tienda:", totalPrendas);
});

ejecutar("ej-spread-objetos", () => {
    const configPorDefecto = {
        tema: "claro",
        idioma: "es",
        notificaciones: true,
        tamanoLetra: 16,
    };

    const preferencias = { tema: "oscuro", tamanoLetra: 18 };

    const config = { ...configPorDefecto, ...preferencias };
    console.log("Configuración final:", config);
    console.log("El objeto por defecto no cambió:", configPorDefecto.tema);

    const nombre = "Iván";
    const puntos = 340;
    const cliente = { nombre, puntos };
    console.log("Shorthand:", cliente);

    const actualizado = { ...cliente, puntos: cliente.puntos + 50 };
    console.log("Copia con un cambio:", actualizado);
    console.log("Original:", cliente);
});

ejecutar("ej-map", () => {
    const productos = [
        { nombre: "Teclado Orbit", precio: 120, categoria: "tecnología" },
        { nombre: "Taza Aurora", precio: 25, categoria: "hogar" },
        { nombre: "Mouse Pulse", precio: 65, categoria: "tecnología" },
        { nombre: "Lámpara Zen", precio: 89, categoria: "hogar" },
    ];

    const nombres = productos.map((producto) => producto.nombre);
    console.log(nombres);

    const etiquetas = productos.map((p) => `${p.nombre} — $${p.precio.toFixed(2)}`);
    etiquetas.forEach((etiqueta) => console.log(etiqueta));

    const conImpuesto = productos.map((p) => ({ ...p, precio: Math.round(p.precio * 118) / 100 }));
    console.log("Con impuesto:", conImpuesto[0]);
    console.log("Original intacto:", productos[0].precio);

    console.log([1, 2, 3].map((n) => n * 10));
});

ejecutar("ej-filter", () => {
    const catalogo = [
        { nombre: "Teclado Orbit", precio: 120, categoria: "tecnología", stock: 8 },
        { nombre: "Taza Aurora", precio: 25, categoria: "hogar", stock: 2 },
        { nombre: "Mouse Pulse", precio: 65, categoria: "tecnología", stock: 0 },
        { nombre: "Lámpara Zen", precio: 89, categoria: "hogar", stock: 15 },
        { nombre: "Audífonos Nébula", precio: 210, categoria: "tecnología", stock: 3 },
    ];

    const tecnologia = catalogo.filter((p) => p.categoria === "tecnología");
    console.log("Tecnología:", tecnologia.map((p) => p.nombre));

    const hasta90 = catalogo.filter((p) => p.precio <= 90);
    console.log("Hasta $90:", hasta90.map((p) => p.nombre));

    function filtrar(categoria, precioMaximo) {
        return catalogo.filter((p) => p.categoria === categoria && p.precio <= precioMaximo);
    }

    console.log("Tecnología hasta $150:", filtrar("tecnología", 150).map((p) => p.nombre));

    console.log("⚠️ Reponer pronto:");
    catalogo
        .filter((p) => p.stock < 5)
        .forEach((p) => console.log(`  ${p.nombre}: ${p.stock === 0 ? "AGOTADO" : p.stock + " unidades"}`));
});

ejecutar("ej-find", () => {
    const contactos = [
        { id: 1, nombre: "Andrea Ruiz", telefono: "900 111 222" },
        { id: 2, nombre: "Bruno Salas", telefono: "900 333 444" },
        { id: 3, nombre: "Carla Andrade", telefono: "900 555 666" },
        { id: 4, nombre: "Diego Ríos", telefono: "900 777 888" },
    ];

    const contacto = contactos.find((c) => c.id === 3);
    console.log("Contacto 3:", contacto.nombre, contacto.telefono);
    console.log("Contacto 9:", contactos.find((c) => c.id === 9));
    console.log("Posición de Diego:", contactos.findIndex((c) => c.nombre.startsWith("Diego")));

    function buscar(texto) {
        const consulta = texto.toLowerCase();
        return contactos
            .filter((c) => c.nombre.toLowerCase().includes(consulta))
            .map((c) => c.nombre);
    }

    console.log('Buscar "and":', buscar("and"));
    console.log('Buscar "RÍ":', buscar("RÍ"));
    console.log('Buscar "zz":', buscar("zz"));
});

ejecutar("ej-some-every", () => {
    const tareas = [
        { titulo: "Diseñar logo", completada: true, urgente: false },
        { titulo: "Enviar presupuesto", completada: false, urgente: true },
        { titulo: "Revisar correo", completada: true, urgente: false },
        { titulo: "Publicar web", completada: false, urgente: false },
    ];

    const pendientes = tareas.filter((t) => !t.completada);
    const hechas = tareas.filter((t) => t.completada);
    console.log(`Pendientes (${pendientes.length}):`, pendientes.map((t) => t.titulo));
    console.log(`Completadas (${hechas.length}):`, hechas.map((t) => t.titulo));

    console.log("¿Hay alguna urgente pendiente?", tareas.some((t) => t.urgente && !t.completada));
    console.log("¿Todo listo?", tareas.every((t) => t.completada));
    console.log(`Progreso: ${Math.round(hechas.length / tareas.length * 100)}%`);

    const edades = [19, 22, 17, 30];
    console.log("¿Todos mayores de edad?", edades.every((edad) => edad >= 18));
    console.log("¿Algún menor?", edades.some((edad) => edad < 18));
});

ejecutar("ej-reduce", () => {
    const carrito = [
        { producto: "Polo básico", precio: 39.9, cantidad: 2 },
        { producto: "Jean slim", precio: 129, cantidad: 1 },
        { producto: "Medias x3", precio: 19.5, cantidad: 3 },
    ];

    const subtotal = carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
    const unidades = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
    const envio = subtotal >= 200 ? 0 : 12;
    console.log(`${unidades} unidades | Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`Envío: ${envio === 0 ? "gratis" : "$" + envio}`);
    console.log(`Total: $${(subtotal + envio).toFixed(2)}`);

    const ventas = [
        { mes: "enero", monto: 1200 },
        { mes: "febrero", monto: 950 },
        { mes: "enero", monto: 800 },
        { mes: "marzo", monto: 1500 },
        { mes: "febrero", monto: 400 },
    ];

    const porMes = ventas.reduce((resumen, venta) => {
        resumen[venta.mes] = (resumen[venta.mes] || 0) + venta.monto;
        return resumen;
    }, {});
    console.log(porMes);

    for (const [mes, total] of Object.entries(porMes)) {
        console.log(`${mes.padEnd(8)} ${"█".repeat(Math.round(total / 200))} $${total}`);
    }
});

ejecutar("ej-estadisticas", () => {
    const notas = [14, 18, 9, 16, 11, 20, 13];

    const suma = notas.reduce((total, nota) => total + nota, 0);
    const promedio = suma / notas.length;
    const maxima = Math.max(...notas);
    const minima = Math.min(...notas);
    const aprobados = notas.filter((nota) => nota >= 11).length;

    console.log("Notas:", notas.join(", "));
    console.log("Promedio:", promedio.toFixed(2));
    console.log("Máxima:", maxima, "| Mínima:", minima);
    console.log(`Aprobados: ${aprobados} de ${notas.length}`);

    const alumnos = [
        { nombre: "Ale", nota: 17 },
        { nombre: "Bea", nota: 19 },
        { nombre: "Ciro", nota: 12 },
    ];

    const mejor = alumnos.reduce((lider, alumno) => (alumno.nota > lider.nota ? alumno : lider));
    console.log(`Mejor nota: ${mejor.nombre} con ${mejor.nota}`);
});

ejecutar("ej-sort", () => {
    const puntajes = [40, 100, 1, 5, 25];
    console.log("sort() sin comparador:", [...puntajes].sort());
    console.log("De menor a mayor:", [...puntajes].sort((a, b) => a - b));

    const jugadores = [
        { nombre: "Zoe", puntos: 1520 },
        { nombre: "Álvaro", puntos: 1890 },
        { nombre: "Mía", puntos: 1520 },
        { nombre: "Bruno", puntos: 990 },
    ];

    const ranking = jugadores.toSorted((a, b) => b.puntos - a.puntos || a.nombre.localeCompare(b.nombre));
    ranking.forEach((j, i) => console.log(`${i + 1}. ${j.nombre} — ${j.puntos} pts`));

    const alfabetico = jugadores.toSorted((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    console.log("A-Z:", alfabetico.map((j) => j.nombre));
    console.log("Original sin cambios:", jugadores.map((j) => j.nombre));

    const vendidos = [
        { producto: "Café molido", unidades: 340 },
        { producto: "Té verde", unidades: 120 },
        { producto: "Galletas avena", unidades: 410 },
        { producto: "Mermelada", unidades: 95 },
        { producto: "Granola", unidades: 280 },
    ];

    const top3 = vendidos.toSorted((a, b) => b.unidades - a.unidades).slice(0, 3);
    console.log("🏆 Top 3 más vendidos:");
    top3.forEach((v, i) => console.log(`  ${i + 1}. ${v.producto} (${v.unidades})`));
});

ejecutar("ej-liga", () => {
    const equipos = [
        { nombre: "Halcones FC", ganados: 7, empatados: 2, perdidos: 1, golesFavor: 21, golesContra: 9 },
        { nombre: "Deportivo Sol", ganados: 6, empatados: 4, perdidos: 0, golesFavor: 18, golesContra: 7 },
        { nombre: "Atlético Río", ganados: 7, empatados: 1, perdidos: 2, golesFavor: 19, golesContra: 12 },
        { nombre: "Unión Andina", ganados: 3, empatados: 3, perdidos: 4, golesFavor: 12, golesContra: 15 },
        { nombre: "Estrella Norte", ganados: 1, empatados: 2, perdidos: 7, golesFavor: 6, golesContra: 23 },
    ];

    const tabla = equipos
        .map((e) => ({
            ...e,
            jugados: e.ganados + e.empatados + e.perdidos,
            puntos: e.ganados * 3 + e.empatados,
            diferencia: e.golesFavor - e.golesContra,
        }))
        .toSorted((a, b) => b.puntos - a.puntos || b.diferencia - a.diferencia);

    console.log("#  Equipo          PJ  PTS  DIF");
    tabla.forEach((e, i) => {
        const posicion = String(i + 1).padEnd(3);
        const dif = e.diferencia > 0 ? `+${e.diferencia}` : String(e.diferencia);
        console.log(`${posicion}${e.nombre.padEnd(16)}${String(e.jugados).padEnd(4)}${String(e.puntos).padEnd(5)}${dif}`);
    });

    console.log(`Campeón parcial: ${tabla[0].nombre} 🏆`);
});

ejecutar("ej-json", () => {
    const pedido = {
        cliente: "Renata Paz",
        items: [
            { sku: "SKU-101", cantidad: 2 },
            { sku: "SKU-205", cantidad: 1 },
        ],
        pagado: false,
        fecha: "2026-11-19",
    };

    const texto = JSON.stringify(pedido);
    console.log("Para enviar:", texto);
    console.log("Tipo:", typeof texto);

    console.log(JSON.stringify(pedido, null, 2));

    const respuesta = '{"id":58,"estado":"enviado","total":267.3}';
    const datos = JSON.parse(respuesta);
    console.log(`Pedido ${datos.id}: ${datos.estado}, total $${datos.total}`);

    const copia = JSON.parse(JSON.stringify(pedido));
    copia.items[0].cantidad = 5;
    console.log("Original:", pedido.items[0].cantidad, "| Copia:", copia.items[0].cantidad);

    console.log(JSON.stringify({ nombre: "Ana", saludar() { return "hola"; }, apodo: undefined }));
});
