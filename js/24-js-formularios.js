ejecutar("ej-leer-valores", () => {
    const nombre = document.querySelector("#perfil-nombre");
    const edad = document.querySelector("#perfil-edad");
    const nacimiento = document.querySelector("#perfil-nacimiento");
    const pais = document.querySelector("#perfil-pais");
    const boletin = document.querySelector("#perfil-boletin");
    const plan = document.querySelector("input[name='plan']:checked");

    console.log("nombre:", nombre.value);
    console.log("edad (.value):", edad.value, typeof edad.value);
    console.log("edad (.valueAsNumber):", edad.valueAsNumber, typeof edad.valueAsNumber);
    console.log("edad el próximo año:", edad.valueAsNumber + 1);
    console.log("nacimiento:", nacimiento.value);
    console.log("país (value):", pais.value);
    console.log("país (texto):", pais.options[pais.selectedIndex].text);
    console.log("¿boletín?:", boletin.checked);
    console.log("plan:", plan.value);
});

const contacto = document.querySelector("#contacto");
const contactoGracias = document.querySelector("#contacto-gracias");
const contactoDatos = document.querySelector("#contacto-datos");

contacto.addEventListener("submit", (event) => {
    event.preventDefault();
    const datos = new FormData(contacto);

    contactoDatos.textContent = "";
    for (const [campo, valor] of datos) {
        contactoDatos.textContent += `${campo}: ${valor}\n`;
    }

    const mensaje = Object.fromEntries(datos);
    contactoGracias.textContent = `Gracias, ${mensaje.nombre}. Te responderemos a ${mensaje.correo}.`;
    contacto.reset();
});

const registroValidez = document.querySelector("#registro-validez");
const rvInforme = document.querySelector("#rv-informe");
const banderas = ["valueMissing", "typeMismatch", "patternMismatch", "tooShort", "rangeUnderflow", "rangeOverflow"];

registroValidez.addEventListener("submit", (event) => {
    event.preventDefault();
    rvInforme.textContent = `¿Todo el formulario es válido? ${registroValidez.checkValidity()}\n\n`;

    for (const campo of registroValidez.querySelectorAll("input")) {
        const fallos = banderas.filter((bandera) => campo.validity[bandera]);
        rvInforme.textContent += `${campo.name}: valid = ${campo.validity.valid}\n`;
        if (fallos.length > 0) {
            rvInforme.textContent += `    banderas: ${fallos.join(", ")}\n`;
            rvInforme.textContent += `    mensaje: ${campo.validationMessage}\n`;
        }
    }
});

const altaUsuario = document.querySelector("#alta-usuario");
const usuarioNuevo = document.querySelector("#au-usuario");
const auMensaje = document.querySelector("#au-mensaje");
const ocupados = ["admin", "ana", "soporte"];

usuarioNuevo.addEventListener("input", () => {
    const elegido = usuarioNuevo.value.trim().toLowerCase();
    if (ocupados.includes(elegido)) {
        usuarioNuevo.setCustomValidity(`«${elegido}» ya está en uso. Prueba con otro.`);
        usuarioNuevo.reportValidity();
    } else {
        usuarioNuevo.setCustomValidity("");
    }
});

altaUsuario.addEventListener("submit", (event) => {
    event.preventDefault();
    auMensaje.textContent = `Cuenta «${usuarioNuevo.value}» creada.`;
    altaUsuario.reset();
});

const suscripcion = document.querySelector("#suscripcion");
const susEstado = document.querySelector("#sus-estado");

const mensajeDeError = (campo) => {
    if (campo.validity.valueMissing) {
        return "Este campo es obligatorio.";
    }
    if (campo.validity.typeMismatch) {
        return "Escribe un correo como nombre@dominio.com.";
    }
    if (campo.validity.tooShort) {
        return `Escribe al menos ${campo.minLength} caracteres.`;
    }
    if (campo.validity.patternMismatch) {
        return "Deben ser 9 dígitos, sin espacios.";
    }
    return "";
};

