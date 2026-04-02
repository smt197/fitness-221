import database from "../config/db.js";
import { BaseRepository } from "./BaseRepository.js";

export default class CoachRepository extends BaseRepository {
  constructor() {
    super();
    this.db = database;
    this.model = this.db.getClient().coach;
  }

  async findAll() {
    return await this.model.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id) {
    return await this.model.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async findByEmail(email) {
    return await this.model.findUnique({
      where: { email },
    });
  }

  async create(data) {
    // Vérifier unicité email
    if (data.email) {
      const existing = await this.findByEmail(data.email);
      if (existing) {
        throw new Error(`Un coach avec l'email ${data.email} existe déjà.`);
      }
    }

    return await this.model.create({ data });
  }

  async update(id, data) {
    if (data.email) {
      const existing = await this.findByEmail(data.email);
      if (existing && existing.id !== parseInt(id)) {
        throw new Error(`Un coach avec l'email ${data.email} existe déjà.`);
      }
    }

    return await this.model.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async delete(id) {
    const coach = await this.model.findUnique({
      where: { id: parseInt(id) },
      include: { reservations: { where: { statut: "RESERVEE" } } },
    });

    if (!coach) {
      throw new Error("Coach non trouvé.");
    }

    if (coach.reservations && coach.reservations.length > 0) {
      throw new Error(
        "Impossible de supprimer ce coach car il a des réservations RESERVEE.",
      );
    }

    return await this.model.delete({
      where: { id: parseInt(id) },
    });
  }
}
