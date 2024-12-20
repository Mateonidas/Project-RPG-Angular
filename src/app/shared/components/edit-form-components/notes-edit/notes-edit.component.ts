import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, UntypedFormArray} from "@angular/forms";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {Note} from "../../../../core/model/note/note.model";

@Component({
    selector: 'app-notes-edit',
    templateUrl: './notes-edit.component.html',
    styleUrls: ['./notes-edit.component.css'],
    standalone: false
})
export class NotesEditComponent {
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService

  constructor(public formBuilder: FormBuilder) {
  }

  static prepareNotesList(notes: FormArray, notesList: Note[]) {
    const formBuilder = new FormBuilder();
    for (let note of notesList) {
      notes.push(
        formBuilder.group({
          'id': [note.id],
          'note': [note.note],
        })
      )
    }
  }

  onAddNote() {
    (<UntypedFormArray>this.editCharacterForm.get('notes')).push(
      this.formBuilder.group({
        'id': [null],
        'note': [null],
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
