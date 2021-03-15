import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  userName: string;
  userSurname: string;
  showMenu: boolean = false;
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

  routerClick(event) {
    var deactive = document.getElementsByClassName('active')[0];
    deactive.className = 'inactive';
    event.target.className = 'active';
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.firebaseService.logout();
  }
}
