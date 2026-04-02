import express from "express";
import AbonneController from "../controllers/abonne.controller.js";
import validate from "../middlewares/validate.js";
import { createAbonneSchema } from "../validations/abonne.schema.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

export default class AbonneRoute {
  constructor() {
    this.router = express.Router();
    this.controller = new AbonneController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", protect, this.controller.getAllAbonnes.bind(this.controller));
    this.router.get("/:id", protect, this.controller.getAbonneById.bind(this.controller));
    this.router.post("/", protect, authorize("ADMIN"), validate(createAbonneSchema), this.controller.createAbonne.bind(this.controller));
    this.router.put("/:id", protect, authorize("ADMIN"), this.controller.updateAbonne.bind(this.controller));
    this.router.delete("/:id", protect, authorize("ADMIN"), this.controller.deleteAbonne.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
