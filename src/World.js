import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { InteractionManager } from "three.interactive";


export default class World {
  constructor(settings) {

    console.log(settings)

    //*lave vores scene med kamera  */

    this.scene = new THREE.Scene();
    if (settings.showGrid) {
      const size = 20;
      const divisions = 20;
      const gridHelper = new THREE.GridHelper(size, divisions);
      this.scene.add(gridHelper);
    }
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );

    this.camera.position.set(
      settings.setCameraPos[0],
      settings.setCameraPos[1],
      settings.setCameraPos[2]
    );

    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
    //*END lave vores scene med kamera  */

    //*renderer verdnen  */
    this.renderer = new THREE.WebGLRenderer({
      //physicalluCorrectLight: true,
      antialias: true,
      shadow: true,
      outputEncoding: THREE.sRGBEncoding,
    });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    //this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.render(this.scene, this.camera);

    document.body.appendChild(this.renderer.domElement);

    this.InteractionManager = new InteractionManager(
      this.renderer,
      this.camera,
      this.renderer.domElement
    );

    //*orbit Control  */
    if(settings.orbitControl) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
       } 

    //*END orbit Control  */

    //*default lys  */
    if (settings.ambientLight) {
      this.al = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(this.al);
    }
    //*END default lys  */

    this.renderer.setAnimationLoop((time) => {
      this.animation(time);
    });
    //*END renderer verdnen  */

    window.addEventListener("resize", () =>
      this.onWindowResized(this.renderer, this.camera)
    );

    //*Floor*/
    const geometryFloor = new THREE.PlaneGeometry(20, 20);
    const materialFloor = new THREE.MeshPhongMaterial({
      color: 0x1520a6,
      side: THREE.DoubleSide,
    });
    
    const floor = new THREE.Mesh(geometryFloor, materialFloor);
    floor.rotation.x = Math.PI / 2;
    floor.position.y = 0;
    this.scene.add(floor);
    //*END Floor  */

    if (settings.showCameraPos && settings.orbitControl) {
      this.controls.addEventListener("change", (event) => {
        for (const key in this.controls.object.position) {
          console.log(`${key}:
     ${Math.round(this.controls.object.position[key] * 10) / 10}`);
        }
      });
    }
  } //END constructor

  //*render animation  */
  animation(time) {
    this.renderer.render(this.scene, this.camera);
  }
  //*END render animation  */

  //*OnWindowResize  */
  onWindowResized() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  //*END OnWindowResize  */
} //END class
