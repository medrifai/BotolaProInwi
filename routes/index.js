const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');

// Route pour récupérer les équipes (GET)
router.get('/equipe', (req, res) => {
    db.query('SELECT * FROM equipe', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            return res.status(500).send('Erreur lors de la récupération des données');
        }
        res.json(results);
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Tous les champs sont requis' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            return res.status(500).json({ success: false, message: 'Erreur lors de la récupération des données' });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
        }

        const user = results[0];

        // Comparer les mots de passe
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
        }

        res.status(200).json({ success: true, message: 'Connexion réussie', user: { id: user.id, username: user.username, email: user.email, photo: user.profile_picture, country: user.country,
                         first_name: user.first_name,last_name: user.last_name,date_of_birth: user.date_of_birth,
                         phone: user.phone_number} 
                        });
    });
});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('Tous les champs sont requis');
    }

    // Hachez le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérez l'utilisateur dans la base de données
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
            console.error('Erreur lors de la création de l\'utilisateur :', err);
            return res.status(500).send('Erreur lors de la création de l\'utilisateur');
        }
        res.status(201).send('Utilisateur créé avec succès');
    });
});

const multer = require('multer');
const path = require('path');

// Configuration de multer pour gérer les fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // dossier où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // nom du fichier
    }
});

const upload = multer({ storage: storage });

// Route pour mettre à jour l'utilisateur
router.post('/updateUser', upload.single('photo'), (req, res) => {
    const { email, first_name, last_name, date_of_birth, country, phone_number } = req.body;
    const photo = req.file ? req.file.path : null;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    const query = `
        UPDATE users 
        SET first_name = ?, last_name = ?, date_of_birth = ?, country = ?, phone_number = ?, profile_picture = ?
        WHERE email = ?
    `;
    
    db.query(query, [first_name, last_name, date_of_birth, country, phone_number, photo, email], (err, results) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
            return res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
        }
        res.status(200).send('Utilisateur mis à jour avec succès');
    });
});


module.exports = router;
