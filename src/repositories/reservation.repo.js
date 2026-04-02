import database from "../config/db.js";
import BaseRepo from "./base.repo.js";

const prisma = database.getClient();

class ReservationRepo extends BaseRepo {
  constructor() {
    super(prisma.reservation);
  }

  async findAll() {
    return this.model.findMany({
      include: {
        abonne: true,
        activite: true,
        coach: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id: parseInt(id) },
      include: {
        abonne: true,
        activite: true,
        coach: true,
      },
    });
  }

  async create(data) {
    // 1. Vérifier existence abonné
    const abonne = await prisma.abonne.findUnique({
      where: { id: data.abonneId },
    });
    if (!abonne) {
      throw new Error("Abonné non trouvé.");
    }

    // 2. Vérifier existence activité
    const activite = await prisma.activite.findUnique({
      where: { id: data.activiteId },
    });
    if (!activite) {
      throw new Error("Activité non trouvée.");
    }

    // 3. Vérifier existence coach
    const coach = await prisma.coach.findUnique({
      where: { id: data.coachId },
    });
    if (!coach) {
      throw new Error("Coach non trouvé.");
    }

    // 4. dateHeure doit être dans le futur
    const dateHeure = new Date(data.dateHeure);
    if (dateHeure <= new Date()) {
      throw new Error("La dateHeure doit être dans le futur.");
    }

    // 5. Un coach ne peut pas avoir deux réservations à la même dateHeure
    const coachConflict = await this.model.findFirst({
      where: {
        coachId: data.coachId,
        dateHeure: dateHeure,
        statut: "RESERVEE",
      },
    });
    if (coachConflict) {
      throw new Error("Ce coach a déjà une réservation à cette date/heure.");
    }

    // 6. Vérifier places disponibles (nombre de réservés < placesMax pour cette activité et ce créneau)
    const reservationsCount = await this.model.count({
      where: {
        activiteId: data.activiteId,
        dateHeure: dateHeure,
        statut: "RESERVEE",
      },
    });
    if (reservationsCount >= activite.placesMax) {
      throw new Error("Capacité maximale atteinte pour cette activité à ce créneau.");
    }

    // 7. Un abonné ne peut pas réserver deux fois le même créneau (activité + dateHeure)
    const doublonAbonne = await this.model.findFirst({
      where: {
        abonneId: data.abonneId,
        activiteId: data.activiteId,
        dateHeure: dateHeure,
      },
    });
    if (doublonAbonne) {
      throw new Error("Cet abonné a déjà réservé ce créneau pour cette activité.");
    }

    return this.model.create({
      data: {
        ...data,
        dateHeure: dateHeure,
        statut: "RESERVEE",
      },
      include: {
        abonne: true,
        activite: true,
        coach: true,
      },
    });
  }

  async update(id, data) {
    return this.model.update({
      where: { id: parseInt(id) },
      data,
      include: {
        abonne: true,
        activite: true,
        coach: true,
      },
    });
  }

  async deleteReservation(id) {
    const reservation = await this.model.findUnique({
      where: { id: parseInt(id) },
    });

    if (!reservation) {
      throw new Error("Réservation non trouvée.");
    }

    return this.model.delete({
      where: { id: parseInt(id) },
    });
  }

  async countByActivite(activiteId) {
    return this.model.count({
      where: { activiteId: parseInt(activiteId) },
    });
  }

  async countByAbonne(abonneId) {
    return this.model.count({
      where: { abonneId: parseInt(abonneId) },
    });
  }

  async countByCoach(coachId) {
    return this.model.count({
      where: { coachId: parseInt(coachId), statut: "RESERVEE" },
    });
  }
}

const reservationRepo = new ReservationRepo();
export default reservationRepo;
