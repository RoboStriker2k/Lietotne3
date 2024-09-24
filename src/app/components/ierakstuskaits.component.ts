import { Component } from "@angular/core";
import { serverconfig } from "../app.config";
@Component({
 selector: "ierakstuskaits",
 template: ` <div id="postcntbox">
  <p>Kopejais ierakstu skaits datubāze:</p>
  <p id="postcount">{{ postcount }}</p>
 </div>`,
 standalone: true,
})
export class IerakstuskaitsComponent {
 postcount: number = 0;
 baseurl: string = serverconfig.baseurl;
 constructor() {
  this.postcount, this.getierakstuskaits();
  this.timedgetierakstuskaits();
 }
 getierakstuskaits() {
  fetch(this.baseurl + "/api/postscount/", {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  })
   .then((response) => response.json())
   .then((data) => {
    this.postcount = Number(data.posts[0].postscount);
   })
   .catch((error) => {
    console.error("Error:", error);
   });
 }
 timedgetierakstuskaits() {
  setInterval(() => {
   this.getierakstuskaits();
  }, 50000);
 }
}
