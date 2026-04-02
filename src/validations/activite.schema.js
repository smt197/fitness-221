import { z } from "zod";

export const createActiviteSchema = z.object({
  code: z.string().trim().min(1, "Le code est obligatoire"),
  nom: z.string().trim().min(1, "Le nom est obligatoire"),
  duree: z.coerce.number().int().positive("La durée doit être un entier positif (> 0)"),
  placesMax: z.coerce.number().int().positive("placesMax doit être un entier positif (> 0)"),
});
