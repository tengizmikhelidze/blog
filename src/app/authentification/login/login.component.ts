import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(26)]],
      remember : ['']
    })
  }

  ngOnInit(): void {
  }

  login(email: string, password: string, remember: boolean){
    this.firebaseService.signin(email,password,remember)
  }
}
