import { Component, ViewChild, ElementRef } from '@angular/core';
// import { FileSizePipe } from '../file-size.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { DocumentService } from '../service/document.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploadService } from '../service/file-upload.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css'],
  standalone: true,
  imports: [
    //   FileSizePipe,
    MatIconModule,
    MatTableModule,
    MatListModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class UploadDialogComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  files: { name: string; size: number; status: string; data: File }[] = [];
  constructor(
    private documentService: DocumentService,
    private dialogRef: MatDialogRef<UploadDialogComponent>,
    private fileUploadService: FileUploadService
  ) {}

  // Handle file selection and upload
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.uploadFiles(Array.from(input.files));
    }
    event.preventDefault();
  }

  // Handle drag-and-drop file upload
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      this.uploadFiles(Array.from(event.dataTransfer.files));
    }
  }

  // Prevent default drag behavior
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // Open the file input only when clicking the browse link
  onBrowseClick(event: Event): void {
    event.stopPropagation();
    this.fileInput.nativeElement.click(); // Correct way to trigger the file input click
  }

  // Prevent upload-area click from opening file input
  onUploadAreaClick(event: Event): void {
    event.stopPropagation();
  }

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
    console.log('Dialog closed');
  }

  // Upload files logic
  private uploadFiles(fileList: File[]): void {
    for (const file of fileList) {
      const fileEntry = {
        name: file.name,
        size: file.size,
        status: 'Uploading...',
        data: file,
      };
      this.files.push(fileEntry);

      // Call the uploadFile method from FileUploadService
      this.fileUploadService.uploadFile(file).subscribe({
        next: (response) => {
          // Assuming response contains the status
          if (response?.message === 'File uploaded successfully') {
            fileEntry.status = 'Uploaded'; // Update status to 'Uploaded' if upload is successful
          } else {
            fileEntry.status = 'Failed'; // Update status to 'Failed' if there's an issue
          }
        },
        error: () => {
          // If there's an error in the upload process
          fileEntry.status = 'Failed';
        },
      });
    }
  }
}
