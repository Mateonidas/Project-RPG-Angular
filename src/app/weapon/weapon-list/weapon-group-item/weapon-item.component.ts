import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-weapon-group-item',
  templateUrl: './weapon-item.component.html',
  styleUrls: ['./weapon-item.component.css']
})
export class WeaponItemComponent {
  @Input() name!: string;
}
