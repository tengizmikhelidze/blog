import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-header-menu-burger',
  templateUrl: './header-menu-burger.component.html',
  styleUrls: ['./header-menu-burger.component.scss'],
  animations: [
    trigger('burgerMenu', [
      state(
        'open',
        style({
          width: '50%',
          backgroundColor: '#fff',
        })
      ),
      state(
        'closed',
        style({
          width: '0px',
        })
      ),
      state(
        'closedBurger',
        style({
          color: '#fff',
        })
      ),
      state(
        'openBurger',
        style({
          color: '#000',
        })
      ),
      state(
        'openContent',
        style({
          opacity: '1',
          width: '100%',
        })
      ),
      state(
        'closedContent',
        style({
          opacity: '0',
          display: 'none',
          width: '0%',
        })
      ),
      transition('open <=> closed', [animate(300)]),
      transition('openBurger <=> closedBurger', [animate(300)]),
    ]),
  ],
})
export class HeaderMenuBurgerComponent implements OnInit {
  animationState: 'closed' | 'open' = 'closed';
  burgerState: 'closedBurger' | 'openBurger' = 'closedBurger';
  contentState: 'closedContent' | 'openContent' = 'closedContent';
  userName: string;
  userSurname: string;
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    if (this.firebaseService.isLoggedIn) {
      this.firebaseService
        .searchUser(this.firebaseService.user.uid)
        .pipe(
          map((user) => {
            this.userSurname = user.surname;
            this.userName = user.name;
          })
        )
        .subscribe();
    }
  }

  openMenu() {
    if (this.animationState === 'closed') {
      this.animationState = 'open';
      this.burgerState = 'openBurger';
      this.contentState = 'openContent';
    } else {
      this.animationState = 'closed';
      this.burgerState = 'closedBurger';
      this.contentState = 'closedContent';
    }
  }
  routerClick(event) {
    var deactive = document.getElementsByClassName('active')[1];
    deactive.className = 'inactive';
    event.target.className = 'active';
  }
  logout() {}
}
