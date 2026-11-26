ejecutar("ej-primer-programa", () => {
    const tienda = "Café Aurora";
    let clientes = 0;

    console.log("Bienvenido a", tienda);

    clientes = clientes + 1;
    clientes += 1;
    clientes++;
    console.log("Clientes atendidos:", clientes);

    const precioCafe = 2.5;
    console.log("Precio del café:", precioCafe);

    precioCafe = 3;
    console.log("Esta línea nunca se ejecuta");
});

ejecutar("ej-tipos", () => {
    const producto = "Audífonos Bluetooth";
    const precio = 39.99;
    const stock = 25;
    const disponible = true;
    const cupon = null;
    let fechaEntrega;
    const visitasTotales = 9007199254740993n;

    console.log(producto, "→", typeof producto);
    console.log(precio, "→", typeof precio);
    console.log(stock, "→", typeof stock);
    console.log(disponible, "→", typeof disponible);
    console.log(cupon, "→", typeof cupon);
    console.log(fechaEntrega, "→", typeof fechaEntrega);
    console.log(visitasTotales, "→", typeof visitasTotales);
    console.log("El mismo número sin n:", 9007199254740993);
});

ejecutar("ej-operadores", () => {
    const huevos = 150;
    const porCaja = 12;

    const cajasLlenas = Math.floor(huevos / porCaja);
    const sueltos = huevos % porCaja;
    console.log(huevos, "huevos =", cajasLlenas, "cajas y", sueltos, "sueltos");

    let stock = 40;
    stock -= 3;
    stock += 20;
    stock--;
    console.log("Stock final:", stock);

    const ladoBaldosa = 1.1;
    console.log("Área de una baldosa:", ladoBaldosa ** 2, "m²");
    console.log("Precio por unidad de un paquete de 4 a $18:", 18 / 4);
    console.log("¿Sobran personas si 23 se reparten en equipos de 5?", 23 % 5);
});

ejecutar("ej-conversion", () => {
    console.log('"5" + 3 =', "5" + 3);
    console.log('"5" - 3 =', "5" - 3);
    console.log('"5" * "2" =', "5" * "2");
    console.log('1 + 2 + "3" =', 1 + 2 + "3");
    console.log('"1" + 2 + 3 =', "1" + 2 + 3);

    const cantidadTexto = "3";
    console.log("Mal:", cantidadTexto + 2);
    console.log("Bien:", Number(cantidadTexto) + 2);

    console.log("Number:", Number("42"), Number(""), Number("12abc"), Number(true));
    console.log("parseInt / parseFloat:", parseInt("42px"), parseInt("7.9"), parseFloat("3.75 kg"));

    const edad = Number("hola");
    console.log(edad, typeof edad, Number.isNaN(edad));
    console.log("NaN === NaN:", NaN === NaN);

    console.log('5 == "5":', 5 == "5", ' | 5 === "5":', 5 === "5");
    console.log('0 == "":', 0 == "", ' | 0 === "":', 0 === "");
    console.log("null == undefined:", null == undefined, " | null === undefined:", null === undefined);
    console.log("0.1 + 0.2 =", 0.1 + 0.2, "→", (0.1 + 0.2).toFixed(2));
});

ejecutar("ej-usuario", () => {
    const nombre = "  MARIANA ";
    const apellidos = " Castillo Vega";
    const anioNacimiento = 1998;

    const nombreLimpio = nombre.trim().toLowerCase();
    const apellidosLimpios = apellidos.trim().toLowerCase();

    const usuario = nombreLimpio.slice(0, 1) + apellidosLimpios.replaceAll(" ", "") + String(anioNacimiento).slice(-2);
    const correo = `${nombreLimpio}.${apellidosLimpios.replaceAll(" ", ".")}@nubeverde.example`;
    const iniciales = nombreLimpio[0].toUpperCase() + apellidosLimpios[0].toUpperCase();
    const nombreVisible = nombreLimpio[0].toUpperCase() + nombreLimpio.slice(1) + " " + apellidos.trim();

    console.log("Usuario:", usuario);
    console.log("Correo:", correo);
    console.log("Iniciales del avatar:", iniciales);
    console.log("Nombre para mostrar:", nombreVisible);
    console.log("Largo del usuario:", usuario.length, "caracteres");
});

ejecutar("ej-oculto", () => {
    const tarjeta = "4000123456789010";
    const ultimos4 = tarjeta.slice(-4);
    console.log("Tarjeta:", ultimos4.padStart(tarjeta.length, "*"));
    console.log("Tarjeta:", `**** **** **** ${ultimos4}`);

    const contrasena = "Girasol2024";
    console.log("Contraseña:", "•".repeat(contrasena.length));

    const telefono = "6123-4567";
    console.log("Teléfono:", telefono.slice(-4).padStart(telefono.length, "*"));

    const correo = "mariana.castillo@correo.example";
    const arroba = correo.indexOf("@");
    const parteUsuario = correo.slice(0, arroba);
    const dominio = correo.slice(arroba);
    console.log("Correo:", parteUsuario.slice(0, 2) + "*".repeat(parteUsuario.length - 2) + dominio);
});

