import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class DocumentService {
  private dataUrl = 'assets/data.json'; // Path to the JSON file

  constructor(private http: HttpClient) {}

  // Fetch all documents
  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.dataUrl);
  }

  // Process a document (mock implementation)
  processDocument(document: Document): Observable<string> {
    console.log('Processing document:', document);
    return of('Processed successfully');
  }

  // Copy a document (mock implementation)
  copyDocument(document: Document): Observable<string> {
    console.log('Copying document:', document);
    return of('Copied successfully');
  }

  // Delete a document (mock implementation)
  deleteDocument(document: Document): Observable<string> {
    console.log('Deleting document:', document);
    return of('Deleted successfully');
  }

  // Update a document (mock implementation)
  updateDocument(document: Document): Observable<string> {
    console.log('Updating document:', document);
    return of('Updated successfully');
  }
}
