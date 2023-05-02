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
  45, 
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

camera.position.set(-10, 30, 30);
// puedo mover cualquier elemento de la página mediante la fórmula [elemento].postion.set()
//? cuyos argumentos son (ejeX, ejeY, ejeZ).

orbit.update();
//* Hemos de llamar a este método cada vez que se cambie la posición de la cámara, para que se actualice (con esto ya nos será posible mover la cámara, este es el último paso)


const axesHelper = new THREE.AxesHelper(5);
// Creamos unos ejes de ayuda para manejar el espacio más fácilmente.
//? su argumento es el tamaño de los ejes.
scene.add(axesHelper);
//* añadimos el elemento a la escena


const gridHelper = new THREE.GridHelper(30, 10);
//? los argumnentos del GridHelper son (tamaño de los lados, nº divisiones/columna, color de los ejes principales, color de las lineas de la red)
scene.add(gridHelper);
// Añadimos un helper de tipo grid (de apariencia de red) a la escena


//todo/ ⬆MIN_HELP⬆
//todo/ -----------------------------------------------------------------------
//todo/ ⬇BUILDING⬇

//* BÁSICOS PARA ELEMENTOS: GEOMETRÍA(FORMA) + MATERIAL(PIEL | MALLA)
//! GEOMAT 01

const boxGeometry = new THREE.BoxGeometry();
//creamos el primer elemento, para ello generamos primero su geometría
//? sus argumentos son (anchura, altura, profundidad, anchura de segmentos, altura de segmentos, profundidad de segmentos), 

const boxMaterial = new THREE.MeshBasicMaterial({color: 0x22aa22})
// y luego generamos su material o piel, en este caso nos hemos metido en el objeto para cambiar el color, por medio de la desestructuración de objetos, es decir, en vesz de poner el argumento como tal, nos metemos en las propiedades del objeto que pertenecen a ese primer argumento escribiendo unas llaves en vez de simplemente un valor
//* los colores se describen en formato hexadecimal, comenzando por "0x" en vez de # y siguiendo con RGB. Ej: 0xFF0000 = rojo
//? sus argumentos son los de cualquier piel de material, ahora los veremos*

const box = new THREE.Mesh(boxGeometry, boxMaterial);
// para añadir el elemento, debemos aunar o fusionar la geometría y el material en un solo
scene.add(box);
// y luego añadirlo a la escena



// NO SOLO PODEMOS CREAR CAJAS EN THREE.JS, VAMOS AHORA A CREAR UN ELEMENTO PLANO

const planeGeometry = new THREE.PlaneGeometry(30, 30);
//?Los argumentos son (anchura, altura, anchura de segmentos, altura de segmentos) 

const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide,
});
// Como desaparece por el otro lado cuando lo apuntamos con la cámara, vamos a añadirle el valor DoubleSide al atributo side en el objeto malla o piel por medio de la desestructuración (así se accede a este tipo de objetos)
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane); 
plane.rotation.x = -0.5 * Math.PI;
// Vamos a girar 90 grados en radianes por el EjeX, así que, como 180º son PI radianes, multiplicamos PI por (-0.5)


//  AHORA VAMOS A AÑADIR UNA ESFERA

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
//? sus argumentos son (radio, anchura de segmentos, altura de segmentos, comienzo de PI, longitud de PI, comienzo de THETA, longitud de THETA)
// Podemos ver que no está perfectamente redondeada en su forma por defecto, eso se debe a que la calidad del redondeo depende de la altura y anchura de los segmentos

const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000FF,
  wireframe: false,
});
// Vamos a cambiar el tipo de material a Standard o a Lambert en vez de Basic; Basic no necesita de luces externas, pero Standard y Lambert sí, por lo que, como ocurre en la vida real, necesitamos luz para ver los colores.
// Para poder ver la estructura alámbrica de un elemento, añadimos el atributo wireframe al objeto malla del elemento, con el valor true
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

sphere.position.set(-10, 10, 0);
// cambiamos la posición en 10 unidades contra el Eje X y 10 unidades en favor del Eje Y

//* NO SOLO EXISTEN ESTOS ELEMENTOS PARA CONSTRUIR, LO MEJOR ES ECHARLE UN VISTAZO A LA DOCUMENTACIÓN


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