// Función para almacenar las cookies en el almacenamiento local
function storeCookies(cookies) {
    chrome.storage.local.get({ shadowAuthCookies: [] }, function(data) {
        let updatedCookies = data.shadowAuthCookies.concat(cookies);
        chrome.storage.local.set({ shadowAuthCookies: updatedCookies }, function() {
            console.log("Cookies almacenadas:", cookies);
        });
    });
}

// Función para obtener todas las cookies almacenadas
function getCookies() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("shadowAuthCookies", function(result) {
            if (chrome.runtime.lastError) {
                reject("Error al obtener las cookies almacenadas.");
            } else {
                resolve(result.shadowAuthCookies || []);
            }
        });
    });
}

// Función para eliminar cookies específicas
function deleteCookies(cookieNames) {
    chrome.storage.local.get({ shadowAuthCookies: [] }, function(data) {
        let updatedCookies = data.shadowAuthCookies.filter(cookie => !cookieNames.includes(cookie.name));
        chrome.storage.local.set({ shadowAuthCookies: updatedCookies }, function() {
            console.log("Cookies eliminadas:", cookieNames);
        });
    });
}

// Escuchar los mensajes del popup para manejar las cookies
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "storeCookies") {
        storeCookies(request.cookies);
        sendResponse({ success: true });
    } else if (request.action === "getCookies") {
        getCookies().then(cookies => {
            sendResponse({ success: true, cookies: cookies });
        }).catch(error => {
            sendResponse({ success: false, error: error });
        });
    } else if (request.action === "deleteCookies") {
        deleteCookies(request.cookieNames);
        sendResponse({ success: true });
    }
    return true;  // Para asegurar que el mensaje sea manejado de manera asincrónica
});
