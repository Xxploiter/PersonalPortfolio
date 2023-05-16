import * as THREE from "three";
import Experience from "./Experience";

export default class Renderer{
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        // console.log(this.camera,this.experience);
        this.setRenderer();
      
    }

    setRenderer(){
        this.threeRenderer = new THREE.WebGLRenderer({
            canvas:this.canvas, // this is the canvas on which we will render our scene came from the Experience class
            // alpha:true, // this is used to make the background transparent
            antialias:true, // this is used to make the edges of the objects smooth
        });
        this.threeRenderer.physicallyCorrectLights = true; // this is used to make the lights look more realistic
        // this.threeRenderer.outputEncoding = THREE.sRGBEncoding; // BUG this is used to make the colors look more realistic (this is the type of encoding)
        this.threeRenderer.LinearEncoding = THREE.SRGBColorSpace ; // BUG this is used to make the colors look more realistic (this is the type of encoding)
        this.threeRenderer.toneMapping = THREE.CineonToneMapping; // this is used to make the colors look more realistic (this is the type of tone mapping)
        this.threeRenderer.toneMappingExposure = 1.75; // changed from 1.75 to 2.75 this is used to make the colors look more realistic (this is the intensity of the light)
        this.threeRenderer.shadowMap.enabled = true; // this is used to make the shadows look more realistic (this is the type of shadow mapping)
        this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap; // this is used to make the shadows look more realistic (this is the type of shadow mapping)

        this.threeRenderer.setSize(this.sizes.width,this.sizes.height);
        this.threeRenderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize(){
        this.threeRenderer.setSize(this.sizes.width,this.sizes.height);
        this.threeRenderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(){
        // TODO 
        this.threeRenderer.render(this.scene,this.camera.orthographicCamera);
    }
}