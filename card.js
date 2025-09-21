
import * as THREE from 'three';

class Card {
  constructor() {

    const geometry = new THREE.PlaneGeometry( 736/736, 1024/736 );

    let map = new THREE.TextureLoader().load('./textures/carte/card.1.png')
    map.encoding = THREE.sRGBEncoding

    map.colorSpace = THREE.SRGBColorSpace

    this.material = new THREE.MeshStandardMaterial({
  map: map,       // color texture
  normalMap: new THREE.TextureLoader().load('./textures/carte/card_normal.1.png'), // normal map for bumps/detail
  side: THREE.DoubleSide,
  metalness: 0.75,
  roughness:0.25,
  transparent:true,
  envMapIntensity: 1.5,
  emissiveMap: map
});
    
        
    this.mesh = new THREE.Mesh( geometry, this.material );
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


  this.setCard = function(){
      this.index = Math.floor(Math.random()*20)
      const map = new THREE.TextureLoader().load('./textures/carte/card.'+this.index+'.png')
      map.encoding = THREE.sRGBEncoding
      map.colorSpace = THREE.SRGBColorSpace
      this.material.map = map;
      this.material.normalMap = new THREE.TextureLoader().load('./textures/carte/card_normal.'+this.index+'.png')

    }
  }
  

}

export default Card;

