import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CharacterComponent} from "./character/character.component";
import {CharacterStartComponent} from "./character/character-start/character-start.component";
import {CharacterDetailComponent} from "./character/character-detail/character-detail.component";
import {CharacterEditComponent} from "./character/character-edit/character-edit.component";
import {SkirmishComponent} from "./skirmish/skirmish.component";
import {SkirmishCharacterDetailsComponent} from "./skirmish/skirmish-character-details/skirmish-character-details.component";
import {SkirmishCharacterEditComponent} from "./skirmish/skirmish-character-edit/skirmish-character-edit.component";
import {SkirmishActionsListComponent} from "./skirmish/skirmish-actions-list/skirmish-actions-list.component";
import {SkirmishActionsAttackComponent} from "./skirmish/skirmish-actions-list/skirmish-actions-attack/skirmish-actions-attack.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'characters', component: CharacterComponent, children: [
      {path: '', component: CharacterStartComponent},
      {path: 'new', component: CharacterEditComponent},
      {path: ':id', component: CharacterDetailComponent},
      {path: ':id/edit', component: CharacterEditComponent},
    ]},
  {path: 'skirmish', component: SkirmishComponent, children: [
      {path: ':id', component: SkirmishCharacterDetailsComponent},
      {path: ':id/edit', component: SkirmishCharacterEditComponent},
      {path: ':id/actions', component: SkirmishActionsListComponent},
      {path: ':id/actions/attack', component: SkirmishActionsAttackComponent},
    ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
