document.addEventListener('DOMContentLoaded', function () {
    // Referencia a los elementos del DOM
    const toggleCookiesButton = document.getElementById('toggleCookies');
    const cookiesSection = document.getElementById('cookiesSection');
    const cookiesList = document.getElementById('cookiesList');

    // Función para mostrar las cookies capturadas
    function displayCookies(capturedCookies) {
        cookiesSection.classList.toggle('hidden');

        if (cookiesSection.classList.contains('hidden')) {
            // Si las cookies están ocultas, vaciar el contenedor
            cookiesList.innerHTML = '';
        } else {
            // Si las cookies están visibles, añadir las cookies al contenedor
            cookiesList.innerHTML = capturedCookies.map(cookie => `
                <li><strong>${cookie.name}</strong> (Dominio: ${cookie.domain}): ${cookie.value}</li>
            `).join('');
        }
    }

    // Asignar el evento al botón para mostrar/ocultar las cookies
    toggleCookiesButton.addEventListener('click', function () {
        // Obtener las cookies desde el background.js
        chrome.runtime.sendMessage({ action: "getCookies" }, function(response) {
            if (response.success) {
                console.log("Cookies almacenadas:", response.cookies);
                // Mostrar cookies en el popup
                displayCookies(response.cookies);
            } else {
                console.error("Error al obtener cookies:", response.error);
            }
        });
    });
});
