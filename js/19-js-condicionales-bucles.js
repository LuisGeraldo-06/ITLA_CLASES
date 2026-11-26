ejecutar("ej-semaforo", () => {
    const luz = "amarillo";
    const segundosRestantes = 2;

    if (luz === "verde") {
        console.log("🟢 Avanza");
    } else if (luz === "amarillo") {
        console.log("🟡 Precaución: el semáforo va a cambiar");
    } else if (luz === "rojo") {
        console.log("🔴 Detente");
    } else {
        console.log("⚠️ Semáforo averiado: cruza con cuidado");
    }

    if (luz === "amarillo" && segundosRestantes < 3) {
        console.log(`Quedan ${segundosRestantes} s: mejor frena`);
    }
});

ejecutar("ej-calificaciones", () => {
    const estudiante = "Sofía Herrera";
    const puntaje = Math.floor(Math.random() * 101);
    let letra;

    if (puntaje >= 90) {
        letra = "A";
    } else if (puntaje >= 80) {
        letra = "B";
    } else if (puntaje >= 70) {
        letra = "C";
    } else if (puntaje >= 60) {
        letra = "D";
    } else {
        letra = "F";
    }

    console.log(`${estudiante}: ${puntaje} puntos → ${letra}`);

    if (puntaje >= 60) {
        console.log("✅ Aprobado");
    } else {
        console.log(`🚫 Reprobado: le faltaron ${60 - puntaje} puntos`);
    }
});

ejecutar("ej-cine", () => {
    const edad = 67;
    const dia = "miércoles";
    const esEstudiante = false;
    let precio = 8;

    if (edad < 3) {
        precio = 0;
    } else if (edad < 12 || edad >= 65) {
        precio = 5;
    } else if (esEstudiante) {
        precio = 6;
    }

    if (dia === "miércoles" && precio > 0) {
        precio /= 2;
        console.log("🎬 Miércoles de cine: 50% de descuento");
    }

    console.log(`Entrada para ${edad} años el ${dia}: $${precio.toFixed(2)}`);
});

ejecutar("ej-envio", () => {
    const totalCarrito = 42.5;
    const articulos = 3;
    const minimoEnvioGratis = 50;

    const costoEnvio = totalCarrito >= minimoEnvioGratis ? 0 : 4.99;
    const textoEnvio = costoEnvio === 0 ? "GRATIS" : `$${costoEnvio.toFixed(2)}`;

    console.log(`Tienes ${articulos} ${articulos === 1 ? "artículo" : "artículos"} en el carrito`);
    console.log(`Subtotal: $${totalCarrito.toFixed(2)}`);
    console.log(`Envío: ${textoEnvio}`);
    console.log(`Total: $${(totalCarrito + costoEnvio).toFixed(2)}`);

    const falta = minimoEnvioGratis - totalCarrito;
    if (falta > 0) {
        console.log(`🚚 Agrega $${falta.toFixed(2)} más y el envío es gratis`);
    }
});

ejecutar("ej-bisiesto", () => {
    const anio = 2100;
    const divisiblePor4 = anio % 4 === 0;
    const divisiblePor100 = anio % 100 === 0;
    const divisiblePor400 = anio % 400 === 0;

    const esBisiesto = (divisiblePor4 && !divisiblePor100) || divisiblePor400;

    if (esBisiesto) {
        console.log(`${anio} es bisiesto: febrero tiene 29 días`);
    } else {
        console.log(`${anio} no es bisiesto: febrero tiene 28 días`);
    }

    console.log(`${anio} tiene ${esBisiesto ? 366 : 365} días`);
});

ejecutar("ej-por-defecto", () => {
    const nombreIngresado = "";
    console.log(`Hola, ${nombreIngresado || "invitado"}`);

    const propinaElegida = 0;
    console.log("Propina con ||:", propinaElegida || 10);
    console.log("Propina con ??:", propinaElegida ?? 10);

    const telefono = null;
    console.log("Teléfono:", telefono ?? "sin registrar");

    let cupon = null;
    console.log("Cupón:", cupon?.toUpperCase());
    cupon = "verano25";
    console.log("Cupón:", cupon?.toUpperCase());

    const productosEnCarrito = 0;
    if (!productosEnCarrito) {
        console.log("🛒 Tu carrito está vacío");
    }

    console.log("Falsy:", Boolean(""), Boolean(0), Boolean(null), Boolean(undefined), Boolean(NaN));
    console.log("Truthy:", Boolean("0"), Boolean(" "), Boolean(-5), Boolean("false"));
});

