import * as THREE from "three";
import Data from "../assets/json/loader.json"


export default class Room {
  constructor(world){
    this.world = world


Data.room.forEach((item)=> {  
  const geometryWall = new THREE.PlaneGeometry(20, 20);
    const materialFloor = new THREE.MeshPhongMaterial({
      color: 0x1520a6,
      side: THREE.DoubleSide,
    });
    const wall = new THREE.Mesh(geometryWall, materialFloor);
    wall.rotation.x = 0;
    wall.rotation.y = Math.PI/item.wallYRot
    wall.position.y = 10;
    wall.position.z = item.wallZPos
    wall.position.x = item.wallXPos
    this.world.scene.add(wall);
    console.log(item)
}); 
  }
}