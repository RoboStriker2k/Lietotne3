import { Component, Input } from "@angular/core";

@Component({
 selector: "multiimgdisplay",
 template: ` <div id="multiimgdisplay">
  <div id="multiimg">
@defer ( when imgarr != null) {
 
   @for (img of imgarr.images; track img) {
   <img src="http://localhost:3000/getfoto/?file={{ img }}" />
   }  
}

 @loading {
   <p>Ielādē attēlus</p>
 }

  
</div>
 </div>`,
 standalone: true,

})
export class Multiimgdisplay{
aimgarr = [];
 @Input () imgarr = {
    images :[]
 }
 
dosmgthing(){
  console.log(this.aimgarr);
 console.log(this.imgarr);
}


}