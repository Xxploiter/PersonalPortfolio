import EventEmitter from "events";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import Experience from "../Experience";

// EventEmitter is a class that is used to create and listen to custom events
// this class is used to load the resources and emit an event called loaded
export default class Resources extends EventEmitter{
    constructor(assets){
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;
        // console.log(this.assets);
        this.items = {}; // hold all the loaded items
        this.queue = this.assets.length; // hold the number of items that need to be loaded
        this.loaded = 0; // hold the number of items that have been loaded (counter)

        this.setLoaders();
        this.startLoading();

    }

    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();

        this.loaders.dracoLoader.setDecoderPath("/draco/"); // this is the path where the draco decoder is located
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader); // this is used to make sure that the gltf loader uses the draco loader
    }
    startLoading(){ // this function is used to start loading the assets and emit the loaded event when all the assets are loaded
       for(const asset of this.assets){
           if(asset.type === "glbModel"){
               this.loaders.gltfLoader.load(asset.path, (file)=>{
                this.singleAssetLoaded(asset, file);
               });
           } else if(asset.type === "videoTexture"){
                this.video = {} // this is used to store the video element (html element)
                this.videoTexture = {} // this is used to store the video texture coonfiguration
                this.video[asset.name] = document.createElement("video"); // this is used to create a video element
                this.video[asset.name].src = asset.path; // this is used to set the source of the video element
                this.video[asset.name].playsInline = true; // this is used to make sure that the video plays inline
                this.video[asset.name].autoplay = true; // this is used to make sure that the video plays automatically
                this.video[asset.name].loop = true; // this is used to make sure that the video loops
                this.video[asset.name].muted = true; // this is used to make sure that the video is muted
                this.video[asset.name].play() // this is used to play the video

                this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]); // this is used to create a video texture

                this.videoTexture[asset.name].flipY = false; // this is used to make sure that the video texture is not flipped
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter; // this is used to make sure that the video texture is not blurred 
                this.videoTexture[asset.name].magFilter = THREE.NearestFilter; // this is used to make sure that the video texture is not blurred 
                this.videoTexture[asset.name].generateMipmaps = false;
                // this.videoTexture[asset.name].encoding = THREE.sRGBEncoding; // BUG deprecated code sRGBEncoding
                this.videoTexture[asset.name].encoding = THREE.SRGBColorSpace; // FIXed deprecated code sRGBEncoding here
                // this.videoTexture[asset.name].colorSpace = THREE.SRGBColorSpace; // FIXed deprecated code sRGBEncoding here

                this.singleAssetLoaded(asset, this.videoTexture[asset.name]); // this is used to emit the loaded event and pass the video texture as the file
           }
       }
    }

    singleAssetLoaded(asset, file){
        // gonna create a key value pair in the items object where the key is the name of the asset and the value is the file    
        this.items[asset.name] = file;
        this.loaded++;
        console.log('assests are loading');
        if(this.loaded === this.queue){
            this.emit("ready");
            console.log('assests are loaded');
        }
    }
}