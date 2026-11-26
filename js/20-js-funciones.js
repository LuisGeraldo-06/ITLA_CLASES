ejecutar("ej-declaracion", () => {
    function formatearPrecio(monto) {
        return `$${monto.toFixed(2)}`;
    }

    console.log(formatearPrecio(25));
    console.log(formatearPrecio(9.5));
    console.log(formatearPrecio(1299.999));

    console.log(mostrarOferta("Audífonos Nébula", 89.9));

    function mostrarOferta(producto, precio) {
        return `${producto} a solo ${formatearPrecio(precio)} 🔥`;
    }
});

ejecutar("ej-expresion", () => {
    const TASA_IMPUESTO = 0.18;

    function calcularImpuesto(subtotal) {
        return subtotal * TASA_IMPUESTO;
    }

    const calcularTotal = function (subtotal) {
        return subtotal + calcularImpuesto(subtotal);
    };

    const redondear = (numero) => Math.round(numero * 100) / 100;

    const precioFinal = (precio, cantidad) => {
        const bruto = precio * cantidad;
        return redondear(calcularTotal(bruto));
    };

    console.log("Subtotal: 150");
    console.log("Impuesto:", redondear(calcularImpuesto(150)));
    console.log("Total:", redondear(calcularTotal(150)));
    console.log("3 cuadernos de $12.50 con impuesto:", precioFinal(12.5, 3));
    console.log("¿Qué es calcularTotal?", typeof calcularTotal);
});

ejecutar("ej-defecto", () => {
    function mensajeWhatsApp(nombre, pedido, tienda = "Tienda Aurora", llegada = "hoy entre las 15:00 y las 18:00") {
        return `Hola ${nombre} 👋, tu pedido #${pedido} de ${tienda} llega ${llegada}. ¡Gracias por tu compra!`;
    }

    console.log(mensajeWhatsApp("Valeria", 1042));
    console.log(mensajeWhatsApp("Diego", 1043, "Café Brisa"));
    console.log(mensajeWhatsApp("Marta", 1044, undefined, "mañana a primera hora"));
    console.log(mensajeWhatsApp());

    const texto = encodeURIComponent(mensajeWhatsApp("Valeria", 1042));
    console.log(`https://wa.me/51900000000?text=${texto}`);
});

ejecutar("ej-return", () => {
    function convertir(valor, factor) {
        return valor * factor;
    }

    const kmAMillas = (km) => convertir(km, 0.621371);
    const kgALibras = (kg) => convertir(kg, 2.20462);
    const celsiusAFahrenheit = (celsius) => celsius * 9 / 5 + 32;

    console.log(`10 km = ${kmAMillas(10).toFixed(2)} millas`);
    console.log(`5 kg = ${kgALibras(5).toFixed(2)} lb`);
    console.log(`30 °C = ${celsiusAFahrenheit(30)} °F`);

    const distanciaMaraton = kmAMillas(42.195);
    console.log(`Una maratón son ${distanciaMaraton.toFixed(1)} millas`);

    function duplicarSinReturn(numero) {
        numero * 2;
    }

    console.log("Sin return se obtiene:", duplicarSinReturn(4));
});

ejecutar("ej-temprano", () => {
    function validarCorreo(correo) {
        const texto = correo.trim();
        if (texto === "") {
            return "Escribe un correo";
        }
        if (texto.includes(" ")) {
            return "El correo no puede tener espacios";
        }
        const posicionArroba = texto.indexOf("@");
        if (posicionArroba < 1) {
            return "Falta el usuario antes de la @";
        }
        if (posicionArroba !== texto.lastIndexOf("@")) {
            return "Solo puede haber una @";
        }
        const dominio = texto.slice(posicionArroba + 1);
        if (!dominio.includes(".") || dominio.endsWith(".")) {
            return "El dominio debe ser como correo.com";
        }
        return "✅ Correo válido";
    }

    console.log("ana@correo.com →", validarCorreo("ana@correo.com"));
    console.log("'   ' →", validarCorreo("   "));
    console.log("ana @correo.com →", validarCorreo("ana @correo.com"));
    console.log("@correo.com →", validarCorreo("@correo.com"));
    console.log("ana@@correo.com →", validarCorreo("ana@@correo.com"));
    console.log("ana@correo →", validarCorreo("ana@correo"));
    console.log(" luis.p@empresa.pe  →", validarCorreo(" luis.p@empresa.pe "));
});

