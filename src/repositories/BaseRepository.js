/**
 * @interface BaseRepository
 */
export class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  async findAll() {
    throw new Error("Method 'findAll()' must be implemented.");
  }

  async findById(id) {
    throw new Error("Method 'findById(id)' must be implemented.");
  }

  async create(data) {
    throw new Error("Method 'create(data)' must be implemented.");
  }

  async update(id, data) {
    throw new Error("Method 'update(id, data)' must be implemented.");
  }

  async delete(id) {
    throw new Error("Method 'delete(id)' must be implemented.");
  }
}
