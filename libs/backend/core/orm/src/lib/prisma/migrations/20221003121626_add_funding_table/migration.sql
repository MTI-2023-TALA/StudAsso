-- CreateTable
CREATE TABLE "Funding" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "motivation" VARCHAR NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" VARCHAR NOT NULL DEFAULT 'PENDING',
    "association_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "school_comment" VARCHAR,

    CONSTRAINT "Funding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Funding" ADD CONSTRAINT "association" FOREIGN KEY ("association_id") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funding" ADD CONSTRAINT "user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
