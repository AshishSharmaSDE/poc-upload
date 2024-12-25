import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Document {
  documentName: string;
  auditStatus: string;
  vendorName: string;
  createdOn: string;
  contract: string;
  isEditing?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private filesSubject = new BehaviorSubject<Document[]>([]);
  files$ = this.filesSubject.asObservable();

  private mockDataJson: Document[] = []; // Simulating data.json

  constructor() {}

  // Method to simulate uploading a file and immediately saving it in the desired format
  uploadFile(file: File): Observable<any> {
    // Extract file details and populate the new structure
    const fileData: Document = {
      documentName: file.name,
      auditStatus: 'In-progress', // Status when the file is uploaded
      vendorName: 'vendorName',
      createdOn: new Date().toISOString(), // Get current time for 'createdOn'
      contract: 'contract',
    };

    // Store file data temporarily in memory (simulating saving to data.json)
    this.mockDataJson.push(fileData);

    // Update the BehaviorSubject to notify other components (e.g., DocumentTableComponent)
    this.filesSubject.next(this.mockDataJson);

    // Simulate an API response
    // return new Observable((observer) => {
    //   setTimeout(() => {
    //     observer.next({ message: 'File uploaded successfully', fileData });
    //     observer.complete();
    //   }, 1000); // Simulate a 1-second upload delay
    // });
    return new Observable((observer) => {
      // Simulate upload process (randomly succeeds or fails)
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% chance of success
        if (success) {
          // Update file status to "uploaded"
          fileData.auditStatus = 'uploaded';
          this.filesSubject.next(this.mockDataJson); // Notify observers

          observer.next({ message: 'File uploaded successfully', fileData });
        } else {
          // Update file status to "failed"
          fileData.auditStatus = 'failed';
          this.filesSubject.next(this.mockDataJson); // Notify observers

          observer.next({ message: 'File upload failed', fileData });
        }

        observer.complete();
      }, 2000); // Simulate a 2-second upload delay
    });
  }

  // Method to get all uploaded files (for table display)
  getUploadedFiles(): Observable<Document[]> {
    return this.files$;
  }

  // Simulate saving to a data.json (in real app, you would send a POST request to your server here)
  saveFilesToDataJson() {
    console.log('Saving to data.json:', this.mockDataJson);
  }
}