ejecutar("ej-tweet", () => {
    const publicacion = "Hoy abrimos nuestra nueva sucursal en el centro 🎉 Ven por tu café gratis antes de las 10 a.m. #CaféAurora #Inauguración";
    const limite = 280;

    console.log("Caracteres usados:", publicacion.length);
    console.log("Te quedan:", limite - publicacion.length);
    console.log("¿Menciona café gratis?", publicacion.toLowerCase().includes("café gratis"));
    console.log("¿Tiene hashtags?", publicacion.includes("#"));
    console.log("Vista previa:", publicacion.slice(0, 40) + "…");
    console.log("Sin numerales:", publicacion.replaceAll("#", ""));
    console.log("En mayúsculas:", publicacion.toUpperCase());
});

ejecutar("ej-ticket", () => {
    const tienda = "Supermercado La Espiga";
    const producto1 = "Leche entera 1 L";
    const cantidad1 = 2;
    const precio1 = 1.35;
    const producto2 = "Pan integral";
    const cantidad2 = 1;
    const precio2 = 2.1;
    const producto3 = "Café molido 500 g";
    const cantidad3 = 1;
    const precio3 = 6.75;

    const subtotal = cantidad1 * precio1 + cantidad2 * precio2 + cantidad3 * precio3;
    const itbms = subtotal * 0.07;
    const total = subtotal + itbms;
    const numeroTicket = String(4821).padStart(8, "0");

    const ticket = `${tienda.toUpperCase()}
Ticket N.º ${numeroTicket}
--------------------------------
${cantidad1} x ${producto1.padEnd(20)} ${(cantidad1 * precio1).toFixed(2).padStart(7)}
${cantidad2} x ${producto2.padEnd(20)} ${(cantidad2 * precio2).toFixed(2).padStart(7)}
${cantidad3} x ${producto3.padEnd(20)} ${(cantidad3 * precio3).toFixed(2).padStart(7)}
--------------------------------
${"Subtotal".padEnd(24)} ${subtotal.toFixed(2).padStart(7)}
${"ITBMS 7%".padEnd(24)} ${itbms.toFixed(2).padStart(7)}
${"TOTAL".padEnd(24)} ${total.toFixed(2).padStart(7)}
--------------------------------
¡Gracias por su compra!`;

    console.log(ticket);
});

ejecutar("ej-factura", () => {
    const cliente = "Ferretería El Tornillo";
    const subtotal = 245.8;
    const tasaItbms = 0.07;

    const impuesto = subtotal * tasaItbms;
    const total = subtotal + impuesto;

    console.log("Cliente:", cliente);
    console.log("Subtotal: $" + subtotal.toFixed(2));
    console.log("ITBMS 7%: $" + impuesto.toFixed(2));
    console.log("Total a pagar: $" + total.toFixed(2));

    const tasaIva = 0.16;
    const totalConIva = subtotal * (1 + tasaIva);
    console.log("Con IVA 16%: $" + totalConIva.toFixed(2));

    const precioConImpuesto = 10.7;
    const precioSinImpuesto = precioConImpuesto / (1 + tasaItbms);
    console.log("Un precio de $10.70 con ITBMS es $" + precioSinImpuesto.toFixed(2) + " sin impuesto");
});

ejecutar("ej-propina", () => {
    const cuenta = 86.4;
    const porcentajePropina = 15;
    const personas = 3;

    const propina = cuenta * porcentajePropina / 100;
    const totalMesa = cuenta + propina;
    const porPersona = totalMesa / personas;

    console.log(`Cuenta: $${cuenta.toFixed(2)}`);
    console.log(`Propina (${porcentajePropina}%): $${propina.toFixed(2)}`);
    console.log(`Total de la mesa: $${totalMesa.toFixed(2)}`);
    console.log(`Cada persona paga: $${porPersona.toFixed(2)}`);
    console.log(`Redondeado hacia arriba: $${Math.ceil(porPersona)}`);
});

ejecutar("ej-descuento", () => {
    const precioNormal = 129.99;
    const precioOferta = 89.99;

    const ahorro = precioNormal - precioOferta;
    const porcentaje = ahorro / precioNormal * 100;
    console.log(`Ahorras $${ahorro.toFixed(2)} (${Math.round(porcentaje)}% de descuento)`);
    console.log("Etiqueta de la vitrina:", `-${Math.round(porcentaje)}%`);

    const cupon = 20;
    const precioFinal = precioOferta * (1 - cupon / 100);
    console.log(`Con el cupón de ${cupon}%: $${precioFinal.toFixed(2)}`);

    const descuentoTotal = (precioNormal - precioFinal) / precioNormal * 100;
    console.log(`Descuento total real: ${descuentoTotal.toFixed(1)}% (no es ${Math.round(porcentaje) + cupon}%)`);
});

