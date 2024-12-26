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
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { DocumentService, Document } from '../service/document.service';
import { FileUploadService } from '../service/file-upload.service';
import { UpdateContractComponent } from '../update-contract/update-contract.component';
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
  originalDataSource: Document[] = [];
  selection = new Set<Document>();
  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedDate: Date | null = null;
  constructor(
    private dialog: MatDialog,
    private documentService: DocumentService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.fetchDocuments();
  }
  openContractDialog(element: any): void {
    const dialogRef = this.dialog.open(UpdateContractComponent, {
      width: '600px',
      data: {
        contract: element.contract,
        availableContracts: [
          'Master Service Agreement for Software Development',
          'Comprehensive Supply Agreement',
          'Global Strategic Partnership',
          'Confidentiality and Intellectual Property Ownership',
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        element.contract = result; // Update the contract in the dataSource
      }
    });
  }

  fetchDocuments() {
    // Subscribe to the file upload service to get the latest uploaded files
    this.fileUploadService.files$.subscribe((documents) => {
      this.dataSource = documents.map((doc) => ({ ...doc, isEditing: false })); // Update the table whenever files change
    });
    this.documentService.getDocuments().subscribe((documents) => {
      this.originalDataSource = documents.map((doc) => ({
        ...doc,
        isEditing: false,
      }));
      this.dataSource = [...this.originalDataSource];
    });
  }

  onProcess(document: Document) {
    this.documentService.processDocument(document).subscribe((message) => {
      console.log(message);
    });
  }

  onCopy(document: Document) {
    // Create a deep copy of the selected document
    const copiedDocument = { ...document };

    // Optionally, update a property like ID or add a suffix to the name
    copiedDocument.documentName = `${document.documentName} (Copy)`;

    // Add the copied document to the dataSource and originalDataSource
    this.originalDataSource.push(copiedDocument); // Update the original data source
    this.dataSource = [...this.originalDataSource]; // Reflect changes in the current data source

    console.log('Document copied:', copiedDocument);
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
  /** Apply Filters */
  applyFilters(): void {
    // Check if all filters are cleared
    if (
      !this.searchTerm.trim() &&
      this.selectedStatus === 'all' &&
      !this.selectedDate
    ) {
      // Reset the data source to its original state
      this.dataSource = [...this.originalDataSource]; // Assuming `originalDataSource` contains the original unfiltered data
      return;
    }

    const searchTerm = this.searchTerm.trim().toLowerCase();
    const status = this.selectedStatus;
    const date = this.selectedDate;

    this.dataSource = this.originalDataSource.filter((data) => {
      const searchMatch = data.documentName.toLowerCase().includes(searchTerm);
      const statusMatch =
        status === 'all' || data.auditStatus.toLowerCase() === status;
      const dateMatch =
        !date || this.isSameDate(new Date(data.createdOn), date);

      return searchMatch && statusMatch && dateMatch;
    });
  }
  /** Compare Dates */
  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  /** Search by Document Name */
  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  /** Filter by Audit Status */
  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  /** Filter by Date */
  onDateChange(date: Date | null): void {
    this.selectedDate = date;
    this.applyFilters();
  }
}
