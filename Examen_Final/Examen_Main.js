//Creacion de la ventana del navegador
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var aspectRatio = WIDTH / HEIGHT;
var size = 15;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x0000, 1);
document.body.appendChild(renderer.domElement);

//Creacion de la camara
var camera = new THREE.OrthographicCamera(-size * aspectRatio, size * aspectRatio, size, -size, 0.1, 1000);
camera.position.z = 15;
camera.position.y = 0;
camera.position.x = 0;
// Crear luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


//Creacion de objeto
var nlados = 10
var nP = 8
var x0 = -7
var y0 = 0
var z0 = 0
var radio = 2
var altura = 4

var poligonoBase = crearPoligonos(nP, nlados, x0, y0, z0, radio, altura); 
var poliedroFinal = crearPoliedro(nP, nlados, x0, y0, z0, radio, altura);

// Agregar los polígonos al escenario
scene.add(poligonoBase);
scene.add(poliedroFinal);

//Escena
const controls = new THREE.OrbitControls(camera, renderer.domElement);  

animate();