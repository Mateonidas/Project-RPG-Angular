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

  static get minorTornMuscles() {
    return this.getListItemByName('MinorTornMuscles');
  }
}