const validarCampo = (campo) => {
    const mensaje = mensajeDeError(campo);
    const error = document.getElementById(campo.getAttribute("aria-describedby"));
    error.textContent = mensaje;
    campo.setAttribute("aria-invalid", mensaje !== "");
    return mensaje === "";
};

suscripcion.addEventListener("input", (event) => {
    validarCampo(event.target);
});

suscripcion.addEventListener("submit", (event) => {
    event.preventDefault();
    const campos = [...suscripcion.querySelectorAll("input")];
    const invalidos = campos.filter((campo) => !validarCampo(campo));

    if (invalidos.length > 0) {
        invalidos[0].focus();
        susEstado.textContent = `Revisa ${invalidos.length} campo(s) marcados en rojo.`;
        return;
    }
    susEstado.textContent = "¡Listo! Ya estás suscrito.";
    suscripcion.reset();
});

const reserva = document.querySelector("#reserva");
const reservaEnviar = document.querySelector("#reserva-enviar");
const reservaEstado = document.querySelector("#reserva-estado");

reserva.addEventListener("input", () => {
    reservaEnviar.disabled = !reserva.checkValidity();
});

reserva.addEventListener("reset", () => {
    reservaEnviar.disabled = true;
    reservaEstado.textContent = "Formulario limpio.";
});

reserva.addEventListener("submit", (event) => {
    event.preventDefault();
    const datos = Object.fromEntries(new FormData(reserva));
    reserva.reset();
    reservaEstado.textContent = `Mesa para ${datos.personas} a nombre de ${datos.nombre} el ${datos.fecha}.`;
});

const clave = document.querySelector("#acceso-clave");
const ojo = document.querySelector("#acceso-ojo");

ojo.addEventListener("click", () => {
    const estaOculta = clave.type === "password";
    clave.type = estaOculta ? "text" : "password";
    ojo.textContent = estaOculta ? "🙈" : "👁️";
    ojo.setAttribute("aria-label", estaOculta ? "Ocultar contraseña" : "Mostrar contraseña");
    clave.focus();
});

const nuevaClave = document.querySelector("#nueva-clave");
const ncClave = document.querySelector("#nc-clave");
const ncRepetir = document.querySelector("#nc-repetir");
const ncBarra = document.querySelector("#nc-barra");
const ncNivel = document.querySelector("#nc-nivel");
const ncCoincide = document.querySelector("#nc-coincide");
const reglasClave = document.querySelectorAll(".reglas li");
const niveles = [
    { texto: "Muy débil", color: "#dc2626" },
    { texto: "Débil", color: "#f97316" },
    { texto: "Aceptable", color: "#eab308" },
    { texto: "Buena", color: "#84cc16" },
    { texto: "Muy fuerte", color: "#16a34a" },
];

const revisarReglas = (texto) => ({
    largo: texto.length >= 8,
    mayuscula: /[A-Z]/.test(texto),
    numero: /[0-9]/.test(texto),
    simbolo: /[^A-Za-z0-9]/.test(texto),
});

const comprobarIguales = () => {
    const iguales = ncRepetir.value === ncClave.value;
    ncRepetir.setCustomValidity(iguales ? "" : "Las contraseñas no coinciden.");
    if (ncRepetir.value === "") {
        ncCoincide.textContent = "";
    } else {
        ncCoincide.textContent = iguales ? "✓ Coinciden" : "✗ No coinciden";
    }
};

ncClave.addEventListener("input", () => {
    const reglas = revisarReglas(ncClave.value);
    let puntos = 0;
    for (const regla of reglasClave) {
        const cumple = reglas[regla.dataset.regla];
        regla.classList.toggle("cumple", cumple);
        if (cumple) {
            puntos++;
        }
    }
    ncBarra.style.width = `${puntos * 25}%`;
    ncBarra.style.backgroundColor = niveles[puntos].color;
    ncNivel.textContent = ncClave.value === "" ? "Escribe una contraseña." : `Seguridad: ${niveles[puntos].texto}`;
    comprobarIguales();
});

ncRepetir.addEventListener("input", comprobarIguales);

