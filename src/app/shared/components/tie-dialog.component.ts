import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../models/dialog';

@Component({
  selector: 'app-tie-dialog',
  templateUrl: './tie-dialog.component.html',
})
export class TieDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
