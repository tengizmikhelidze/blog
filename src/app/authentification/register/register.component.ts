import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  constructor(private fb: FormBuilder, private firebaseService:FirebaseService) {
    this.registerForm = this.fb.group({
      name : ['', Validators.required],
      surname : ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(26)]],
      re_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(26)]],
      remember: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  async register(email:string, password:string, re_password: string, name: string, surname: string, age: number){
    if(password === re_password){
      await this.firebaseService.signup(email,password, name, surname, age);
      this.registerForm.reset();

    }else {
      alert('Passwords Do Not Match !');
      this.registerForm.patchValue({password: '',re_password: ''});
    }
  }

  googleAuth(){
    this.firebaseService.googleSignUp();
  }
  facebookAuth(){
    this.firebaseService.facebookSignup()
  }
}