nuevaClave.addEventListener("submit", (event) => {
    event.preventDefault();
    ncCoincide.textContent = "✓ Contraseña guardada.";
});

const resena = document.querySelector("#resena-texto");
const resenaContador = document.querySelector("#resena-contador");

resena.addEventListener("input", () => {
    const usados = resena.value.length;
    const limite = resena.maxLength;
    resenaContador.textContent = `${usados} / ${limite}`;
    resenaContador.classList.toggle("cerca", usados >= limite * 0.8);
    resenaContador.classList.toggle("lleno", usados === limite);
});

const verificacion = document.querySelector("#verificacion");
const digitos = [...document.querySelectorAll(".otp-digito")];
const otpVerificar = document.querySelector("#otp-verificar");
const otpEstado = document.querySelector("#otp-estado");

const leerCodigo = () => digitos.map((caja) => caja.value).join("");

const actualizarVerificar = () => {
    otpVerificar.disabled = leerCodigo().length < digitos.length;
};

digitos.forEach((caja, posicion) => {
    caja.addEventListener("focus", () => {
        caja.select();
    });

    caja.addEventListener("input", () => {
        caja.value = caja.value.replace(/[^0-9]/g, "");
        if (caja.value !== "" && posicion < digitos.length - 1) {
            digitos[posicion + 1].focus();
        }
        actualizarVerificar();
    });

    caja.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && caja.value === "" && posicion > 0) {
            event.preventDefault();
            digitos[posicion - 1].value = "";
            digitos[posicion - 1].focus();
            actualizarVerificar();
        }
    });

    caja.addEventListener("paste", (event) => {
        event.preventDefault();
        const pegado = event.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, digitos.length);
        [...pegado].forEach((numero, i) => {
            digitos[i].value = numero;
        });
        digitos[Math.min(pegado.length, digitos.length - 1)].focus();
        actualizarVerificar();
    });
});

verificacion.addEventListener("submit", (event) => {
    event.preventDefault();
    if (leerCodigo() === "123456") {
        otpEstado.textContent = "✓ Código correcto. ¡Bienvenida!";
    } else {
        otpEstado.textContent = "✗ Código incorrecto. Revisa el SMS.";
    }
});

const zonaArchivos = document.querySelector("#zona-archivos");
const archivosInput = document.querySelector("#archivos-input");
const archivosBoton = document.querySelector("#archivos-boton");
const archivosLista = document.querySelector("#archivos-lista");

