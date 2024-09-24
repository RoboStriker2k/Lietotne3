import { ChangeDetectorRef, Component, inject, Input } from "@angular/core";
import { Ieraksts,Editpost } from "../interfaces/interfaces";
import { Multiimgdisplay } from "./multiimgdisplay.component";

@Component({
 selector: "Editcomponent",
 imports: [Multiimgdisplay],
 standalone: true,
 template: `
  @if (Posttatus.viewstatsus == true) {

  <div id="edit" class="editview">
   <div>
    @defer ( when Posttatus.status ) { @for (item of CIER;track item.idposts) {

    <div>
     <h1>Labot</h1>
     <div>
     <label for="edittitle">Ieraksta virsraksts</label>
     <input class="edittext" id="edittitle" type="text" placeholder="{{ item.title }}" (change)="updatetitle($event)" />
     </div>
     <div>
     <label for="editdesc">Ieraksta apraksts</label>
     <input class=edittext id="editdesc" type="text" placeholder="{{ item.pdesc }}" (change)="updatedesc($event)" />
     </div>
     <div class="editgrid">
      <p>Pievienot attelus</p>
      <input id="editupl" type="file" multiple (change)="onMultipleFilesSelected($event)" />
     </div>
    </div>

    <div class="editier">
     <h1>Priekšskats</h1>
     <div class="editieraksts" id="{{ item.idposts }}">
      <h1 id="previewtitle">{{ item.title }}</h1>
      <p id="previewdesc">{{ item.pdesc }}</p>
      @if (item.imgpath != null){<img id="previewimg" src="{{baseurl}}/getfoto/{{ item.imgpath }}" />
      <input type="checkbox" class="imgpathcheck" id="{{ item.imgpath }}" />
      } @if (item.imgarr != null){
      <multiimgdisplay [imgarr]="item.imgarr" [editstatus]="true" />
      } @for (img of prviews; track img ;) {
        <div class= "editgrid">
      <img id="preview" [src]="img" />
      <button class="removebtn" type="button" (click)="removefromupload(prviews.indexOf(img))">X</button>
      </div>
      }
     </div>
    </div>

    } } @placeholder {
    {{ getpost() }}
    } @loading {
    <p>Iegūst ierakstu ...</p>
    } @error {
    <p>Nav ierakstu</p>
    }
    <div>
     <button type="button" (click)="removechecked()">Dzēst atzīmētos attēlus neatgriezeniski</button>
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
 @Input() Posttatus: Editpost = { idposts: 0, status: false, viewstatsus: false };
 IER: Ieraksts[] = [];
 CIER: Ieraksts[] = [];
@Input() baseurl:string =""
 removeflag: boolean = false;
 replaceflag: boolean = false;
 imgpath: string = "";
 imgarr: string[] = [];
 files: File[] | null = null;
 
 prviews: (string | ArrayBuffer | null)[] = [];


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
 removechecked() {
  let selectledelate = document.querySelectorAll("input[type=checkbox]:checked");
  let deleteform = new FormData();
  console.log("ran", selectledelate);
  if (selectledelate.length === 0) {
   return;
  } else {
   let delsel: string[] = [];
   for (let i = 0; i < selectledelate.length; i++) {
    const elem = document.getElementById(selectledelate[i].id);
    if (elem) {
     console.log(elem);
     this.removeflag = true;
     console.log("imagepathcheckrun",elem.classList.contains("multiimgcheck"))
     if (delsel.includes(selectledelate[i].id)) {
      continue;
     } else if (elem.classList.contains("multiimgcheck")) {
      delsel.push(selectledelate[i].id);
      this.imgarr.push(selectledelate[i].id);
      console.log("imagepathcheckrun",elem.classList.contains("multiimgcheck"))
     } else {
      delsel.push(selectledelate[i].id);
      deleteform.append("imgpath", selectledelate[i].id);
      console.log("imagerun")
     }
    }
   }

   if (this.imgarr != null) {
    deleteform.append("imgarr", JSON.stringify(this.imgarr));
   }

   deleteform.append("replaceflag", this.replaceflag.toString());
   deleteform.append("removeflag", this.removeflag.toString());
   deleteform.append("idpost", this.Posttatus.idposts.toString());
   fetch(`http://localhost:3000/api/editpost/`, {
    method: "POST",
    body: deleteform,
   })
    .then((response) => response.json())
    .then((data) => {
     console.log(data);
    })
    .catch((error) => {
     console.error("Error:", error);
    });
   this.removeflag = false;
   this.imgpath = "";
   this.imgarr = [];
  }
  //todo implement deletion
 }

 editfn(imgpath?: string, imgarr?: []) {
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
  if (this.files != null) {
   for (let i = 0; i < this.files.length; i++) {
    formdata.append("file", this.files[i]);
    console.log(i);
   }
  }
  if (this.imgpath != null) {
   formdata.append("imgpath", this.imgpath);
  }
  if (this.imgarr != null) {
   formdata.append("imgarr", JSON.stringify(this.imgarr));
  }
  formdata.append("replaceflag", this.replaceflag.toString());
  formdata.append("removeflag", this.removeflag.toString());
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
  this.removeflag = false;
  this.imgpath = "";
  this.imgarr = [];
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
    this.CIER = JSON.parse(JSON.stringify(this.IER));
   })
   .catch((error) => {
    console.error("Error:", error);
   });
  this.Posttatus.status = true;
  this.cd.detectChanges();
  this.files = null;
  this.prviews = [];
 }

 onMultipleFilesSelected(event: any) {
  let files = [];
  for (let i = 0; i < event.target.files.length; i++) {
   files.push(event.target.files[i]);
    this.renderpic(files[i]);
  }

  this.files = files;

 }
renderpic(img :File){
  const reader = new FileReader();
  reader.onload = (e) => {
   if (e.target) {
    (this.prviews.push(e.target.result) as unknown as string) ?? "";
   }
  };
  reader.readAsDataURL(img);
}
 removefromupload(fileindex : number,) {
  if (fileindex != -1) {
   this.prviews.splice(fileindex, 1);
  }
  if (this.files != null) {
   if (fileindex != -1) {
    this.files.splice(fileindex, 1);
   }
  }
 }
 
}
