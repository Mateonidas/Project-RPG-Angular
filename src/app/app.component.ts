import {Component, OnInit} from '@angular/core'
import {ArmorService} from "./shared/services/armor-service/armor.service"
import {WeaponService} from "./shared/services/weapon-service/weapon.service"
import {SkillService} from "./shared/services/skill-service/skill.service"
import {TalentService} from "./shared/services/talent-service/talent.service"
import {TraitService} from "./shared/services/trait-service/trait.service"
import {BodyLocalizationService} from "./shared/services/body-localization-service/body-localization.service"
import {CharacterService} from "./shared/services/character-service/character.service"
import {InjuryService} from "./shared/services/injuries-service/injury.service"
import {ConditionService} from "./shared/services/condition-service/condition.service"
import {SpellService} from "./shared/services/spell-service/spell.service"
import {MatDialog} from "@angular/material/dialog"
import {SkirmishCharacterService} from "./shared/services/skirmish-character-service/skirmish-character.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  dataLoaded = false;

  constructor(public armorService: ArmorService,
              public weaponService: WeaponService,
              public skillService: SkillService,
              public talentService: TalentService,
              public traitService: TraitService,
              public bodyLocalizationService: BodyLocalizationService,
              public characterService: CharacterService,
              public skirmishCharacterService: SkirmishCharacterService,
              public injuryService: InjuryService,
              public conditionService: ConditionService,
              public spellService: SpellService,
              public dialog: MatDialog) {
  }

  async ngOnInit() {
    this.dataLoaded = false
    await this.fetchData().then(() => {
        this.dataLoaded = true
      }
    )
  }

  protected async fetchData() {
    await this.armorService.fetchArmors()
    await this.armorService.fetchArmorCategories()
    await this.armorService.fetchArmorPenalties()
    await this.armorService.fetchArmorQualities()
    await this.bodyLocalizationService.fetchBodyLocalizations()
    await this.injuryService.fetchInjuries()
    await this.conditionService.fetchConditions()
    await this.weaponService.fetchWeapons()
    await this.weaponService.fetchWeaponTypes()
    await this.weaponService.fetchWeaponGroups()
    await this.weaponService.fetchWeaponReaches()
    await this.weaponService.fetchWeaponQualities()
    await this.skillService.fetchSkills()
    await this.talentService.fetchTalents()
    await this.traitService.fetchTraits()
    await this.spellService.fetchSpells()
    await this.characterService.fetchCharacters()
    await this.skirmishCharacterService.fetchSkirmishCharacter()
  }
}
