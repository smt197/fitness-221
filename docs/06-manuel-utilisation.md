# 06 - Manuel d'Utilisation et Développement

## 💻 Guide du Développeur (Local)
1. **Cloner le projet** : `git clone <repo-url>`
2. **Installer les dépendances** : `npm install`
3. **Configurer l'environnement** : Créer un fichier `.env` avec les accès PostgreSQL et JWT Secret.
4. **Prisma** :
    - `npx prisma generate` (pour mettre à jour le client).
    - `npx prisma migrate dev` (pour synchroniser le schéma).
5. **Lancer le serveur** : `npm run dev`

### 🌐 Exposition Publique Locale
Pour tester le Swagger ou l'API avec des collaborateurs depuis votre machine locale :
```bash
npm run tunnel
```
*Cela génère une URL HTTPS publique via Cloudflare.*

---

## 🚀 Guide du Déploiement (Production)
1. **Hébergement** : Déployer le dossier complet sur une instance **Dokploy**.
2. **Build** : Choisir le type **Dockerfile** dans l'interface Dokploy.
3. **Environment** : Saisir les variables `APP_URL`, `DATABASE_URL` et `CLOUDFLARE_TUNNEL_TOKEN`.
4. **Logs** : Surveillez l'onglet "Logs" pour confirmer le démarrage (`Server is running on port 5000`).

---

## 📚 Documentation de l'API (Swagger)
L'interface Swagger est le point de contrôle de l'application :
- **Adresse** : `http://votre-url/api-docs`
- **Authentification** :
    1. Connectez-vous via l'endpoint `/api/auth/login`.
    2. Récupérez le `token`.
    3. Cliquez sur le bouton "Authorize" dans Swagger et saisissez le token.

---
[Précédent : Infrastructure et Déploiement](./05-infrastructure-deploiement.md)
