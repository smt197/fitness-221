import AuthService from "../services/auth.service.js";

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async register(req, res, next) {
    try {
      const user = await this.authService.registerUser(req.body);
      res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.loginUser(email, password);
      res.status(200).json({
        success: true,
        message: "Connexion réussie",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
