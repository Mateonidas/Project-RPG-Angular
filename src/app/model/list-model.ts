import {Model} from "./model";

export class ListModel {
  public static list: Model[] = [];

  public static getListElementByName(name: string) {
    return this.list.find(x => x.name == name);
  }

  //Czy to czarodziejstwo w ogóle zadziała?
  // public static generateGetters() {
  //   for(let element in this.list) {
  //     Object.defineProperty(this, element, {
  //       get: () => {
  //         return this.list[element];
  //       }
  //     })
  //   }
  // }
}
