const express = require('express');
const router = express.Router();
const db = require('../db/connection');


router.get('/equipe',(req,res) => {
    db.query('SELECT * FROM equipe',(err,results) => {
        if(err){
            console.error('Erreur lors de la récupération des données :', err);
            return res.status(500).send('Erreur lors de la récupération des données');
        }
            res.json(results);
    });
});


module.exports = router;