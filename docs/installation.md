Si quieres probar la extensión en tu navegador Chrome, sigue estos pasos para cargarla manualmente y verificar que todo funcione como debería.

1. Cargar la extensión

Primero, necesitas abrir Chrome y escribir en la barra de direcciones:
chrome://extensions/

Una vez allí, activa el Modo de desarrollador, que aparece en la esquina superior derecha de la página.

Después, haz clic en el botón que dice "Cargar descomprimida". Esto te permitirá seleccionar la carpeta donde guardaste los archivos de tu extensión. Asegúrate de haber descomprimido el proyecto si estaba en un archivo .zip.

Chrome cargará la extensión y deberías verla en la lista, lista para ser usada.

2. Probar que funciona

Para comprobar que todo está funcionando correctamente:

    Abre una página web que contenga anuncios, como algún sitio de noticias conocido.

    Usa las herramientas de desarrollador (puedes abrirlas con F12 o haciendo clic derecho y seleccionando "Inspeccionar") y ve a la pestaña Network.

    Ahí podrás buscar si las solicitudes relacionadas con anuncios están siendo bloqueadas por tu extensión.

Además, si tu extensión gestiona cookies:

    Intenta acceder a ellas desde el popup de la extensión o directamente desde la consola del navegador.

    Asegúrate de que las cookies se estén guardando y mostrando correctamente.

    Prueba a eliminar alguna cookie desde la interfaz (o mediante código, si lo estás haciendo así) y verifica que el cambio se refleja en el almacenamiento local.

3. Revisar posibles errores

Si notas que algo no está funcionando bien, puedes agregar console.log() en tu código para depurar. Para ver estos mensajes, abre nuevamente las herramientas de desarrollador y entra en la pestaña Console. Desde ahí podrás revisar los logs y detectar si hay errores o comportamientos inesperados.