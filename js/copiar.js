document.querySelectorAll("pre").forEach((pre) => {
    const envoltura = document.createElement("div");
    envoltura.className = "bloque-codigo";
    pre.before(envoltura);
    envoltura.append(pre);

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton-copiar";
    boton.textContent = "Copiar";
    envoltura.append(boton);

    boton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(pre.textContent);
        } catch {
            const rango = document.createRange();
            rango.selectNodeContents(pre);
            const seleccion = getSelection();
            seleccion.removeAllRanges();
            seleccion.addRange(rango);
            document.execCommand("copy");
            seleccion.removeAllRanges();
        }
        boton.textContent = "¡Copiado!";
        setTimeout(() => {
            boton.textContent = "Copiar";
        }, 1500);
    });
});