ejecutar("ej-hora", () => {
    function saludoSegunHora(hora) {
        if (hora < 0 || hora > 23) {
            return "Hora inválida";
        }
        if (hora < 5) {
            return "Buenas noches 🌙";
        }
        if (hora < 12) {
            return "Buenos días ☀️";
        }
        if (hora < 19) {
            return "Buenas tardes 🌤️";
        }
        return "Buenas noches 🌙";
    }

    const ahora = new Date().getHours();
    console.log(`Ahora son las ${ahora} h: ${saludoSegunHora(ahora)}`);

    for (let hora = 2; hora <= 23; hora += 5) {
        console.log(`${hora} h → ${saludoSegunHora(hora)}`);
    }

    console.log(`25 h → ${saludoSegunHora(25)}`);
});

ejecutar("ej-scope", () => {
    const tienda = "Tienda Aurora";
    let visitas = 0;

    function registrarVisita() {
        visitas++;
        const mensaje = `Visita ${visitas} a ${tienda}`;
        return mensaje;
    }

    console.log(registrarVisita());
    console.log(registrarVisita());
    console.log("visitas afuera:", visitas);
    console.log("¿mensaje existe afuera?", typeof mensaje);

    function calcularEnvio(total) {
        let envio = 15;
        if (total >= 100) {
            const rebaja = 15;
            envio -= rebaja;
        }
        console.log("¿rebaja existe fuera del if?", typeof rebaja);
        return envio;
    }

    console.log("Envío para $80:", calcularEnvio(80));
    console.log("Envío para $120:", calcularEnvio(120));

    const color = "azul";

    function pintar() {
        const color = "rojo";
        return `Dentro: ${color}`;
    }

    console.log(pintar(), `| Fuera: ${color}`);
});

ejecutar("ej-puras", () => {
    let totalCarrito = 0;

    function agregarAlCarrito(precio) {
        totalCarrito += precio;
        return totalCarrito;
    }

    console.log("Impura, mismo argumento:");
    console.log(agregarAlCarrito(20));
    console.log(agregarAlCarrito(20));

    function sumarPrecio(total, precio) {
        return total + precio;
    }

    console.log("Pura, mismo argumento:");
    console.log(sumarPrecio(0, 20));
    console.log(sumarPrecio(0, 20));

    const subtotal = sumarPrecio(sumarPrecio(0, 20), 35);
    console.log("Subtotal con la pura:", subtotal);

    const precioConIva = (precio) => precio * 1.18;
    console.log("Siempre igual:", precioConIva(100), precioConIva(100));
});

ejecutar("ej-componer", () => {
    const redondear = (numero) => Math.round(numero * 100) / 100;
    const formatear = (numero) => `$${redondear(numero).toFixed(2)}`;
    const calcularSubtotal = (precio, cantidad) => precio * cantidad;
    const aplicarDescuento = (monto, porcentaje) => monto - monto * porcentaje / 100;
    const agregarImpuesto = (monto) => monto * 1.18;

    function generarFactura(producto, precio, cantidad, descuento = 0) {
        const subtotal = calcularSubtotal(precio, cantidad);
        const conDescuento = aplicarDescuento(subtotal, descuento);
        const total = agregarImpuesto(conDescuento);
        console.log(`${cantidad} × ${producto}`);
        console.log(`  Subtotal:    ${formatear(subtotal)}`);
        console.log(`  Descuento:   ${descuento}%`);
        console.log(`  Total + 18%: ${formatear(total)}`);
    }

    generarFactura("Polo básico", 39.9, 3);
    generarFactura("Zapatillas Trail", 249, 1, 15);
});

