import express from "express";
import CoachController from "../controllers/coach.controller.js";
import validate from "../middlewares/validate.js";
import { createCoachSchema } from "../validations/coach.schema.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

export default class CoachRoute {
  constructor() {
    this.router = express.Router();
    this.controller = new CoachController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", protect, this.controller.getAllCoachs.bind(this.controller));
    this.router.get("/:id", protect, this.controller.getCoachById.bind(this.controller));
    this.router.post("/", protect, authorize("ADMIN"), validate(createCoachSchema), this.controller.createCoach.bind(this.controller));
    this.router.put("/:id", protect, authorize("ADMIN"), this.controller.updateCoach.bind(this.controller));
    this.router.delete("/:id", protect, authorize("ADMIN"), this.controller.deleteCoach.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
