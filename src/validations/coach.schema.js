import { z } from "zod";

export const createCoachSchema = z.object({
  prenom: z.string().trim().min(2, "Prénom min 2 caractères"),
  nom: z.string().trim().min(2, "Nom min 2 caractères"),
  email: z.string().trim().email("Email invalide"),
  telephone: z.string().trim().optional(),
  specialite: z.string().trim().min(1, "La spécialité est obligatoire"),
});
