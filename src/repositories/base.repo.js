
class BaseRepo {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    return this.model.create({ data });
  }

  findById(id, args = {}) {
    return this.model.findUnique({ where: { id }, ...args });
  }

  findFirst(where, args = {}) {
    return this.model.findFirst({ where, ...args });
  }

  findMany(where = {}, args = {}) {
    return this.model.findMany({ where, ...args });
  }

  update(id, data) {
    return this.model.update({ where: { id }, data });
  }

  delete(id) {
    return this.model.delete({ where: { id } });
  }

  count(where = {}) {
    return this.model.count({ where });
  }
}

export default BaseRepo;
