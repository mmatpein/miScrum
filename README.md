# miScrum

Proyecto con fines educativos exclusivamente.

## Objetivo

Se pretenden utilizar diferentes tecnologías de forma coordinada para obtener una
sencilla plataforma para la gestión de proyectos ágiles con la metodología Scrum.

## Historias de usuario iniciales

Las historias de partida del proyecto son las siguientes:

**HU#1.** Existe un Backlog, al que se pueden añadir Historias de usuario. Las historias de usuario contienen la siguiente información:
    * Nombre/ID
    * Descripción
    * Valor de negocio
Se puede añadir una nueva Historia de usuario al Backlog en cualquier momento. Las historias de usuario también se pueden modificar y eliminar.

**VALOR DE NEGOCIO: 1000**

**HU#2.** Un usuario puede crear un nuevo Sprint. El nombre de un nuevo Sprint, será la palabra Sprint seguido de un número autoincremental. Al crear un Sprint, éste tiene estado abierto. Un Sprint se puede cerrar, lo que quiere decir que ya no se trabajará más en él. No se puede añadir un nuevo Sprint hasta que el último Sprint esté cerrado.	

**VALOR DE NEGOCIO: 500**

**HU#3.** Un Sprint puede tener una descripción, que se puede añadir durante la creación del Sprint. También se puede editar una vez que el Sprint ya ha sido creado.	

**VALOR DE NEGOCIO: 10**

**HU#4.** Se puede asignar una Historia de usuario del backlog a un Sprint abierto. Este proceso se puede revertir mientras el Sprint siga abierto. Una vez cerrado, ya no se podrá modificar. Se debe poder consultar el Sprint backlog, para ver las Historias de usuario asignadas al Sprint.	

**VALOR DE NEGOCIO: 100**

**HU#5.** Se pueden añadir nuevas tareas a cada Historia de usuario. Una tarea contendrá la siguiente información:
    * Nombre
    * Descripción
    * Lista de pruebas de aceptación
    * Coste estimado
    * Prioridad
Una tarea se puede modificar y eliminar. Se debe poder consultar las tareas asociadas a una Historia de usuario.	

**VALOR DE NEGOCIO: 100**

**HU#6.** Se puede ver la evolución de cada Sprint mediante una tabla Kanban. En dicha tabla hay varios estados, como por ejemplo Por hacer, En proceso, Completado y No terminado. En dicha tabla se mostrarán las tareas asociadas a cada Historia de usuario. Inicialmente, las tareas aparecerán en la columno Por hacer, pero se pueden mover por la tabla Kanban.	

**VALOR DE NEGOCIO: 50**

**HU#7.** En la tabla Kanban se deben distinguir las tareas de cada Historia de usuario de alguna forma, por ejemplo, mediante un color, una etiqueta, etc. La información mostrada de cada tarea en la tabla Kanban se limitará al nombre, coste y prioridad. Si se desea conocer más detalles sobre la tarea, se puede ver su información mediante algún mecanismo (hacer clic sobre ella, botón específico, etc.).

**VALOR DE NEGOCIO: 20**

**HU#8.** Un Sprint se puede cerrar solamente cuando todas las tareas estén en estado Completado o No terminado. Si hay Historias de usuario no completadas (porque hay tareas no terminadas), se puede crear una nueva Historia de usuario en el Backlog que incluya nuevas tareas no terminadas en el Sprint anterior.	

**VALOR DE NEGOCIO: 10**

## Seguimiento del proyecto

Puedes consultar el desarrollo del proyecto a través del siguiente *Taskboard*: [miScrum](https://docs.google.com/spreadsheets/d/1J13d21_2jq0M9Lr7uFs9TeKzhXIjkNXXOup5IIdqsZo/edit?usp=sharing)

## Descarga de responsabilidades

El presente proyecto no pretende ser un producto profesional. Debe utilizarse con
fines didácticos únicamente.