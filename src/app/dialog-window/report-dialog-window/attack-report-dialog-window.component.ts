import { Component, OnInit } from '@angular/core';
import {AttackReportService} from "../../attack-report-service/attack-report.service";

@Component({
  selector: 'app-report-dialog-window',
  templateUrl: './attack-report-dialog-window.component.html',
  styleUrls: ['./attack-report-dialog-window.component.css']
})
export class AttackReportDialogWindowComponent implements OnInit {

  constructor(public logService: AttackReportService) { }

  ngOnInit(): void {
  }

}
