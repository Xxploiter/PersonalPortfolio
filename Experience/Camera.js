import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    // console.log(this.sizes,this.scene,this.canvas,this.experience);

    // IMP Now creating a camera (orthographic camera)
    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35, // field of view (fov) in degrees which is the vertical angle of the camera
      this.sizes.aspectRatio, // aspect ratio of the camera
      0.1, // near plane of the frustum
      1000 // far plane of the frustum
    );
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.x = 29;
    this.perspectiveCamera.position.y = 14;
    this.perspectiveCamera.position.z = 12;
   
  }
  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspectRatio * this.sizes.frustumSize) / 2, // left side of the frustum (leftmost point)
      (this.sizes.aspectRatio * this.sizes.frustumSize) / 2, // right side of the frustum (rightmost point)
      this.sizes.frustumSize / 2, // top side of the frustum (topmost point)
      -this.sizes.frustumSize / 2, // bottom side of the frustum (bottommost point)
      -50, // near plane of the frustum
      50 // far plane of the frustum
    );

    this.orthographicCamera.position.y = 5.65; // this will be set back to 6.35 in the preloader after loading the initial cube
    this.orthographicCamera.position.z = 10;
    this.orthographicCamera.rotation.x = -Math.PI / 6.3;

    this.scene.add(this.orthographicCamera);
   
    const size = 20;
    const divisions = 20;
  
  }

  resize() {
    // updating the perspective camera on resize
    this.perspectiveCamera.aspect = this.sizes.aspectRatio;

    this.perspectiveCamera.updateProjectionMatrix(); //IMP this is used to update the projection matrix of the camera
    // projection matrix is used to convert the 3d coordinates to 2d coordinates (which are then displayed on the screen)

    // updating the orthographic camera on resize
    // this.orthographicCamera.left =
    //   (-this.sizes.aspectRatio * this.frustumSize) / 2;
    // this.orthographicCamera.right =
    //   (this.sizes.aspectRatio * this.frustumSize) / 2;
    // this.orthographicCamera.top = this.frustumSize / 2;
    // this.orthographicCamera.bottom = -this.frustumSize / 2;

    // this.orthographicCamera.updateProjectionMatrix(); //IMP this is used to update the projection matrix of the camera
    // projection matrix is used to convert the 3d coordinates to 2d coordinates (which are then displayed on the screen)
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
  }

  update() {
    // TODO
    this.controls.update();
    // console.log(this.perspectiveCamera.position);
    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
