import EventEmitter from "events";

export default class Time extends EventEmitter{
    constructor(){
        super(); // this is used to make sure that the EventEmitter class is initialized properly 
      this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16; // delta is the time difference between the current frame and the previous frame, time between each frame

        this.update();
    }
    update(){
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        this.emit("update"); // this is used to emit an event called update
        window.requestAnimationFrame(this.update.bind(this)); // bind(this) is used to make sure that the this keyword inside the update function refers to the Time class
    }
}