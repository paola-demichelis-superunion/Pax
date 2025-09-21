
import * as THREE from 'three';

class Busta {
  constructor(_index) {

    const geometry = new THREE.PlaneGeometry( 1, 1.7 );

    let map = new THREE.TextureLoader().load('./textures/buste/busta_normal_.'+_index+'.png')
    map.encoding = THREE.sRGBEncoding

    map.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshStandardMaterial({
  map: map,       // color texture
  metalness: 0.85,
  roughness:0.35,
  transparent:true,
  envMapIntensity: 2.5,
    emissiveMap: map

});
    
    this.group = new THREE.Group();
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.rotation.y = Math.PI
    this.mesh_back = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color: 0x000000,   side: THREE.DoubleSide,}) );
    this.mesh_back.position.z = 0.025;
    this.group.add(this.mesh )
    this.group.add(this.mesh_back )
    /*
    this.plane_geometry = new THREE.PlaneGeometry( 5 *(4000 /6341), 5 );

    this.plane_material = new THREE.ShaderMaterial( {
      side: THREE.DoubleSide, transparent: true,
      uniforms: { 
        Matcap: { value: new THREE.TextureLoader().load( './assets/test2.png' ) } ,
        index: { value:  1 },
        inp: {value: 0},
      },
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    } );

    this.mesh = new THREE.Mesh( this.plane_geometry, this.plane_material );
    */
  }
}

export default Busta;

