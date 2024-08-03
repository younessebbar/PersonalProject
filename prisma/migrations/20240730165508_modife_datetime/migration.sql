-- CreateTable
CREATE TABLE "candidat" (
    "id" SERIAL NOT NULL,
    "prenom" VARCHAR(50) NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telephone" VARCHAR(20),
    "resume" TEXT,

    CONSTRAINT "candidat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidature" (
    "id" SERIAL NOT NULL,
    "date_candidature" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "education" TEXT,
    "experience" TEXT,
    "statut" TEXT,
    "autres_informations" TEXT,
    "offre_emploi_id" INTEGER,
    "candidat_id" INTEGER,

    CONSTRAINT "candidature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorie_emploi" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "nom" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "categorie_emploi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(100) NOT NULL,
    "fichier" BYTEA,
    "candidat_id" INTEGER,
    "derniere_mise_a_jour" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offre_emploi" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "date_publication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_debut" DATE NOT NULL,
    "nombre_vacances" INTEGER NOT NULL,
    "salaire_min" INTEGER,
    "salaire_max" INTEGER,
    "type_contrat" VARCHAR(50),
    "categorie_emploi_id" INTEGER,
    "poste_id" INTEGER,
    "organisation_id" INTEGER,
    "recruteur_id" INTEGER,

    CONSTRAINT "offre_emploi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organisation" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poste" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "nom" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "poste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruteur" (
    "id" SERIAL NOT NULL,
    "prenom" VARCHAR(50) NOT NULL,
    "nom" VARCHAR(50) NOT NULL,

    CONSTRAINT "recruteur_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "candidature" ADD CONSTRAINT "candidature_candidat_id_fkey" FOREIGN KEY ("candidat_id") REFERENCES "candidat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "candidature" ADD CONSTRAINT "candidature_offre_emploi_id_fkey" FOREIGN KEY ("offre_emploi_id") REFERENCES "offre_emploi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_candidat_id_fkey" FOREIGN KEY ("candidat_id") REFERENCES "candidat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "offre_emploi" ADD CONSTRAINT "offre_emploi_categorie_emploi_id_fkey" FOREIGN KEY ("categorie_emploi_id") REFERENCES "categorie_emploi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "offre_emploi" ADD CONSTRAINT "offre_emploi_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "offre_emploi" ADD CONSTRAINT "offre_emploi_poste_id_fkey" FOREIGN KEY ("poste_id") REFERENCES "poste"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "offre_emploi" ADD CONSTRAINT "offre_emploi_recruteur_id_fkey" FOREIGN KEY ("recruteur_id") REFERENCES "recruteur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
