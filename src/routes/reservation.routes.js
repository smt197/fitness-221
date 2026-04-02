import express from "express";
import ReservationController from "../controllers/reservation.controller.js";
import validate from "../middlewares/validate.js";
import { createReservationSchema } from "../validations/reservation.schema.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

export default class ReservationRoute {
  constructor() {
    this.router = express.Router();
    this.controller = new ReservationController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", protect, this.controller.getAllReservations.bind(this.controller));
    this.router.get("/:id", protect, this.controller.getReservationById.bind(this.controller));
    this.router.post("/", protect, validate(createReservationSchema), this.controller.createReservation.bind(this.controller));
    this.router.put("/:id", protect, this.controller.updateReservation.bind(this.controller));
    this.router.delete("/:id", protect, this.controller.deleteReservation.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}
