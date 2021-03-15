import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLogedOutGuard } from '../guard/logoutGuard/is-loged-out.guard';
import { PageNotFoundComponent } from '../page-not-found.component';
import { AuthentificationComponent } from './authentification.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthentificationComponent,
    canActivate: [IsLogedOutGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'logout',
        redirectTo: 'login',
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthentificationRoutingModule {}
