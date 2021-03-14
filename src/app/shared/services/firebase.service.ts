import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;
  user: any;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    ) {
      if (localStorage.getItem('user')){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn = true;
        this.router.navigate(['blog']);
      }
    }
  async signin(email: string, password: string, remember: boolean): Promise<any>{
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then((res) => {
      this.isLoggedIn = true;
      this.user = res.user;
      if (remember){
        localStorage.setItem('user', JSON.stringify(res.user));
      }
      this.router.navigate(['blog']);
    })
    .catch((error) => {
      alert(`Error : ${error.message}`);
      return 'error';
    });
  }
  async signup(email: string, password: string, name: string, surname: string, age: number): Promise<any>{
    this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
      this.user = res.user;
      this.storeUSer(name, email, res.user.uid, surname, age);
      this.router.navigate(['blog']);
    })
    .catch((error) => {
      alert(`Error : ${error.message}`);
    });
  }
  logout(): void{
    this.isLoggedIn = false;
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['logout']);
  }
  async storeUSer(name: string, email: string, uid: string, surname?: string, age?: number): Promise<any>{
    this.db.collection('users').doc(uid).set({
      name,
      surname: surname || '',
      age: age || null,
      email
    })
    .catch((error) => {
        alert(`Error writing document: ${error.message}`);
    });
  }
  searchUser(uid: string){
    return this.db.collection<User>('users').doc(uid).get().pipe(
      map((user)=>{
        return user.data()
      })
    );
  }
}
