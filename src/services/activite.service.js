import ActiviteRepository from "../repositories/activite.repo.js";
import reservationRepo from "../repositories/reservation.repo.js";

export default class ActiviteService {
  constructor() {
    this.activiteRepository = new ActiviteRepository();
    this.reservationRepository = reservationRepo;
  }

  async createActivite(data) {
    return await this.activiteRepository.create(data);
  }

  async updateActivite(id, data) {
    return await this.activiteRepository.update(id, data);
  }

  async deleteActivite(id) {
    const activite = await this.activiteRepository.findById(id);
    if (!activite) {
      const error = new Error(`Activité avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }

    // Vérifier si des réservations existent
    const reservationsCount = await this.reservationRepository.countByActivite(id);
    if (reservationsCount > 0) {
      const error = new Error(
        `Suppression impossible : cette activité a ${reservationsCount} réservation(s). ` +
        `Veuillez d'abord supprimer les réservations.`
      );
      error.statusCode = 409;
      throw error;
    }

    return await this.activiteRepository.delete(id);
  }
}
