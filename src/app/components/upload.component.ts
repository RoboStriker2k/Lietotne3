import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
 selector: "Uploadcomponent",
 template: `  
 <div>
 @if (uploadstatus ) {
  <div class="upload">
  
        
   
   <div>
    <form action="upload"  onSubmit="{(e) => e.preventDefault()}" >
     <h1>Pievienot</h1>
     <p>Ieraksta virsraksts</p>
     <input type="text" id="uploadtitle"  placeholder="Ieraksta virsraksts" />
     <p>Ieraksta apraksts</p>
     <input type="text" id="uploadpdesc"  placeholder="Ieraksta apraksts" />
     <div>
      <p>Ieraksta attels (var nepievienot)</p>
      <img id="preview" [src]="" />
      <input id="fileupl" type="file"  (change)="onFileSelected($event)"/>
     </div>
     <div>
      <button type =button (click)="onUpload()">Upload</button>
      <button type =button (click)="CLOSBTN()">Aizvert</button>
     </div>
    </form>
   </div>
 
  </div>} </div>
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

 CLOSBTN() {
  this.Changeuploadstatus.emit();
 }

 onUpload() {
  let formdata = new FormData();
  let fileupl = document.getElementById("fileupl") as HTMLInputElement;
  if (fileupl && fileupl.files && fileupl.files[0]) {
   formdata.append("file", fileupl.files[0]);
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

  this.Update.emit();
 }

 onFileSelected(event: any) {
  this.file = event.target.files[0];
  if(this.file){
   let img = document.getElementById("preview") as HTMLImageElement;
  const reader = new FileReader();
  reader.onload = (e) => {
 if (e.target){
   img.src = e.target.result as string ?? "";
}
  };
  reader.readAsDataURL(this.file);
 }
}
}
