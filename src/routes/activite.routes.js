import express from "express";
import ActiviteController from "../controllers/activite.controller.js";
import validate from "../middlewares/validate.js";
import { createActiviteSchema } from "../validations/activite.schema.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

export default class ActiviteRoute {
  constructor() {
    this.router = express.Router();
    this.controller = new ActiviteController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", protect, this.controller.getAllActivites.bind(this.controller));
    this.router.get("/:id", protect, this.controller.getActiviteById.bind(this.controller));
    this.router.post("/", protect, authorize("ADMIN"), validate(createActiviteSchema), this.controller.createActivite.bind(this.controller));
    this.router.put("/:id", protect, authorize("ADMIN"), this.controller.updateActivite.bind(this.controller));
    this.router.delete("/:id", protect, authorize("ADMIN"), this.controller.deleteActivite.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
