import { Component, Input } from "@angular/core";
import { serverconfig } from "../app.config";

@Component({
 selector: "multiimgdisplay",
 template: ` <div id="multiimgdisplay">
  <div id="multiimg">
   @defer ( when imgarr != null) { @for (img of imgarr.images; track img) {
   <div>
    <img src="{{ baseurl }}/getfoto/?file={{ img }}" />
    @if (editstatus == true) {
    <input class="multiimgcheck" type="checkbox" id="{{ img }}" />
    }
   </div>
   } } @loading {
   <p>Ielādē attēlus</p>
   }
  </div>
 </div>`,
 standalone: true,
})
export class Multiimgdisplay {
 aimgarr = [];
 @Input() imgarr = {
  images: [],
 };
 baseurl: string = serverconfig.baseurl;
 @Input() editstatus: boolean = false;
}
