import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RollDialogWindowComponent} from "../../dialog-window/roll-dialog-window/roll-dialog-window.component";

export class ServiceModel {

  constructor(private modalService: NgbModal) {
  }

  protected createRollDialog(name: string, useModifier: boolean) {
    const modalRef = this.modalService.open(RollDialogWindowComponent);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.useModifier = useModifier;
    return modalRef.componentInstance.emitter;
  }
}
