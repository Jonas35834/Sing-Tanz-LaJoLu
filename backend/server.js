const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const songsRouter = require('./routes/songs');


const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


// Statische Bereitstellung von Uploads (für Player)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/songs', songsRouter);


// Root
app.get('/', (req, res) => {
res.json({ message: 'Family Music Backend läuft' });
});


app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
