import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PursuitComponent} from './pursuit/pursuit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './header/header.component';
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import { CharacterComponent } from './character/character.component';
import { CharacterListComponent } from './character/character-list/character-list.component';
import { CharacterDetailComponent } from './character/character-detail/character-detail.component';
import { CharacterEditComponent } from './character/character-edit/character-edit.component';
import { CharacterStartComponent } from './character/character-start/character-start.component';
import { CharacterItemComponent } from './character/character-list/character-item/character-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { SkirmishComponent } from './skirmish/skirmish.component';
import { SkirmishCharactersListComponent } from './skirmish/skirmish-characters-list/skirmish-characters-list.component';
import { SkirmishCharacterItemComponent } from './skirmish/skirmish-characters-list/skirmish-character-item/skirmish-character-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PursuitComponent,
    HeaderComponent,
    HomeComponent,
    CharacterComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    CharacterEditComponent,
    CharacterStartComponent,
    CharacterItemComponent,
    DropdownDirective,
    SkirmishComponent,
    SkirmishCharactersListComponent,
    SkirmishCharacterItemComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
