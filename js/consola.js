const logOriginal = console.log;
let salidaActual = null;

console.log = (...valores) => {
    logOriginal(...valores);
    if (salidaActual) {
        salidaActual.textContent += valores.map(formatear).join(" ") + "\n";
    }
};

function formatear(valor) {
    if (valor === null || typeof valor !== "object") {
        return String(valor);
    }
    if (valor instanceof Map || valor instanceof Set) {
        return `${valor.constructor.name}(${JSON.stringify([...valor])})`;
    }
    try {
        return JSON.stringify(valor);
    } catch {
        return String(valor);
    }
}

function ejecutar(id, codigo) {
    const seccion = document.getElementById(id);
    const boton = seccion.querySelector(".ejecutar");
    const salida = seccion.querySelector(".consola");

    boton.addEventListener("click", async () => {
        salida.textContent = "";
        salidaActual = salida;
        try {
            await codigo();
        } catch (error) {
            salida.textContent += `❌ ${error.name}: ${error.message}\n`;
        } finally {
            if (salidaActual === salida) {
                salidaActual = null;
            }
        }
    });
}
