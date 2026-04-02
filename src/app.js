import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import Routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";


class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }


  initializeRoutes() {
    new Routes(this.app);
  }

  initializeSwagger() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  getApp() {
    return this.app;
  }
}

export default App;
