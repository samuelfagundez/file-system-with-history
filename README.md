# CELV / FILE SYSTEM WITH HISTORY
## CI5651 - Diseño de Algoritmos I
#### Equipo
- Arturo Yepez
- Pedro Samuel Fagundez

## INFORME

### INTRODUCCIÓN
En el mismo futuro muy lejano, donde la humanidad vive en la luna Titán del planeta Saturno. A los mismos héroes que se encargaron de resolver el problema del tablero de Sudoku, se les fue encargado encontrar la solución a un nuevo problema de la gente que vive en esa luna.

A partir de la forma de solucionar el problema del Sudoku, nació una nueva rama de trabajo llamada "Computación" encargada de resolver este tipo de problemas. En esta rama se suele llevar una rama de de control muy estricto del avance de sus proyectos, mediante convenciones de nombres a las distintas versiones y/o avances realizados en cada uno de ellos. Sin embargo, con el tiempo estos nombres de avances fueron cada vez menos sinceros entre si.

Con el tiempo, esto se hizo inmanejable para los computistas por lo que tuvieron que diseñar una solución para este problema. De este proceso nació **¿Como era la Cosa?** o **CELV**, que se define como un manejador de versiones de proyectos.

### DECISIONES DE DISEÑO E IMPLEMENTACIÓN

#### Diseño de Solución
El objetivo principal del proyecto se define como: *la implementación de un manejador de versiones con su propio sistema de archivos*.

Para poder lograrlo, se divien las distintas responsabilidades en las siguientes funcionalidades elementales:

1. Sistema de archivos
1. Manejador del sistema de archivos
1. Manejador de versiones

Además, el proyecto ofrece un menú de opciones dinámicos para que el usuario pueda realizar todas las operaciones disponibles de parte del programa.

Ahora, en combinación de estos modulos nos asegura encontrar la respuesta al problema planteado con anterioridad. Ya que con un manejador de versiones podemos quitarnos de encima todos los problemas que conlleva la creación de distintas etapas de un proyecto de los computistas, dado que cada versión es preservada bajo las condiciones establecidas en el enunciado. Preservando un orden.

Asi entonces, los módulos disponibles quedan:
- **Sistema de Archivos**: donde se encuentran todas las funciones y utilidades relacionadas a la creación, manejo y visualización de instancias de Nodos, donde los nodos son las unidades que maneja el programa para almacenamiento; un nodo puede ser de directorio o de archivo, y mediante esas caracteristicas construimos arboles de archivos y/o directorios.

  Las caracteristicas que diferencian a los nodos de directorios y archivos son:
  * Los directorios tienen la posibilidad de tener nodos hijos, que pueden ser ya sea otros directorios o archivos.
  * Los archivos tienens la posibilidade de tener contenido, que pueden almacenar información. 

- **Manejador del Sistema de Archivos**: consiste en la estructura de datos, sus funciones y utilidades que permiten manejar ubicaciones y desplazamientos dentro del arbol de Nodos. Así entonces, esa tarea queda delegada a una estructura por afuera del arbol de nodos para evitar complejitud en la ejecución del programa.
- **Manejador de Versiones**: donde se encuentran las estructuras, funciones y utilidades encargadas de almacenar y manejar distintas versiones del arbol de nodos sobre el que se inicializó el manejador de versiones. Cada versión es una copia profunda del arbol completo de nodos, en inicio para evitar que haya problemas o cambios hechos por referencias no intensionados, a su vez contiene información adicional como identificador, descriptores de cambios y apuntadores a versiones anteriores.

#### Diseño de Implementación

Los desarrolladores se decantaron por el lenguaje de programación **Typescript** y un ambiente de ejecución **Node.js** para la implementación del proyecto. Esta decisión se tomó para aprovechar las siguientes características:
  * Es un lenguaje *fuertemente tipado*, lo que nos ayuda a la verificación de los tipos de datos mientras transitamos entre distintas instancias de estructuras de datos.
  * Es altamente *legible*, lo que hace la lectura del código una tarea mucho más sencilla tanto para el desarrollador como para el evaluador.## MANUAL DE USO

La decisión principal detrás de la implementación consiste en que todas las soluciones fueron ideadas bajo un paradigma de **programación orientada a objetos**, donde manejaremos instancias de **Node**, o de **NodeManagement**, **CELV** o de **Version** con la respectiva información asociada a cada tablero que se quiera resolver.

Siguiendo el diseño de módulos propuesto como solución, se tienen las siguientes clases  y funciones asociadas definidas:

- **Node**
  * *Creación de directorios o archivos*: funciones para crear ya sea un directorio o un archivo, hijo del Nodo (directorio) actual.
  * *Eliminación del nodo*: busca un nodo hijo del nodo actual y de tener información o hijos, tambien se elimina en cascada.
  * *Lectura y Escritura de contenido*: para el caso de los nodos son archivos.

  Además, para cada una de estas funcionalidades asociadas a un tipo de nodo en especifico se verifican que esto se cumpla para el nodo. Así evitamos la posibilidad de tener nodos directorios con contenidos, por ejemplo.

- **NodeManagement**
  Esta clase es un pseudo-manejador de nodos. Para facilitar al programa, el desplazo entre un arbol de nodos, sin necesariamente involucrar esta información de ubicación en las estructuras de nodos.

  * *Desplazamiento de nodos*: permite ubicar como el "nodo actual" a un nodo hijo o al nodo raiz de todo el arbol de nodos.

- **CELV**
  * *Inicializar el manejador de versiones*: con su nodo raiz, con un nodo cualquiera parte un arbol de nodos.
  * *Crear una nueva versión del arbol*: cuando se quiere registrar un cambio como una versión, esta se encarga de hacer la copia profunda del arbol de nodos y de actualizar las variables del manejador (como la nueva version actual, el historial de versiones, etc).
  * *Comprobador de cambios nuevos*: para detectar si en todo el arbol de nodos hay alguna diferencia entre los nodos de la versión actual y aquellos de la versión anterior.
  * *Desplazamiento entre versiones*: para cambiar el contexto del proyecto, tal que la nueva "version actual" y su respectivo arbol de nodos sea arbol actual que utilice el manejador para todas sus operaciones.  


#### Dificultades Encontradas

## MANUAL DE USO

A continuación se va a detallar toda la información necesaria para la ejecución del proyecto.

### INSTALACIÓN
#### Requisitos de uso

Para poder ejecutar el proyecto, se debe de tener instalado en el equipo las siguientes dependencias de programas con sus respectivas versiones:
* node >= 16.0.0
* npm >= 7.14.0

#### Instalación de Dependencias

Una vez se cumplan los requisitos de instalación, se debe correr el siguiente comando para instalar todas las librerias que usa el programa para su ejecución:
```
yarn install
```

#### Comandos Disponibles

* Si se desea ejecutar el sistema de archivos con manejador de versiones:
  ```bash
  yarn start
  ```