ejecutar("ej-dia-semana", () => {
    const numeroDia = new Date().getDay();
    let nombreDia;

    switch (numeroDia) {
        case 0:
            nombreDia = "domingo";
            break;
        case 1:
            nombreDia = "lunes";
            break;
        case 2:
            nombreDia = "martes";
            break;
        case 3:
            nombreDia = "miércoles";
            break;
        case 4:
            nombreDia = "jueves";
            break;
        case 5:
            nombreDia = "viernes";
            break;
        case 6:
            nombreDia = "sábado";
            break;
    }

    console.log(`Hoy es ${nombreDia}`);

    switch (numeroDia) {
        case 0:
        case 6:
            console.log("Fin de semana: abrimos de 10:00 a 14:00");
            break;
        case 5:
            console.log("Viernes: abrimos hasta las 21:00 🎉");
            break;
        default:
            console.log("Horario normal: de 8:00 a 18:00");
    }
});

ejecutar("ej-tabla", () => {
    const numero = 7;
    console.log(`Tabla del ${numero}`);
    for (let i = 1; i <= 10; i++) {
        console.log(`${numero} x ${String(i).padStart(2)} = ${String(numero * i).padStart(2)}`);
    }

    const precioPan = 0.35;
    console.log("");
    console.log("Panes | Precio");
    for (let cantidad = 5; cantidad <= 25; cantidad += 5) {
        console.log(`${String(cantidad).padStart(5)} | $${(cantidad * precioPan).toFixed(2)}`);
    }
});

ejecutar("ej-cuenta-regresiva", () => {
    for (let segundos = 5; segundos > 0; segundos--) {
        console.log(`⏳ La oferta empieza en ${segundos}…`);
    }
    console.log("🔥 ¡Oferta activa! 50% en toda la tienda");

    console.log("");
    for (let bateria = 100; bateria >= 0; bateria -= 25) {
        const aviso = bateria <= 25 ? " ⚠️ conecta el cargador" : "";
        console.log(`🔋 Batería: ${bateria}%${aviso}`);
    }
});

ejecutar("ej-ventas", () => {
    const dias = 7;
    let total = 0;
    let mejorDia = 0;
    let mejorVenta = 0;

    for (let dia = 1; dia <= dias; dia++) {
        const venta = Math.floor(Math.random() * 500) + 100;
        total += venta;
        if (venta > mejorVenta) {
            mejorVenta = venta;
            mejorDia = dia;
        }
        console.log(`Día ${dia}: $${venta}`);
    }

    console.log("-----------------");
    console.log(`Total de la semana: $${total}`);
    console.log(`Promedio diario: $${(total / dias).toFixed(2)}`);
    console.log(`Mejor día: el ${mejorDia}, con $${mejorVenta}`);
});

ejecutar("ej-bip-bop", () => {
    for (let cliente = 1; cliente <= 20; cliente++) {
        if (cliente % 3 === 0 && cliente % 5 === 0) {
            console.log(`Cliente ${cliente}: BipBop ☕ café gratis`);
        } else if (cliente % 3 === 0) {
            console.log(`Cliente ${cliente}: Bip 10% de descuento`);
        } else if (cliente % 5 === 0) {
            console.log(`Cliente ${cliente}: Bop 🍪 galleta de regalo`);
        } else {
            console.log(`Cliente ${cliente}`);
        }
    }
});

ejecutar("ej-ahorro", () => {
    const meta = 1200;
    const aporteMensual = 150;
    const interesMensual = 0.005;
    let ahorro = 0;
    let mes = 0;

    while (ahorro < meta) {
        mes++;
        ahorro += aporteMensual;
        ahorro += ahorro * interesMensual;
        console.log(`Mes ${String(mes).padStart(2)}: $${ahorro.toFixed(2)}`);
    }

    console.log(`🎯 Meta de $${meta} alcanzada en ${mes} meses`);
    console.log(`Pusiste $${aporteMensual * mes} y el banco te dio $${(ahorro - aporteMensual * mes).toFixed(2)} de intereses`);
});

