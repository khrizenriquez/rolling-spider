#Rolling Spider demo

Cliente web en [Vanilla JS](http://vanilla-js.com/) y [pure.css](http://purecss.io/) y servidor en nodeJS para manipular por me dio de ble (versión 4 de bluetooth) un drone, el [mini drone rolling spider](http://www.parrot.com/es/productos/rolling-spider/).

Al iniciar el servidor, por defecto esta en la ruta http://localhost:3000 y aparece esta vista

![Ingresando las credenciales](https://raw.githubusercontent.com/khrizenriquez/rolling-spider/master/public/images/demo/start.png)

El usuario puede ingresar su nombre, y una vez hecho esto, puede ingresar al panel donde aparecen las acciones que tiene el drone

![Proyecto metodología de la invesitación](https://raw.githubusercontent.com/khrizenriquez/rolling-spider/master/public/images/demo/panel1.png)

![Proyecto metodología de la invesitación](https://raw.githubusercontent.com/khrizenriquez/rolling-spider/master/public/images/demo/panel2.png)

###Video de demostración
[![Rolling Spider](http://img.youtube.com/vi/m5VyXS8ASus/0.jpg)](https://youtu.be/m5VyXS8ASus)

Por ahora recarga la pagina, pero la idea es utilizar angularJS o reactJS para evitar recargar la pagina y manipulación de rutas.

Los layouts o vistas que tiene este proyecto están con [handlebars](http://handlebarsjs.com/) y las acciones del drone se manipulan por medio de sockets, con [socket.io](http://socket.io/) de nodeJS

En el administrador esta la opción de despegar o aterrizar al mini drone, se puede agregar la opción de aterrizaje de emergencia, pero queda pendiente de momento (http://localhost:3000/rollingadmin).

![Proyecto metodología de la invesitación](https://raw.githubusercontent.com/khrizenriquez/rolling-spider/master/public/images/demo/admin.png)

##Instalación

Requisitos: 

* Tener el mini drone rolling spider
* Tener un ordenador que soporte ble

Luego de los requisitos, puedes hacer un fork al proyecto o clonarlo.

-Instalando: 

* Dentro de la carpeta del proyecto: npm install
* Seguido por bower install
* Puedes usar [hotnode](https://github.com/saschagehlich/hotnode) (si lo tienes instalado) o escribir desde la terminal node app.js

Licencia: [MIT](https://opensource.org/licenses/MIT)

Autor: Chris Enríquez
[Twitter](https://twitter.com/khrizEnriquez) ||
[Facebook](https://facebook.com/khrizenriquez)
