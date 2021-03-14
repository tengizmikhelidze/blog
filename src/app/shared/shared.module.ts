import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import {components, SliderComponent} from './components/intex';


@NgModule({
  declarations: [HeaderMenuComponent, SliderComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
