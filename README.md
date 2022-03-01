# Fast-Buy


## Instrucciones 
Para ejecutar el proyecto es necesario crear un la raíz de la carpeta api un archivo .env con la misma estructura del archivo example.evn con las siguientes variables de entorno: PORT que hace referencia al puerto en el que corre el servidor,  y los siguientes datos son para que se pueda conectar a la base de datos DB_USER que identifica el usuario, DB_PASSWORD es la clave de usuario DB_HOST es el host de la base de datos y por ultimo DB_PORT que es el puerto, y por ultimo SECRET_JWT_SEED que será la llave para generar los token de autenticación 

## Ejecución 

Con el comando ## `npm run dev` ubicado en la carpeta api  dentro del proyecto podrá correr el proyecto 


## Rutas 
Las rutas dependerán de la variable que asigne en la variable PORT en el archivo . env , por ejemplo (http://localhost:${PORT}), o (http://localhost:3001) el cual será la base de los servicios disponibles 


## Servicios de Autenticación 

POST(http://localhost:${PORT}/auth/new) 
Función : este servicio sirve para agregar un empleado a la base de datos y de acuerdo al rol que se le asigne tendrá ciertos accesos. </br>
Solicitud : para acceder a este servicio será necesario que el usuario este logueado, y su rol sea de ADMIN_ROLE ,  adicionalmente debe enviar en la solicitud los campos de name , email, password y rol del nuevo funcionario de la compañía , además se deberá enviar un objeto llamado admin con la propiedad email. </br>

POST(http://localhost:${PORT}/auth/login) </br>
Función : este servicio sirve para autenticar a los distintos funcionarios de la compañía y puedan acceder a las funcionales que correspondan a su cargo.</br>
Solicitud : para acceder a este servicio será necesario enviar email y la password.</br>

GET(http://localhost:${PORT}/auth/renew) </br>
Función : este servicio sirve para renovar el token de autenticación </br>

## Servicios para el manejo de ordenes 

GET(http://localhost:${PORT}/orders/allOrders) </br>
Función : este servicio sirve para  traer todas las ordenes , si se le envía por query  el estado de la solicitud  traerá todas la que coincida con ese estado.</br>
Solicitud : para acceder a este servicio será necesario que el usuario este logueado.</br>

PUT(http://localhost:${PORT}/orders/dispatchOrders) </br>
Función : este servicio sirve para cambiar el estado de una función en específico, con el fin de darle seguimiento a los pedidos facturados por la compañía, este servicio podrá solicitado por los funcionarios de la empresa para actualizar la información del pedido cuando sea facturado, empacado, despachado o entrego al cliente. </br>
Solicitud : para acceder a este servicio será necesario que el funcionario se encuentre logeado y cuente con el rol de DISTRIBUTION_ROLE, adicionalmente  es  necesario enviar el id de la orden a utilizar, su nuevo estado y un objeto llamado asesor con la propiedad email con el email del asesor que hace la actualización de la orden  .</br>

POST(http://localhost:${PORT}/orders/addNewOrder) </br>
Función : este servicio sirve para agregar una nueva orden y facturar un nuevo pedido no es necesario estar logueado con el fin que los clientes desde la aplicación web pueda gestionar su compra de forma fácil y rápida identificado la orden generada por la tienda web, si la orden es generada por los asesores presenciales  de la compañía  registrara la orden con su nombre con el fin de gestionar las ventas y datos relevantes correlacionados con el personal de ventas. </br>
Solicitud : para acceder a este servicio será necesario enviar los siguientes datos el nombre, identificación, dirección del cliente y los productos seleccionados por el mismo. </br>

## Servicios para la gestión de los productos  </br>
GET(http://localhost:${PORT}/products/allProduct)  </br>
Función : este servicio sirve para  traer todos los productos , si se le envía por query  la categoria de la solicitud  traerá todas la que coincida con esa categoría.  </br>

POST(http://localhost:${PORT}/products/addNewProduct)  </br>
Función: este servicio sirve para agregar un nuevo producto al catálogo.  </br>
Solicitud: para acceder a este servicio será necesario  tener el rol de ADMIN_ROLE  y estar autenticado , además enviar los siguientes datos el nombre , unidades disponibles , con el fin de gestionar el inventario , precio al público, descuento , categoría y admin que será un  objeto con el email con el fin de controlar quien puede agregar productos al catalogo de la compañía  </br>

