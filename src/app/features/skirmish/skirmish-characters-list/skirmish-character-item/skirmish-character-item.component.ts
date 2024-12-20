import {Component, Input, OnInit} from '@angular/core';
import {SkirmishCharacter} from "../../../../core/model/skirmish/skirmish-character.model";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";

@Component({
    selector: 'app-skirmish-character-item',
    templateUrl: './skirmish-character-item.component.html',
    styleUrls: ['./skirmish-character-item.component.css'],
    standalone: false
})
export class SkirmishCharacterItemComponent implements OnInit {
  @Input() skirmishCharacter!: SkirmishCharacter;
  @Input() index!: number;

  text = TextResourceService;

  constructor() {
  }

  ngOnInit(): void {
  }

  getHealthBarStyle(): { [key: string]: string } {
    const maxHealth = this.skirmishCharacter.character.wounds.value;
    const currentHealth = this.skirmishCharacter.currentWounds;
    const isDead = this.skirmishCharacter.isDead

    let healthPercentage = 0

    if (!isDead) {
      healthPercentage = Math.max(0, Math.min(100, (currentHealth / maxHealth) * 100));
    }

    const startColor = {r: 63, g: 81, b: 181};
    const endColor = {r: 233, g: 30, b: 99};
    const {r, g, b} = this.calculateHealthColor(endColor, startColor, healthPercentage);
    const a = 1;

    return {
      'background-color': `rgba(${r}, ${g}, ${b}, ${a})`,
      'width': `${healthPercentage}%`,
      'transition': 'width 0.3s ease, background-color 0.3s ease',
    };
  }

  private calculateHealthColor(endColor: { r: number; g: number; b: number }, startColor: {
    r: number;
    g: number;
    b: number
  }, healthPercentage: number) {
    const r = Math.round(endColor.r + (startColor.r - endColor.r) * (healthPercentage / 100));
    const g = Math.round(endColor.g + (startColor.g - endColor.g) * (healthPercentage / 100));
    const b = Math.round(endColor.b + (startColor.b - endColor.b) * (healthPercentage / 100));
    return {r, g, b};
  }
}