const formatearTamano = (bytes) => {
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const mostrarArchivos = (archivos) => {
    archivosLista.innerHTML = "";
    for (const archivo of archivos) {
        const item = document.createElement("li");
        item.textContent = `📄 ${archivo.name} — ${formatearTamano(archivo.size)}`;
        archivosLista.append(item);
    }
};

archivosBoton.addEventListener("click", () => {
    archivosInput.click();
});

archivosInput.addEventListener("change", () => {
    mostrarArchivos(archivosInput.files);
});

zonaArchivos.addEventListener("dragover", (event) => {
    event.preventDefault();
    zonaArchivos.classList.add("arrastrando");
});

zonaArchivos.addEventListener("dragleave", () => {
    zonaArchivos.classList.remove("arrastrando");
});

zonaArchivos.addEventListener("drop", (event) => {
    event.preventDefault();
    zonaArchivos.classList.remove("arrastrando");
    archivosInput.files = event.dataTransfer.files;
    mostrarArchivos(archivosInput.files);
});

const avatarImagen = document.querySelector("#avatar-imagen");
const avatarArchivo = document.querySelector("#avatar-archivo");
const avatarInfo = document.querySelector("#avatar-info");

avatarArchivo.addEventListener("change", () => {
    const archivo = avatarArchivo.files[0];
    if (!archivo) {
        return;
    }
    if (archivo.size > 2 * 1024 * 1024) {
        avatarInfo.textContent = "La imagen pesa más de 2 MB. Elige otra.";
        avatarArchivo.value = "";
        return;
    }
    URL.revokeObjectURL(avatarImagen.src);
    avatarImagen.src = URL.createObjectURL(archivo);
    avatarImagen.alt = `Vista previa de ${archivo.name}`;
    avatarInfo.textContent = `${archivo.name} (${Math.round(archivo.size / 1024)} KB)`;
});

const prestamo = document.querySelector("#prestamo");
const dinero = (cantidad) => cantidad.toLocaleString("es", { style: "currency", currency: "USD" });

const calcularPrestamo = () => {
    const monto = prestamo.elements.monto.valueAsNumber;
    const meses = Number(prestamo.elements.meses.value);
    const tasaMensual = (prestamo.elements.tasa.valueAsNumber || 0) / 100 / 12;

    let cuota = monto / meses;
    if (tasaMensual > 0) {
        cuota = (monto * tasaMensual) / (1 - (1 + tasaMensual) ** -meses);
    }
    const total = cuota * meses;

    document.querySelector("#prestamo-monto-texto").textContent = dinero(monto);
    document.querySelector("#prestamo-cuota").textContent = dinero(cuota);
    document.querySelector("#prestamo-total").textContent = dinero(total);
    document.querySelector("#prestamo-intereses").textContent = dinero(total - monto);
};

prestamo.addEventListener("input", calcularPrestamo);
calcularPrestamo();

const cotizador = document.querySelector("#cotizador");
const cotizacionDetalle = document.querySelector("#cotizacion-detalle");
const cotizacionTotal = document.querySelector("#cotizacion-total");

const cotizar = () => {
    const datos = new FormData(cotizador);
    const base = Number(datos.get("base"));
    const extras = datos.getAll("extra").map(Number);
    const sumaExtras = extras.reduce((suma, precio) => suma + precio, 0);
    const descuento = extras.length >= 3 ? Math.round(sumaExtras * 0.1) : 0;

    cotizacionDetalle.textContent = `Base $${base} + ${extras.length} extra(s) $${sumaExtras}`;
    if (descuento > 0) {
        cotizacionDetalle.textContent += ` − descuento $${descuento}`;
    }
    cotizacionTotal.textContent = `$${base + sumaExtras - descuento}`;
};

cotizador.addEventListener("input", cotizar);
cotizar();

const pago = document.querySelector("#pago");
const pagoVista = document.querySelector("#pago-vista");
const pagoMarca = document.querySelector("#pago-marca");
const pagoNumero = document.querySelector("#pago-numero");
const pagoNombre = document.querySelector("#pago-nombre");
const pagoVence = document.querySelector("#pago-vence");
const pagoEstado = document.querySelector("#pago-estado");

const enGruposDeCuatro = (texto) => (texto.match(/.{1,4}/g) || []).join(" ");

const detectarMarca = (numero) => {
    const dosPrimeros = Number(numero.slice(0, 2));
    if (numero.startsWith("4")) {
        return "Visa";
    }
    if (dosPrimeros >= 51 && dosPrimeros <= 55) {
        return "Mastercard";
    }
    return "Tarjeta";
};

pagoNumero.addEventListener("input", () => {
    const soloNumeros = pagoNumero.value.replace(/[^0-9]/g, "").slice(0, 16);
    pagoNumero.value = enGruposDeCuatro(soloNumeros);
    document.querySelector("#pago-vista-numero").textContent = enGruposDeCuatro(soloNumeros.padEnd(16, "•"));

    const marca = detectarMarca(soloNumeros);
    pagoMarca.textContent = marca;
    pagoVista.dataset.marca = marca.toLowerCase();
});

pagoNombre.addEventListener("input", () => {
    document.querySelector("#pago-vista-nombre").textContent = pagoNombre.value.toUpperCase() || "NOMBRE APELLIDO";
});

pagoVence.addEventListener("input", () => {
    const numeros = pagoVence.value.replace(/[^0-9]/g, "").slice(0, 4);
    pagoVence.value = numeros.length > 2 ? `${numeros.slice(0, 2)}/${numeros.slice(2)}` : numeros;
    document.querySelector("#pago-vista-vence").textContent = pagoVence.value || "MM/AA";
});

pago.addEventListener("submit", (event) => {
    event.preventDefault();
    pagoEstado.textContent = `Pago aprobado con ${pagoMarca.textContent} terminada en ${pagoNumero.value.slice(-4)}.`;
});

const ciudadesPorPais = {
    ar: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
    cl: ["Santiago", "Valparaíso", "Concepción"],
    mx: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla"],
    pe: ["Lima", "Arequipa", "Trujillo", "Cusco"],
};
const envioPais = document.querySelector("#envio-pais");
const envioCiudad = document.querySelector("#envio-ciudad");
const envioPlazo = document.querySelector("#envio-plazo");

envioPais.addEventListener("change", () => {
    const ciudades = ciudadesPorPais[envioPais.value] || [];
    envioCiudad.innerHTML = "";
    envioCiudad.append(new Option(ciudades.length > 0 ? "Elige una ciudad" : "Primero elige un país", ""));
    for (const ciudad of ciudades) {
        envioCiudad.append(new Option(ciudad, ciudad));
    }
    envioCiudad.disabled = ciudades.length === 0;
    envioPlazo.textContent = "";
});

envioCiudad.addEventListener("change", () => {
    const pais = envioPais.options[envioPais.selectedIndex].text;
    envioPlazo.textContent = envioCiudad.value ? `Envío a ${envioCiudad.value}, ${pais}: llega en 3 a 5 días.` : "";
});

const buscadorTexto = document.querySelector("#buscador-texto");
const buscadorTotal = document.querySelector("#buscador-total");
const buscadorVacio = document.querySelector("#buscador-vacio");
const personas = [...document.querySelectorAll("#buscador-lista li")];

const normalizar = (texto) => texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const filtrarDirectorio = () => {
    const busqueda = normalizar(buscadorTexto.value.trim());
    let visibles = 0;
    for (const persona of personas) {
        const coincide = normalizar(persona.textContent).includes(busqueda);
        persona.hidden = !coincide;
        if (coincide) {
            visibles++;
        }
    }
    buscadorTotal.textContent = `${visibles} de ${personas.length} personas`;
    buscadorVacio.hidden = visibles > 0;
};

buscadorTexto.addEventListener("input", filtrarDirectorio);
filtrarDirectorio();

const encuesta = document.querySelector("#encuesta");
const pasos = [...encuesta.querySelectorAll(".paso")];
const encuestaProgreso = document.querySelector("#encuesta-progreso");
const encuestaAtras = document.querySelector("#encuesta-atras");
const encuestaSiguiente = document.querySelector("#encuesta-siguiente");
const encuestaEnviar = document.querySelector("#encuesta-enviar");
const encuestaResumen = document.querySelector("#encuesta-resumen");
let pasoActual = 0;

const mostrarPaso = (numero) => {
    pasoActual = numero;
    pasos.forEach((paso, i) => {
        paso.hidden = i !== numero;
    });
    const esUltimo = numero === pasos.length - 1;
    encuestaAtras.hidden = numero === 0;
    encuestaSiguiente.hidden = esUltimo;
    encuestaEnviar.hidden = !esUltimo;
    encuestaProgreso.textContent = `Paso ${numero + 1} de ${pasos.length}`;
};

const pasoValido = () => {
    const campos = [...pasos[pasoActual].querySelectorAll("input, select, textarea")];
    return campos.every((campo) => campo.reportValidity());
};

encuestaSiguiente.addEventListener("click", () => {
    if (pasoValido()) {
        mostrarPaso(pasoActual + 1);
    }
});

encuestaAtras.addEventListener("click", () => {
    mostrarPaso(pasoActual - 1);
});

encuesta.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pasoValido()) {
        return;
    }
    const datos = new FormData(encuesta);
    const filas = encuestaResumen.querySelector("tbody");
    filas.innerHTML = "";
    for (const campo of Object.keys(Object.fromEntries(datos))) {
        const fila = filas.insertRow();
        fila.insertCell().textContent = campo;
        fila.insertCell().textContent = datos.getAll(campo).join(", ");
    }
    encuestaResumen.hidden = false;
    encuesta.reset();
    mostrarPaso(0);
});
