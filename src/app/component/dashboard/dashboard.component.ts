import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { DetailService } from 'src/app/service/detail.service';
export interface Post {
  name: string;
  email: string;
  mobile: string;
  address: string;
  service: string;
  id?:string;

}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  form:FormGroup|any;
  datalist:Post[]=[]

  constructor(private formbuilder:FormBuilder,private ser:DetailService,private db: AngularFireDatabase, private storage: AngularFirestore) {

   }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      address:['',Validators.required],
      service:['',Validators.required],
    });
    this.getPost()
  }
  getPost():void
  {
    this.ser.getPosts().subscribe((res:any)=>
    {
      console.log(res)
      this.datalist=res
    })
  
  }
  addPost():any{
    let name=this.form.value.name;
    let   email=this.form.value.email;
    let   mobile=this.form.value.mobile;
    let   address=this.form.value.address;
    let   service=this.form.value.service;
    
    const payload=
    {
      name:name,
      email:email,
      mobile:mobile,
      address:address,
      service:service,
      
    }
    console.log(payload)
    this.ser.createPost(payload);
    this.form.reset()
 
  }
  upload(event:any){
    const file=event.target.files[0]
    console.log(file)
  }
  
  
}
