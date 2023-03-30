
import Data from "../assets/json/loader.json"
import gsap from "gsap";

export default class Loader {
  constructor(world){

    this.world = world;

    const overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay)


    const loader = document.createElement("section");
    loader.className = "loader"
    overlay.appendChild(loader);



    Data.Loader.object.forEach((item) => {
      const loaderObj = document.createElement("div")
      loaderObj.className = item
      loader.appendChild(loaderObj)
    });

    overlay.addEventListener("click", ()=>{
      this.remove(overlay)
    })

  }//END constructor


  remove(item){
    gsap.to(item, {
      duration: 5,
      y: 1000,
    })
  }

}//END class