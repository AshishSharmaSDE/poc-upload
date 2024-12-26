import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.css'],
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class UpdateContractComponent {
  selectedContract: string;
  searchTerm: string = '';

  constructor(
    public dialogRef: MatDialogRef<UpdateContractComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { contract: string; availableContracts: string[] }
  ) {
    this.selectedContract = data.contract;
  }
  // Getter to return filtered contracts
  get filteredContracts(): string[] {
    return this.data.availableContracts.filter((contract) =>
      contract.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.selectedContract);
  }
}
