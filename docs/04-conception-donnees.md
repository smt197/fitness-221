# 04 - Conception des Données

## 📊 Modèle de Données (Entities)
Le projet repose sur 4 entités principales interdépendantes :

1.  **User** : Identités, emails et rôles (`ADMIN`, `COACH`, `ABONNE`).
2.  **Coach** : Informations sur les instructeurs (Prénom, Nom, Spécialité).
3.  **Abonné** : Membres du studio avec leur type d'abonnement.
4.  **Activité** : Séances proposées (Yoga, Fitness, Musculation).
5.  **Réservation** : L'entité pivot liant un Abonné, un Coach et une Activité à une heure précise.

```mermaid
classDiagram
    Coach "1" -- "*" Reservation : supervise
    Abonne "1" -- "*" Reservation : effectue
    Activite "1" -- "*" Reservation : contient
    User o-- Role : possède

    class Coach {
        +Int id
        +String email
        +String specialite
        +DateTime createdAt
    }
    class Abonne {
        +Int id
        +String email
        +TypeAbonnement type
        +DateTime dateInscription
    }
    class Activite {
        +Int id
        +String code
        +Int placesMax
        +Int duree
    }
    class Reservation {
        +Int id
        +DateTime dateHeure
        +StatutReservation statut
    }
```

## 🛠️ Prisma ORM
Prisma est utilisé comme ORM (Object-Relational Mapper) pour interagir avec la base de données PostgreSQL. 
- **Type Safety** : Génération automatique d'un client TypeScript/JavaScript typé selon le schéma.
- **Migrations** : Gestion de l'évolution de la base de données avec `npx prisma migrate`.
- **Relations** : Gestion native des relations via les attributs `@relation` (ex: Reservation lie l'ID de l'abonné et de l'activité).

---
[Précédent : Architecture Logicielle](./03-architecture-logicielle.md) | [Suivant : Infrastructure et Déploiement](./05-infrastructure-deploiement.md)
