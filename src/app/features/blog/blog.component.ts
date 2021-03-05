import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {


  constructor(
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit(): void {
  }

  signOut(): void{
    this.firebaseService.logout();
  }
}
