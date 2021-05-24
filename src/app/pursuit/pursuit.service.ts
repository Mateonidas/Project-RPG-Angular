import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PursuitService {
  participantsChanged = new Subject<string[]>()
  participants: string[] = [];

  constructor() {
    this.getParticipants();
    console.log(this.participants)
  }

  getParticipants() {
    const participants = localStorage.getItem('participants');
    if (participants != null) {
      this.participants = JSON.parse(participants);
    }
    this.participantsChanged.next(this.participants.slice());
  }

  addParticipant(participant: string) {
    this.participants.push(participant);
    localStorage.setItem('participants', JSON.stringify(this.participants));
    this.participantsChanged.next(this.participants.slice());
  }

  deleteParticipant(index: number) {
    this.participants.splice(index, 1);
    localStorage.setItem('participants', JSON.stringify(this.participants));
    this.participantsChanged.next(this.participants.slice())
  }
}
