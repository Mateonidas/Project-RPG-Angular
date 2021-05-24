import { Injectable } from '@angular/core';
import {Talent} from "../model/talent.model";

@Injectable({
  providedIn: 'root'
})
export class TalentsListService {

  private talentsList: Talent[] = [

  ]

  constructor() { }
}
