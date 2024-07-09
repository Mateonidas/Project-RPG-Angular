import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CharacterComponent} from "./character/character.component";
import {CharacterStartComponent} from "./character/character-start/character-start.component";
import {CharacterDetailComponent} from "./character/character-detail/character-detail.component";
import {CharacterEditComponent} from "./character/character-edit/character-edit.component";
import {SkirmishComponent} from "./skirmish/skirmish.component";
import {
  SkirmishCharacterDetailsComponent
} from "./skirmish/skirmish-character-details/skirmish-character-details.component";
import {SkirmishCharacterEditComponent} from "./skirmish/skirmish-character-edit/skirmish-character-edit.component";
import {WeaponComponent} from "./weapon/weapon.component";
import {WeaponStartComponent} from "./weapon/weapon-start/weapon-start.component";
import {WeaponGroupDetailsComponent} from "./weapon/weapon-group-details/weapon-group-details.component";
import {ArmorComponent} from "./armor/armor.component";
import {ConditionListComponent} from "./condition-list/condition-list.component";
import {SpellListComponent} from "./spell-list/spell-list.component";

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
    path: 'weapons', component: WeaponComponent, children: [
      {path: '', component: WeaponStartComponent},
      {path: ':name', component: WeaponGroupDetailsComponent},
    ]
  },
  {
    path: 'armors', component: ArmorComponent
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
