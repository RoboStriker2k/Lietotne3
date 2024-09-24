import { Component, EventEmitter, output, Output } from "@angular/core";

@Component({
 selector: "Searchcomponent",
 standalone: true,
 template: `
  <div>
   <input id="searchbar" type="text" placeholder="Search" />
   <button id="search-btn" class="btn" type="button" (click)="updatesearch()">Meklēt</button>
  </div>
 `,
})
export class Searchcomponent {
 @Output() Search = new EventEmitter<string>();
 Searchtext: string = "";
 updatesearch() {
  let searchbar = document.getElementById("searchbar") as HTMLInputElement;
  this.Searchtext = searchbar.value;
  this.Search.emit(this.Searchtext);
 }
}
