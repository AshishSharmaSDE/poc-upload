import { Component } from '@angular/core';
import { DocumentTableComponent } from './document-table/document-table.component';
import { LoginComponent } from './login/login.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [DocumentTableComponent, LoginComponent, RouterOutlet],
})
export class AppComponent {
  title = 'poc-upload';
}
