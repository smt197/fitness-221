// src/routes/index.js
import express from "express";
import AuthRoute from "./auth.routes.js";
import CoachRoute from "./coach.routes.js";
import AbonneRoute from "./abonne.routes.js";
import ActiviteRoute from "./activite.routes.js";
import ReservationRoute from "./reservation.routes.js";

export default class Routes {
  constructor(app) {
    this.app = app;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Bienvenue sur l'API de gestion du studio FITNESS 221 !");
    });

    // Auth
    this.app.use("/api/auth", AuthRoute);

    // Coachs
    const coachRoute = new CoachRoute();
    this.app.use("/api/coachs", coachRoute.getRouter());

    // Abonnés
    const abonneRoute = new AbonneRoute();
    this.app.use("/api/abonnes", abonneRoute.getRouter());

    // Activités
    const activiteRoute = new ActiviteRoute();
    this.app.use("/api/activites", activiteRoute.getRouter());

    // Réservations
    const reservationRoute = new ReservationRoute();
    this.app.use("/api/reservations", reservationRoute.getRouter());
  }
}
