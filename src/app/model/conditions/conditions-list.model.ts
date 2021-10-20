import {ListModel} from "../list-model";
import {Model} from "../model";

export class ConditionsList extends ListModel {
  public static list = [
    new Model('Ablaze','Podpalenie'),
    new Model('Bleeding','Krwawienie'),
    new Model('Blinded','Oślepienie'),
    new Model('Broken','Panika'),
    new Model('Deafened','Ogłuszenie'),
    new Model('Entangled','Pochwycenie'),
    new Model('Fatigued','Zmęczenie'),
    new Model('Poisoned','Zatrucie'),
    new Model('Prone','Powalenie'),
    new Model('Stunned','Oszołomienie'),
    new Model('Surprised','Zaskoczenie'),
    new Model('Unconscious','Utrata Przytomności'),
  ]

  static get ablaze() {
    return this.getListItemByName('Ablaze');
  }

  static get bleeding() {
    return this.getListItemByName('Bleeding');
  }

  static get blinded() {
    return this.getListItemByName('Blinded');
  }

  static get broken() {
    return this.getListItemByName('Broken');
  }

  static get deafened() {
    return this.getListItemByName('Deafened');
  }

  static get entangled() {
    return this.getListItemByName('Entangled');
  }

  static get fatigued() {
    return this.getListItemByName('Fatigued');
  }

  static get poisoned() {
    return this.getListItemByName('Poisoned');
  }

  static get prone() {
    return this.getListItemByName('Prone');
  }

  static get stunned() {
    return this.getListItemByName('Stunned');
  }

  static get surprised() {
    return this.getListItemByName('Surprised');
  }

  static get unconscious() {
    return this.getListItemByName('Unconscious');
  }
}
