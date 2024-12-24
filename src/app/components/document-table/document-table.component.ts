import { Component, OnInit } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../../upload-dialog/upload-dialog.component';
import { DocumentService, Document } from '../../document.service';
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
    FormsModule,
    CommonModule,
    MatCheckboxModule,
  ],
})
export class DocumentTableComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'documentName',
    'auditStatus',
    'vendorName',
    'createdOn',
    'contract',
    'action',
  ];
  dataSource: Document[] = [];
  selection = new Set<Document>();

  constructor(
    private dialog: MatDialog,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.fetchDocuments();
  }

  fetchDocuments() {
    this.documentService.getDocuments().subscribe((documents) => {
      this.dataSource = documents.map((doc) => ({ ...doc, isEditing: false }));
    });
  }

  onProcess(document: Document) {
    this.documentService.processDocument(document).subscribe((message) => {
      console.log(message);
    });
  }

  onCopy(document: Document) {
    this.documentService.copyDocument(document).subscribe((message) => {
      console.log(message);
    });
  }

  onDelete(document: Document) {
    this.documentService.deleteDocument(document).subscribe((message) => {
      console.log(message);
      this.dataSource = this.dataSource.filter((doc) => doc !== document);
    });
  }

  toggleEdit(document: Document) {
    if (document.isEditing !== undefined) {
      document.isEditing = !document.isEditing;
    }
  }

  saveContract(document: Document) {
    document['isEditing'] = false;
    this.documentService.updateDocument(document).subscribe((message) => {
      console.log(message);
    });
  }

  toggleRowSelection(document: Document) {
    if (this.selection.has(document)) {
      this.selection.delete(document);
    } else {
      this.selection.add(document);
    }
  }

  toggleAllRows(event: any) {
    if (event.checked) {
      this.dataSource.forEach((row) => this.selection.add(row));
    } else {
      this.selection.clear();
    }
  }

  isAllSelected(): boolean {
    return (
      this.selection.size === this.dataSource.length && this.selection.size > 0
    );
  }

  isIndeterminate(): boolean {
    return (
      this.selection.size > 0 && this.selection.size < this.dataSource.length
    );
  }

  openUploadDialog() {
    this.dialog.open(UploadDialogComponent, {
      width: '600px',
    });
  }
}
