import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RollDialogWindowComponent} from "../../dialog-window/roll-dialog-window/roll-dialog-window.component";

export class ServiceModel {

  constructor(protected modalService: NgbModal) {
  }

  protected createRollDialog(name: string, useModifier: boolean) {
    const modalRef = this.modalService.open(RollDialogWindowComponent);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.useModifier = useModifier;
    return modalRef.componentInstance.emitter;
  }

  protected async createRollDialogAsync(name: string, useModifier: boolean) {
    const modalRef = this.modalService.open(RollDialogWindowComponent);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.useModifier = useModifier;

    let roll: { roll: number; modifier: number; };
    modalRef.componentInstance.emitter.subscribe((rollResult: { roll: number, modifier: number }) => {
      roll = rollResult;
    });

    return modalRef.closed
      .toPromise()
      .then(() => {
        return Promise.resolve({roll: roll.roll, modifier: roll.modifier});
      })
  }
}
