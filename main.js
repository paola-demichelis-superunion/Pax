import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/RGBELoader.js';

import Busta from './busta.js'
import Card from './card.js'

const width = window.innerWidth, height = window.innerHeight;
const scene = new THREE.Scene();

let global_state = 0;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.001, 100 );
camera.position.z = 10;

const cube = new THREE.Group();
scene.add(cube)

const pack = new THREE.Group();
scene.add(pack)


let tot_cards = 5;
let cards = [];
for(let i = 0; i < tot_cards; i++){

	const c = new Card();
	c.mesh.position.z = -(i/tot_cards)/5

    pack.add( c.mesh );
	cards.push(c)
}
pack.position.z = 8
//pack.scale.set(2,2,2)
pack.position.y = -20;
 setCards()

let tot_buste = 12;
for(let i = 0; i < tot_buste; i++){

	let radius = 5;
	let angle = i/tot_buste * 2 * Math.PI
	let x = Math.cos(angle) * radius;
	let z = Math.sin(angle) * radius;

	const b = new Busta(Math.floor(i%6));
	b.group.position.x = x;
	b.group.position.z = z;
	b.group.lookAt(0, 0, 0); 

    cube.add( b.group );
}


const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2;
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setClearColor(0xdddddd, 1);


const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // color, intensity
scene.add(ambientLight);

// Optional: add a directional light to see shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);
const pmrem = new THREE.PMREMGenerator(renderer);

new RGBELoader()
  .setPath('textures/')
  .load('royal_esplanade_1k.hdr', (hdr) => {
    const envMap = pmrem.fromEquirectangular(hdr).texture;

    scene.environment = envMap;
    //scene.background = envMap;
    hdr.dispose();
    pmrem.dispose();
  });


  function setCards(){

	for(let c of cards){
		console.log(c)
		c.setCard();
	}

  }


// Drag variables
let isDragging = false;
let previousX = 0;
let velocity = 0;
const rotationSpeed = 0.0025; // sensitivity
const friction = 0.92;       // lower = stops faster, closer to 1 = smoother/more inertia
const snapStep = Math.PI*2 / tot_buste; // 60° = 2π/6
const snapThreshold = 0.001;  // velocity below this → snap

// --- Mouse events ---
function onMouseDown(event) {
    isDragging = true;
    previousX = event.clientX;
}

function onMouseMove(event) {
    if (!isDragging && global_state != 0) return;

    const deltaX = event.clientX - previousX;
    previousX = event.clientX;
    velocity = deltaX * rotationSpeed;
}

function onMouseUp() {
    isDragging = false;
}

// --- Touch events ---
function onTouchStart(event) {
    if (event.touches.length === 1 && global_state != 1 ) {
        isDragging = true;
        previousX = event.touches[0].clientX;
    }


}

function onTouchMove(event) {
    if (!isDragging || event.touches.length !== 1) return;

    const deltaX = event.touches[0].clientX - previousX;
    previousX = event.touches[0].clientX;
    velocity = deltaX * rotationSpeed;

	pack.rotation.y += deltaX* rotationSpeed
}

function onTouchEnd() {
    isDragging = false;
}

// Attach listeners
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('mouseleave', onMouseUp); // stop if leaving canvas

window.addEventListener('touchstart', onTouchStart);
window.addEventListener('touchmove', onTouchMove);
window.addEventListener('touchend', onTouchEnd);
window.addEventListener('touchcancel', onTouchEnd);

// Raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  // Convert mouse coordinates to normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // Get all objects the ray intersects
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    console.log('Clicked object:', clickedObject);

    // Example: change color
    //clickedObject.material.color.set(0xff0000);
	if(global_state == 0)global_state = 1;
	else if(global_state == 1)global_state = 2;
	else if(global_state == 2)global_state = 3;

	else if(global_state == 3)global_state = 4;
	else if(global_state == 4)global_state = 5;
	else if(global_state == 5)global_state = 6;
	else if(global_state == 6)global_state = 7;


	


  }else{

  if(global_state == 7){
	global_state = 0;
	setCards()
  }
  }
  

	console.log(global_state)

}

// Add the click listener
window.addEventListener('click', onMouseClick);


