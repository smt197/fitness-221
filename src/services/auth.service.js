import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userRepo from "../repositories/user.repo.js";

export default class AuthService {
  constructor() {
    this.userRepo = userRepo;
    this.secret = process.env.JWT_SECRET;
  }

  async registerUser(payload) {
    const existing = await this.userRepo.findByEmail(payload.email);
    if (existing) {
      const error = new Error("Email déjà utilisé");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await this.userRepo.create({
      ...payload,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async loginUser(email, password) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      const error = new Error("Identifiants incorrects");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Identifiants incorrects");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.secret,
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }
}
