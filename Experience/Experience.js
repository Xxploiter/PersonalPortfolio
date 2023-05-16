// Here will be all import statements
import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

import Camera from "./Camera";
import Theme from "./Theme";
import Renderer from "./Renderer";
import Preloader from "./Preloader";

import World from "./World/World";
import Controls from "./World/Controls";


export default class Experience {
    static instance
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance; //if there exists an instance of Experience class then return that instance
    }
    Experience.instance = this; //if there is no instance of Experience class then create one and return it
    this.canvas = canvas;
    // IMP creating all the instances of the classes that will be needed
    this.scene = new THREE.Scene();

    this.time = new Time();

    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
 
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    // instantiating the pre-Loader
    this.preloader = new Preloader();

    this.preloader.on("enablecontrols", ()=>{
      this.controls = new Controls();
    })

    this.time.on("update", ()=>{
      this.update(); // this update function is of Experience class which will be triggered on event "update" of Time class
    })

    this.sizes.on("resize",()=>{
      this.resize();
    }); 

  }
  update(){
    this.preloader.update();
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
  resize(){
    this.camera.resize();
    this.world.update();
    this.renderer.resize();
  }
}
