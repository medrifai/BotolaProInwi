const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

app.use(cors());
app.use(bodyParser.json());

app.use('/api', indexRouter);

app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname)));
app.use('/ressources', express.static('ressources'));
app.use('/webfonts', express.static('webfonts'));
app.use('/css', express.static('css'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.listen(3000, () => {
    console.log(`Serveur démarré sur http://localhost:3000`);
});
