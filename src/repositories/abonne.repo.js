import database from "../config/db.js";
import { BaseRepository } from "./BaseRepository.js";

export default class AbonneRepository extends BaseRepository {
  constructor() {
    super();
    this.db = database;
    this.model = this.db.getClient().abonne;
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
        throw new Error(`Un abonné avec l'email ${data.email} existe déjà.`);
      }
    }

    return await this.model.create({ data });
  }

  async update(id, data) {
    if (data.email) {
      const existing = await this.findByEmail(data.email);
      if (existing && existing.id !== parseInt(id)) {
        throw new Error(`Un abonné avec l'email ${data.email} existe déjà.`);
      }
    }

    return await this.model.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async delete(id) {
    const abonne = await this.model.findUnique({
      where: { id: parseInt(id) },
      include: { reservations: true },
    });

    if (!abonne) {
      throw new Error("Abonné non trouvé.");
    }

    if (abonne.reservations && abonne.reservations.length > 0) {
      throw new Error(
        "Impossible de supprimer cet abonné car il a des réservations.",
      );
    }

    return await this.model.delete({
      where: { id: parseInt(id) },
    });
  }
}
