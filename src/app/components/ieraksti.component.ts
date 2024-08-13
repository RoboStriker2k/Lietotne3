import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Ieraksts } from "../interfaces/ieraksti";
import { Editpost } from "../interfaces/editpost";
import { PagebuttonsComponent } from "./Pagebuttons.component";
import { Editcomponent } from "./Editpost.component";
import { Multiimgdisplay } from "./multiimgdisplay.component";
@Component({
 selector: "Ieraksti",
 imports: [PagebuttonsComponent, Editcomponent, Multiimgdisplay],
 template: ` <div>
  <div id="postcntbox">
   <p>Atrasto ierakstu skaits:{{ Ierakstuskaits }}</p>
  </div>

  <div id="ieraksti" class="iecontent">
   @if (Ieraksti.length == 0) {
   <p>Nav ierakstu</p>
   } @else { @for (item of Ieraksti;track item.idposts) {
   <div class="ieraksts" id="{{ item.idposts }}">
    @if (deletestatus == true) {<input type="checkbox" id="{{ item.idposts }}" />}

    <h1>{{ item.title }}</h1>
    <p>{{ item.pdesc }}</p>
    @if (item.imgpath != null){<img src="http://localhost:3000/getfoto/?file={{ item.imgpath }}" />}
 
    @if (item.imgarr != null){
      <multiimgdisplay [imgarr]="item.imgarr"  />

}
    <div>
     <button class="btn" id="{{ item.idposts }}" (click)="editfn(item.idposts)">Labot</button>
    </div>
   </div>
   } }
  </div>
  <Editcomponent [Posttatus]="this.poststaus" />
  <Pagebuttons [page]="this.page" [maxpages]="this.maxpages" (gonext)="nextpage($event)" />
 </div>`,
 standalone: true,
})
export class IerakstiComponent {
 Ieraksti: Ieraksts[] = [];
poststaus: Editpost = {idposts: 0, status: false,viewstatsus: false};
 
 editstatus: boolean = false;
 @Input() searchtext: string = "";
 Ierakstuskaits: number = 0;
 page: number = 0;
 maxpages: number = 0;
 getpostammount: number = 5;
 @Input() deletestatus: boolean = false;
 @Output() Changedeletestatus = new EventEmitter<boolean>();
 Delte: boolean = false;

 @Input() set updatesrc(value: boolean) {
  this.Delte = value;
  this.dosearch();
  console.log(this.page, this.getpostammount, this.searchtext);
 }
 @Input() set Search(value: string) {
  this.searchtext = value;
  this.dosearch(this.getpostammount, this.page, this.searchtext);
 }

 constructor() {
  this.dosearch();
 }


 editfn(event: number = this.poststaus.idposts) {
  console.log(event);
this.poststaus={idposts: event, status: false,viewstatsus: true};

 }

 getIeraksti() {
  fetch(`http://localhost:3000/api/getposts`, {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  })
   .then((response) => response.json())
   .then((data) => {
    this.Ieraksti = data.posts;
    console.log(this.Ieraksti);
   })
   .catch((error) => {
    console.error("Error:", error);
   });
 }

 nextpage(event: number = this.page) {
  this.page = event;
  this.dosearch();
 }
 dosearch(ammount = this.getpostammount, offset = this.page, searchtext = this.searchtext) {
  const formdata = new FormData();
  formdata.append("ammount", ammount.toString());
  formdata.append("offset", offset.toString());
  formdata.append("searchtext", searchtext);

  fetch("http://localhost:3000/search", {
   method: "post",
   body: formdata,
  })
   .then((response) => response.json())
   .then((data) => {
    this.Ieraksti = data.posts;
    console.log (this.Ieraksti);
    this.Ierakstuskaits = data.count;
    this.pagecalc(data.count);
   })
   .catch((error) => {
    console.error("Error:", error);
   });
 }
 pagecalc(count: number) {
  this.maxpages = Math.ceil(count / this.getpostammount) - 1;
  if (this.page > this.maxpages) {
   this.page = this.maxpages;
   this.dosearch();
  }
 }
}
