import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class IsLogedOutGuard implements CanActivate {
  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.firebaseService.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
