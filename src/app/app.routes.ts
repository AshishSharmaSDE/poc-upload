import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DocumentTableComponent } from './document-table/document-table.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DocumentTableComponent },
  { path: '**', redirectTo: 'login' },
];
