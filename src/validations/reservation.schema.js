import { z } from "zod";

export const createReservationSchema = z
  .object({
    abonneId: z.coerce.number().int().positive("abonneId invalide"),
    activiteId: z.coerce.number().int().positive("activiteId invalide"),
    coachId: z.coerce.number().int().positive("coachId invalide"),
    dateHeure: z.coerce.date(),
  })
  .refine((d) => d.dateHeure > new Date(), {
    message: "dateHeure doit être dans le futur",
    path: ["dateHeure"],
  });
