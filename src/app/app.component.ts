import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { IerakstuskaitsComponent } from "./components/ierakstuskaits.component";
import { IerakstiComponent } from "./components/ieraksti.component";
import { PagebuttonsComponent } from "./components/Pagebuttons.component";
import { Deletecomponent } from "./components/deletepost.component";
import { Uploadcomponent } from "./components/upload.component";
import { Searchcomponent } from "./components/Search.component";
@Component({
 selector: "app-root",
 standalone: true,
 imports: [
  RouterOutlet,
  IerakstuskaitsComponent,
  IerakstiComponent,
  PagebuttonsComponent,
  Deletecomponent,
  Uploadcomponent,
  Searchcomponent,
 ],
 template: `<main class="main">
  <div className="container">
   <div className="header">
    <header>
     <h1>Lietotne 3 -Angular</h1>
    </header>
   </div>
   <div id="nav">
    <div id="nav-bar">
     @if (uploadstatus == true) {
     <button (click)="changeuploadstatus()">Aizvert pievienot</button>
     } @else {<button (click)="changeuploadstatus()">Pievienot</button>}

     <button (click)="refrsh()">Atsvaidzinat</button>
    </div>
    <div>
     <Searchcomponent (Search)="updatesearch($event)" />
    </div>
   </div>
   <div>
    <Uploadcomponent
     [uploadstatus]="uploadstatus"
     (Changeuploadstatus)="changeuploadstatus()"
     (Update)="callsearch()" />
    
   </div>
   <div id="content">
   <ierakstuskaits />
    <p>Lietotnes ieraksti</p>
    <div id="dyncontent">
     <Deletecomponent
      [deletestatus]="deletestatus"
      (Changedeletestatus)="changedeletestatus()"
      (Deleted)="callsearch()" />
     <Ieraksti
      [deletestatus]="deletestatus"
      (Changedeletestatus)="changedeletestatus()"
      [updatesrc]="updatesrc"
      [searchtext]="searchtext"
     [Search]="searchtext"
       />
    </div>
   </div>
  </div>

  <footer>
   <p>Lietotni veidoja Roberts Laimīte</p>
  </footer>
 </main>`,
})
export class AppComponent {
 title = "Lietotne3";
 deletestatus: boolean = false;
 uploadstatus: boolean = false;
 updatesrc: boolean = false;
 searchtext: string = "";

 changedeletestatus() {
  this.deletestatus = !this.deletestatus;
 }
 changeuploadstatus() {
  this.uploadstatus = !this.uploadstatus;
 }
 callsearch() {
  this.updatesrc = !this.updatesrc;
 }
 updatesearch(text: string) {
  this.searchtext = text;
 }
 refrsh() {
  location.reload();
 }
}
