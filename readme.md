//The code will be spread across different files// will be using OOP Concepts and design paterns
//IMP One thing to keep in mind is that when creating multiple objects in the three js scene to render 
  IMP those objects on the same scene the OBJECTS must share the same scene instance rather than a 
  IMP different one THIS CAN BE SOLVED BY USING A SNGLETON PATTERN 


//Here The code will be spreaded across diff files like camera.js, renderer.js, sizes.js etc and all of these files will interact with eachother through IMP Experiece.js 
//Here Experience.js will be Singleton 

// As all the update functions depend on window.requestAnimationFrame, we will try to use only one  window.requestAnimationFrame to use in different classes for that we will be emiting an event for other classes to listen the actual function resides in IMP Utils/Time.js 
// For the above purposes that is emiting custom events i am using a node's events library