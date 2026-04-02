import AbonneRepository from "../repositories/abonne.repo.js";

export default class AbonneService {
  constructor() {
    this.abonneRepository = new AbonneRepository();
  }

  async createAbonne(data) {
    return await this.abonneRepository.create(data);
  }

  async updateAbonne(id, data) {
    return await this.abonneRepository.update(id, data);
  }

  async deleteAbonne(id) {
    const abonne = await this.abonneRepository.findById(id);
    if (!abonne) {
      const error = new Error(`Abonné avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }

    return await this.abonneRepository.delete(id);
  }
}
