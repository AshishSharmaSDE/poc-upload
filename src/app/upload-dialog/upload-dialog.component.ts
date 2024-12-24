import { Component } from '@angular/core';
import { FileSizePipe } from '../file-size.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css'],
  imports: [FileSizePipe, MatIconModule, MatTableModule],
})
export class UploadDialogComponent {
  files: any[] = [];
  displayedColumns: string[] = ['fileName', 'fileSize', 'status', 'action'];

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  addFiles(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      if (file) {
        this.files.push({
          name: file.name,
          size: file.size,
          status: 'Uploading',
        });
        this.uploadFile(file); // Simulate upload
      }
    }
  }

  uploadFile(file: File) {
    // Simulate file upload with a timeout
    setTimeout(() => {
      const fileIndex = this.files.findIndex((f) => f.name === file.name);
      if (fileIndex !== -1) {
        this.files[fileIndex].status = 'Uploaded';
      }
    }, 2000);
  }

  removeFile(file: any) {
    this.files = this.files.filter((f) => f !== file);
  }

  uploadFiles() {
    console.log('Uploading files:', this.files);
  }
}
