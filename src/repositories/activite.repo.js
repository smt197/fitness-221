import database from "../config/db.js";
import { BaseRepository } from "./BaseRepository.js";

export default class ActiviteRepository extends BaseRepository {
  constructor() {
    super();
    this.db = database;
    this.model = this.db.getClient().activite;
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

  validateActivite(data) {
    if (data.duree !== undefined) {
      const duree = Number(data.duree);
      if (!Number.isInteger(duree) || duree <= 0) {
        throw new Error("La durée doit être un entier positif (> 0).");
      }
    }

    if (data.placesMax !== undefined) {
      const placesMax = Number(data.placesMax);
      if (!Number.isInteger(placesMax) || placesMax <= 0) {
        throw new Error("Le nombre de places max doit être un entier positif (> 0).");
      }
    }
  }

  async create(data) {
    this.validateActivite(data);

    if (data.code) {
      const existing = await this.model.findUnique({
        where: { code: data.code },
      });
      if (existing) {
        throw new Error(`Une activité avec le code ${data.code} existe déjà.`);
      }
    }

    return await this.model.create({ data });
  }

  async update(id, data) {
    this.validateActivite(data);

    if (data.code) {
      const existing = await this.model.findUnique({
        where: { code: data.code },
      });
      if (existing && existing.id !== parseInt(id)) {
        throw new Error(`Une activité avec le code ${data.code} existe déjà.`);
      }
    }

    return await this.model.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async delete(id) {
    const activite = await this.model.findUnique({
      where: { id: parseInt(id) },
      include: { reservations: true },
    });

    if (!activite) {
      throw new Error("Activité non trouvée.");
    }

    if (activite.reservations && activite.reservations.length > 0) {
      throw new Error(
        "Impossible de supprimer cette activité car des réservations existent.",
      );
    }

    return await this.model.delete({
      where: { id: parseInt(id) },
    });
  }
}
