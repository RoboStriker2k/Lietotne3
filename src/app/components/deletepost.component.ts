import { Component, EventEmitter, Input, Output } from "@angular/core";
import { serverconfig } from "../app.config";

@Component({
 selector: "Deletecomponent",
 template: `
  <div id="dzest">
   @if (deletestatus == true){
   <div>
    <button id="deletebtn" type="button" (click)="deletefn()">Dzest ierakstus</button>
    <button (click)="toggledelete()">Atcelt dzešanu</button>
   </div>
   } @else {
   <button (click)="toggledelete()">Ierakstu atlase</button>
   }
  </div>
 `,
 standalone: true,
})
export class Deletecomponent {
 @Input() deletestatus: boolean = false;
 @Output() Changedeletestatus = new EventEmitter<boolean>();
 @Output() Deleted = new EventEmitter<boolean>();
 baseurl:string=serverconfig.baseurl;
 delsel: string[] = [];
 toggledelete() {
  this.Changedeletestatus.emit();
 }
 deletefn() {
  let selectledelate = document.querySelectorAll("input[type=checkbox]:checked");
  if (selectledelate.length === 0) {
   return;
  } else {
   this.delsel = [];
   for (let i = 0; i < selectledelate.length; i++) {
    const elem = document.getElementById(selectledelate[i].id);
    if (elem) {
     let elch = elem.children[0] as HTMLInputElement;
     elch.checked = false;

     if (this.delsel.includes(selectledelate[i].id)) {
      continue;
     } else {
      this.delsel.push(selectledelate[i].id);
     }
    }
   }

   let deleteform = new FormData();
   if (this.delsel.length > 1) {
    for (let i = 0; i < this.delsel.length; i++) {
     deleteform.append("idlist", this.delsel[i]);
     console.log("added" + this.delsel[i]);
    }
   } else if (this.delsel.length == 1) {
    deleteform.append("idlist", this.delsel[0]);
   }

   fetch(this.baseurl+"/api/deleteposts", {
    method: "post",
    body: deleteform,
   })
    .then((response) => response.json())
    .catch((error) => {
     console.error("Error:", error);
    });
  }

  this.Deleted.emit();
 }
}
