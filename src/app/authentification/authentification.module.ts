import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationComponent } from './authentification.component';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [AuthentificationComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthentificationRoutingModule
  ],
  exports: [AuthentificationComponent, LoginComponent]
})
export class AuthentificationModule { }
