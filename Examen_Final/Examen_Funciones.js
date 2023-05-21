/**
* RandomColor: Funcion creada para obtener un color random.
*/
function RandomColor() {
  var r = Math.random();
  var g = Math.random();
  var b = Math.random();
  color = new THREE.Color(r, g, b);
  return color;
}
/**
* crearPoligonmo: Genera un polígono en 3D utilizando la biblioteca THREE.js  de n lados y radio r determinado por el usuario.
* ENTRADAS: *nP (tipo: número) - Número de poligonos generados.
            *nlados (tipo: número) - Número de lados del poligono.
            *x0, y0, z0 (tipo: número) - Posicion inicial.
            *radio (tipo: número) - Valor del radio del poligono.
            *altura (tipo: número) - Valor de la separacion entre poligonos.
* SALIDAS: Grupoligono (tipo: objeto THREE.Mesh) - Los polígonos generados, representado como un objeto THREE.Mesh en THREE.js. Este objeto contiene la geometría y el material de cada polígono.
*/
function crearPoligonos(nP, nlados, x0, y0, z0, radio, altura) {

  var Grupoligono = new THREE.Group();
  var fila = 0; // Variable para controlar el número de filas generadas
  var offsetX = 0; // Variable para controlar la separacion en "x" de cada figura
  var offsetY = altura; // Variable para controlar la separacion en el eje "y" de cada fila


  for (let i = 0; i < nP; i++) {

    var geometry = new THREE.BufferGeometry();
    var vertices = [];
    var indices = [];
    var numVertices = nlados;

    for (let j = 0; j < numVertices + 1; j++) {

      var angle = (2 * Math.PI * j) / numVertices;
      var x = radio * Math.cos(angle);
      var z = radio * Math.sin(angle);
      vertices.push(new THREE.Vector3(x, 0, z));

    }

    for (let j = 0; j < nlados + 5; j++) {

      indices.push(j, j + nlados, (j + 1) % nlados + nlados);
      indices.push(j, (j + 1) % nlados + nlados, (j + 1) % nlados);

    }

    geometry.setFromPoints(vertices);
    geometry.setIndex(indices);

    const material = new THREE.MeshLambertMaterial({ color: RandomColor() , side: THREE.DoubleSide });
    
    var poligono = new THREE.Mesh(geometry, material);
    poligono.position.set(x0 + offsetX, y0 - fila * (2* offsetY), z0); // Actualiza la posición de los polígonos

    Grupoligono.add(poligono);

    offsetX += 2.5 * radio;

    if ((i + 1) % 4 === 0) {
      
      fila++;
      offsetX = 0; // Reinicia el desplazamiento en el eje x

    }

  }
  return Grupoligono;
}
/**
/**
* crearPoligonmo: Genera un poliedro en 3D utilizando la biblioteca THREE.js  de n lados, radio r y altura a determinado por el usuario.
* ENTRADAS: *nP (tipo: número) - Número de poliedros generados.
            *nlados (tipo: número) - Número de lados del poliedro.
            *x0, y0, z0 (tipo: número) - Posicion inicial.
            *radio (tipo: número) - Valor del radio del poliedro.
            *altura (tipo: número) - Valor de la altura de cada poliedro.
* SALIDAS: Grupoliedro (tipo: objeto THREE.Mesh) - Los poliedros generados, representado como un objeto THREE.Mesh en THREE.js. Este objeto contiene la geometría y el material de cada poliedro.
*/
function crearPoliedro(nP, nlados, x0, y0, z0, radio, altura) {

  var Grupoliedro = new THREE.Group();
  var color = RandomColor();
  var fila = 0; // Variable para controlar el número de filas generadas
  var offsetX = 0; // Variable para controlar la separacion en "x" de cada figura
  var offsetY = altura; // Variable para controlar la separacion en el eje "y" de cada fila
  
  for (let i = 0; i < nP; i++) {

    var geometry = new THREE.BufferGeometry();
    var vertices = [];
    var indices = [];

    // Generar los vértices del cuerpo del poliedro
    for (var j = 0; j < nlados; j++) {

      var angle = (2 * Math.PI * j) / nlados;
      var x = radio * Math.cos(angle);
      var z = radio * Math.sin(angle);
      vertices.push(x, 0, z);

    }

    // Generar los vértices de la parte superior del poliedro
    for (var j = 0; j < nlados; j++) {

      var angle = (2 * Math.PI * j) / nlados;
      var x = radio * Math.cos(angle)/2;
      var z = radio * Math.sin(angle)/2;
      vertices.push(x, altura, z);

    }

    // Generar los índices que conectan los vértices de la base con los vértices de la parte superior
    for (var j = 0; j < nlados + nlados; j++) {

      indices.push(j, j + nlados, (j + 1) % nlados + nlados);
      indices.push(j, (j + 1) % nlados + nlados, (j + 1) % nlados);

    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);

    const material = new THREE.MeshLambertMaterial({ color: RandomColor() });

    
    var poliedro = new THREE.Mesh(geometry, material);

    poliedro.position.set(x0 + offsetX, y0 - fila * (2 * offsetY), z0);// Actualiza la posicion de los poliedros

    Grupoliedro.add(poliedro);

    offsetX += 2.5 * radio;
  
    if ((i + 1) % 4 === 0) {

      fila++;
      offsetX = 0; // Reinicia el desplazamiento en el eje x
    
    }
  }

  return Grupoliedro;

}
/**
* Animate: Funcion creada para trabajar con una escena, una cámara y un objeto de control de cámara.
*/
function animate() {

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);   
  
}