import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  standalone: true,
  styleUrls: ['./document-table.component.css'],
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    LowerCasePipe,
    DatePipe,
    MatNativeDateModule,
    MatMenuModule,
  ],
})
export class DocumentTableComponent {
  displayedColumns: string[] = [
    'documentName',
    'auditStatus',
    'vendorName',
    'createdOn',
    'contract',
    'action',
  ];
  dataSource = [
    {
      documentName: 'Sample.pdf',
      auditStatus: 'Completed',
      vendorName: 'Tech Supplies Inc',
      createdOn: new Date('2024-01-15'),
      contract: 'Alpha Agreement',
    },
    {
      documentName: 'Invoice.pdf',
      auditStatus: 'Completed',
      vendorName: 'Prime Logistics Co.',
      createdOn: new Date('2024-02-28'),
      contract: 'Beta Partnership',
    },
    {
      documentName: 'Invoice2.pdf',
      auditStatus: 'Completed',
      vendorName: 'Greenfield Enterprises',
      createdOn: new Date('2024-03-10'),
      contract: 'Beta Partnership',
    },
    {
      documentName: 'Sample.pdf',
      auditStatus: 'In-progress',
      vendorName: 'Advanced Tech LLC',
      createdOn: new Date('2024-04-05'),
      contract: 'Beta Partnership',
    },
    {
      documentName: 'Invoice.docx',
      auditStatus: 'Not-started',
      vendorName: 'Elite Enterprises',
      createdOn: new Date('2024-05-19'),
      contract: 'Gamma Support',
    },
  ];
  onProcess(element: any) {
    console.log('Process clicked for:', element);
  }

  onCopy(element: any) {
    console.log('Copy clicked for:', element);
  }

  onDelete(element: any) {
    console.log('Delete clicked for:', element);
  }
  toggleEdit(element: any) {
    element.isEditing = !element.isEditing;
  }

  saveContract(element: any) {
    element.isEditing = false;
    console.log('Updated contract value:', element.contract);
  }
}
