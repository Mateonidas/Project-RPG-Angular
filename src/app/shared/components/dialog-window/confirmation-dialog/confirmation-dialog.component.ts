import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.css'],
    standalone: false
})
export class ConfirmationDialogComponent {

  text = TextResourceService

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
