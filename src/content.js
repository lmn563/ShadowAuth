// Este script se ejecuta en el contexto de las páginas web que el usuario visita
console.log("ShadowAuth content script cargado");

// Para demostrar que funciona, cambia el borde del cuerpo de la página a rojo
document.body.style.border = "5px solid red";

// Escucha mensajes desde el background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "alertCookie") {
        alert("Cookie capturada: " + request.cookieName);
    }
});
