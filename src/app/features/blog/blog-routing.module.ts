import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLogedInGuard } from 'src/app/guard/loginGuard/is-loged-in.guard';
import { BlogComponent } from './blog.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [IsLogedInGuard],
    component: BlogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
