import {Component, Input} from '@angular/core';
import {FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {Note} from "../../../../core/model/note/note.model";

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.css']
})
export class NotesEditComponent {
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService

  static prepareNotesList(notes: UntypedFormArray, notesList: Note[]) {
    for (let note of notesList) {
      notes.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(note.id),
          'note': new UntypedFormControl(note.note),
        })
      )
    }
  }

  onAddNote() {
    (<UntypedFormArray>this.editCharacterForm.get('notes')).push(
      new UntypedFormGroup({
        'id': new UntypedFormControl(null),
        'note': new UntypedFormControl(null),
      })
    )
  }

  onDeleteNote(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('notes')).removeAt(index)
  }

  get notes() {
    return (<UntypedFormArray>this.editCharacterForm.get('notes')).controls
  }
}
