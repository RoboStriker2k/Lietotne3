import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
 selector: "Uploadcomponent",
 template: `
  <div>
   @if (uploadstatus ) {
   <div class="upload">
    <div>
     <form action="upload" onSubmit="{(e) => e.preventDefault()}">
      <h1>Pievienot</h1>
      <p>Ieraksta virsraksts</p>
      <input type="text" id="uploadtitle" placeholder="Ieraksta virsraksts" />
      <p>Ieraksta apraksts</p>
      <input type="text" id="uploadpdesc" placeholder="Ieraksta apraksts" />
      <div>
    <div>
       <p>Ieraksta attels -li (var arī nepievienot)</p>
       <input id="fileupl" type="file" multiple (change)="onMultipleFilesSelected($event)" />
    </div>
       @for (img of prviews; track img) {
       <div class="editgrid">
        <img id="preview" [src]="img" />
        <button class="removebtn" type="button" (click)="removefromupload(prviews.indexOf(img))">X</button>
       </div>
       }
       
      </div>
      <div>
       <button type="button" (click)="onUpload()">Upload</button>
       <button type="button" (click)="CLOSBTN()">Aizvert</button>
      </div>
     </form>
    </div>
   </div>
   }
  </div>
 `,
 standalone: true,
})
export class Uploadcomponent {
 @Input() uploadstatus: boolean = false;
 @Output() Changeuploadstatus = new EventEmitter<boolean>();
 @Output() Update = new EventEmitter<boolean>();
 uploadtittle: string = "";
 uploaddesc: string = "";
 file: File | null = null;
 files: File[] | null = null;
 prviews: (string | ArrayBuffer | null)[] = [];
 CLOSBTN() {
  this.files = null;
  this.prviews = [];
  this.Changeuploadstatus.emit();
 }

 onUpload() {
  let formdata = new FormData();
  if (this.files != null) {
   for (let i = 0; i < this.files.length; i++) {
    formdata.append("file", this.files[i]);
   }
  }
  let ptitle = document.getElementById("uploadtitle") as HTMLInputElement;
  let pdesc = document.getElementById("uploadpdesc") as HTMLInputElement;

  formdata.append("title", ptitle.value);
  formdata.append("pdesc", pdesc.value);

  fetch("http://localhost:3000/api/addpost", {
   method: "post",
   body: formdata,
  })
   .then((response) => response.json())
   .catch((error) => {
    console.error("Error:", error);
   });
  this.files = null;
  this.prviews = [];
  this.Update.emit();
 }

 onMultipleFilesSelected(event: any) {
  let files = [];
  for (let i = 0; i < event.target.files.length; i++) {
   files.push(event.target.files[i]);
   this.renderpic(files[i]);
  }

  this.files = files;
 }
 renderpic(img: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
   if (e.target) {
    (this.prviews.push(e.target.result) as unknown as string) ?? "";
   }
  };
  reader.readAsDataURL(img);
 }
 removefromupload(fileindex: number) {
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
