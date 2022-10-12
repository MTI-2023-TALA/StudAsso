/*
  Warnings:

  - A unique constraint covering the columns `[user_id,association_offer_id]` on the table `AssociationOfferApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "unique_application_to_offer_per_user" ON "AssociationOfferApplication"("user_id", "association_offer_id");
