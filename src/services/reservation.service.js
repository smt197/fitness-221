import reservationRepo from "../repositories/reservation.repo.js";

export default class ReservationService {
  constructor() {
    this.reservationRepo = reservationRepo;
  }

  async createReservation(data) {
    return await this.reservationRepo.create(data);
  }

  async getAllReservations() {
    return await this.reservationRepo.findAll();
  }

  async getReservationById(id) {
    return await this.reservationRepo.findById(id);
  }

  async updateReservation(id, data) {
    return await this.reservationRepo.update(id, data);
  }

  async deleteReservation(id) {
    return await this.reservationRepo.deleteReservation(id);
  }
}
