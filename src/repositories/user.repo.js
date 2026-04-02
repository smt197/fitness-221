import database from "../config/db.js";
import BaseRepo from "./base.repo.js";

const prisma = database.getClient();

export class UserRepo extends BaseRepo {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email) {
    return this.model.findUnique({ where: { email } });
  }

  async create(data) {
    return this.model.create({ data });
  }

  async findById(id) {
    return this.model.findUnique({ where: { id: parseInt(id) } });
  }
}
export default new UserRepo();
