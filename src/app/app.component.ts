import { Component } from '@angular/core';

@Component({
  selector: 'app-root', //AS <app-root></app-root> in body
  templateUrl: './app.component.html', //Can write in-line template with back quote
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yeni-app';
}
