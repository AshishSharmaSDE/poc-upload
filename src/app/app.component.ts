import { Component } from '@angular/core';
import { DocumentTableComponent } from './document-table/document-table.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [DocumentTableComponent],
})
export class AppComponent {
  title = 'poc-upload';
}
