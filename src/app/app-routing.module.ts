import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PursuitComponent} from "./pursuit/pursuit.component";
import {CharacterComponent} from "./character/character.component";
import {CharacterStartComponent} from "./character/character-start/character-start.component";
import {CharacterDetailComponent} from "./character/character-detail/character-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'pursuit', component: PursuitComponent},
  {path: 'characters', component: CharacterComponent, children: [
      {path: '', component: CharacterStartComponent},
      {path: ':id', component: CharacterDetailComponent},
    ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
