const mysql = require('mysql2')
const dbConfig = {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'botolaproinwi'
};

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
    if(err){
        console.error('Erreur lors de la connexion avec la base de donnée : ',err);
        return;
    }
    console.log('Connecté à la base dedonnée MYSQL.');
});

module.exports = connection;