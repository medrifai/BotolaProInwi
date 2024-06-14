const express = require('express');
const app = express();
const path = require('path');


const indexRouter = require('./routes/index');

// Utilisez vos routes Node.js
app.use('/api', indexRouter); 

app.use(express.static(path.join(__dirname, 'html')));
app.use('/ressources',express.static('ressources'));
app.use('/webfonts', express.static('webfonts'));
app.use('/css', express.static('css'));
// Démarrez le serveur
app.listen(3000, () => {
    console.log(`Serveur démarré sur http://localhost:3000`);
});
