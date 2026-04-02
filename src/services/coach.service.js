import CoachRepository from "../repositories/coach.repo.js";

export default class CoachService {
  constructor() {
    this.coachRepository = new CoachRepository();
  }

  async createCoach(data) {
    return await this.coachRepository.create(data);
  }

  async updateCoach(id, data) {
    return await this.coachRepository.update(id, data);
  }

  async deleteCoach(id) {
    const coach = await this.coachRepository.findById(id);
    if (!coach) {
      const error = new Error(`Coach avec l'ID ${id} introuvable.`);
      error.statusCode = 404;
      throw error;
    }

    return await this.coachRepository.delete(id);
  }
}
