import CoachRepository from "../repositories/coach.repo.js";
import CoachService from "../services/coach.service.js";

export default class CoachController {
  constructor() {
    this.coachRepository = new CoachRepository();
    this.coachService = new CoachService();
  }

  async getAllCoachs(req, res) {
    try {
      const coachs = await this.coachRepository.findAll();
      return res.status(200).json(coachs);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getCoachById(req, res) {
    try {
      const { id } = req.params;
      const coach = await this.coachRepository.findById(id);
      if (!coach) {
        return res.status(404).json({ message: "Coach non trouvé" });
      }
      return res.status(200).json(coach);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createCoach(req, res) {
    try {
      const newCoach = await this.coachService.createCoach(req.body);
      return res.status(201).json(newCoach);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateCoach(req, res) {
    try {
      const { id } = req.params;
      const updatedCoach = await this.coachService.updateCoach(id, req.body);
      return res.status(200).json(updatedCoach);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteCoach(req, res) {
    try {
      const { id } = req.params;
      await this.coachService.deleteCoach(id);
      return res.status(200).json({ message: "Coach supprimé avec succès" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
