import {ListModel} from "../list-model";
import {Model} from "../model";

export class InjuresList extends ListModel {
  public static list = [
    new Model('MinorBrokenBone', 'Pomniejsze złamanie'),
    new Model('MajorBrokenBone', 'Poważne złamanie'),
    new Model('MinorTornMuscles', 'Pomniejsze zerwanie mięśni'),
    new Model('MajorTornMuscles', 'Poważne zerwanie mięśni'),
    new Model('AmputatedArm', 'Amputowane ramię'),
    new Model('AmputatedEar', 'Amputowane ucho'),
    new Model('AmputatedEye', 'Amputowane oko'),
    new Model('AmputatedFinger', 'Amputowany palec'),
    new Model('AmputatedFoot', 'Amputowana stopa'),
    new Model('AmputatedHand', 'Amputowana dłoń'),
    new Model('AmputatedLeg', 'Amputowane noga'),
    new Model('AmputatedNose', 'Amputowany nos'),
    new Model('AmputatedTeeth', 'Wyrwany ząb'),
    new Model('AmputatedToes', 'Amputowany palec u stopy'),
    new Model('AmputatedTongue', 'Amputowany język'),
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
