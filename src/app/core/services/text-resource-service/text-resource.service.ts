import {Injectable} from '@angular/core';
import textResource from '../../../../assets/text.json';

@Injectable({
  providedIn: 'root'
})
export class TextResourceService {

  constructor() {
  }

  public static getText() {
    return textResource;
  }

  public static getTranslation(element: keyof typeof textResource, name: string): Model {
    let items: Model[] = <Model[]>textResource[element];
    if (!items) {
      return {nameTranslation: '', name: '', description: ''};
    }
    return items.find(item => item.name == name) || {nameTranslation: '', name: '', description: ''};
  }
}

export interface Model {
  name: string;
  nameTranslation: string;
  description: string;
}

