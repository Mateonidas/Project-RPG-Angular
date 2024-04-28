import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavBar} from './header/nav-bar.component';
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {CharacterComponent} from './character/character.component';
import {CharacterListComponent} from './character/character-list/character-list.component';
import {CharacterDetailComponent} from './character/character-detail/character-detail.component';
import {CharacterEditComponent} from './character/character-edit/character-edit.component';
import {CharacterStartComponent} from './character/character-start/character-start.component';
import {CharacterItemComponent} from './character/character-list/character-item/character-item.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import {SkirmishComponent} from './skirmish/skirmish.component';
import {SkirmishCharactersListComponent} from './skirmish/skirmish-characters-list/skirmish-characters-list.component';
import {
  SkirmishCharacterItemComponent
} from './skirmish/skirmish-characters-list/skirmish-character-item/skirmish-character-item.component';
import {
  SkirmishCharacterDetailsComponent
} from './skirmish/skirmish-character-details/skirmish-character-details.component';
import {SkirmishCharacterEditComponent} from './skirmish/skirmish-character-edit/skirmish-character-edit.component';
import {ValidationAlertComponent} from './validation/validation-alert/validation-alert.component';
import {HttpClientModule} from '@angular/common/http';
import {EditArmorDialog} from './dialog-window/edit-armor-dialog/edit-armor-dialog.component';
import {RollDialogWindow} from "./dialog-window/roll-dialog-window/roll-dialog-window.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditWeaponDialog} from './dialog-window/edit-weapon-dialog/edit-weapon-dialog.component';
import {ReceiveDamageDialog} from './dialog-window/receive-damage-dialog/receive-damage-dialog.component';
import {
  BottomSheetDescription
} from './shared/bottom-sheet/bottom-sheet-description/bottom-sheet-description.component';
import {MAT_BOTTOM_SHEET_DEFAULT_OPTIONS} from "@angular/material/bottom-sheet";
import {MaterialModule} from "../material.module";
import {WeaponComponent} from './weapon/weapon.component';
import {WeaponListComponent} from './weapon/weapon-list/weapon-list.component';
import {WeaponStartComponent} from './weapon/weapon-start/weapon-start.component';
import {WeaponGroupDetailsComponent} from './weapon/weapon-group-details/weapon-group-details.component';
import {ArmorComponent} from './armor/armor.component';
import {ArmorGroupDetails} from './armor/armor-group-details/armor-group-details.component';
import {AddManyToFightDialog} from './dialog-window/add-many-to-fight/add-many-to-fight-dialog.component';
import {InitiativeDialog} from './dialog-window/initiative-dialog/initiative-dialog.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {LoaderComponent} from './loader/loader.component';
import {ConfirmationDialogComponent} from './dialog-window/confirmation-dialog/confirmation-dialog.component';
import {AddConditionDialogComponent} from './dialog-window/add-condition-dialog/add-condition-dialog.component';
import {ConditionListComponent} from './condition-list/condition-list.component';
import {DetailsNameComponent} from './details-components/details-name/details-name.component';
import {SharedButtonsComponent} from './details-components/menu-buttons/shared-buttons/shared-buttons.component';
import {
  CharacterButtonsComponent
} from './details-components/menu-buttons/character-buttons/character-buttons.component';
import {
  SkirmishCharacterButtonsComponent
} from './details-components/menu-buttons/skirmish-character-buttons/skirmish-character-buttons.component';
import {DetailsDescriptionsComponent} from './details-components/details-descriptions/details-descriptions.component';
import {
  DetailsSkirmishCharacterParametersComponent
} from './details-components/details-skirmish-character-parameters/details-skirmish-character-parameters.component';
import {DetailsCharacterComponent} from './details-components/details-character/details-character.component';
import {
  DetailsBodyLocalizationsComponent
} from './details-components/details-body-localizations/details-body-localizations.component';
import {DescriptionEditComponent} from './edit-form-components/description-edit/description-edit.component';
import {TemporaryParametersComponent} from './edit-form-components/temporary-parameters/temporary-parameters.component';
import {ConditionsEditComponent} from './edit-form-components/conditions-edit/conditions-edit.component';
import {CharacteristicsEditComponent} from './edit-form-components/characteristics-edit/characteristics-edit.component';
import {NotesEditComponent} from './edit-form-components/notes-edit/notes-edit.component';
import {SkillsEditComponent} from './edit-form-components/skills-edit/skills-edit.component';
import {TalentsEditComponent} from './edit-form-components/talents-edit/talents-edit.component';
import {TraitsEditComponent} from './edit-form-components/traits-edit/traits-edit.component';
import {SpellsEditComponent} from './edit-form-components/spells-edit/spells-edit.component';
import {WeaponsEditComponent} from './edit-form-components/weapons-edit/weapons-edit.component';
import {ArmorEditComponent} from './edit-form-components/armor-edit/armor-edit.component';
import {InjuryEditComponent} from './edit-form-components/injury-edit/injury-edit.component';
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    NavBar,
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
    RollDialogWindow,
    ValidationAlertComponent,
    EditArmorDialog,
    EditWeaponDialog,
    ReceiveDamageDialog,
    BottomSheetDescription,
    WeaponComponent,
    WeaponListComponent,
    WeaponStartComponent,
    WeaponGroupDetailsComponent,
    ArmorComponent,
    ArmorGroupDetails,
    AddManyToFightDialog,
    InitiativeDialog,
    LoaderComponent,
    ConfirmationDialogComponent,
    AddConditionDialogComponent,
    ConditionListComponent,
    DetailsNameComponent,
    SharedButtonsComponent,
    CharacterButtonsComponent,
    SkirmishCharacterButtonsComponent,
    DetailsDescriptionsComponent,
    DetailsSkirmishCharacterParametersComponent,
    DetailsCharacterComponent,
    DetailsBodyLocalizationsComponent,
    DescriptionEditComponent,
    TemporaryParametersComponent,
    ConditionsEditComponent,
    CharacteristicsEditComponent,
    NotesEditComponent,
    SkillsEditComponent,
    TalentsEditComponent,
    TraitsEditComponent,
    SpellsEditComponent,
    WeaponsEditComponent,
    ArmorEditComponent,
    InjuryEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatTabsModule
  ],
  providers: [
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
