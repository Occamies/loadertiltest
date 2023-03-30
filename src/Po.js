import * as THREE from "three";
import Loader from "./Loader";
import Room from "./Room";


import World from "./World";
export default class Po {
  constructor() {
    this.world = new World({
      showCameraPos: true,
      setCameraPos: [8.4, 6, 8.4],
      showGrid: false,
      ambientLight: false,
      orbitControl: true,
      showFloor: true,
    });

    //*spotlight  */
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(3, 6, 3);
    spotLight.angle = 10; //spreading
    spotLight.penumbra = 1; //blur in my world
    spotLight.decay = 1;
    spotLight.distance = 1000;
    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 2000; // default
    spotLight.shadow.mapSize.height = 2000; // default
    spotLight.shadow.camera.near = 0.5; // default
    spotLight.shadow.camera.far = 500; // default
    spotLight.shadow.focus = 1;
    this.world.scene.add(spotLight);

    //*END spotlight  */
//* Loader */
//new Loader(this.world)
//*END Loader */

//*Room  */
new Room(this.world)
//*END Room  */


  } //END constructor

  
} //END class
