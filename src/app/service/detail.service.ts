import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
export interface Post {
  name?: string;
  email?: string;
  mobile?: string;
  address?: string;
  service?: string;
  id?:string;

}

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  postcollection: AngularFirestoreCollection<Post> | any;
  posts: Observable<Post[]> | any;
  documentref:AngularFirestoreDocument<Post>|any;

  constructor(private firebase:AngularFirestore) {
    this.postcollection = this.firebase.collection('Post');
    this.posts = this.postcollection.snapshotChanges().pipe(map((change: any) => {
      return change.map((ref: any) => {
        const data = ref.payload.doc.data() as Post;
        data.id = ref.payload.doc.id;
        return data
      });

    })

    )
   }
   getPosts():any{
    return this.posts
  }
  createPost(payload:any):any{
    this.postcollection.add(payload)
  }
  upload(event:any)
  {
    const file=event.target.files[0]
    
  }
}
