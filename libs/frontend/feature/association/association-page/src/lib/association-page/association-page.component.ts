import { Component, OnInit } from '@angular/core';
import { IUpdateAssoInfo, updateAssociation } from './association-page.formly';
import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiAssociationService } from '@stud-asso/frontend-core-api';
import { AssociationDto } from '@stud-asso/shared/dtos';
import { ModalService } from '@stud-asso/frontend-shared-modal';

@Component({
  selector: 'stud-asso-association-page',
  templateUrl: './association-page.component.html',
  styleUrls: ['./association-page.component.scss'],
})
export class AssociationPageComponent implements OnInit {
  association: AssociationDto;
  assoId: number;
  isLoading = true;

  constructor(
    private apiAssociationService: ApiAssociationService,
    private modal: ModalService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  private reloadData() {
    const assoId = LocalStorageHelper.getData<number>(LocalStorageKey.ASSOCIATION_ID);
    if (assoId) {
      this.assoId = assoId;
      this.apiAssociationService.findOneWithPresident(assoId).subscribe((asso) => {
        this.association = asso;
        this.isLoading = false;
      });
    }
  }

  updateAssoInformation(): (data: IUpdateAssoInfo) => void {
    return (data: IUpdateAssoInfo) => {
      this.apiAssociationService.update(this.assoId, data).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Modification effectuée', type: ToastType.Success });
          this.reloadData();
        },
        error: () => {
          this.toast.addAlert({ title: 'Erreur lors de la modification', type: ToastType.Error });
        },
      });
    };
  }

  openModalUpdateAssoInformation() {
    this.modal.createForm({
      title: 'Modifier mes informations',
      fields: updateAssociation(this.association.name, this.association.description),
      submitBtnText: 'Modifier',
      submit: this.updateAssoInformation(),
    });
  }
}
