import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PursuitService} from "./pursuit.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-pursuit',
  templateUrl: './pursuit.component.html',
  styleUrls: ['./pursuit.component.css']
})
export class PursuitComponent implements OnInit, OnDestroy{
  @ViewChild('participantsForm') participantsForm!: NgForm;
  private subscription!: Subscription;
  participants: string[] = [];

  constructor(private pursuitService: PursuitService) {
    this.subscription = this.pursuitService.participantsChanged.subscribe(
      (participants: string[]) => {
        this.participants = participants;
        console.log('Component constructor')
      }
    )
  }

  ngOnInit() {
    this.subscription = this.pursuitService.participantsChanged.subscribe(
      (participants: string[]) => {
        this.participants = participants;
        console.log('Component on init')
      }
    )
  }

  onSubmit() {
    const participant = this.participantsForm.value.name;
    this.pursuitService.addParticipant(participant)
    this.participantsForm.resetForm();
  }

  deleteParticipant(index: number) {
    this.pursuitService.deleteParticipant(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
