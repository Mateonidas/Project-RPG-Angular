import {BodyLocalization} from "../model/body-localization/body-localization.model";
import {Model} from "../model/model";

export interface ArmorRest {
  id: number;
  name: string;
  nameTranslation: string;
  armorCategory: string;
  bodyLocalization: BodyLocalization[];
  armorPoints: number;
  penalties: Model[];
  qualities: Model[];
}
