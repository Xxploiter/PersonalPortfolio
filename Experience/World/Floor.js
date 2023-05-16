import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }
  setFloor() {
    this.geometry = new THREE.PlaneGeometry(155, 155);
    // this.geometry = new THREE.PlaneGeometry(13500,135000);
    // this.geometry = new THREE.PlaneGeometry(1000000000,1000000000);
    // this.geometry = new THREE.PlaneGeometry(50,50);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xebeaeb,
      side: THREE.BackSide,
    });
    // color whitish #EBEAEB, E3E3E5
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.2;
    this.plane.receiveShadow = true;
  }

  //  code for creating new geometry and material For the circles on the floor
  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 64);
    const material = new THREE.MeshStandardMaterial({ color: 0x8f81cc });
    const material2 = new THREE.MeshStandardMaterial({ color: 0x8395cd });
    const material3 = new THREE.MeshStandardMaterial({ color: 0x7ad0ac });

    this.circleFirst = new THREE.Mesh(geometry, material);
    this.circleSecond = new THREE.Mesh(geometry, material2);
    this.circleThird = new THREE.Mesh(geometry, material3);

    this.circleFirst.position.y = -0.19;

    this.circleSecond.position.y = -0.18;
    this.circleSecond.position.x = 1;

    this.circleThird.position.y = -0.17;

    this.circleFirst.scale.set(0, 0, 0);
    this.circleSecond.scale.set(0, 0, 0);
    this.circleThird.scale.set(0, 0, 0);

    this.circleFirst.rotation.x =
      this.circleSecond.rotation.x =
      this.circleThird.rotation.x =
        -Math.PI / 2;

    this.circleFirst.receiveShadow =
      this.circleSecond.receiveShadow =
      this.circleThird.receiveShadow =
        true;

    this.scene.add(this.circleFirst);
    this.scene.add(this.circleSecond);
    this.scene.add(this.circleThird);
  }

  resize() {}

  update() {}
}