ejecutar("ej-imc", () => {
    const pesoKg = 72;
    const alturaM = 1.75;

    const imc = pesoKg / alturaM ** 2;
    console.log("Tu IMC es:", imc.toFixed(1));

    const pesoMinimo = 18.5 * alturaM ** 2;
    const pesoMaximo = 24.9 * alturaM ** 2;
    console.log(`Peso saludable para ${alturaM} m: de ${pesoMinimo.toFixed(1)} a ${pesoMaximo.toFixed(1)} kg`);

    const pesoLibras = pesoKg * 2.20462;
    console.log(`${pesoKg} kg son ${Math.round(pesoLibras)} lb`);
});

ejecutar("ej-temperatura", () => {
    const celsius = 31;
    const fahrenheit = celsius * 9 / 5 + 32;
    console.log(`Clima: ${celsius} °C = ${fahrenheit} °F`);

    const hornoF = 350;
    const hornoC = (hornoF - 32) * 5 / 9;
    console.log(`Horno: ${hornoF} °F = ${hornoC.toFixed(1)} °C`);
    console.log(`Redondeado: ${Math.round(hornoC)} °C`);

    const fiebreF = 101.3;
    console.log(`Termómetro: ${fiebreF} °F = ${((fiebreF - 32) * 5 / 9).toFixed(1)} °C`);
    console.log(`En kelvin: ${celsius + 273.15} K`);
});

ejecutar("ej-tiempo", () => {
    const duracionPelicula = 158;
    const horas = Math.floor(duracionPelicula / 60);
    const minutos = duracionPelicula % 60;
    console.log(`La película dura ${horas} h ${minutos} min`);

    const segundosVideo = 3725;
    const h = Math.floor(segundosVideo / 3600);
    const m = Math.floor(segundosVideo % 3600 / 60);
    const s = segundosVideo % 60;
    console.log(`Duración del video: ${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);

    const minutosSemana = 2430;
    console.log(`Trabajaste ${Math.floor(minutosSemana / 60)} h ${minutosSemana % 60} min esta semana`);

    const horasEntrega = 53;
    console.log(`Tu pedido llega en ${Math.floor(horasEntrega / 24)} días y ${horasEntrega % 24} horas`);
});

ejecutar("ej-dado", () => {
    const dado1 = Math.floor(Math.random() * 6) + 1;
    const dado2 = Math.floor(Math.random() * 6) + 1;
    console.log("🎲 Dados:", dado1, "y", dado2, "→ suma", dado1 + dado2);
    console.log("El más alto:", Math.max(dado1, dado2), "| el más bajo:", Math.min(dado1, dado2));

    const moneda = Math.round(Math.random());
    console.log("Moneda (1 = cara, 0 = sello):", moneda);

    const cupon = "AURORA-" + String(Math.floor(Math.random() * 10000)).padStart(4, "0");
    console.log("Tu cupón:", cupon);

    const ganador = Math.floor(Math.random() * 250) + 1;
    console.log("Número ganador de la rifa (1 a 250):", ganador);
});

ejecutar("ej-monedas", () => {
    const dolares = 250;
    const tasaEuro = 0.92;
    const tasaPesoMexicano = 17.15;
    const tasaPesoColombiano = 3950;

    const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
    const mxn = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
    const cop = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

    console.log(usd.format(dolares), "equivalen a:");
    console.log("Euros:", eur.format(dolares * tasaEuro));
    console.log("Pesos mexicanos:", mxn.format(dolares * tasaPesoMexicano));
    console.log("Pesos colombianos:", cop.format(dolares * tasaPesoColombiano));

    const seguidores = new Intl.NumberFormat("es", { notation: "compact" });
    console.log("Seguidores:", seguidores.format(1534000));
    console.log("Miles con separador:", new Intl.NumberFormat("es-PA").format(1234567.891));
});

ejecutar("ej-prestamo", () => {
    const monto = 15000;
    const tasaAnual = 9.5;
    const anios = 5;

    const tasaMensual = tasaAnual / 100 / 12;
    const meses = anios * 12;
    const cuota = monto * tasaMensual / (1 - (1 + tasaMensual) ** -meses);
    const totalPagado = cuota * meses;
    const intereses = totalPagado - monto;

    const dinero = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    console.log("Préstamo:", dinero.format(monto));
    console.log(`Plazo: ${meses} meses al ${tasaAnual}% anual`);
    console.log("Cuota mensual:", dinero.format(cuota));
    console.log("Total pagado:", dinero.format(totalPagado));
    console.log("Intereses:", dinero.format(intereses));
});

ejecutar("ej-fechas", () => {
    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const anioNacimiento = 1998;

    console.log("Hoy es:", hoy.toLocaleDateString("es-PA"));
    console.log("Edad aproximada:", anioActual - anioNacimiento, "años");

    const fechaLarga = hoy.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    console.log("Fecha larga:", fechaLarga);
    console.log("Hora:", hoy.toLocaleTimeString("es-PA", { hour: "2-digit", minute: "2-digit" }));
    console.log("Mes:", hoy.getMonth(), "→ los meses empiezan en 0, así que es el mes", hoy.getMonth() + 1);

    const navidad = new Date(anioActual, 11, 25);
    const msPorDia = 1000 * 60 * 60 * 24;
    const faltan = Math.ceil((navidad - hoy) / msPorDia);
    console.log("Días para Navidad:", faltan);
});
