import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    // extra by me
    this.floor = this.experience.world.floor.plane;
    this.preloader = this.experience.preloader;
    // extra by mmme end

    this.room = this.experience.world.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        if (child.intensity === 0.8) {
          console.log("Aquarium Light");
          this.rectLight = child; // trynna scale the light
        }else if(child.intensity === 0.3){
          console.log("Screen Light");
          this.rectLightScreen = child;
        }     
      }
      
    });
    // code for the added circles
    this.circleFirst = this.experience.world.floor.circleFirst;
    this.circleSecond = this.experience.world.floor.circleSecond;
    this.circleThird = this.experience.world.floor.circleThird;
    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector(".page").style.overflow = "visible";

    this.preloader.on("enablecontrols", () => {
      this.setSmoothScroll();
      this.setScrollTrigger();
  });

    // this.setSmoothScroll();
    // this.setScrollTrigger();
  }

  // code below is for the smooth scroll
  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.1,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  // the code below selects an animation specifically the fish animation and plays it
  setScrollTrigger() {
    //desktop
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 969px)": () => {
        console.log("desktop responsive");
        // below code is for the room resetting it back to normal values
        this.room.scale.set(0.13, 0.13, 0.13);
        // below code is for the light resetting it back to normal values
        this.rectLight.width = 1.2;
        this.rectLight.height = 1.3;
        this.rectLightScreen.width = .05;
        this.rectLightScreen.height = .05;
        // First Section--------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0013;
          },
        });
        // Second Section--------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        this.secondMoveTimeline.to(
          this.floor.position,
          {
            y: () => {
              return -3;
            },
          },
          "same"
        );

        this.secondMoveTimeline.to(
          this.room.position,
          {
            x: () => {
              // return this.sizes.width * 0.0015
              return 2.5;
            },
            y: () => {
              return -1.5;
            },
            z: () => {
              return this.sizes.height * 0.002;
            },
          },
          "same"
        );

        this.secondMoveTimeline.to(
          this.room.scale,
          {
            x: 0.6,
            y: 0.6,
            z: 0.6,
          },
          "same"
        );
        this.secondMoveTimeline.to(
          this.rectLight,
          {
            width: 1.4 * 4,
            height: 2 * 4,
          },
          "same"
        );
        // third Section--------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.camera.orthographicCamera.position, {
          y: 0,
          x: -5.1,
        });
      },

      // Mobile Phone Responsive/animations etc
      "(max-width: 968px)": () => {
        // Resets
        this.room.scale.set(0.07, 0.07, 0.07);
        this.room.position.set(0, 0, 0);
        this.rectLight.width = 0.6;
        this.rectLight.height = 0.4;
        // First Section--------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.room.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        });
        // Second Section--------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25,
            },
            "sameMobileResponse"
          )
          .to(
            this.room.position,
            {
              x: 1.4,
            },
            "sameMobileResponse"
          )
          .to(
            this.rectLight,
            {
              width: 0.5,
              height: 0.3,
            },
            "sameMobileResponse"
          );

        // third Section--------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.position,
            {
              x: 2.5,
              y: 1.5,
            },
            "thirdMove"
          )
          .to(
            this.floor.position,
            {
              y: 1.2,
            },
            "thirdMove"
          );
      },
      // medium
      // "(min-width: 600px) and (max-width: 959px)": function() {

      // },
      // // small
      // "(max-width: 599px)": function() {

      // },
      // all
      all: () => {
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
          this.progressWrapper = section.querySelector(".progress-wrapper");
          this.progressBar = section.querySelector(".progress-bar");

          if (section.classList.contains("right")) {
            GSAP.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
            });
            GSAP.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          } else {
            GSAP.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
            });
            GSAP.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }
          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              pin: this.progressWrapper,
              pinSpacing: false,
            },
          });
          // Animations Circles etc
          // First section -----------------------------------------
          this.firstCircle = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          })
            .to(
              this.circleFirst.scale,
              {
                x:3,
                y:3,
                z:3,
              },
              "sameFirst"
            )
            .to(
              this.circleThird.position,
              {
                y: -2.5,
                x: 1.8,
              },
              "sameFirst"
            )
            .to(
              this.circleSecond.position,
              {
                y: -2.7,
                x: 1.8,
              },
              "sameFirst"
            )
            .to(
              this.circleFirst.position,
              {
                y: -2.9,
                x: 1.8,
              },
              "sameFirst"
            )
            .to(
              this.floor.position,
              {
                y: -3.5,
              
              },
              "sameFirst"
            );

          // Second section -----------------------------------------
          this.secondCircle = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          })
            .to(
              this.circleSecond.scale,
              {
                x:3,
                y:3,
                z:3,
              },
              "same"
            )
            .to(
              this.room.position,
              {
                y: -1.5,
              },
              "same"
            )
            .to(
              this.circleThird.position,
              {
                y: -2.7,
                x: 1.8,
              },
              "same"
            )
            .to(
              this.circleSecond.position,
              {
                y: -2.8,
                x: 1.8,
              },
              "same"
            )
            .to(
              this.circleFirst.position,
              {
                y: -2.9,
                x: 1.8,
              },
              "same"
            )
            .to(
              this.floor.position,
              {
                y: -3,
                x: 1.8,
              },
              "same"
            );

          // Third section -----------------------------------------
          this.thirdCircle = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          })
            .to(
              this.circleThird.scale,
              {
                x:3,
                y:3,
                z:3,
              },
              "sameThird"
            )
            .to(
              this.room.position,
              {
                y: -1,
                x: 1.8,
              },
              "sameThird"
            )
            .to(
              this.circleThird.position,
              {
                y: -2.7,
                x: 1.8,
              },
              "sameThird"
            )
            .to(
              this.circleSecond.position,
              {
                y: -2.8,
                x: 1.8,
              },
              "sameThird"
            )
            .to(
              this.circleFirst.position,
              {
                y: -2.9,
                x: 1.8,
              },
              "sameThird"
            )
            .to(
              this.floor.position,
              {
                y: -3,
                x: 1.8,
              },
              "sameThird"
            );
        });
        // this.sections = document.querySelectorAll(".section");
        // this.sections.forEach((section) => {
        //   this.progressWrapper = section.querySelector(".progress-wrapper");
        //   this.progresBar = section.querySelector(".progress-bar");
        //   // below is for all the right sections
        //   if (section.classList.contains("right")) {
        //     GSAP.to(section, {
        //       borderTopLeftRadius: 10,
        //       scrollTrigger: {
        //         trigger: section,
        //         start: "top bottom",
        //         end: "top top",
        //         scrub: 0.6,
        //       },
        //     });
        //     GSAP.to(section, {
        //       borderBottomLeftRadius: 700,
        //       scrollTrigger: {
        //         trigger: section,
        //         start: "bottom bottom",
        //         end: "bottom top",
        //         scrub: 0.6,
        //       },
        //     });
        //   }else{
        //       GSAP.to(section, {
        //         borderTopRightRadius: 10,
        //         scrollTrigger: {
        //           trigger: section,
        //           start: "top bottom",
        //           end: "top top",
        //           scrub: 0.6,
        //         },
        //       });
        //       GSAP.to(section, {
        //         borderBottomRightRadius: 700,
        //         scrollTrigger: {
        //           trigger: section,
        //           start: "bottom bottom",
        //           end: "bottom top",
        //           scrub: 0.6,
        //         },
        //       });
        //   }
        // });

        // third Section--------------------
        this.secondPartTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "center center",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        // IMP this below is the setup where there will be no scrubbing and the animation will be played once
        // personally i dont like it and for this to work the duration must be set to very less prolly .5 or .3
        // this.secondPartTimeline = new GSAP.timeline({
        //   scrollTrigger: {
        //     trigger: ".third-move",
        //     start: "center center",
        //   },
        // });
        this.room.children.forEach((child) => {
          if (child.name === "Mini_Floor") {
            this.first = GSAP.to(child.position, {
              x: -8.69475,
              y: -0.038445,
              z: 11.005,
              ease: "back.out(2)",
              duration: 1,
            });
          }
          if (child.name === "MailBox") {
            this.second = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 1,
            });
          }
          if (child.name === "outdoorLamp") {
            this.third = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 1,
            });
          }
          if (child.name === "_FloorFirst") {
            this.fourth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 1,
            });
          }
          if (child.name === "FloorSecond") {
            this.fifth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 1,
            });
          }
          if (child.name === "FloorThird") {
            this.sixth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 1,
            });
          }
          if (child.name === "Dirt") {
            this.seventh = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 1,
            });
          }
          if (child.name === "Flower") {
            this.eighth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 1,
            });
          }
        });
        this.secondPartTimeline.add(this.first);
        this.secondPartTimeline.add(this.second);
        this.secondPartTimeline.add(this.third);
        this.secondPartTimeline.add(this.fourth, "-=0.2");
        this.secondPartTimeline.add(this.fifth, "-=0.2");
        this.secondPartTimeline.add(this.sixth, "-=0.2");
        this.secondPartTimeline.add(this.seventh, "-=0.2");
        this.secondPartTimeline.add(this.eighth, "-=0.1");
        // .to(
        //   this.room.position,
        //   {
        //     x: 2.5,
        //     y: 1.5,
        //   },
        //   "thirdMove"
        // )
        // .to(
        //   this.floor.position,
        //   {
        //     y: 1.2,
        //   },
        //   "thirdMove"
        // );
      },
    });
    // this.timeline = new GSAP.timeline();
    // this.timeline.to(this.room.position, {
    //   x: ()=>{
    //     return this.sizes.width * 0.0021},
    //   scrollTrigger: {
    //     trigger: ".first-move",
    //     markers: true,
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: 0.6,
    //     invalidateOnRefresh: true,
    //   }
    // })
  }

  resize() {}

  update() {
    // TODO
  }
}