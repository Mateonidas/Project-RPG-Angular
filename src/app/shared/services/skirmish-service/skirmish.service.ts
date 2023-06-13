import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {ReceivedDamage} from "../../../model/receive-damage/receive-damage.model"
import {CharacterBodyLocalization} from "../../../model/body-localization/character-body-localization.model"
import {AddConditions} from "../../../model/condition/add-conditions.model"

@Injectable({
  providedIn: 'root'
})
export class SkirmishService {

  constructor(private http: HttpClient) {
  }

  async receiveDamage(receivedDamage: ReceivedDamage) {
    await this.postReceiveDamage(receivedDamage)
  }

  postReceiveDamage(receivedDamage: ReceivedDamage) {
    return this.http.post('http://localhost:8080/receiveDamage', receivedDamage).toPromise().then()
  }

  async addAdvantagePoint(skirmishCharacterId: number) {
    await this.postAddAdvantagePoint(skirmishCharacterId)
  }

  private async postAddAdvantagePoint(skirmishCharacterId: number) {
    return this.http.post('http://localhost:8080/addAdvantagePoint', skirmishCharacterId).toPromise().then()
  }

  async removeAdvantagePoint(skirmishCharacterId: number) {
    await this.postRemoveAdvantagePoint(skirmishCharacterId)
  }

  private async postRemoveAdvantagePoint(skirmishCharacterId: number) {
    return this.http.post('http://localhost:8080/removeAdvantagePoint', skirmishCharacterId).toPromise().then()
  }



  async addAdditionalArmorPoint(bodyLocalization: CharacterBodyLocalization) {
    await this.postAddAdditionalArmorPoint(bodyLocalization)
  }

  private async postAddAdditionalArmorPoint(bodyLocalization: CharacterBodyLocalization) {
    return this.http.post('http://localhost:8080/addAdditionalArmorPoint', bodyLocalization).toPromise().then()
  }

  async removeAdditionalArmorPoint(bodyLocalization: CharacterBodyLocalization) {
    await this.postRemoveAdditionalArmorPoint(bodyLocalization)
  }

  private async postRemoveAdditionalArmorPoint(bodyLocalization: CharacterBodyLocalization) {
    return this.http.post('http://localhost:8080/removeAdditionalArmorPoint', bodyLocalization).toPromise().then()
  }

  async addConditions(addConditions: AddConditions) {
    return this.http.post('http://localhost:8080/addConditions', addConditions).toPromise().then()
  }
}
