import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
//import * as THREE from '../three.js-master/build/three.module.js';

import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/postprocessing/UnrealBloomPass.js';

let renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.addEventListener('dblclick', onClick);

window.addEventListener('resize', () => {
  onWindowResize();
}, false);

let scene = new THREE.Scene();
let clock = new THREE.Clock();
let keyboard = new THREEx.KeyboardState();


let camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1.0,
  1000
);
scene.add(camera);
camera.position.set(0,37.5,100);
camera.lookAt(scene.position);

let light = new THREE.AmbientLight(0x333333);
scene.add(light);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 4000);
pointLight.castShadow = true;
scene.add(pointLight);

const gltfloader = new GLTFLoader();

var ship = new THREE.Object3D();
gltfloader.load('./resources/space/scene.gltf', (gltf) => {
  gltf.scene.position.set(0, 6.28, -400);
  gltf.scene.traverse(function(node) {
    if (node.isMesh) {
      node.receiveShadow = true;
    }
  });
  ship = gltf.scene;
  scene.add(ship);
});


const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    './resources/posx.jpg',
    './resources/negx.jpg',
    './resources/posy.jpg',
    './resources/negy.jpg',
    './resources/posz.jpg',
    './resources/negz.jpg',
]);
scene.background = texture;

/** Sistema solar */
const textureLoader = new THREE.TextureLoader();
const sunGeo = new THREE.SphereGeometry(32, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load('./resources/textures/sunmap.jpg')
});
const sun = new THREE.Mesh(sunGeo, sunMat);
sun.name = 'sun';
scene.add(sun);

//Mercurio
const mercuryGeo = new THREE.SphereGeometry(6.4, 30, 30);
const mercuryMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/mercurymap.jpg')
});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
mercury.castShadow = true;
mercury.receiveShadow = true;
const mercuryParent = new THREE.Object3D();
mercuryParent.add(mercury);
scene.add(mercuryParent);
mercury.name = 'mercury';
mercury.position.x=56;

//Venus
const venusGeo = new THREE.SphereGeometry(11.6, 30, 30);
const venusMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/venusmap.jpg')
});
const venus = new THREE.Mesh(venusGeo, venusMat);
venus.castShadow = true;
venus.receiveShadow = true;
const venusParent = new THREE.Object3D();
venusParent.add(venus);
scene.add(venusParent);
venus.name = 'venus';
venus.position.x=88;

//Earth
const earthGeo = new THREE.SphereGeometry(12, 30, 30);
const earthMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/earthmap1k.jpg')
});
const earth = new THREE.Mesh(earthGeo, earthMat);
earth.castShadow = true;
earth.receiveShadow = true;
const earthParent = new THREE.Object3D();
earthParent.add(earth);
scene.add(earthParent);
earth.name = 'earth';
earth.position.x=124;

//Mars
const marsGeo = new THREE.SphereGeometry(10, 30, 30);
const marsMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/mars_1k_color.jpg')
});
const mars = new THREE.Mesh(marsGeo, marsMat);
mars.castShadow = true;
mars.receiveShadow = true;
const marsParent = new THREE.Object3D();
marsParent.add(mars);
scene.add(marsParent);
mars.name = 'mars';
mars.position.x=156;

//Jupiter
const jupiterGeo = new THREE.SphereGeometry(24, 30, 30);
const jupiterMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/jupitermap.jpg')
});
const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
jupiter.castShadow = true;
jupiter.receiveShadow = true;
const jupiterParent = new THREE.Object3D();
jupiterParent.add(jupiter);
scene.add(jupiterParent);
jupiter.name = 'jupiter';
jupiter.position.x=200;

//Saturn
/*
const saturnParent = new THREE.Object3D();
var saturn = new THREE.Object3D();
gltfloader.load('./resources/saturn/scene.gltf', (gltf) => {
  gltf.scene.scale.setScalar(0.018);
  gltf.scene.traverse(function(node) {
    if (node.isMesh) {
      node.receiveShadow = true;
      //node.castShadow = true;
    }
  });
  saturn = gltf.scene;
  saturnParent.add(saturn);
  scene.add(saturnParent);
  saturn.position.x=138;
});
*/

