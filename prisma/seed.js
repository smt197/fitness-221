import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed un coach
  await prisma.coach.create({
    data: {
      prenom: "Moussa",
      nom: "Diop",
      email: "moussa.diop@fitness221.sn",
      telephone: "771234567",
      specialite: "musculation",
    },
  });

  // Seed une activité
  await prisma.activite.create({
    data: {
      code: "ACT-001",
      nom: "Musculation",
      duree: 60,
      placesMax: 20,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
