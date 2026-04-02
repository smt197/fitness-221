// src/config/db.js
import { PrismaClient } from "@prisma/client";

class Database {
  constructor() {
    if (!Database.instance) {
      this.client = new PrismaClient({
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "error"]
            : ["error"],
      });
      Database.instance = this;
    }
    return Database.instance;
  }

  getClient() {
    return this.client;
  }

  async connect() {
    await this.client.$connect();
  }

  async disconnect() {
    await this.client.$disconnect();
  }
}
const database = new Database();
export default database;
