const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'votre_clé_secrète'; 
app.use(express.json());

// Définition des options Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de réservation de salle',
            version: '1.0.0',
            description: 'Une API pour réserver des salles.'
        }
    },
    apis: ['./app.js']
};

// Initialisation de Swagger
const specs = swaggerJsdoc(options);

// Configuration de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


//Gestion des utilisateurs
/**
 * @swagger
 * /utilisateurs:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               motDePasse:
 *                 type: string
 *             example:
 *               nom: "Cisse"
 *               prenom: "Marie"
 *               email: "Marie.Cisse@esp.com"
 *               motDePasse: "secret"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Email déjà utilisé
 *       500:
 *         description: Erreur lors de la création de l'utilisateur
 */
app.post('/utilisateurs', async (req, res) => {
    const { nom, prenom, email, motDePasse } = req.body;

    const existingUser = await prisma.utilisateur.findUnique({
        where: { email }
    });
    if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    try {
        const newUser = await prisma.utilisateur.create({
            data: {
                nom,
                prenom,
                email,
                motDePasse: hashedPassword
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});

/**
 * @swagger
 * /utilisateurs:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       500:
 *         description: Erreur lors de la récupération des utilisateurs
 */
app.get('/utilisateurs', async (req, res) => {
    try {
        const utilisateurs = await prisma.utilisateur.findMany();
        res.json(utilisateurs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

/**
 * @swagger
 * /utilisateurs/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la récupération de l'utilisateur
 */
app.get('/utilisateurs/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const utilisateur = await prisma.utilisateur.findUnique({
            where: { id: parseInt(id) }
        });
        if (!utilisateur) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(utilisateur);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
});


/**
 * @swagger
 * /salles:
 *   post:
 *     summary: Ajouter une nouvelle salle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               numero:
 *                 type: integer
 *               idUtilisateur:
 *                 type: integer
 *             example:
 *               nom: "Salle A"
 *               numero: 1
 *               idUtilisateur: 1
 *     responses:
 *       201:
 *         description: Salle ajoutée avec succès
 *       500:
 *         description: Erreur lors de l'ajout de la salle
 */
app.post('/salles', async (req, res) => {
    const { nom, numero, idUtilisateur } = req.body;

    try {
        const nouvelleSalle = await prisma.salle.create({
            data: {
                nom,
                numero,
                idUtilisateur
            }
        });
        res.status(201).json(nouvelleSalle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'ajout de la salle" });
    }
});

/**
 * @swagger
 * /salles:
 *   get:
 *     summary: Récupérer toutes les salles
 *     responses:
 *       200:
 *         description: Liste des salles récupérée avec succès
 *       500:
 *         description: Erreur lors de la récupération des salles
 */
app.get('/salles', async (req, res) => {
    try {
        const salles = await prisma.salle.findMany();
        res.json(salles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des salles' });
    }
});

//Gestion des salles

/**
 * @swagger
 * /salles/{id}:
 *   put:
 *     summary: Mettre à jour une salle par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la salle à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               numero:
 *                 type: integer
 *               idUtilisateur:
 *                 type: integer
 *             example:
 *               nom: "Nouveau nom de salle"
 *               numero: 3
 *               idUtilisateur: 2
 *     responses:
 *       200:
 *         description: Salle mise à jour avec succès
 *       404:
 *         description: Salle non trouvée
 *       500:
 *         description: Erreur lors de la mise à jour de la salle
 */
app.put('/salles/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, numero, idUtilisateur } = req.body;

    try {
        const salleMiseAJour = await prisma.salle.update({
            where: { id: parseInt(id) },
            data: {
                nom,
                numero,
                idUtilisateur
            }
        });
        res.json(salleMiseAJour);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la salle' });
    }
});

/**
 * @swagger
 * /salles/{id}:
 *   delete:
 *     summary: Supprimer une salle par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la salle à supprimer
 *     responses:
 *       200:
 *         description: Salle supprimée avec succès
 *       404:
 *         description: Salle non trouvée
 *       500:
 *         description: Erreur lors de la suppression de la salle
 */
app.delete('/salles/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.salle.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Salle supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la salle' });
    }
});


// Authentification
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Se connecter avec un email et un mot de passe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               motDePasse:
 *                 type: string
 *             example:
 *               email: "Marie.Cisse@esp.com"
 *               motDePasse: "secret"
 *     responses:
 *       200:
 *         description: Connexion réussie, token JWT retourné
 *       401:
 *         description: Identifiants invalides
 *       404:
 *         description: Utilisateur non trouvé
 */
app.post('/login', async (req, res) => {
    const { email, motDePasse } = req.body;

    const user = await prisma.utilisateur.findUnique({
        where: { email }
    });
    if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const passwordMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    res.json({ token });
});





app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

