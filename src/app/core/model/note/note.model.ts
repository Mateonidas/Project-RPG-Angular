export class Note {
  public id: number
  public note: string


  constructor(id?: number, note?: string) {
    this.id = <number>id;
    this.note = <string>note;
  }

  static fromJSON(object: Object): Note {
    return Object.assign(new Note(), object)
  }

  static arrayFromJSON(objectsArray: Object[]): Note[] {
    let notes = []
    for (let object of objectsArray) {
      let note = Note.fromJSON(object)
      notes.push(note)
    }
    return notes
  }
}
