import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
 selector: "Pagebuttons",
 standalone: true,
 template: `<div id="pagenum">
  <button (click)="PrevPage()">Back</button>
  <h1>{{ page + 1 }}/{{ maxpages + 1 }}</h1>
  <button (click)="Nextpage()">Next</button>
 </div>`,
})
export class PagebuttonsComponent {
 @Input() page: number = 0;

 @Input() maxpages: number = 0;

 @Output() gonext = new EventEmitter<number>();
 constructor() {
  this.page, this.maxpages;
 }
 Nextpage() {
  if (this.page < this.maxpages) {
   this.page = this.page + 1;
  }
  this.gonext.emit(this.page);
 }
 PrevPage() {
  if (this.page > 0) {
   this.page = this.page - 1;
  }
  this.gonext.emit(this.page);
 }
}
