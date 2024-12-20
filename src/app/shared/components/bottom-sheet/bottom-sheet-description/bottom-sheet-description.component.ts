import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";

@Component({
    selector: 'app-bottom-sheet-description',
    templateUrl: './bottom-sheet-description.component.html',
    styleUrls: ['./bottom-sheet-description.component.css'],
    standalone: false
})
export class BottomSheetDescription {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { nameTranslation: string, description: string }) {
  }
}
