import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  routerClick(event){
    var deactive = document.getElementsByClassName('active')[0];
    deactive.className = 'inactive';
    event.target.className = 'active';
  }

  keepReading(){

  }
}
