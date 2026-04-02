import ReservationService from "../services/reservation.service.js";

export default class ReservationController {
  constructor() {
    this.reservationService = new ReservationService();
  }

  async getAllReservations(req, res) {
    try {
      const reservations = await this.reservationService.getAllReservations();
      return res.status(200).json(reservations);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getReservationById(req, res) {
    try {
      const { id } = req.params;
      const reservation = await this.reservationService.getReservationById(id);
      if (!reservation) {
        return res.status(404).json({ message: "Réservation non trouvée" });
      }
      return res.status(200).json(reservation);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createReservation(req, res) {
    try {
      const newReservation = await this.reservationService.createReservation(req.body);
      return res.status(201).json(newReservation);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateReservation(req, res) {
    try {
      const { id } = req.params;
      const updatedReservation = await this.reservationService.updateReservation(id, req.body);
      return res.status(200).json(updatedReservation);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteReservation(req, res) {
    try {
      const { id } = req.params;
      await this.reservationService.deleteReservation(id);
      return res.status(200).json({ message: "Réservation supprimée avec succès" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