const saturnGeo = new THREE.SphereGeometry(20, 30, 30);
const saturnMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/saturnmap.jpg')
});
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
saturn.castShadow = true;
saturn.receiveShadow = true;
const saturnParent = new THREE.Object3D();
saturnParent.add(saturn);
scene.add(saturnParent);
saturn.name = 'saturn';
saturn.position.x=276;
//Ring
const saturnRingGeo = new THREE.RingGeometry(24, 40, 32);
const saturnRingMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/saturnring.png'),
  side: THREE.DoubleSide
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnRing.receiveShadow = true;
saturnParent.add(saturnRing);
scene.add(saturnParent);
saturnRing.position.x=276;
saturnRing.rotation.x = -0.4 * Math.PI;
saturnRing.rotation.y = -0.1 * Math.PI;

//Uranus
const uranusGeo = new THREE.SphereGeometry(14, 30, 30);
const uranusMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/uranusmap.jpg')
});
const uranus = new THREE.Mesh(uranusGeo, uranusMat);
uranus.castShadow = true;
uranus.receiveShadow = true;
const uranusParent = new THREE.Object3D();
uranusParent.add(uranus);
scene.add(uranusParent);
uranus.name = 'uranus';
uranus.position.x=352;
//Ring
const uranusRingGeo = new THREE.RingGeometry(20, 24, 32);
const uranusRingMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/uranusring.png'),
  side: THREE.DoubleSide
});
const uranusRing = new THREE.Mesh(uranusRingGeo, uranusRingMat);
uranusRing.receiveShadow = true;
uranusParent.add(uranusRing);
scene.add(uranusParent);
uranusRing.position.x=352;
uranusRing.rotation.y = -0.2 * Math.PI;

//Neptune
const neptuneGeo = new THREE.SphereGeometry(14, 30, 30);
const neptuneMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/neptunemap.jpg')
});
const neptune = new THREE.Mesh(neptuneGeo, neptuneMat);
neptune.castShadow = true;
neptune.receiveShadow = true;
const neptuneParent = new THREE.Object3D();
neptuneParent.add(neptune);
scene.add(neptuneParent);
neptune.name = 'neptune';
neptune.position.x=400;

//Pluto
const plutoGeo = new THREE.SphereGeometry(5.6, 30, 30);
const plutoMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('./resources/textures/plutomap1k.jpg')
});
const pluto = new THREE.Mesh(plutoGeo, plutoMat);
pluto.castShadow = true;
pluto.receiveShadow = true;
const plutoParent = new THREE.Object3D();
plutoParent.add(pluto);
scene.add(plutoParent);
pluto.name = 'pluto';
pluto.position.x=432;

var effectControls;

function setupGUI() {
  effectControls = {
    mensaje: "Interface",
    rotation: 1.0,
    translation: 1.0,
    visibility: true
  };
  var gui = new dat.GUI();
  var folder = gui.addFolder("Galaxy Control Interface");
  folder.add(effectControls, "mensaje").name("App");
  folder.add(effectControls, "rotation", 0.0, 5.0, 0.5).name("Rotation velocity");
  folder.add(effectControls, "translation", 0.0, 5.0, 0.5).name("Transl. velocity");
  folder.add(effectControls, "visibility").name("Display planets");
}

