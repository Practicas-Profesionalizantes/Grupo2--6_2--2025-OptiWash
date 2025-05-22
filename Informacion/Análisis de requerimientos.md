# Análisis de requerimientos

Sustituiremos el papel para tener una mejor gestión, el negocio podrá obtener datos más precisos, accesibles y claros gracias al sistema que será una herramienta muy útil. Teniendo como objetivo ser intuitivo y eficiente para el empleado a cargo.

## Funcionalidades Principales

El sistema es capaz de almacenar en un inventario y a base de él crear un historial de los productos utilizados en el negocio.  
También será capaz de llevar una lista de asistencias de los empleados del negocio.  
Y se encargará de llevar un registro de los autos que utilizaron los servicios de la empresa.

### Requisitos Funcionales

**Gestión de Inventario(Modulo-1):**

* Se podrá ver una tabla del inventario actual  
* Se indicará cuando hay poco insumos  
* Se podrá añadir la compra insumos  
* Se añadirán la misma cantidad de insumos semanal a no ser que se editen los valores  
* Esta tabla se actualiza diariamente(o semanalmente)  
* Historial de movimientos  
* Se podrá hacer un ajuste de inventario(edición)

**Gestión de Asistencias(Módulo-2):**

* Se podrán crear/eliminar/editar cada empleado  
* Tabla general de la semana con información resumida sobre la asistencia, vale y pago diario.   
* tabla por día, esta tabla es donde se guardaran los datos de asistencia, vale y P.D.  
* Botones en la tabla por día que habiliten la edición de la tabla. confirmar en el mismo botón.  
* en la vista general se podrá seleccionar cada dia para ingresar los datos

**Registro de Autos Lavados(Módulo-3)**:

* Se podrá crear/eliminar/editar cada Auto registrado  
* Se podrá encontrar una auto por la patente o nombre cliente o número celular  
* Se podrá ver la tabla con las patentes, modelo de auto, cliente, numero de celular

### Requisitos No Funcionales 

**Responsive Design**: Compatibilidad con móviles, tablets y desktop (a partir de pantallas de 320 px).  
**Experiencia de usuario**: Menú intuitivo con máximo 3 clics para acceder a funciones frecuentes (ej: registrar auto).   
**Protección de Rutas con IP Whitelisting**:  Como no hay login, restringe acceso por IP (ej: solo la IP de la oficina)

* 

4\. Roles y Permisos  
**Usuario**

* ¿Qué puede hacer cada usuario?  
* El usuario puede ver los productos que se encuentran en la lista de inventario, agregar productos y eliminar productos que ya se utilizaron.  
* También podrá agregar empleados a la lista de asistencia dependiendo su estado de asistencia.  
* Y por último podrá tener una lista de registro de los autos lavados en el dia y a su vez podrá agregar autos a esa lista


5\. Interfaces Clave

* Pantallas o APIs relevantes (puedes agregar bocetos o descripciones).  
* Ejemplo: "Pantalla de búsqueda de habitaciones con filtros por fecha, tipo y precio."

	  
**Inventario**  
Pantalla donde se muestre el inventario de los productos de la empresa.  
	  
Pantalla donde se pueda editar los productos del inventario, ya sea agregar o eliminar.

**Asistencia**  
Pantalla donde se pueda ver y pasar la lista de los empleados en el día y en la semana.

Pantalla que al seleccionar un dia especifico de la semana muestre detalles de los empleados como estado de asistencia de ese dia, vale(si es que hay y de cuánto) y pago diario.

**Registro de autos**  
Pantalla donde se puedan ver los autos lavados en el negocio con filtros de búsqueda por día, tipo de auto o nombre de cliente.

Pantalla donde se puedan agregar los autos lavados especificando el tipo de auto, el nombre del cliente, la patente del auto y el día se agrega de forma automática.

Optiwash será una **aplicación web** ya que permite un acceso más amplio y flexible. A diferencia de una aplicación de escritorio, una web puede ser utilizada desde cualquier dispositivo con conexión a internet, sin necesidad de instalación. Esto facilita la gestión del inventario, asistencias y registros de autos desde cualquier lugar, mejorando la eficiencia del negocio.

## Pros y contras de mi stack tecnológico

#### **Backend: Node.js, Express y MySQL**

Pros:

* Escalabilidad: Node.js maneja múltiples solicitudes simultáneamente sin bloquear procesos.  
* Rapidez: Expres simplifica la creación de APIs y servidores web.  
* Ecosistema amplio: Node.js tiene una gran comunidad y muchas librerías disponibles.  
* Base de datos confiable: MySQL es robusto y eficiente para manejar datos estructurados.

Contras:

* No ideal para cálculos pesados: Node.js no es la mejor opción para tareas intensivas en CPU.  
* Curva de aprendizaje: Express requiere una buena organización para evitar código desordenado.  
* Escalabilidad limitada: MySQL puede volverse menos eficiente con grandes volúmenes de datos.

#### **Frontend: HTML, CSS, JavaScript y React**

Pros**:**

* **I**nteractividad: JavaScript y React permiten interfaces dinámicas y rápidas.  
* Diseño responsivo: Bootstrap facilita la adaptación a distintos dispositivos.  
* Componentización: React permite reutilizar elementos, mejorando la eficiencia.

Contras:

* Carga inicial: React puede requerir más recursos en el navegador.  
* SEO: Las aplicaciones en React pueden necesitar configuración extra para optimización en buscadores.