ejecutar("ej-slug", () => {
    function crearSlug(titulo) {
        const permitidos = "abcdefghijklmnopqrstuvwxyz0123456789";
        let slug = "";
        for (const letra of titulo.toLowerCase().normalize("NFD")) {
            if (permitidos.includes(letra)) {
                slug += letra;
            } else if ((letra === " " || letra === "-") && slug !== "" && !slug.endsWith("-")) {
                slug += "-";
            }
        }
        return slug.endsWith("-") ? slug.slice(0, -1) : slug;
    }

    console.log(crearSlug("Cómo hacer pan casero en 5 pasos"));
    console.log(crearSlug("  ¡Ofertas de Año Nuevo!  "));
    console.log(crearSlug("Guía de JavaScript - Parte 2"));

    const url = `https://blog-aurora.com/articulos/${crearSlug("Diseño web: ¿por dónde empiezo?")}`;
    console.log(url);
});

ejecutar("ej-texto", () => {
    function obtenerIniciales(nombreCompleto) {
        let iniciales = "";
        let anterior = " ";
        for (const letra of nombreCompleto) {
            if (anterior === " " && letra !== " ") {
                iniciales += letra.toUpperCase();
            }
            anterior = letra;
        }
        return iniciales;
    }

    function capitalizarTitulo(texto) {
        let resultado = "";
        let anterior = " ";
        for (const letra of texto.toLowerCase()) {
            resultado += anterior === " " ? letra.toUpperCase() : letra;
            anterior = letra;
        }
        return resultado;
    }

    console.log(obtenerIniciales("ana lucía torres"));
    console.log(obtenerIniciales("  Jorge   Paredes "));
    console.log(capitalizarTitulo("el SEÑOR de los cafés"));
    console.log(`[${obtenerIniciales("Rosa Medina")}] ${capitalizarTitulo("rosa medina")}`);
});

ejecutar("ej-contrasena", () => {
    function numeroAlAzar(maximo) {
        return Math.floor(Math.random() * maximo);
    }

    function generarContrasena(longitud = 12, conSimbolos = true) {
        let caracteres = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        if (conSimbolos) {
            caracteres += "!@#$%&*?";
        }
        let contrasena = "";
        for (let i = 0; i < longitud; i++) {
            contrasena += caracteres[numeroAlAzar(caracteres.length)];
        }
        return contrasena;
    }

    console.log("Por defecto:", generarContrasena());
    console.log("8 sin símbolos:", generarContrasena(8, false));
    console.log("20 caracteres:", generarContrasena(20));
    console.log("Dado de 6 caras:", numeroAlAzar(6) + 1);
});

ejecutar("ej-cupon", () => {
    function calcularDescuento(total, cupon) {
        switch (cupon.toUpperCase()) {
            case "BIENVENIDA10":
                return total * 0.1;
            case "VERANO25":
                return total >= 200 ? total * 0.25 : 0;
            case "ENVIOGRATIS":
                return 15;
            default:
                return 0;
        }
    }

    function aplicarCupon(total, cupon) {
        const descuento = calcularDescuento(total, cupon);
        if (descuento === 0) {
            return `🚫 ${cupon} no aplica a $${total}. Pagas $${total.toFixed(2)}`;
        }
        return `✅ ${cupon.toUpperCase()}: -$${descuento.toFixed(2)} → pagas $${(total - descuento).toFixed(2)}`;
    }

    console.log(aplicarCupon(120, "bienvenida10"));
    console.log(aplicarCupon(150, "VERANO25"));
    console.log(aplicarCupon(250, "verano25"));
    console.log(aplicarCupon(80, "EnvioGratis"));
    console.log(aplicarCupon(80, "GRATIS100"));
});

