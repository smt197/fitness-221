-- CreateEnum
CREATE TYPE "TypeAbonnement" AS ENUM ('MENSUEL', 'TRIMESTRIEL', 'ANNUEL');

-- CreateEnum
CREATE TYPE "StatutReservation" AS ENUM ('RESERVEE', 'EFFECTUEE', 'ANNULEE');

-- CreateTable
CREATE TABLE "coachs" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "specialite" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coachs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abonnes" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "date_inscription" TIMESTAMP(3) NOT NULL,
    "type_abonnement" "TypeAbonnement" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "abonnes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activites" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "duree" INTEGER NOT NULL,
    "places_max" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" SERIAL NOT NULL,
    "abonne_id" INTEGER NOT NULL,
    "activite_id" INTEGER NOT NULL,
    "coach_id" INTEGER NOT NULL,
    "date_heure" TIMESTAMP(3) NOT NULL,
    "statut" "StatutReservation" NOT NULL DEFAULT 'RESERVEE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coachs_email_key" ON "coachs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "abonnes_email_key" ON "abonnes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "activites_code_key" ON "activites"("code");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_abonne_id_activite_id_date_heure_key" ON "reservations"("abonne_id", "activite_id", "date_heure");

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_abonne_id_fkey" FOREIGN KEY ("abonne_id") REFERENCES "abonnes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_activite_id_fkey" FOREIGN KEY ("activite_id") REFERENCES "activites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coachs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
