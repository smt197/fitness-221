/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentification (Inscription / Connexion)
 *   - name: Coachs
 *     description: Gestion des coachs
 *   - name: Abonnés
 *     description: Gestion des abonnés
 *   - name: Activités
 *     description: Gestion des activités
 *   - name: Réservations
 *     description: Gestion des réservations
 */

// ========== AUTH ==========

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@fitness221.sn"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: [ADMIN, COACH, ABONNE]
 *                 example: "ADMIN"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 *       409:
 *         description: Email déjà utilisé
 *
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@fitness221.sn"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne le token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: "boolean" }
 *                 message: { type: "string" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     token: { type: "string" }
 *                     user: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Identifiants incorrects
 */

// ========== COACHS ==========

/**
 * @swagger
 * /api/coachs:
 *   get:
 *     summary: Récupérer tous les coachs
 *     tags: [Coachs]
 *     responses:
 *       200:
 *         description: Liste des coachs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coach'
 *   post:
 *     summary: Créer un coach
 *     tags: [Coachs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [prenom, nom, email, specialite]
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: "Moussa"
 *               nom:
 *                 type: string
 *                 example: "Diop"
 *               email:
 *                 type: string
 *                 example: "moussa.diop@fitness221.sn"
 *               telephone:
 *                 type: string
 *                 example: "771234567"
 *               specialite:
 *                 type: string
 *                 example: "musculation"
 *     responses:
 *       201:
 *         description: Coach créé avec succès
 *       400:
 *         description: Erreur de validation
 *
 * /api/coachs/{id}:
 *   get:
 *     summary: Récupérer un coach par ID
 *     tags: [Coachs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du coach
 *       404:
 *         description: Coach non trouvé
 *   put:
 *     summary: Modifier un coach
 *     tags: [Coachs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coach'
 *     responses:
 *       200:
 *         description: Coach modifié avec succès
 *       400:
 *         description: Erreur de validation
 *   delete:
 *     summary: Supprimer un coach
 *     tags: [Coachs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Coach supprimé avec succès
 *       400:
 *         description: Suppression impossible (réservations existantes)
 */

// ========== ABONNÉS ==========

/**
 * @swagger
 * /api/abonnes:
 *   get:
 *     summary: Récupérer tous les abonnés
 *     tags: [Abonnés]
 *     responses:
 *       200:
 *         description: Liste des abonnés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Abonne'
 *   post:
 *     summary: Créer un abonné
 *     tags: [Abonnés]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [prenom, nom, email, dateInscription, typeAbonnement]
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: "Awa"
 *               nom:
 *                 type: string
 *                 example: "Ndiaye"
 *               email:
 *                 type: string
 *                 example: "awa.ndiaye@fitness221.sn"
 *               telephone:
 *                 type: string
 *                 example: "781234567"
 *               dateInscription:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-15"
 *               typeAbonnement:
 *                 type: string
 *                 enum: [MENSUEL, TRIMESTRIEL, ANNUEL]
 *                 example: "MENSUEL"
 *     responses:
 *       201:
 *         description: Abonné créé avec succès
 *       400:
 *         description: Erreur de validation
 *
 * /api/abonnes/{id}:
 *   get:
 *     summary: Récupérer un abonné par ID
 *     tags: [Abonnés]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'abonné
 *       404:
 *         description: Abonné non trouvé
 *   put:
 *     summary: Modifier un abonné
 *     tags: [Abonnés]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Abonne'
 *     responses:
 *       200:
 *         description: Abonné modifié avec succès
 *       400:
 *         description: Erreur de validation
 *   delete:
 *     summary: Supprimer un abonné
 *     tags: [Abonnés]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Abonné supprimé avec succès
 *       400:
 *         description: Suppression impossible (réservations existantes)
 */

// ========== ACTIVITÉS ==========

/**
 * @swagger
 * /api/activites:
 *   get:
 *     summary: Récupérer toutes les activités
 *     tags: [Activités]
 *     responses:
 *       200:
 *         description: Liste des activités
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activite'
 *   post:
 *     summary: Créer une activité
 *     tags: [Activités]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, nom, duree, placesMax]
 *             properties:
 *               code:
 *                 type: string
 *                 example: "ACT-001"
 *               nom:
 *                 type: string
 *                 example: "Musculation"
 *               duree:
 *                 type: integer
 *                 example: 60
 *                 description: "Durée en minutes"
 *               placesMax:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       201:
 *         description: Activité créée avec succès
 *       400:
 *         description: Erreur de validation
 *
 * /api/activites/{id}:
 *   get:
 *     summary: Récupérer une activité par ID
 *     tags: [Activités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'activité
 *       404:
 *         description: Activité non trouvée
 *   put:
 *     summary: Modifier une activité
 *     tags: [Activités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activite'
 *     responses:
 *       200:
 *         description: Activité modifiée avec succès
 *       400:
 *         description: Erreur de validation
 *   delete:
 *     summary: Supprimer une activité
 *     tags: [Activités]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Activité supprimée avec succès
 *       400:
 *         description: Suppression impossible (réservations existantes)
 */

// ========== RÉSERVATIONS ==========

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations
 *     tags: [Réservations]
 *     responses:
 *       200:
 *         description: Liste des réservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *   post:
 *     summary: Créer une réservation
 *     tags: [Réservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [abonneId, activiteId, coachId, dateHeure]
 *             properties:
 *               abonneId:
 *                 type: integer
 *                 example: 1
 *               activiteId:
 *                 type: integer
 *                 example: 1
 *               coachId:
 *                 type: integer
 *                 example: 1
 *               dateHeure:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-01T10:00:00.000Z"
 *     responses:
 *       201:
 *         description: Réservation créée avec succès (statut = RESERVEE)
 *       400:
 *         description: Erreur de validation ou contrainte métier
 *
 * /api/reservations/{id}:
 *   get:
 *     summary: Récupérer une réservation par ID
 *     tags: [Réservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la réservation
 *       404:
 *         description: Réservation non trouvée
 *   put:
 *     summary: Modifier une réservation
 *     tags: [Réservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statut:
 *                 type: string
 *                 enum: [RESERVEE, EFFECTUEE, ANNULEE]
 *                 example: "EFFECTUEE"
 *     responses:
 *       200:
 *         description: Réservation modifiée avec succès
 *       400:
 *         description: Erreur de validation
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Réservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       404:
 *         description: Réservation non trouvée
 */
