//Creacion de la ventana del navegador
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

//Creacion de la camara
var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.z = 15;
camera.position.y = 2;
camera.position.x = 0;
const light = new THREE.AmbientLight(0x404040, 5);


//Creacion de objeto
var nVertices = 6
var nP = 5
var x0 = 0
var z0 = 0
var radio = 2
var altura = 2

var poligonoBase = crearPoligono(nP, nVertices, x0, z0, radio);
var poliedroFinal = crearPoliedro(nP, nVertices, x0, z0, radio, altura);

// Agregar los polígonos al escenario
scene.add(poligonoBase);
scene.add(poliedroFinal);

//Escena
scene.add(light);
//scene.add(poligono, poliedro)
const controls = new THREE.OrbitControls(camera, renderer.domElement);  

animate();