ejecutar("ej-callback", () => {
    function aplicarPromocion(precio, promocion) {
        const final = promocion(precio);
        return `Antes $${precio.toFixed(2)} → ahora $${final.toFixed(2)}`;
    }

    const descuento20 = (precio) => precio * 0.8;
    const menosQuince = (precio) => Math.max(precio - 15, 0);

    console.log(aplicarPromocion(50, descuento20));
    console.log(aplicarPromocion(50, menosQuince));
    console.log(aplicarPromocion(50, (precio) => precio / 2));

    function repetir(veces, accion) {
        for (let i = 1; i <= veces; i++) {
            accion(i, veces);
        }
    }

    repetir(3, (numero, total) => {
        console.log(`📨 Enviando recordatorio ${numero} de ${total}`);
    });
});

ejecutar("ej-closure", () => {
    function crearContador(nombre) {
        let clics = 0;
        return () => {
            clics++;
            return `${nombre}: ${clics} clic${clics === 1 ? "" : "s"}`;
        };
    }

    const clicMeGusta = crearContador("Me gusta");
    const clicCompartir = crearContador("Compartir");

    console.log(clicMeGusta());
    console.log(clicMeGusta());
    console.log(clicCompartir());
    console.log(clicMeGusta());
    console.log("¿Se puede leer clics desde afuera?", typeof clics);
});

ejecutar("ej-fabricas", () => {
    function crearGeneradorId(prefijo) {
        let ultimo = 0;
        return () => {
            ultimo++;
            return `${prefijo}-${String(ultimo).padStart(4, "0")}`;
        };
    }

    const nuevoPedido = crearGeneradorId("PED");
    const nuevoCliente = crearGeneradorId("CLI");

    console.log(nuevoPedido(), nuevoPedido(), nuevoCliente(), nuevoPedido());

    function crearConvertidor(factor, unidad) {
        return (valor) => `${(valor * factor).toFixed(2)} ${unidad}`;
    }

    const solesADolares = crearConvertidor(0.27, "USD");
    const cmAPulgadas = crearConvertidor(0.3937, "in");
    const litrosAGalones = crearConvertidor(0.264172, "gal");

    console.log("S/ 100 =", solesADolares(100));
    console.log("Pantalla de 140 cm =", cmAPulgadas(140));
    console.log("Tanque de 50 L =", litrosAGalones(50));
});

ejecutar("ej-rest", () => {
    function totalTicket(...precios) {
        let total = 0;
        for (const precio of precios) {
            total += precio;
        }
        return total;
    }

    console.log("Ticket 1:", totalTicket(4.5, 12, 3.2));
    console.log("Ticket 2:", totalTicket(99.9));
    console.log("Ticket vacío:", totalTicket());

    function promedio(alumno, ...notas) {
        if (notas.length === 0) {
            return `${alumno}: sin notas`;
        }
        let suma = 0;
        for (const nota of notas) {
            suma += nota;
        }
        return `${alumno}: ${(suma / notas.length).toFixed(1)} (${notas.length} notas)`;
    }

    console.log(promedio("Lucía", 15, 18, 12, 17));
    console.log(promedio("Tomás", 11, 14));
    console.log(promedio("Elena"));
});

ejecutar("ej-recursion", () => {
    function factorial(n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    console.log("5! =", factorial(5));
    console.log("Formas de sentar a 6 invitados:", factorial(6));

    function mostrarRuta(ruta, nivel = 0) {
        const barra = ruta.indexOf("/");
        const carpeta = barra === -1 ? ruta : ruta.slice(0, barra);
        console.log(`${"   ".repeat(nivel)}📁 ${carpeta}`);
        if (barra !== -1) {
            mostrarRuta(ruta.slice(barra + 1), nivel + 1);
        }
    }

    mostrarRuta("proyectos/tienda/imagenes/productos/2026");

    function cuentaRegresiva(numero) {
        if (numero === 0) {
            console.log("🚀 ¡Despegue!");
            return;
        }
        console.log(numero);
        cuentaRegresiva(numero - 1);
    }

    cuentaRegresiva(3);
});
