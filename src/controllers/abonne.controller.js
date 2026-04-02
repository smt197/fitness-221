import AbonneRepository from "../repositories/abonne.repo.js";
import AbonneService from "../services/abonne.service.js";

export default class AbonneController {
  constructor() {
    this.abonneRepository = new AbonneRepository();
    this.abonneService = new AbonneService();
  }

  async getAllAbonnes(req, res) {
    try {
      const abonnes = await this.abonneRepository.findAll();
      return res.status(200).json(abonnes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAbonneById(req, res) {
    try {
      const { id } = req.params;
      const abonne = await this.abonneRepository.findById(id);
      if (!abonne) {
        return res.status(404).json({ message: "Abonné non trouvé" });
      }
      return res.status(200).json(abonne);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createAbonne(req, res) {
    try {
      const newAbonne = await this.abonneService.createAbonne(req.body);
      return res.status(201).json(newAbonne);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateAbonne(req, res) {
    try {
      const { id } = req.params;
      const updatedAbonne = await this.abonneService.updateAbonne(id, req.body);
      return res.status(200).json(updatedAbonne);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteAbonne(req, res) {
    try {
      const { id } = req.params;
      await this.abonneService.deleteAbonne(id);
      return res.status(200).json({ message: "Abonné supprimé avec succès" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
