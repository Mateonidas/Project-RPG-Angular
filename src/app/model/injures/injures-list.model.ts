import {ListModel} from "../list-model";
import {Model} from "../model";

export class Injury extends Model {
  static fromJSON(object: Object): Injury {
    return Object.assign(new Injury(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): Injury[] {
    let injuries = [];
    for (let object of objectsArray) {
      let injury = Injury.fromJSON(object);
      injuries.push(injury);
    }
    return injuries;
  }
}

export class InjuresList extends ListModel {
  public static list = [
    new Injury('MinorBrokenBone', 'Pomniejsze złamanie'),
    new Injury('MajorBrokenBone', 'Poważne złamanie'),
    new Injury('MinorTornMuscles', 'Pomniejsze zerwanie mięśni'),
    new Injury('MajorTornMuscles', 'Poważne zerwanie mięśni'),
    new Injury('Amputation', 'Amputacja'),
    new Injury('AmputatedArm', 'Amputowane ramię'),
    new Injury('AmputatedEar', 'Amputowane ucho'),
    new Injury('AmputatedEye', 'Amputowane oko'),
    new Injury('AmputatedFinger', 'Amputowany palec'),
    new Injury('AmputatedFoot', 'Amputowana stopa'),
    new Injury('AmputatedHand', 'Amputowana dłoń'),
    new Injury('AmputatedLeg', 'Amputowane noga'),
    new Injury('AmputatedNose', 'Amputowany nos'),
    new Injury('AmputatedTeeth', 'Wyrwany ząb'),
    new Injury('AmputatedToes', 'Amputowany palec u stopy'),
    new Injury('AmputatedTongue', 'Amputowany język'),
  ]

  static get minorBrokenBone() {
    return this.getListItemByName('MinorBrokenBone');
  }

  static get majorBrokenBone() {
    return this.getListItemByName('MajorBrokenBone');
  }

  static get minorTornMuscles() {
    return this.getListItemByName('MinorTornMuscles');
  }

  static get majorTornMuscles() {
    return this.getListItemByName('MajorTornMuscles');
  }

  static get amputatedArm() {
    return this.getListItemByName('AmputatedArm');
  }

  static get amputatedEar() {
    return this.getListItemByName('AmputatedEar');
  }

  static get amputatedEye() {
    return this.getListItemByName('AmputatedEye');
  }

  static get amputatedFinger() {
    return this.getListItemByName('AmputatedFinger');
  }

  static get amputatedFoot() {
    return this.getListItemByName('AmputatedFoot');
  }

  static get amputatedHand() {
    return this.getListItemByName('AmputatedHand');
  }

  static get amputatedLeg() {
    return this.getListItemByName('AmputatedLeg');
  }

  static get amputatedNose() {
    return this.getListItemByName('AmputatedNose');
  }

  static get amputatedTeeth() {
    return this.getListItemByName('AmputatedTeeth');
  }

  static get amputatedToes() {
    return this.getListItemByName('AmputatedToes');
  }

  static get amputatedTongue() {
    return this.getListItemByName('AmputatedTongue');
  }
}
