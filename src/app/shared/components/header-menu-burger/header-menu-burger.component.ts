import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-menu-burger',
  templateUrl: './header-menu-burger.component.html',
  styleUrls: ['./header-menu-burger.component.scss'],
  animations: [
    trigger('burgerMenu',[
      state('open', style({
        width: '50%',
        height: '100vh',
        backgroundColor: '#fff'
      })),
      state('closed', style({
        width: '0px',
        height: '0px',
      })),
      state('closedBurger', style({
        color: '#fff'
      })),
      state('openBurger', style({
        color: '000'
      })),
      transition('open <=> closed',[
        animate('0.5s')
      ]),
      transition('openBurger <=> closedBurger',[
        animate('0.5s')
      ])
    ])
  ]
})
export class HeaderMenuBurgerComponent implements OnInit {
  animationState: "closed" | "open" = 'closed';
  burgerState: "closedBurger" | "openBurger" = "closedBurger";
  constructor() { }

  ngOnInit(): void {
  }

  openMenu(){
    if(this.animationState === "closed"){
      this.animationState = "open";
      this.burgerState = "openBurger"
    } else {
      this.animationState = "closed";
      this.burgerState = "closedBurger";
    }
  }
}
