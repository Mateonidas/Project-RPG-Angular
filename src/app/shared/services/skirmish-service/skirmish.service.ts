import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReceivedDamage} from "../../../model/receive-damage/receive-damage.model";

@Injectable({
  providedIn: 'root'
})
export class SkirmishService {

  constructor(private http: HttpClient) {
  }

  async receiveDamage(receivedDamage: ReceivedDamage) {
    await this.postReceiveDamage(receivedDamage);
  }

  postReceiveDamage(receivedDamage: ReceivedDamage) {
    return this.http.post('http://localhost:8080/receiveDamage', receivedDamage).toPromise().then();
  }

  async addAdvantagePoint(skirmishCharacterId: number) {
    await this.postAddAdvantagePoint(skirmishCharacterId);
  }

  private async postAddAdvantagePoint(skirmishCharacterId: number) {
    return this.http.post('http://localhost:8080/addAdvantagePoint', skirmishCharacterId).toPromise().then();
  }

  async removeAdvantagePoint(skirmishCharacterId: number) {
    await this.removeAddAdvantagePoint(skirmishCharacterId);
  }

  private async removeAddAdvantagePoint(skirmishCharacterId: number) {
    return this.http.post('http://localhost:8080/removeAdvantagePoint', skirmishCharacterId).toPromise().then();
  }
}
