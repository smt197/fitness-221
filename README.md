# Fitness 221 - Studio Management System

Ce projet est un système de gestion pour un studio de fitness, inspiré de l'architecture de **Ecole_Supérieure_221**.

## 🚀 Fonctionnalités principales

### 1. Gestion des Membres et du Staff
- **Coachs**: Gestion pour la planification des séances.
- **Abonnés**: Gestion des clients du studio.

### 2. Gestion des Activités
- **Activités**: Définition des séances de fitness (Musculation, Yoga, etc.) avec durée et capacité maximale.

### 3. Système de Réservation
- Réservation de séances par les abonnés.
- **Règles métier intelligentes**:
    - Validation de la disponibilité du coach (pas de double réservation).
    - Respect de la capacité maximale (`placesMax`) de l'activité.
    - Empêchement des doublons de réservation pour un même abonné.
    - Validation des dates (réservation uniquement dans le futur).

### 4. Sécurité JWT
- **Authentification**: Inscription et connexion sécurisées.
- **Protection des données**: Toutes les routes sensibles sont protégées par JWT.
- **Autorisation**: Les opérations administratives (création/modification) sont réservées au rôle `ADMIN`.

---

## 🛠️ Architecture

Le projet suit une architecture multicouche pour une maintenance facilitée:
- **Controllers**: Gestion des requêtes HTTP.
- **Services**: Logique métier et validations.
- **Repositories**: Interaction avec la base de données via **Prisma**.
- **Middlewares**: Gestion globale des erreurs, validation Zod et authentification.

### 📊 Diagramme de Relations (UML)

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
    }
    class Abonne {
        +Int id
        +String email
        +TypeAbonnement type
    }
    class Activite {
        +Int id
        +String code
        +Int placesMax
    }
    class Reservation {
        +Int id
        +DateTime dateHeure
        +StatutReservation statut
    }
    class User {
        +Int id
        +String email
        +Role role
    }
```

**Multiplicités :**
- **Coach (1) ↔ Reservation (*)** : Un coach peut superviser plusieurs réservations, mais une réservation est supervisée par un seul coach.
- **Abonné (1) ↔ Reservation (*)** : Un abonné peut effectuer plusieurs réservations, mais une réservation appartient à un seul abonné.
- **Activité (1) ↔ Reservation (*)** : Une activité peut faire l'objet de plusieurs réservations, mais une réservation concerne une seule activité.
- **User (1) ↔ Role (1)** : Un utilisateur possède un rôle unique (`ADMIN`, `COACH` ou `ABONNE`).

---

## ⚙️ Installation et Démarrage

1. **Installer les dépendances**:
   ```bash
   npm install
   ```

2. **Configurer l'environnement**:
   Créez un fichier `.env` à la racine (voir `.env.example` si disponible) avec:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `CLOUDINARY_URL` (optionnel)

3. **Générer le client Prisma**:
   ```bash
   npx prisma generate
   ```

4. **Exécuter les migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Lancer le serveur**:
   ```bash
   npm run dev
   ```

---

## 📚 Documentation API (Swagger)

La documentation interactive de l'API est disponible à l'adresse suivante (lorsque le serveur est lancé):
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🧪 Guide de Test Rapide (Auth)

1. **S'inscrire (Admin)**:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@fitness221.sn","password":"password123","role":"ADMIN"}'
   ```

2. **Se connecter**:
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@fitness221.sn","password":"password123"}'
   ```

3. **Accéder à une route protégée**:
   ```bash
   curl -H "Authorization: Bearer <VOTRE_TOKEN>" http://localhost:5000/api/coachs
   ```
