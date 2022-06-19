export class Model {
  public name: string;
  public nameTranslation: string;
  public id?: number;

  constructor(name?: string, nameTranslation?: string, id?: number) {
    this.id = <number>id;
    this.name = <string>name;
    this.nameTranslation = <string>nameTranslation;
  }

  static fromJSON(object: Object): Model {
    return Object.assign(new Model(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): Model[] {
    let models = [];
    for (let object of objectsArray) {
      let model = Model.fromJSON(object);
      models.push(model);
    }
    return models;
  }
}
