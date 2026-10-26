/* Chatbot académico básico para GitHub Pages.
   No usa API, no necesita npm y no envía mensajes a ningún servidor.
   En cada página puedes indicar el curso con: <body data-curso="taller-apps">
   Para el otro portafolio usa: <body data-curso="otro-portafolio">
*/
(function () {
  if (document.getElementById('chatbot-academico')) return;

  const curso = (document.body.dataset.curso || 'taller-apps').toLowerCase();
  const scriptUrl = document.currentScript && document.currentScript.src;
  const scriptDir = scriptUrl ? scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1) : 'js/';
  const robotImage = scriptDir + 'chatbot-robot.png';

  const bases = {
    'taller-apps': [
      { k: ['taller de apps', 'curso', 'portafolio'], t: 'Sobre Taller de Apps', r: 'Este portafolio reúne actividades, informes y proyectos desarrollados durante el curso de Taller de Apps, organizados por semanas y unidades. Puedes preguntarme por desarrollo web, Java, Maven, bases de datos o el sistema de gestión de productos NÉBULA.' },
      { k: ['html', 'estructura web', 'pagina web'], t: 'HTML', r: 'HTML es el lenguaje de marcado que organiza el contenido de una página web. Sus etiquetas permiten definir títulos, párrafos, enlaces, imágenes, formularios y secciones. HTML define la estructura; CSS se encarga principalmente de la presentación y JavaScript de la interacción.' },
      { k: ['css', 'estilos', 'diseño web'], t: 'CSS', r: 'CSS se utiliza para dar presentación a una página web: colores, fuentes, márgenes, distribución, tamaños y adaptación a diferentes pantallas. Se puede guardar en un archivo .css y vincularlo al HTML mediante la etiqueta link.' },
      { k: ['javascript', ' interacción', 'interactividad'], t: 'JavaScript', r: 'JavaScript permite añadir comportamiento a una página web, por ejemplo responder a clics, validar formularios, mostrar u ocultar elementos y actualizar contenido sin recargar toda la página.' },
      { k: ['java', 'lenguaje java'], t: 'Java', r: 'Java es un lenguaje de programación orientado a objetos. En una aplicación web puede utilizarse para implementar la lógica del servidor, procesar solicitudes, validar datos y comunicarse con una base de datos.' },
      { k: ['maven', 'pom.xml', 'dependencias'], t: 'Maven', r: 'Maven es una herramienta de construcción y gestión de proyectos Java. El archivo pom.xml declara información del proyecto, dependencias, complementos y configuración para compilar y empaquetar la aplicación.' },
      { k: ['sql server', 'sql', 'consulta sql'], t: 'SQL Server y SQL', r: 'SQL Server es un sistema gestor de bases de datos relacionales. SQL permite crear y consultar tablas, insertar registros, actualizarlos y eliminarlos. Por ejemplo, SELECT permite consultar datos; INSERT agrega registros; UPDATE modifica y DELETE elimina.' },
      { k: ['base de datos', 'base datos', 'tabla', 'relacional'], t: 'Bases de datos relacionales', r: 'Una base de datos relacional organiza información en tablas formadas por filas y columnas. Las claves primarias identifican registros y las claves foráneas relacionan tablas, ayudando a mantener la integridad de los datos.' },
      { k: ['modelo relacional', 'relaciones', 'clave primaria', 'clave foranea'], t: 'Modelo relacional', r: 'El modelo relacional organiza los datos en tablas relacionadas. Una clave primaria identifica de forma única cada fila; una clave foránea referencia una clave de otra tabla para representar una relación.' },
      { k: ['nebula', 'nébula', 'sistema de gestion', 'inventario', 'producto', 'stock'], t: 'Sistema NÉBULA', r: 'El proyecto NÉBULA es una tienda/sistema de gestión de productos. Un sistema de inventario registra productos y existencias; los movimientos permiten llevar control de entradas y salidas. En el proyecto también se consideran ventas y detalles de venta para registrar qué productos se venden y en qué cantidades.' },
      { k: ['frontend', 'front end', 'interfaz'], t: 'Frontend', r: 'El frontend es la parte de una aplicación con la que interactúa la persona usuaria. En una página web suele construirse con HTML para la estructura, CSS para la presentación y JavaScript para la interacción.' },
      { k: ['backend', 'back end', 'logica del servidor'], t: 'Backend', r: 'El backend es la parte que procesa la lógica de la aplicación, valida datos y puede comunicarse con una base de datos. En una aplicación Java web, parte de esa lógica puede estar en Servlets y clases de servicio.' },
      { k: ['crud', 'crear leer actualizar eliminar'], t: 'Operaciones CRUD', r: 'CRUD resume cuatro operaciones habituales sobre datos: Create (crear), Read (consultar), Update (actualizar) y Delete (eliminar). En SQL suelen corresponder a INSERT, SELECT, UPDATE y DELETE. Antes de eliminar o actualizar, conviene validar los datos y comprobar qué registro será afectado.' },
      { k: ['select', 'consultar datos'], t: 'SELECT', r: 'SELECT consulta datos de una o varias tablas. Ejemplo: SELECT nombre, precio FROM producto; devuelve las columnas nombre y precio de la tabla producto. WHERE permite filtrar los registros que cumplen una condición.' },
      { k: ['insert', 'insert into', 'insertar datos'], t: 'INSERT', r: 'INSERT INTO agrega filas a una tabla. Ejemplo: INSERT INTO producto (codigo, nombre, precio) VALUES (\'P01\', \'Laptop\', 2500); Los nombres de columnas y los tipos de valores deben coincidir con la estructura real de la tabla.' },
      { k: ['update', 'actualizar datos'], t: 'UPDATE', r: 'UPDATE modifica registros existentes. Ejemplo: UPDATE producto SET precio = 2600 WHERE codigo = \'P01\'; La cláusula WHERE es importante: sin ella, se actualizarían todas las filas de la tabla.' },
      { k: ['delete', 'eliminar datos'], t: 'DELETE', r: 'DELETE elimina filas de una tabla. Ejemplo: DELETE FROM producto WHERE codigo = \'P01\'; Antes de ejecutar una eliminación, verifica la condición WHERE y considera restricciones de claves foráneas o una transacción.' },
      { k: ['where', 'filtro sql', 'condicion sql'], t: 'WHERE en SQL', r: 'WHERE filtra los registros que cumplen una condición. Por ejemplo, SELECT * FROM producto WHERE stock > 0; muestra productos con stock mayor que cero. También se puede combinar condiciones con AND y OR.' },
      { k: ['primary key', 'clave primaria'], t: 'Clave primaria', r: 'Una clave primaria identifica de forma única cada registro de una tabla. No debe repetirse y no admite valores nulos. Puede ser una columna, como codigo, o un identificador numérico, según el diseño de la base de datos.' },
      { k: ['foreign key', 'clave foranea', 'clave foránea'], t: 'Clave foránea', r: 'Una clave foránea conecta registros entre tablas y ayuda a mantener la integridad referencial. Por ejemplo, detalle_venta puede incluir el identificador de una venta y el código del producto vendido.' },
      { k: ['normalizacion', 'normalización', 'normalizar tablas'], t: 'Normalización de bases de datos', r: 'La normalización organiza los datos para reducir duplicaciones y evitar anomalías al insertar, actualizar o eliminar información. Una idea básica es separar entidades diferentes en tablas relacionadas, en lugar de repetir todos los datos en una sola tabla.' },
      { k: ['join', 'inner join', 'unir tablas'], t: 'JOIN en SQL', r: 'JOIN combina datos relacionados de dos o más tablas. Por ejemplo, una consulta puede unir venta con detalle_venta mediante el identificador de venta para mostrar qué artículos pertenecen a cada venta. La condición ON indica cómo se relacionan.' },
      { k: ['servidor tomcat', 'apache tomcat'], t: 'Apache Tomcat', r: 'Apache Tomcat es un servidor/contenedor web que ejecuta aplicaciones Java basadas en tecnologías como Servlets y JSP. La aplicación se despliega en Tomcat y el navegador accede a ella mediante una dirección HTTP.' },
      { k: ['jsp', 'java server pages'], t: 'JSP', r: 'JSP permite generar páginas web desde el servidor Java. Se utiliza principalmente para la vista que presenta información al usuario. Es recomendable evitar colocar toda la lógica de negocio directamente en la JSP y mantenerla en clases o servicios.' },
      { k: ['servlet', 'servlets', 'solicitud http'], t: 'Servlet', r: 'Un Servlet Java recibe y procesa solicitudes HTTP. Puede leer parámetros de un formulario, llamar a un servicio, guardar datos en sesión y dirigir la respuesta a una página. doGet suele atender consultas y doPost se usa frecuentemente para enviar formularios que modifican datos.' },
      { k: ['mvc', 'modelo vista controlador'], t: 'Patrón MVC', r: 'MVC separa una aplicación en Modelo (datos y reglas), Vista (interfaz) y Controlador (coordina solicitudes y respuestas). Esta separación facilita mantener el proyecto, porque la presentación no necesita contener toda la lógica de negocio.' },
      { k: ['sesion', 'session', 'session scope', 'sesion de usuario'], t: 'Sesiones en aplicaciones web', r: 'Una sesión permite conservar información asociada a una persona entre varias solicitudes, por ejemplo su identificador o rol después de iniciar sesión. Los datos sensibles no deben mostrarse en la interfaz y las sesiones deben cerrarse al salir.' },
      { k: ['login', 'iniciar sesion', 'autenticacion', 'autenticar usuario'], t: 'Inicio de sesión', r: 'El inicio de sesión comprueba las credenciales de una persona. En una aplicación real, las contraseñas deben almacenarse con hash seguro, no como texto plano. Después de autenticar, el sistema puede usar el rol para decidir qué funciones autorizar.' },
      { k: ['rol', 'roles', 'autorizacion', 'administrador vendedor cliente'], t: 'Roles y permisos', r: 'Los roles permiten diferenciar permisos. Por ejemplo, un administrador puede gestionar productos e inventario, mientras que un vendedor puede registrar ventas. No basta con ocultar enlaces: el servidor también debe verificar los permisos antes de ejecutar cada acción.' },
      { k: ['inventario', 'stock', 'movimiento inventario', 'entrada salida'], t: 'Control de inventario', r: 'El inventario registra qué productos existen y cuántas unidades hay disponibles. Las entradas aumentan las existencias y las salidas las disminuyen. Registrar los movimientos ayuda a explicar por qué cambia el stock y detectar diferencias.' },
      { k: ['venta', 'detalle venta', 'registrar venta'], t: 'Ventas y detalle de venta', r: 'Una tabla venta suele guardar los datos generales de una operación, como fecha y total. detalle_venta guarda las líneas de productos, cantidades y precios aplicados. Separarlas permite que una venta contenga varios productos sin repetir los datos generales en cada línea.' },
      { k: ['validacion', 'validar formulario', 'campos obligatorios'], t: 'Validación de formularios', r: 'Validar un formulario significa comprobar que los datos sean correctos antes de procesarlos: campos obligatorios, formatos, cantidades positivas y límites razonables. La validación del navegador mejora la experiencia, pero el servidor también debe validar porque los datos enviados pueden modificarse.' },
      { k: ['conexion base de datos', 'jdbc', 'conexion sql server'], t: 'Conexión Java con una base de datos', r: 'JDBC permite que una aplicación Java se conecte a una base de datos mediante un controlador. Normalmente se configura una URL de conexión y credenciales, se ejecutan consultas parametrizadas y se cierran los recursos. No se deben concatenar directamente datos del usuario en consultas SQL; se prefieren parámetros para reducir el riesgo de inyección SQL.' },
      { k: ['inyeccion sql', 'sql injection'], t: 'Inyección SQL', r: 'La inyección SQL ocurre cuando datos introducidos por el usuario se interpretan como parte de una consulta SQL. Para reducir el riesgo, usa consultas parametrizadas con PreparedStatement, valida los datos y aplica permisos mínimos a la cuenta de base de datos.' },
      { k: ['error 404', 'pagina no encontrada'], t: 'Error 404', r: 'Un error 404 indica que el servidor no encontró el recurso solicitado. Comprueba que el nombre del archivo y la ruta sean correctos, que las mayúsculas coincidan y que los enlaces relativos apunten al lugar adecuado.' },
      { k: ['github pages', 'publicar portafolio', 'desplegar pagina estatica'], t: 'GitHub Pages', r: 'GitHub Pages permite publicar sitios estáticos compuestos por HTML, CSS, JavaScript e imágenes desde un repositorio. No ejecuta directamente código de servidor como Java Servlet ni mantiene secretos seguros en el navegador. Las rutas de archivos deben ser correctas para que funcionen las páginas y sus recursos.' },
      { k: ['explicalo sencillo', 'explicamelo sencillo', 'como si fuera principiante', 'paso a paso', 'en palabras simples'], t: 'Explicación sencilla', r: 'Claro. Dime qué concepto específico quieres entender y te lo explicaré con palabras sencillas, un ejemplo cotidiano y luego un ejemplo relacionado con una página web o una base de datos.' },
      { k: ['dame un ejemplo', 'ejemplo practico', 'ejemplo sencillo'], t: 'Ejemplo práctico', r: 'Puedo darte un ejemplo práctico del tema. Escribe el concepto concreto, por ejemplo “clave foránea”, “Servlet”, “CRUD” o “control de inventario”, y lo relacionaré con una situación sencilla.' },
      { k: ['azure', 'microsoft azure', 'nube'], t: 'Microsoft Azure', r: 'Microsoft Azure es una plataforma de servicios en la nube. Según el servicio utilizado, permite desplegar aplicaciones, alojar recursos y administrar servicios sin tener toda la infraestructura física local.' },
      { k: ['aplicacion web', 'aplicación web', 'servidor', 'tomcat', 'jsp', 'servlet'], t: 'Aplicaciones web Java', r: 'Una aplicación web Java puede usar JSP para generar vistas, Servlets para recibir solicitudes HTTP y procesar acciones, y un servidor como Tomcat para ejecutar la aplicación. El navegador muestra la interfaz y el servidor procesa la lógica que corresponda.' },
      { k: ['explica', 'ejemplo', 'no entiendo', 'mas sencillo', 'más sencillo', 'duda'], t: 'Puedo explicarlo paso a paso', r: 'Escribe el nombre del tema o pega la pregunta concreta. Por ejemplo: “Explícame qué es una clave primaria”, “¿Para qué sirve Maven?” o “¿Cómo funciona el inventario?”. Te daré una explicación sencilla basada en los temas incluidos en este chatbot.' }
    ],
    'otro-portafolio': [
      { k: ['ayuda', 'temas', 'curso', 'unidad', 'semana', 'explica', 'duda'], t: 'Asistente del otro portafolio', r: 'Puedo ayudarte con las explicaciones que se agreguen a la base de conocimientos de este curso. Por ahora, esta sección necesita que se incorporen los temas concretos de sus unidades. Si tu pregunta no coincide con un tema cargado, revisa la unidad correspondiente o consulta a tu docente.' }
    ]
  };

  const knowledge = bases[curso] || bases['taller-apps'];
  const style = document.createElement('style');
  style.textContent = `
  #chatbot-academico{position:fixed;right:22px;bottom:22px;z-index:99999;font-family:Arial,Helvetica,sans-serif;color:#172033}
  #chatbot-academico *{box-sizing:border-box}
  #chatbot-academico .chat-toggle{width:76px;height:76px;border:0;border-radius:50%;background:#fff;padding:3px;box-shadow:0 8px 25px #0003;cursor:pointer;overflow:hidden;display:flex;align-items:center;justify-content:center}
  #chatbot-academico .chat-toggle img{display:block;width:100%;height:100%;object-fit:contain;border-radius:50%}
  #chatbot-academico .chat-head-profile{display:flex;align-items:center;gap:10px}
  #chatbot-academico .chat-avatar{width:42px;height:42px;object-fit:contain;background:#fff;border-radius:50%;padding:2px;flex-shrink:0}
  #chatbot-academico .chat-window{display:none;position:absolute;right:0;bottom:72px;width:min(360px,calc(100vw - 32px));height:480px;max-height:calc(100vh - 115px);background:#fff;border:1px solid #dbe3ef;border-radius:18px;box-shadow:0 16px 50px #10233d30;overflow:hidden;flex-direction:column}
  #chatbot-academico .chat-window.open{display:flex}
  #chatbot-academico .chat-head{background:#183153;color:#fff;padding:15px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px}
  #chatbot-academico .chat-head strong{display:block;font-size:15px}
  #chatbot-academico .chat-head small{display:block;opacity:.8;margin-top:4px;font-size:11px}
  #chatbot-academico .chat-close{border:0;background:transparent;color:#fff;font-size:23px;cursor:pointer}
  #chatbot-academico .chat-messages{flex:1;padding:14px;overflow:auto;background:#f6f8fc}
  #chatbot-academico .chat-msg{padding:10px 12px;border-radius:13px;margin:0 0 10px;max-width:90%;font-size:13px;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere}
  #chatbot-academico .chat-msg.bot{background:#fff;border:1px solid #e2e8f0;margin-right:auto}
  #chatbot-academico .chat-msg.user{background:#dceafe;color:#183153;margin-left:auto}
  #chatbot-academico .chat-suggestions{display:flex;gap:6px;flex-wrap:wrap;padding:0 12px 10px;background:#f6f8fc}
  #chatbot-academico .chat-suggestions button{border:1px solid #cbd7e8;background:#fff;color:#183153;border-radius:20px;padding:6px 9px;font-size:11px;cursor:pointer}
  #chatbot-academico .chat-form{display:flex;gap:7px;padding:11px;border-top:1px solid #e2e8f0;background:#fff}
  #chatbot-academico .chat-input{min-width:0;flex:1;border:1px solid #cbd5e1;border-radius:11px;padding:11px;font-size:13px;outline:none}
  #chatbot-academico .chat-input:focus{border-color:#5279ad}
  #chatbot-academico .chat-send{border:0;border-radius:11px;background:#183153;color:#fff;padding:0 13px;font-size:13px;cursor:pointer}
  #chatbot-academico .chat-note{text-align:center;font-size:10px;color:#718096;padding:0 10px 8px;background:#fff}
  @media(max-width:480px){#chatbot-academico{right:14px;bottom:14px}#chatbot-academico .chat-window{right:-4px;bottom:70px;height:min(480px,calc(100vh - 100px))}#chatbot-academico .chat-toggle{width:64px;height:64px}}
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'chatbot-academico';
  root.innerHTML = `
    <section class="chat-window" aria-label="Chatbot académico" aria-live="polite">
      <header class="chat-head"><div class="chat-head-profile"><img class="chat-avatar" src="${robotImage}" alt="Robot asistente"><div><strong>Asistente académico</strong><small>Consultas sobre los temas del portafolio</small></div></div><button class="chat-close" type="button" aria-label="Cerrar chat">×</button></header>
      <div class="chat-messages"></div>
      <div class="chat-suggestions"><button type="button" data-q="Explícame las bases de datos">Bases de datos</button><button type="button" data-q="¿Para qué sirve Maven?">Maven</button><button type="button" data-q="Explícame el sistema Nébula">Proyecto NÉBULA</button></div>
      <form class="chat-form"><input class="chat-input" type="text" placeholder="Escribe tu pregunta..." aria-label="Escribe tu pregunta" maxlength="500" required><button class="chat-send" type="submit">Enviar</button></form>
      <div class="chat-note">Respuestas basadas en temas predefinidos; no es una IA generativa.</div>
    </section>
    <button class="chat-toggle" type="button" aria-label="Abrir asistente académico" title="Pregúntale al asistente"><img src="${robotImage}" alt="Abrir chatbot académico"></button>`;
  document.body.appendChild(root);

  const win = root.querySelector('.chat-window');
  const toggle = root.querySelector('.chat-toggle');
  const close = root.querySelector('.chat-close');
  const messages = root.querySelector('.chat-messages');
  const input = root.querySelector('.chat-input');
  const form = root.querySelector('.chat-form');

  function addMessage(text, who) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + who;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
  function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function answer(question) {
    const q = normalize(question);
    let best = null, score = 0;
    for (const item of knowledge) {
      let points = 0;
      for (const keyword of item.k) {
        const k = normalize(keyword);
        if (k && q.includes(k)) points += k.includes(' ') ? 3 : 1;
      }
      if (points > score) { score = points; best = item; }
    }
    if (best && score > 0) return best.r;
    return 'Todavía no tengo una respuesta preparada para esa pregunta. Puedes probar con un tema como HTML, CSS, JavaScript, Java, Maven, SQL Server, SELECT, claves primarias, JOIN, JSP, Servlets, MVC, JDBC, CRUD, inventario, ventas o GitHub Pages. Si quieres, formula la duda con el nombre del concepto y te indicaré lo que tengo disponible en esta versión.';
  }
  function ask(q) {
    const value = q.trim();
    if (!value) return;
    addMessage(value, 'user');
    addMessage(answer(value), 'bot');
  }
  toggle.addEventListener('click', () => { win.classList.toggle('open'); if (win.classList.contains('open')) input.focus(); });
  close.addEventListener('click', () => win.classList.remove('open'));
  form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); input.value = ''; input.focus(); });
  root.querySelectorAll('[data-q]').forEach(btn => btn.addEventListener('click', () => ask(btn.dataset.q)));
  addMessage('¡Hola! Soy tu asistente académico. Pregúntame por los temas del curso o elige una de las preguntas sugeridas. Si no tengo el tema cargado, te lo indicaré.', 'bot');
})();
