import {Model} from "./model";

export class ListModel {
  public static list: Model[] = [];

  public static getListItemByName(name: string) {
    return <Model>this.list.find(x => x.name == name);
  }
}
