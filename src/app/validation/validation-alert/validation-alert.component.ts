import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-validation-alert',
  templateUrl: './validation-alert.component.html',
  styleUrls: ['./validation-alert.component.css']
})
export class ValidationAlertComponent implements OnInit {
  @Input() control!: AbstractControl | null;

  constructor() { }

  ngOnInit(): void {
  }

}
