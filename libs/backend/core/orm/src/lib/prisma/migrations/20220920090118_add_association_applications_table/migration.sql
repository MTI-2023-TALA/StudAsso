-- CreateTable
CREATE TABLE "AssociationOffer" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "association_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "dead_line" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "AssociationOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssociationOfferApplication" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "association_offer_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "motivation" VARCHAR NOT NULL,

    CONSTRAINT "AssociationOfferApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssociationOffer" ADD CONSTRAINT "associations" FOREIGN KEY ("association_id") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssociationOffer" ADD CONSTRAINT "role" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssociationOfferApplication" ADD CONSTRAINT "association_offer" FOREIGN KEY ("association_offer_id") REFERENCES "AssociationOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssociationOfferApplication" ADD CONSTRAINT "users" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
