import { ChangeDetectorRef, Component, inject, Input} from "@angular/core";
import { Ieraksts } from "../interfaces/ieraksti";
import { Editpost } from "../interfaces/editpost";

@Component({
 selector: "Editcomponent",
 standalone: true,
 template: `
  @if (Posttatus.viewstatsus == true) {

  <div id="edit" class="editview">
   <div>
    @defer ( when Posttatus.status ) { @for (item of CIER;track item.idposts) {

    
     <div >
      <h1>Pievienot</h1>
      <p >Ieraksta virsraksts</p>
      <input id="edittitle" type="text" placeholder="{{ item.title }}" (change)="updatetitle($event)" />
      <p>Ieraksta apraksts</p>
      <input id="editdesc" type="text" placeholder="{{ item.pdesc }}" (change)="updatedesc($event)" />
      <div>
       <p>Ieraksta attels (var nepievienot)</p>
       <img id="editpreview" [src]="" />
       <input id="editupl" type="file" (change)="onFileSelected($event)" />
      </div>
     </div>
  
<div class= "editier"> 
  <h1>Priekšskats</h1>
    <div class="ieraksts" id="{{ item.idposts }}">
    
     <h1 id="previewtitle">{{ item.title }}</h1>
     <p id="previewdesc">{{ item.pdesc }}</p>
     @if (item.imgpath != null){<img id="previewimg" src="http://localhost:3000/getfoto/{{ item.imgpath }}" />}


    </div>
</div>

    } } @placeholder {
      {{getpost()}}
    }
    @loading {
      <p>Iegūst ierakstu ...</p>
    }
    @error {
      <p>Nav ierakstu</p>
    }
    <div>
     <button type="button" (click)="editfn()">Labot ierakstu</button>
     <button type="button" (click)="toggleedit()">Atcelt</button>
     <button type="button" (click)="toggleedit()">Aizvert</button>
    </div>
   </div>
  </div>
  }
 `,
})
export class Editcomponent {
cd: ChangeDetectorRef = inject(ChangeDetectorRef);
 @Input() Posttatus: Editpost = { idposts: 0, status: false , viewstatsus: false};
 IER: Ieraksts[] = [];
 CIER: Ieraksts[] = [];
 file: File | null = null;

 updatetitle(event: any) {
  this.CIER[0].title = event.target.value;
 }
 updatedesc(event: any) {
  this.CIER[0].pdesc = event.target.value;
 }
 toggleedit(event: Editpost = this.Posttatus) {
 
  this.Posttatus.status = false;
  this.Posttatus.viewstatsus = false;

 }

 editfn() {
  let oldtitle = this.IER[0].title;
  let oldpdesc = this.IER[0].pdesc;
  let oldimgpath = this.IER[0].imgpath;
  let newtitle = this.CIER[0].title;
  let newpdesc = this.CIER[0].pdesc;

  let formdata = new FormData();
  if (oldtitle != newtitle) {
   formdata.append("title", newtitle);
  }
  if (oldpdesc != newpdesc) {
   formdata.append("pdesc", newpdesc);
  }
  if (this.file != null) {
   formdata.append("file", this.file);
  }
  formdata.append("idpost", this.Posttatus.idposts.toString());
  fetch(`http://localhost:3000/api/editpost/`, {
   method: "POST",
   body: formdata,
  })
   .then((response) => response.json())
   .then((data) => {
    console.log(data);
   })
   .catch((error) => {
    console.error("Error:", error);
   });
 }

getpost() {
  let id = this.Posttatus.idposts;
  console.log(id);
  fetch(`http://localhost:3000/api/getpost/?postiid=${id}`, {
   method: "GET",
  })
   .then((response) => response.json())
   .then((data) => {
    this.IER = data.posts;
    this.CIER = JSON.parse(JSON.stringify(this.IER))
   })
   .catch((error) => {
    console.error("Error:", error);
   });
 this.Posttatus.status = true;
 this.cd.detectChanges();
 }

 onFileSelected(event: any) {
  this.file = event.target.files[0];
  if (this.file) {
   let img = document.getElementById("previewimg") as HTMLImageElement;
   const reader = new FileReader();
   reader.onload = (e) => {
    if (e.target) {
     img.src = (e.target.result as string) ?? "";
    }
   };
   reader.readAsDataURL(this.file);
  }
 }
}
