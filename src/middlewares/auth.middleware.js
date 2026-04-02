import jwt from "jsonwebtoken";
import userRepo from "../repositories/user.repo.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Accès refusé. Token manquant.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepo.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Accès refusé. Utilisateur non trouvé.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Accès refusé. Token invalide.",
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Accès refusé. Le rôle ${req.user.role} n'est pas autorisé pour cette opération.`,
      });
    }
    next();
  };
};
