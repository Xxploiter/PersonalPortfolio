// this file will deal with lighting and shadows
import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // this.gui = new GUI({ container: document.querySelector(".hero-main") });
    // this.obj = {
    //   colorObj: { r: 0, g: 0, b: 0 },
    //   intensity: 3,
    // };

    this.setSunlight();
    // this.setGUI();
  }

  //   setGUI() {
  //     this.gui.addColor(this.obj, "colorObj").onChange(() => {
  //       this.sunlight.color.copy(this.obj.colorObj);
  //       this.ambientLight.color.copy(this.obj.colorObj);
  //       console.log(this.obj.colorObj);
  //       // 181a59, 1.739
  //       // 373cd7, 0.781
  //     });
  //     this.gui
  //       .add(this.obj, "intensity")
  //       .min(0)
  //       .max(10)
  //       .step(0.001)
  //       .onChange(() => {
  //         this.sunlight.intensity = this.obj.intensity;
  //         this.sunlight.ambientLight = this.obj.intensity;
  //       });
  //   }
  setSunlight() {
    this.sunlight = new THREE.DirectionalLight(0xc2c1ff, 3); // TODO color of the sunlight it was 2
    // 0c1445 night hex code
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 20;
    this.sunlight.shadow.mapSize.set(2048, 2048);
    this.sunlight.shadow.normalBias = 0.05;
    // BUG Helper is here delete them later
    // const helper = new THREE.CameraHelper(this.sunlight.shadow.camera)
    // this.scene.add(helper)
    this.sunlight.position.set(-1.5, 7, 3);
    // this.sunlight.position.set(-3, 7, 5);

    // now adding the sunlight to the scene
    this.scene.add(this.sunlight);
    this.sunlight.color;
    console.log("the sun intensity is ", this.sunlight.intensity);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // TODO color of the ambient light
    this.scene.add(this.ambientLight);
  }
  switchTheme(theme) {
    console.log("theme");
    if (theme === "dark") {
      // #7686C3
      //   GSAP.to(this.sunlight.color, {
      //     // setting the color of the sunlight to black
      //     b: 0.6392156862745098,
      //     g: 0.2,
      //     r: 0.25098039215686274,
      //   });
      //   GSAP.to(this.ambientLight.color, {
      //     // setting the color of the sunlight to black
      //     b: 0.6392156862745098,
      //     g: 0.2,
      //     r: 0.25098039215686274,
      //   });
      GSAP.to(this.sunlight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.sunlight, {
        intensity: 0.904,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.1,
      });
    } else {
      GSAP.to(this.sunlight.color, {
        // setting the color of the sunlight to white
        r: 0.5394794890033748,
        g: 0.5332764040016892,
        b: 1,
      });
      GSAP.to(this.ambientLight.color, {
        // setting the color of the sunlight to white
        r: 1,
        g: 1,
        b: 1,
      });
      GSAP.to(this.sunlight, {
        intensity: 3,
        // intensity: 2,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.2,
      });
    }
  }

  resize() {}

  update() {
    // TODO
  }
}
