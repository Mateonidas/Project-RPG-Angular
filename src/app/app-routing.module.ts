import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/components/home/home.component";
import {CharacterComponent} from "./features/character/character.component";
import {CharacterStartComponent} from "./features/character/character-start/character-start.component";
import {CharacterDetailComponent} from "./features/character/character-detail/character-detail.component";
import {CharacterEditComponent} from "./features/character/character-edit/character-edit.component";
import {SkirmishComponent} from "./features/skirmish/skirmish.component";
import {
  SkirmishCharacterDetailsComponent
} from "./features/skirmish/skirmish-character-details/skirmish-character-details.component";
import {SkirmishCharacterEditComponent} from "./features/skirmish/skirmish-character-edit/skirmish-character-edit.component";
import {WeaponListComponent} from "./features/list-of-elements/weapon-list/weapon-list.component";
import {WeaponListStartComponent} from "./features/list-of-elements/weapon-list/weapon-start/weapon-list-start.component";
import {WeaponGroupItemListComponent} from "./features/list-of-elements/weapon-list/weapon-group-item-list/weapon-group-item-list.component";
import {ArmorListComponent} from "./features/list-of-elements/armor-list/armor-list.component";
import {ConditionListComponent} from "./features/list-of-elements/condition-list/condition-list.component";
import {SpellListComponent} from "./features/list-of-elements/spell-list/spell-list.component";
import {QualityListComponent} from "./features/list-of-elements/quality-list/quality-list.component";
import {
  TalentAndTraitListComponent
} from "./features/list-of-elements/talent-and-trait-list/talent-and-trait-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'characters', component: CharacterComponent, children: [
      {path: '', component: CharacterStartComponent},
      {path: 'new', component: CharacterEditComponent},
      {path: ':id', component: CharacterDetailComponent},
      {path: ':id/edit', component: CharacterEditComponent},
      {path: ':id/copy', component: CharacterEditComponent},
    ]
  },
  {
    path: 'skirmish', component: SkirmishComponent, children: [
      {path: ':id', component: SkirmishCharacterDetailsComponent},
      {path: ':id/edit', component: SkirmishCharacterEditComponent},
    ]
  },
  {
    path: 'weapons', component: WeaponListComponent, children: [
      {path: '', component: WeaponListStartComponent},
      {path: ':name', component: WeaponGroupItemListComponent},
    ]
  },
  {
    path: 'armors', component: ArmorListComponent
  },
  {
    path: 'qualities', component: QualityListComponent
  },
  {
    path: 'talents_and_traits', component: TalentAndTraitListComponent
  },
  {
    path: 'conditions', component: ConditionListComponent
  },
  {
    path: 'spells', component: SpellListComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
