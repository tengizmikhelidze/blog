import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;
  user: any;
  constructor(
    private firebaseAuth : AngularFireAuth,
    private router : Router,
    private db : AngularFirestore,
    ) {
      if(localStorage.getItem('user')){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn = true;
        this.router.navigate(['blog']);
      }
    }
  async signin(email: string, password: string, remember: boolean){
    this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then((res)=>{
      this.isLoggedIn = true;
      this.user = res.user;
      if (remember){localStorage.setItem('user',JSON.stringify(res.user));}
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
      this.user = res.user;
      this.storeUSer(name,email,res.user.uid, surname,age);
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
  async storeUSer(name: string, email: string, uid:string, surname?: string,age?: number){
    this.db.collection("users").doc(uid).set({
      name: name,
      surname: surname || '',
      age: age || null,
      email: email
    })
    .catch((error) => {
        alert(`Error writing document: ${error.message}`);
    });
  }
}
