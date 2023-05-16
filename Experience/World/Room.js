import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";

// import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // IMP this code below loads up the room model IMP
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    console.log(this.actualRoom);
    this.roomChildren = {} // this will store all the children of the room model

    // Now implementing a lerp function to move the camera along the curve
    // Lerp is leniar interpolation which is used to move an object from one point to another in a smooth way

    this.lerp = {
      current: 0,
      target: 0,
      easeFactor: 0.1,
    };

    this.setModel();

    this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    // the loop below iterates through the children of the room model and sets the shadow and receiveShadow property to true
    // as their are groups inside the room model so we need to check and make sure the groups are also taken care of
    this.actualRoom.children.forEach((child) => {
      // console.log(child);
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      // console.log(child);
      if (child.name === "Aquarium") {
        // child.material.transparent = true;
        // child.material.opacity = 0.2;
        // Above is simple way to make the glass transparent but it will also make the water inside the aquarium transparent

        child.children[0].material = new THREE.MeshPhysicalMaterial();
        child.children[0].material.roughness = 0;
        child.children[0].material.color.set(0xadd8e6);
        child.children[0].material.ior = 2;
        child.children[0].material.transmission = 1;
        child.children[0].material.opacity = 2;
      }
      if (child.name === "Computer") {
        child.children[2].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }
      if (child.name === "Mini_Floor") {
        (child.position.x = 0.24828),
          // child.position.y =  -0.55855,
          (child.position.z = 0.038445);
      }
      // BUG uncomment the below code to make the objects invisible
      // if (
      //   child.name === "MailBox" ||
      //   child.name === "outdoorLamp" ||
      //   child.name === "_FloorFirst" ||
      //   child.name === "FloorSecond" ||
      //   child.name === "FloorThird" ||
      //   child.name === "Dirt" ||
      //   child.name === "Flower" 
      // ) {
      //   child.scale.set(0, 0, 0);
      // }
      // needed the below code tto set everythings scale to zero which we will take care of 
      // after showing the loader
      child.scale.set(0, 0, 0);
      if (child.name===  "Cube")  {
        child.scale.set(1, 1, 1);
        child.position.set(0, 1, 0);
        child.rotation.y = Math.PI/4;
      }
      // adding the children to the roomChildren object
      this.roomChildren[child.name.toLowerCase()] = child;
    });

    // lights code below
    const width = 1;
    const height = 1.3;
    const intensity = .8;
    const rectLight = new THREE.RectAreaLight(
      0xcecddf,
      intensity,
      width,
      height
    );
    rectLight.position.set(7.8355, 6.22, 1.79031);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 4;
    this.actualRoom.add(rectLight);
    // lights code below
    const widthScreen = .05;
    const heightScreen = .05;
    const intensityScreen = .3;
    const rectLightScreen = new THREE.RectAreaLight(
      0xcecddf,
      intensityScreen,
      widthScreen,
      heightScreen
    );
    rectLightScreen.position.set(-2.88094 , 7.22, -0.3);
    rectLightScreen.rotation.x = -Math.PI / 2;
    rectLightScreen.rotation.z = -Math.PI / 4;
    this.actualRoom.add(rectLightScreen);

    this.roomChildren["rectLight"] = rectLight; // adding the lights to the objects aswell
    this.roomChildren["rectLightScreen"] = rectLightScreen; // adding the lights to the objects aswell

    this.scene.add(this.actualRoom);
    // IMP the scale is also getting set at control.js while resizing
    this.actualRoom.scale.set(0.13, 0.13, 0.13); // IMP this is the scale of the room model
    // this.actualRoom.scale.set(0.17, 0.17, 0.17); // IMP this is the scale of the room model
    // this.actualRoom.rotation.y = Math.PI;
  }
  // the code below selects an animation specifically the fish animation and plays it
  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    console.log(this.room);
    this.swim = this.mixer.clipAction(this.room.animations[2]);
    this.fan1 = this.mixer.clipAction(this.room.animations[6]);
    this.fan2 = this.mixer.clipAction(this.room.animations[7]);
    this.fan3 = this.mixer.clipAction(this.room.animations[8]);
    this.fan4 = this.mixer.clipAction(this.room.animations[9]);
    this.fan5 = this.mixer.clipAction(this.room.animations[10]);
    this.fan6 = this.mixer.clipAction(this.room.animations[11]);
    this.fan7 = this.mixer.clipAction(this.room.animations[12]);
    this.fan8 = this.mixer.clipAction(this.room.animations[13]);
    this.fan9 = this.mixer.clipAction(this.room.animations[14]);
    this.fan1.play();
    this.fan2.play();
    this.fan3.play();
    this.fan4.play();
    this.fan5.play();
    this.fan6.play();
    this.fan7.play();
    this.fan8.play();
    this.fan9.play();
    this.swim.play();
  }
  // below code is used to rotate the room model on mouse move

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.18;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.easeFactor
    );
    // TODO
    this.actualRoom.rotation.y = this.lerp.current;
    this.mixer.update(this.time.delta * 0.0009);
  }
}
