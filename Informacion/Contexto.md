## Alcance:

Cubre el registro de asistencia, registro de autos y gestión de inventario. no automatizar estas tareas sólo proporciona una interfaz virtual y clara 

## Partes Interesadas:

Para el jefe esta herramienta le ayuda a tener un panorama más detallado sobre el negocio. El encargado se ve beneficiado con una herramienta eficiente y organizada, sustituyendo el papel y el desorden.

## Frontend:

* Tecnologías: React, React-dom, HTML, CSS, JS, Bootstrap.  
* Descripción: Interfaz dinámica y reactiva con componentes reutilizables, estilizada con Bootstrap para diseño responsivo.  
* **Pros:**  
  * React: Alto rendimiento, modularidad y amplia comunidad.  
  * Bootstrap: Facilita el diseño adaptable y consistente.  
  * Flexibilidad: Uso de JS moderno (ES6+).  
* **Contras**:  
  * Curva de aprendizaje: React requiere entender hooks y estado.  
  * Tamaño de bundle: Bootstrap puede añadir peso si no se usa selectivamente.

## Backend:

* Tecnologías: Express, Node.js, MySQL.  
* Descripción: API RESTful escalable con Express, base de datos relacional (MySQL) para gestión estructurada de datos.  
* **Pros**:  
  * Node.js: Eficiente para E/S asíncronas y rápido desarrollo.  
  * Express: Minimalista y flexible para rutas y middlewares.  
  * MySQL: Robustez y soporte transaccional.  
* **Contras**:  
  * MySQL: Menos flexible que NoSQL para modelos cambiantes.  
  * Configuración inicial: Requiere más configuración que alternativas como Firebase.

## Dependencias principales:

* sqlite3: Ligero para desarrollo/testing, pero no recomendado para producción.  
* express-validator: Validación segura de datos, pero añade código boilerplate.  
* React/Express/Node: Ventajas mencionadas, pero las dependencias deben actualizarse para evitar vulnerabilidades.

## Problema que Resuelve:

Pasar del registro solo a papel a un sistema que genere confianza y seguridad de los datos. Gracias al módulo de inventario se tendrá un seguimiento más ordenado y se evitará la sobre compra de productos o la falta de alguno. El módulo de asistencias proporciona un historial de las asistencias las cuales impactarán en el sueldo. El registro de autos lavados proporciona un informe semanal o mensual mas detallado.