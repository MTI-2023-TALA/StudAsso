import { CommonModule } from '@angular/common';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { NgModule } from '@angular/core';
import { OfferPageComponent } from './offer-page/offer-page.component';

@NgModule({
  imports: [CommonModule, FrontendSharedGenericPageModule],
  declarations: [OfferPageComponent],
})
export class FrontendFeatureAssociationOfferPageModule {}
