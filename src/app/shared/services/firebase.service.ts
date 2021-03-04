import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;
  storageUser: any;
  email : string;
  constructor(
    private firebaseAuth : AngularFireAuth,
    private router : Router,
    private db : AngularFirestore,
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
      this.storeUSer(name,email, surname,age);
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
  async storeUSer(name: string, email: string, surname?: string,age?: number){
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
  async googleSignin(){
    const provider =new firebase.auth.GoogleAuthProvider();
    await this.firebaseAuth.signInWithPopup(provider)
    .then((res)=>{
      this.isLoggedIn = true;
      this.router.navigate(['blog']);
    })
    .catch((error)=>{
      alert(error.message);
    });
  }
  async googleSignUp(){
    const provider =new firebase.auth.GoogleAuthProvider();
    await this.firebaseAuth.signInWithPopup(provider)
    .then((res)=>{
      this.router.navigate(['login']);
    })
    .catch((error)=>{
      alert(error.message);
    });
  }
  async facebookSignin(){
    const provider =new firebase.auth.FacebookAuthProvider();
    await this.firebaseAuth.signInWithPopup(provider)
    .then((res)=>{
      this.isLoggedIn = true;
      this.router.navigate(['blog']);
    })
    .catch((error)=>{
      alert(error.message);
    });
  }
  async facebookSignup(){
    const provider =new firebase.auth.FacebookAuthProvider();
    await this.firebaseAuth.signInWithPopup(provider)
    .then((res)=>{
      this.isLoggedIn = true;
      this.router.navigate(['login']);
    })
    .catch((error)=>{
      alert(error.message);
    });
  }
}