function animate() {
  var rotVel = effectControls.rotation;
  var transVel = effectControls.translation;
  sun.rotateY(0.004 * rotVel);
  mercuryParent.rotateY(0.04 * transVel);
  mercury.rotateY(0.004 * rotVel);
  venusParent.rotateY(0.015 * transVel);
  venus.rotateY(0.002 * rotVel);
  earthParent.rotateY(0.01 * transVel);
  earth.rotateY(0.002 * rotVel);
  marsParent.rotateY(0.008 * transVel);
  mars.rotateY(0.018 * rotVel);
  jupiterParent.rotateY(0.002 * transVel);
  jupiter.rotateY(0.04 * rotVel);
  saturnParent.rotateY(0.001 * transVel);
  saturn.rotateY(0.04 * rotVel);
  uranusParent.rotateY(0.0006 * transVel);
  uranus.rotateY(0.03 * rotVel);
  neptuneParent.rotateY(0.0003 * transVel);
  neptune.rotateY(0.04 * rotVel);
  plutoParent.rotateY(0.0001 * transVel);
  pluto.rotateY(0.008 * rotVel);

  mercury.visible = effectControls.visibility;
  venus.visible = effectControls.visibility;
  earth.visible = effectControls.visibility;
  mars.visible = effectControls.visibility;
  jupiter.visible = effectControls.visibility;
  saturn.visible = effectControls.visibility;
  saturnRing.visible = effectControls.visibility;
  uranus.visible = effectControls.visibility;
  uranusRing.visible = effectControls.visibility;
  neptune.visible = effectControls.visibility;
  pluto.visible = effectControls.visibility;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  var seconds = clock.getDelta();
  var moveDisance = 200 * seconds;
  var rotateAngle = Math.PI / 2 * seconds;

  if(keyboard.pressed("W")) {ship.translateZ(moveDisance);}
  if(keyboard.pressed("S")) {ship.translateZ(-moveDisance);}
  if(keyboard.pressed("Q")) {ship.translateX(moveDisance);}
  if(keyboard.pressed("E")) {ship.translateX(-moveDisance);}

  if(keyboard.pressed("N")) {document.getElementById("info").innerHTML = "Double Click on a planet/star to display info, WSQE | Movement, F | Up, R | Down, M | Hide info";}
  if(keyboard.pressed("M")) {document.getElementById("info").innerHTML = "Press N for Help";}

  if(keyboard.pressed("A")) {ship.rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);}
  if(keyboard.pressed("D")) {ship.rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);}
  if(keyboard.pressed("R")) {ship.rotateOnAxis(new THREE.Vector3(1,0,0), rotateAngle);}
  if(keyboard.pressed("F")) {ship.rotateOnAxis(new THREE.Vector3(1,0,0), -rotateAngle);}

  if(keyboard.pressed("Z")) {
    ship.position.set(0, 6.28, 0);
    ship.rotation.set(0, 0, 0);
  }
  var relativeCameraOffset = new THREE.Vector3(0,12.5,-50);

	var cameraOffset = relativeCameraOffset.applyMatrix4( ship.matrixWorld );

	camera.position.x = cameraOffset.x;
	camera.position.y = cameraOffset.y;
	camera.position.z = cameraOffset.z;
	camera.lookAt( ship.position );

  //bloomComposer.render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //bloomComposer.setSize(window.innerWidth, window.innerHeight);
}

function onClick(event) {
  var x = event.clientX;
  var y = event.clientY;
  x = x * 2/window.innerWidth - 1;
  y = -y * 2/window.innerHeight + 1;
  var rayo = new THREE.Raycaster();
  rayo.setFromCamera( new THREE.Vector2(x,y), camera);
  var interseccion = rayo.intersectObjects( scene.children, true );
    if( interseccion.length > 0){
        if(interseccion[0].object.name == 'sun') {
          document.getElementById("info").innerHTML = "SUN -> Mass: 1,989 × 10^30 kg | Radius: 696.340 km | Gravity: 274 m/s²";
        }
        if(interseccion[0].object.name == 'mercury') {
          document.getElementById("info").innerHTML = "MERCURY -> Mass: 3,285 × 10^23 kg | Radius: 2.439,7 km | Gravity: 3,7 m/s²";
        }
        if(interseccion[0].object.name == 'venus') {
          document.getElementById("info").innerHTML = "VENUS -> Mass: 4,867 × 10^24 kg | Radius: 6.051,8 km | Gravity: 8,87 m/s²";
        }
        if(interseccion[0].object.name == 'earth') {
          document.getElementById("info").innerHTML = "EARTH -> Mass: 5,9736 × 10^24 kg | Radius: 6.371,0 km | Gravity: 9,80 m/s²";
        }
        if(interseccion[0].object.name == 'mars') {
          document.getElementById("info").innerHTML = "MARS -> Mass: 6,39 × 10^23 kg | Radius: 3.389,5 km | Gravity: 3,721 m/s²";
        }
        if(interseccion[0].object.name == 'jupiter') {
          document.getElementById("info").innerHTML = "JUPITER -> Mass: 1,898 × 10^27 kg | Radius: 69.911 km | Gravity: 24,79 m/s²";
        }
        if(interseccion[0].object.name == 'saturn') {
          document.getElementById("info").innerHTML = "SATURN -> Mass: 5,683 × 10^26 kg | Radius: 58.232 km | Gravity: 10,44 m/s²";
        }
        if(interseccion[0].object.name == 'uranus') {
          document.getElementById("info").innerHTML = "URANUS -> Mass: 8,681 × 10^25 kg | Radius: 25.362 km | Gravity: 8,87 m/s²";
        }
        if(interseccion[0].object.name == 'neptune') {
          document.getElementById("info").innerHTML = "NEPTUNE -> Mass: 1,024 × 10^26 kg | Radius: 24.622 km | Gravity: 11,15 m/s²";
        }
        if(interseccion[0].object.name == 'pluto') {
          document.getElementById("info").innerHTML = "PLUTO -> Mass: 1,25 × 1022 kg​ | Radius: 1.188,3 km | Gravity: 0,62 m/s²";
        }
    }
}

setupGUI();
animate();
