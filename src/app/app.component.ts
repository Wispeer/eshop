import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="height:100vh" >
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['../styles.css'],
})
export class AppComponent implements OnInit{
  title = 'eshop';

  constructor() { }

  ngOnInit(): void {
    
  }
}
