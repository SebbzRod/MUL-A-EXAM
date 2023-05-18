/**
* crearPoligonmo: Genera un polígono en 3D utilizando la biblioteca THREE.js  de n lados y radio r determinado por el usuario.
* ENTRADAS: *nlados (tipo: número) - Número de lados del poliedro.
            *x0 (tipo: número) - Posicion inicial.
            *radio (tipo: número) - Posicion inicial.
* SALIDAS: poligono (tipo: objeto THREE.Line) - El polígono generado, representado como un objeto THREE.Line en THREE.js. Este objeto contiene la geometría y el material del polígono.
*/
function crearPoligono(nP,nlados, x0, z0, radio) {

  var Grupoligono = new THREE.Group();
  var geometry = new THREE.BufferGeometry();
  var vertices = [];
  var indices = [];
  var numVertices = nlados;

  for (var i = 0; i < numVertices + 1; i++) {

    var angle = (2 * Math.PI * i) / numVertices;
    var x = radio * Math.cos(angle) + x0;
    var z = radio * Math.sin(angle) + z0;
    vertices.push(new THREE.Vector3(x, 0, z));

  }

  for (var i = 0; i < nlados + 5; i++) {

    indices.push(i, i + nlados, (i + 1) % nlados + nlados);
    indices.push(i, (i + 1) % nlados + nlados, (i + 1) % nlados);

  }

  geometry.setFromPoints(vertices);
  var material = new THREE.MeshPhongMaterial({ color: 0x8c00ff, side: THREE.DoubleSide });
  geometry.setIndex(indices);

  for (var i = 0; i < nP; i++) {
    
    var poligono = new THREE.Mesh(geometry, material);
    Grupoligono.add(poligono);

  }

  return Grupoligono;

}
/**
* crearPoliedro: Genera un poliedro en 3D utilizando la biblioteca THREE.js de n lados y radio r determinado por el usuario.
* ENTRADAS: *nlados (tipo: número) - Número de lados del poliedro.
            *x0 (tipo: número) - Posicion inicial.
            *radio (tipo: número) - Posicion inicial.
            *altura (tipo: número) - Altura del poliedro.
* SALIDAS: poliedro (tipo: objeto THREE.Line) - El poliedro generado, representado como un objeto THREE.Line en THREE.js. Este objeto contiene la geometría y el material del poliedro.
*/
function crearPoliedro(nP, nlados, x0, z0, radio, altura) {

  var Grupoliedro = new THREE.Group();
  var geometry = new THREE.BufferGeometry();
  var vertices = [];
  var indices = [];

  // Generar los vértices de la base
  for (var i = 0; i < nlados; i++) {

    var angle = (2 * Math.PI * i) / nlados;
    var x = radio * Math.cos(angle) + x0;
    var z = radio * Math.sin(angle) + z0;
    vertices.push(x, 0, z);

  }

  // Generar los vértices de la parte superior del poliedro
  for (var i = 0; i < nlados ; i++) {

    var angle = (2 * Math.PI * i) / nlados;
    var x = radio * Math.cos(angle)/2 + x0;
    var z = radio * Math.sin(angle)/2 + z0;
    vertices.push(x, altura, z);

  }

  // Generar los índices que conectan los vértices de la base con los vértices de la parte superior
  for (var i = 0; i < nlados + nlados; i++) {

    indices.push(i, i + nlados, (i + 1) % nlados + nlados);
    indices.push(i, (i + 1) % nlados + nlados, (i + 1) % nlados);

  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);

  var material = new THREE.MeshPhongMaterial({color: 0x8c00ff})

  for (var i = 0; i < nP; i++) {

    var poliedro = new THREE.Mesh(geometry, material);
    Grupoliedro.add(poliedro);
    
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