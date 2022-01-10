export interface WeaponRest {
  id: number;
  name: string;
  nameTranslation: string;
  weaponType: string;
  weaponGroupType: string;
  weaponRange: string;
  isUsingStrength: boolean;
  damage: number;
  weaponQualities: string[];
}
