export class Model {
  public id?: number;
  public name: string;
  public nameTranslation: string;
  public description: string

  constructor(name?: string, nameTranslation?: string, id?: number, description?: string) {
    this.id = <number>id;
    this.name = <string>name;
    this.nameTranslation = <string>nameTranslation;
    this.description = <string>description;
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
