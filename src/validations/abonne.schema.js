import { z } from "zod";

export const createAbonneSchema = z
  .object({
    prenom: z.string().trim().min(2, "Prénom min 2 caractères"),
    nom: z.string().trim().min(2, "Nom min 2 caractères"),
    email: z.string().trim().email("Email invalide"),
    telephone: z.string().trim().optional(),
    dateInscription: z.coerce.date(),
    typeAbonnement: z.enum(["MENSUEL", "TRIMESTRIEL", "ANNUEL"], {
      errorMap: () => ({ message: "Type d'abonnement invalide (MENSUEL, TRIMESTRIEL, ANNUEL)" }),
    }),
  })
  .refine((d) => d.dateInscription <= new Date(), {
    message: "dateInscription ne peut pas être dans le futur",
    path: ["dateInscription"],
  });
