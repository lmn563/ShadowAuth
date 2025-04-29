# ShadowAuth (AdGuardian Extension)

ShadowAuth es un proyecto académico y de demostración que explora cómo una extensión de navegador aparentemente legítima puede ser utilizada para capturar cookies de sesión en navegadores web modernos, evidenciando riesgos reales de seguridad para usuarios finales.

> Nota importante: Este proyecto es un Proof of Concept (PoC) desarrollado únicamente con fines educativos y de concienciación en ciberseguridad. No ejecuta ataques efectivos ni envía datos reales a servidores externos.

## Tabla de Contenidos

- Descripción
- Objetivos del Proyecto
- Instalación
- Uso
- Estructura del Proyecto
- Tecnologías Utilizadas
- Funcionalidades
- Riesgos de Seguridad Demostrados
- Consideraciones Éticas
- Contribución
- Licencia

## Descripción

ShadowAuth actúa como una extensión de navegador que simula un bloqueador de anuncios ("AdGuardian"), mientras demuestra técnicas de captura de cookies de sesión utilizando APIs legítimas del navegador.  
Este proyecto busca mostrar la importancia de auditar permisos y revisar cuidadosamente extensiones instaladas.

## Objetivos del Proyecto

- Desarrollar una extensión realista que funcione como un bloqueador de anuncios efectivo.
- Demostrar técnicas de captura de cookies de sesión accesibles vía API.
- Concienciar sobre los riesgos asociados a permisos excesivos en extensiones de navegador.
- Aplicar buenas prácticas de desarrollo y documentación profesional.

## Instalación

Sigue los siguientes pasos para configurar y ejecutar la extensión en tu navegador de manera local.

### Prerrequisitos

- Navegador Google Chrome o basado en Chromium compatible con Manifest V3.
- Editor de código (por ejemplo, Visual Studio Code).

### Clonar el Repositorio

```bash
git clone https://github.com/tu_usuario/shadowauth.git
cd shadowauth
```

### Cargar la Extensión en el Navegador

1. Abre Chrome y accede a `chrome://extensions/`.
2. Activa el modo de desarrollador.
3. Haz clic en "Cargar descomprimida" y selecciona la carpeta `ShadowAuth/`.

La extensión estará lista para usarse en modo de prueba.

## Uso

Una vez cargada:

- ShadowAuth bloqueará solicitudes de anuncios básicos.
- Capturará cookies de sesión que no estén marcadas como `HttpOnly`.
- Las cookies capturadas serán almacenadas de forma segura en el almacenamiento local del navegador.

Este comportamiento puede ser auditado utilizando la consola de desarrollador (`background` y `popup`).

## Estructura del Proyecto

```
ShadowAuth/          
│
├── README.md               # Documentación principal
├── LICENSE                 # Licencia del proyecto
├── manifest.json           # Configuración de la extensión
│
├── src/                    
│   ├── background.js       # Captura y gestión de cookies
│   ├── content.js          # Código de inyección opcional
│   ├── popup/              
│   │   ├── popup.html      # Interfaz gráfica
│   │   ├── popup.css       # Estilos
│   │   └── popup.js        # Lógica de la interfaz
│   ├── assets/             
│   │   ├── icon128.png     # Ícono de alta resolución
│   │   └── icon48.png      # Ícono de baja resolución
│   └── util/               
│       └── cookieManager.js # Librería para gestión de cookies
│
├── docs/                   
│   ├── defense_against.md  # Documento de defensa contra ataques
│   ├── attack_flowchart.md # Diagrama de flujo del ataque
│   ├── installation.md     # Manual de instalación
│   └── explanation.md      # Explicación detallada
```

## Tecnologías Utilizadas

- Manifest V3 para extensiones Chrome modernas.
- JavaScript ES6+.
- APIs de Chrome: `cookies`, `tabs`, `webRequest`, `storage`.
- HTML5 y CSS3 para la interfaz gráfica.
- Markdown (`.md`) para documentación técnica.

## Funcionalidades

### Funcionalidades legítimas

- Bloqueo de anuncios mediante filtrado de peticiones HTTP.
- Interfaz de usuario amigable con estadísticas de bloqueo.

### Funcionalidades de demostración

- Captura de cookies de sesión no marcadas como `HttpOnly`.
- Almacenamiento local de cookies capturadas de forma segura.
- Simulación documentada de posibles métodos de exfiltración (sin ejecución real).

## Riesgos de Seguridad Demostrados

- Solicitud de permisos de alto riesgo como `cookies`, `webRequest` y `tabs`.
- Acceso en segundo plano a información sensible del navegador.
- Generación de una falsa sensación de confianza en el usuario final.

## Consideraciones Éticas

ShadowAuth fue desarrollado siguiendo principios de ética y responsabilidad:

- No envía datos a servidores externos.
- No realiza explotación activa de vulnerabilidades.
- Se recomienda utilizarlo únicamente en entornos de laboratorio o educativos.

## Contribución

Si deseas contribuir a mejorar el proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Descripción de cambios'`).
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request describiendo tus cambios.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.  
Consulta el archivo `LICENSE` para más detalles.