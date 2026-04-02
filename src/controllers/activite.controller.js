import ActiviteRepository from "../repositories/activite.repo.js";
import ActiviteService from "../services/activite.service.js";

export default class ActiviteController {
  constructor() {
    this.activiteRepository = new ActiviteRepository();
    this.activiteService = new ActiviteService();
  }

  async getAllActivites(req, res) {
    try {
      const activites = await this.activiteRepository.findAll();
      return res.status(200).json(activites);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getActiviteById(req, res) {
    try {
      const { id } = req.params;
      const activite = await this.activiteRepository.findById(id);
      if (!activite) {
        return res.status(404).json({ message: "Activité non trouvée" });
      }
      return res.status(200).json(activite);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createActivite(req, res) {
    try {
      const newActivite = await this.activiteService.createActivite(req.body);
      return res.status(201).json(newActivite);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateActivite(req, res) {
    try {
      const { id } = req.params;
      const updatedActivite = await this.activiteService.updateActivite(id, req.body);
      return res.status(200).json(updatedActivite);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteActivite(req, res) {
    try {
      const { id } = req.params;
      await this.activiteService.deleteActivite(id);
      return res.status(200).json({ message: "Activité supprimée avec succès" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
