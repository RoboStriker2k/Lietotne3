import { Component } from "@angular/core";

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

 constructor() {
  this.postcount, this.getierakstuskaits();
  this.timedgetierakstuskaits();
 }

 getierakstuskaits() {
  fetch(`http://localhost:3000/api/postscount/`, {
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
