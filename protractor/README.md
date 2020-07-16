# Portal Micro applicacoines Personas.


## Tecnologiás definidas para el proyecto.

Para realizar una correcta ejecucion de desarrollo y modificacion en esta aplicacion, es necesario tener en cuenta las siguientes determinaciones tecnologicas.

Se eligieron las siguientes herramientas para la ejecucion y puesta en marcha de este proyecto.

  1. **Npm** como gestor de paquetes de javascript ( typescript ) y CSS. 

  2. **Angular** como framework frontend base para la elección del resto de las tecnologías utilizadas (se debe tener en cuenta las herramientas necesarias que surgen del uso de **angular**); para mayor informacion acerca de las extensiones (plugins) y librerias adicionales para este proyecto, por favor dirijase al archivo registro de paquetes (npm) `package.json`.

  3. **SASS/SCSS:** preprocesador CSS, click [aquí](https://sass-lang.com/documentation) para obtener mas informacion.

  4. **Bootstrap** como libreria de estilo con su version mas reciente.


## Definiciones del tecnicas del proyecto

  1. **Arquitectura Frontend:** este proyecto esta implementado usando la arquitectura basada en Micro frontends por ende las unicas caracteristicas que cubre y debera cumplir son las de autorizacion, autenticacion ademas de la administracion de acceso y permisos a las diferentes micro aplicacoines que se costruyan bajo este modelo, se debera tener en cuenta que la estrategia usada para lacorrecta implementacion del contenedor de aplicaciones es con el uso de **iframes** `<iframe src="[micrositio]"></iframe>`, click [aquí](https://micro-frontends-es.org/) para obtener mas información.

  2. **Clean Programming / Clean Code (programacion limpia):** es importante resaltar que se esta tratando de seguir parametros metodologicos heredados de la arquitectura limpia por ende es necesario tener claro el concepto de programacion limpia, click [aquí](https://programacionlimpia.wordpress.com/2015/01/21/que-es-el-codigo-limpio/) para obtener mas información.
  

  3. **OOCSS:** Son conceptos aplicados en este proyecto que vienen heredados al elegir **Bootstrap** como libreria de estilo y componentes de Angular, click [aquí](https://blog.interactius.com/metodolog%C3%ADa-css-object-oriented-css-oocss-b58118935d3e) para obtenermas información.

  4. **BEM Methology**: es una metodologia y/o convencion de nombramiento aplicada en este proyecto para la maquetacion o implementacion de los Estilos CSS para las secciones y componentes de manera personalizada, click [aquí](https://soyfrontend.com/bem-metodologia-modular-css/) para obtener mas información.

  5. **Atomic Design**: es una estrategia se separan y organizan componentes por conceptos fisicos y cientificos los cuales nos ayuda a reutilizar elementos de uso comun, click [aquí](http://atomicdesign.bradfrost.com/).


## Inicializar Proyecto

Para iniciar este proyecto es necesario ejecutar a través de una consola de comandos la siguiente instrucción `ng serve` esto es con el fin de inicializar un servidor de desarrollo, luego al dirigirse a cualquier navegador con la direccion URL `http://localhost:4200/` cargará la aplicación y automaticamente se recargara cada vez que se realice algún cambio dentro de los archivos que hacen parte del proyecto.