ejecutar("ej-adivina", () => {
    const secreto = Math.floor(Math.random() * 20) + 1;
    let intentos = 0;
    let respuesta;

    do {
        const texto = prompt("Adivina el número del 1 al 20");
        if (texto === null) {
            console.log(`Te rendiste. El número era ${secreto}`);
            break;
        }
        respuesta = Number(texto);
        intentos++;
        if (Number.isNaN(respuesta)) {
            console.log(`"${texto}" no es un número`);
        } else if (respuesta < secreto) {
            console.log(`${respuesta}: más alto ⬆️`);
        } else if (respuesta > secreto) {
            console.log(`${respuesta}: más bajo ⬇️`);
        } else {
            console.log(`🎉 ¡Correcto! Era ${secreto}. Lo lograste en ${intentos} intentos`);
        }
    } while (respuesta !== secreto);
});

ejecutar("ej-vocales", () => {
    const frase = "Murciélago es una palabra con las cinco vocales";
    let vocales = 0;
    let espacios = 0;

    for (const letra of frase.toLowerCase()) {
        if ("aeiouáéíóúü".includes(letra)) {
            vocales++;
        } else if (letra === " ") {
            espacios++;
        }
    }

    console.log(`"${frase}"`);
    console.log("Vocales:", vocales);
    console.log("Espacios:", espacios);
    console.log("Consonantes:", frase.length - vocales - espacios);
});

ejecutar("ej-palindromo", () => {
    const palabra = "Aurora";
    let invertida = "";
    for (const letra of palabra) {
        invertida = letra + invertida;
    }
    console.log(`${palabra} al revés: ${invertida}`);

    const frase = "Anita lava la tina";
    const limpia = frase.toLowerCase().replaceAll(" ", "");
    let alReves = "";
    for (const letra of limpia) {
        alReves = letra + alReves;
    }

    if (limpia === alReves) {
        console.log(`✅ "${frase}" es un palíndromo`);
    } else {
        console.log(`🚫 "${frase}" no es un palíndromo`);
    }
});

ejecutar("ej-contrasena", () => {
    const contrasena = "Girasol2024";

    let tieneNumero = false;
    for (const caracter of contrasena) {
        if ("0123456789".includes(caracter)) {
            tieneNumero = true;
        }
    }

    const largoSuficiente = contrasena.length >= 8;
    const tieneMayuscula = contrasena !== contrasena.toLowerCase();
    const tieneMinuscula = contrasena !== contrasena.toUpperCase();
    const sinEspacios = !contrasena.includes(" ");

    console.log(largoSuficiente ? "✅" : "🚫", "Al menos 8 caracteres");
    console.log(tieneMayuscula ? "✅" : "🚫", "Una mayúscula");
    console.log(tieneMinuscula ? "✅" : "🚫", "Una minúscula");
    console.log(tieneNumero ? "✅" : "🚫", "Un número");
    console.log(sinEspacios ? "✅" : "🚫", "Sin espacios");

    if (largoSuficiente && tieneMayuscula && tieneMinuscula && tieneNumero && sinEspacios) {
        console.log("🔒 Contraseña segura");
    } else {
        console.log("⚠️ Corrige las reglas marcadas con 🚫");
    }
});

ejecutar("ej-piramide", () => {
    const altura = 5;
    for (let fila = 1; fila <= altura; fila++) {
        const espacios = " ".repeat(altura - fila);
        const asteriscos = "*".repeat(fila * 2 - 1);
        console.log(espacios + asteriscos);
    }
    console.log(" ".repeat(altura - 1) + "|");

    console.log("");
    for (let hora = 8; hora <= 12; hora++) {
        const ventas = Math.floor(Math.random() * 10) + 1;
        let barra = "";
        for (let i = 1; i <= ventas; i++) {
            barra += "█";
        }
        console.log(`${String(hora).padStart(2, "0")}:00 ${barra} ${ventas}`);
    }
});

ejecutar("ej-break-continue", () => {
    let botones = "";
    for (let piso = 1; piso <= 15; piso++) {
        if (piso === 13) {
            continue;
        }
        botones += `[${piso}] `;
    }
    console.log("Botones del ascensor:", botones);

    let revisados = 0;
    for (let ticket = 501; ticket <= 1000; ticket++) {
        revisados++;
        if (ticket % 37 === 0) {
            console.log(`🎟️ Primer ticket ganador después del 500: ${ticket}`);
            break;
        }
    }
    console.log(`Se revisaron ${revisados} tickets de 500 posibles`);
});
