import {ListModel} from "../list-model";
import {Model} from "../model";
import {BodyLocalization} from "../body-localization/body-localization.model";

export class Injury {

  base: Model;
  bodyLocalization: BodyLocalization;

  constructor(model?: Model, bodyLocalization?: BodyLocalization) {
    this.base = <Model>model;
    this.bodyLocalization = <BodyLocalization>bodyLocalization;
  }

  static fromJSON(object: Object): Injury {
    let injury = Object.assign(new Injury(), object);
    injury.base = Model.fromJSON(injury['base']);
    injury.bodyLocalization = BodyLocalization.fromJSON(injury['bodyLocalization']);
    return injury;
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
    new Model('MinorBrokenBone', 'Pomniejsze złamanie'),
    new Model('MajorBrokenBone', 'Poważne złamanie'),
    new Model('MinorTornMuscles', 'Pomniejsze zerwanie mięśni'),
    new Model('MajorTornMuscles', 'Poważne zerwanie mięśni'),
    new Model('Amputation', 'Amputacja'),
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
