import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import env from "./env.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fitness 221 API",
      version: "1.0.0",
      description: "API documentation for the FITNESS 221 Studio Management System",
      contact: {
        name: "Serigne Mbaye Thiam",
        email: "contact@fitness221.sn",
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://fitness-221.onrender.com'
          : 'http://localhost:5000'
      }
    ],
    components: {
      schemas: {
        Coach: {
          type: "object",
          required: ["prenom", "nom", "email", "specialite"],
          properties: {
            id: { type: "integer", example: 1 },
            prenom: { type: "string", example: "Moussa" },
            nom: { type: "string", example: "Diop" },
            email: { type: "string", example: "moussa.diop@fitness221.sn" },
            telephone: { type: "string", example: "771234567" },
            specialite: { type: "string", example: "musculation" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Abonne: {
          type: "object",
          required: ["prenom", "nom", "email", "dateInscription", "typeAbonnement"],
          properties: {
            id: { type: "integer", example: 1 },
            prenom: { type: "string", example: "Awa" },
            nom: { type: "string", example: "Ndiaye" },
            email: { type: "string", example: "awa.ndiaye@fitness221.sn" },
            telephone: { type: "string", example: "781234567" },
            dateInscription: { type: "string", format: "date", example: "2026-01-15" },
            typeAbonnement: { type: "string", enum: ["MENSUEL", "TRIMESTRIEL", "ANNUEL"], example: "MENSUEL" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Activite: {
          type: "object",
          required: ["code", "nom", "duree", "placesMax"],
          properties: {
            id: { type: "integer", example: 1 },
            code: { type: "string", example: "ACT-001" },
            nom: { type: "string", example: "Musculation" },
            duree: { type: "integer", example: 60, description: "Durée en minutes" },
            placesMax: { type: "integer", example: 20 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Reservation: {
          type: "object",
          required: ["abonneId", "activiteId", "coachId", "dateHeure"],
          properties: {
            id: { type: "integer", example: 1 },
            abonneId: { type: "integer", example: 1 },
            activiteId: { type: "integer", example: 1 },
            coachId: { type: "integer", example: 1 },
            dateHeure: { type: "string", format: "date-time" },
            statut: { type: "string", enum: ["RESERVEE", "EFFECTUEE", "ANNULEE"], example: "RESERVEE" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        User: {
          type: "object",
          required: ["email", "password"],
          properties: {
            id: { type: "integer", example: 1 },
            email: { type: "string", example: "admin@fitness221.sn" },
            role: { type: "string", enum: ["ADMIN", "COACH", "ABONNE"], example: "ADMIN" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Error message" },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/routes/*.js",
    "./src/controllers/*.js",
    "./src/config/swagger-annotation.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Fitness 221 API Docs",
    }),
  );

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export default swaggerSpec;
