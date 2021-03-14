import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BlogComponent, HeaderComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ]
})
export class BlogModule { }
