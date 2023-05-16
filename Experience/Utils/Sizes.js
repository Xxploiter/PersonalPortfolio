import EventEmitter from "events";
// EventEmitter is a class that is used to create and listen to custom events
// this class is used to make sure that the canvas is responsive by emitting an event called resize
// this class is used to make sure that the canvas is not blurry on high resolution screens
export default class Sizes extends EventEmitter{
    constructor(){
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspectRatio = this.width/this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);//if devicePixelRatio is greater than 2 then use 2
        //pixelRatio is used to make sure that the canvas is not blurry on high resolution screens
        this.frustumSize = 5; //this is the size of the camera frustum
        if(this.width < 968){
            this.device = "mobile";
        }else{
            this.device = "desktop";
        }
        // function resize(){
        //     this.width = window.innerWidth;
        //     this.height = window.innerHeight;
        //     this.aspectRatio = this.width/this.height;
        //     this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        // }
        // this.resize();
        // window.addEventListener("resize",this.resize.bind(this));//bind(this) is used to make sure that the this keyword inside the resize function refers to the Sizes class
        window.addEventListener("resize", ()=>{
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspectRatio = this.width/this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.emit("resize");
        if(this.width < 968  && this.device !== "mobile"){
            this.device = "mobile";
            this.emit("switchdevice", this.device);
        }else if(this.width >= 968 && this.device !== "desktop"){
            this.device = "desktop";
            this.emit("switchdevice", this.device);

        }
        })
    }
}