function animate( time ) {


	renderer.render( scene, camera );

	if(global_state == 1){
		cube.scale.x = THREE.MathUtils.lerp(cube.scale.x,  1.5, 0.05);
		cube.scale.y = THREE.MathUtils.lerp(cube.scale.y,  1.5, 0.05);
		cube.scale.z = THREE.MathUtils.lerp(cube.scale.z,  1.5, 0.05);
		cube.position.y = THREE.MathUtils.lerp(cube.position.y,  -0.75, 0.05);
	}

	if(global_state == 2){
		cube.position.y = THREE.MathUtils.lerp(cube.position.y,  -20, 0.01);
		pack.position.y = THREE.MathUtils.lerp(pack.position.y,  0, 0.05);

	}

	//if(global_state == 2){
	if (!isDragging) {
       pack.rotation.y = THREE.MathUtils.lerp(pack.rotation.y,  0, 0.05);
  		}
	//}

	if(global_state == 3){
	   pack.children[0].position.y = THREE.MathUtils.lerp(pack.children[0].position.y,  -3, 0.05);
	   pack.position.z = THREE.MathUtils.lerp(pack.position.z, 8 +  (1/tot_cards)/5, 0.02); 
    }
	if(global_state == 4){
	   pack.children[1].position.y = THREE.MathUtils.lerp(pack.children[1].position.y, - 3, 0.05);
	   pack.position.z = THREE.MathUtils.lerp(pack.position.z,  8 + (2/tot_cards)/5, 0.02); 

    }
	if(global_state == 5){
	   pack.children[2].position.y = THREE.MathUtils.lerp(pack.children[2].position.y, - 3, 0.05);
	   	pack.position.z = THREE.MathUtils.lerp(pack.position.z,   8 +(3/tot_cards)/5, 0.02); 

    }
	if(global_state == 6){
	   pack.children[3].position.y = THREE.MathUtils.lerp(pack.children[3].position.y, - 3, 0.05);
	   	pack.position.z = THREE.MathUtils.lerp(pack.position.z,  8 + (4/tot_cards)/5, 0.02); 

    }
	if(global_state == 7){
	   pack.children[4].position.y = THREE.MathUtils.lerp(pack.children[4].position.y, - 3, 0.05);



	   cube.scale.x = THREE.MathUtils.lerp(cube.scale.x,  1, 0.05);
	   cube.scale.y = THREE.MathUtils.lerp(cube.scale.y,  1, 0.05);
	   cube.scale.z = THREE.MathUtils.lerp(cube.scale.z,  1, 0.05);

	  
    }

  if(global_state == 0){


 	cube.position.y = THREE.MathUtils.lerp(cube.position.y,  0, 0.05);
	pack.position.y = THREE.MathUtils.lerp(pack.position.y,  -20, 0.05);
	pack.position.z = THREE.MathUtils.lerp(pack.position.z,  8, 0.05); 


	pack.children[0].position.y = THREE.MathUtils.lerp(pack.children[0].position.y,  0, 0.05);
	pack.children[1].position.y = THREE.MathUtils.lerp(pack.children[1].position.y,  0, 0.05);
	pack.children[2].position.y = THREE.MathUtils.lerp(pack.children[2].position.y,  0, 0.05);
	pack.children[3].position.y = THREE.MathUtils.lerp(pack.children[3].position.y,  0, 0.05);
	pack.children[4].position.y = THREE.MathUtils.lerp(pack.children[4].position.y,  0, 0.05);


  if (!isDragging) {
    // Apply momentum
    cube.rotation.y += velocity;
    velocity *= friction;

    // When nearly stopped → snap to nearest multiple of 60°
    if (Math.abs(velocity) < snapThreshold) {
      const snapped = Math.round(cube.rotation.y / snapStep) * snapStep;
      cube.rotation.y = THREE.MathUtils.lerp(cube.rotation.y, snapped, 0.05);

      // If very close, lock exactly
      if (Math.abs(cube.rotation.y - snapped) < 0.001) {
        cube.rotation.y = snapped;
        velocity = 0;
      }
    }
  } else {
    // While dragging → still rotate directly
    cube.rotation.y += velocity;
  }
}

}