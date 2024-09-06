import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Editpost } from "../interfaces/editpost";

@Component({
 selector: "Galleryview",
 standalone: true,
 template: ` <div id="gallerymarker">
  @if (gst.viewstatsus == true) { @defer (when gst.status ) {
  <div class="gallery">
   <div id="galleryimg"><img src="{{ imgurl + gstate.currimg }}" /></div>
   <div class="gallerynav">
    <button id="prev" (click)="previmg()">{{ "<" }}</button>
    <div id="currimg"><img id="currimg" src="{{ imgurl + gstate.currimg }}" /></div>
    <button id="next" (click)="nextimg()">{{ ">" }}</button>
    <button (click)="close()">iziet</button>
   </div>
   @if (gstate.IER.imgarr != null) {
   <div class="album">
    @for (img of gstate.IER.imgarr.images; track img) {
    <div (click)="imgclick(img)">
     <img src="{{ imgurl + img }}" />
    </div>
    }
   </div>
   }
  </div>
  } @placeholder {
  {{ getpost() }}
  } @loading {
  <p>Iegūst ierakstu ...</p>
  } @error {
  <p>Nav ierakstu</p>
  } }
 </div>`,
})
export class GalleryviewComponent {
 @Input() gst: Editpost = { idposts: 0, status: false, viewstatsus: false };
 @Output() resetgalery = new EventEmitter();
 gstate = {
  IER: {
   imgarr: {
    images: [],
   },
  },
  pw: {
   images: [""],
  },
  statenr: -1,
  currimg: "",
  imageindex: 0,
 };
 imgurl = "http://localhost:3000/getfoto/?file=";

 getpost() {
  fetch(`http://localhost:3000/api/getpost/?postiid=${this.gst.idposts}`, {
   method: "GET",
  })
   .then((response) => response.json())
   .then((data) => {
    this.gstate = {
     ...this.gstate,
     IER: data.posts[0],
     statenr: 1,
     pw: data.posts[0].imgarr,
     currimg: data.posts[0].imgarr.images[0],
    };
    this.gst.status = true;
   })
   .catch((error) => {
    console.log(error);
   });
 }
 nextimg() {
  let index = this.gstate.imageindex;
  if (index < this.gstate.pw.images.length - 1) {
   this.gstate = { ...this.gstate, imageindex: index + 1, currimg: this.gstate.pw.images[index + 1] };
  }
 }
 previmg() {
  let index = this.gstate.imageindex;
  if (index > 0) {
   this.gstate = { ...this.gstate, imageindex: index - 1, currimg: this.gstate.pw.images[index - 1] };
  }
 }
 imgclick(img: string) {
  this.gstate = { ...this.gstate, statenr: 1, currimg: img };
 }
 close() {
  this.gstate = { ...this.gstate, statenr: -1, imageindex: 0, currimg: this.gstate.pw.images[0] };
  this.resetgalery.emit();
 }
}
