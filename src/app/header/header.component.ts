import { Component, OnInit } from '@angular/core';
import {ArmorService} from "../shared/services/armor-service/armor.service";
import {WeaponService} from "../shared/services/weapon-service/weapon.service";
import {SkillService} from "../shared/services/skill-service/skill.service";
import {TalentService} from "../shared/services/talent-service/talent.service";
import {CharacterService} from "../shared/services/character-service/character.service";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  activeLink = '/';
  background: ThemePalette = 'primary';
}
