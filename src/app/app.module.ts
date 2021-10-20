import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
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
import { SkirmishCharacterDetailsComponent } from './skirmish/skirmish-character-details/skirmish-character-details.component';
import { SkirmishCharacterEditComponent } from './skirmish/skirmish-character-edit/skirmish-character-edit.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { InitiativeDialogWindow } from './dialog-window/initiative-dialog-window/initiative-dialog-window.component';
import { SkirmishActionsListComponent } from './skirmish/skirmish-actions-list/skirmish-actions-list.component';
import { SkirmishActionsAttackComponent } from './skirmish/skirmish-actions-list/skirmish-actions-attack/skirmish-actions-attack.component';
import { SaveRollDialogWindowComponent } from './dialog-window/save-roll-dialog-window/save-roll-dialog-window.component';
import { ValidationAlertComponent } from './validation/validation-alert/validation-alert.component';
import { AttackReportDialogWindowComponent } from './dialog-window/report-dialog-window/attack-report-dialog-window.component';
import { RollDialogWindowComponent } from './dialog-window/roll-dialog-window/roll-dialog-window.component';

@NgModule({
  declarations: [
    AppComponent,
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
    SkirmishCharacterItemComponent,
    SkirmishCharacterDetailsComponent,
    SkirmishCharacterEditComponent,
    EditFormComponent,
    InitiativeDialogWindow,
    SkirmishActionsListComponent,
    SkirmishActionsAttackComponent,
    SaveRollDialogWindowComponent,
    ValidationAlertComponent,
    AttackReportDialogWindowComponent,
    RollDialogWindowComponent
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
