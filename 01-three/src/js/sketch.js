import * as THREE from 'three';
// Importamos toda la biblioteca de Three.js, la llamaremos mediante el objeto THREE
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// Importamos también los controles de cámara que nos permitirán moverla con el ratón.

const renderer = new THREE.WebGLRenderer();
// Renderizamos todo lo que hemos creado hasta ahora mediante WebGL, especidifación para el uso de gráficos 3D (le decimos al ordenador: "vas a procesar 3D en la web que creemos, prepara un espacio para alojar las animaciones y todo cuanto hagamos")

renderer.setSize(window.innerWidth, window.innerHeight);
// Hacemos que el tamaño que ocupe el renderizado sea toda la página

document.body.appendChild(renderer.domElement);
// Alojamos la renderización dentro del body, es decir, dentro del cuerpo de la página

// ! PARA HACER QUE SE RENDERICE CONTINUAMENTE LA PÁGINA CADA VEZ QUE GUARDAMOS EL PROYECTO, NECESITAREMOS DE ESTE COMANDO: parcel ./src/index.html
//? SI NO FUNCIONA: https://learn.microsoft.com/es-es/troubleshoot/azure/active-directory/cannot-run-scripts-powershell#resolution
//? Inicio > Todos los programas > Ejecutar ISE como administrador + (enlace)


//todo/ ⬆BASE⬆
//todo/ -----------------------------------------------------------------------
//todo/ ⬇START⬇


//* 2 BÁSICOS PARA EL SHOW: ESCENA, CÁMARA (+COMPONENTES: LUCES, OBJETO Y ACTOR)

const scene = new THREE.Scene();
// Creamos una nueva escena partiendo de la clase Scene del objeto global THREE


const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000);
// Creamos una cámara, elegimos entre la ortográfica *<:: o la perspectiva *<<

// ? la cámara ortográfica consiste en (field of view, aspect ratio(W/2 / H/2), near, far)
// ? la cámara en perspectiva consiste en (left, right, top, bottom, near, far)


//todo/ ⬆START⬆
//todo/ -----------------------------------------------------------------------
//todo/ ⬇MIN_HELP⬇

const orbit = new OrbitControls(camera, renderer.domElement);
// Ahora para los controles de cámara llamamos al objeto OrbitControls sin llamar antes al objeto THREE
//? Sus argumentos son (camara utilizada, elemento dom en el que se está renderizando -> llamado por medio de renderer.domElement) 

camera.position.set(0, 0, 5);
// puedo mover cualquier elemento de la página mediante la fórmula [elemento].postion.set()
//? cuyos argumentos son (ejeX, ejeY, ejeZ).

orbit.update();
//* Hemos de llamar a este método cada vez que se cambie la posición de la cámara, para que se actualice (con esto ya nos será posible mover la cámara, este es el último paso)


const axesHelper = new THREE.AxesHelper(5);
// Creamos unos ejes de ayuda para manejar el espacio más fácilmente.
//? su argumento es el tamaño de los ejes.
scene.add(axesHelper);
//* añadimos el elemento a la escena

//todo/ ⬆MIN_HELP⬆
//todo/ -----------------------------------------------------------------------
//todo/ ⬇BUILDING⬇

//* BÁSICOS PARA ELEMENTOS: GEOMETRÍA(FORMA) + MATERIAL(CONTENIDO | MALLA)

const boxGeometry = new THREE.BoxGeometry();
//creamos el primer elemento, para ello generamos primero su geometría
//? sus argumentos son (anchura, altura, profundidad, anchura de segmentos, altura de segmentos, profundidad de segmentos), 

//*AHORA VEREMOS EN QUÉ CONSISTE LA GEOMETRÍA DE LOS ELEMENTOS


const boxMaterial = new THREE.MeshBasicMaterial({color: 0x22aa22})
// y luego generamos su material o malla
//? sus argumentos son los de cualquier malla o contenido de material, ahora los veremos*

//*AHORA VEREMOS EN QUÉ CONSISTE EL MATERIAL DE LOS ELEMENTOS


const box = new THREE.Mesh(boxGeometry, boxMaterial);
// para añadir el elemento, debemos aunar la geometría y el material en un solo
scene.add(box);
// y luego añadirlo a la escena



//todo/ ⬆BUILDING⬆
//todo/ -----------------------------------------------------------------------
//todo/ ⬇ANIMATION + RENDER⬇


const animate = (time) => {
  let frames = time/1000;
  box.rotation.set(frames, frames/10, 0);

  renderer.render(scene, camera);
  // renderizamos los elementos escena y cámara para que se efectuen en la web
};

renderer.setAnimationLoop(animate);
// realizamos una animación con la función específica renderer.setAnimationLoop cuyo argumento es la función que llamamos.
//? Dentro de la animación hay que recordar meter la función *renderer* con el metodo *render* y los argumentos *(scene, camera)*