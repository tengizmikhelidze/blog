import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;
  storageUser: any;
  email : string;
  user: any;
  constructor(
    private firebaseAuth : AngularFireAuth,
    private router : Router,
    private db : AngularFirestore
    ) {
      if(localStorage.getItem('user')){
        this.storageUser = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn = true;
        this.email = this.storageUser.email;
        this.router.navigate(['blog']);
      }
    }
  async signin(email: string, password: string, remember: boolean){
    this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then((res)=>{
      this.isLoggedIn = true;
      if (remember){localStorage.setItem('user',JSON.stringify(res.user));}
      this.email = email;
      this.router.navigate(['blog']);
    })
    .catch((error)=>{
      alert(`Error : ${error.message}`);
      return 'error';
    })
  }
  async signup(email: string, password: string, name: string, surname: string, age: number){
    this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then((res)=>{
      this.isLoggedIn = true;
      localStorage.setItem('user',JSON.stringify(res.user));
      this.storeUSer(name, surname,age,email);
      this.email = email;
      this.router.navigate(['blog']);
    })
    .catch((error)=>{
      alert(`Error : ${error.message}`);
    })
  }
  logout(){
    this.isLoggedIn = false;
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['logout']);
  }
  async storeUSer(name, surname,age,email){
    this.db.collection("users").doc(email).set({
      name: name,
      surname: surname,
      age: age,
      email: email
    })
    .catch((error) => {
        alert(`Error writing document: ${error.message}`);
    });
  }
}
