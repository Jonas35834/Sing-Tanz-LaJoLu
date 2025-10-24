const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const DB_FILE = path.join(__dirname, '..', 'songs.json');


// Sicherstellen, dass Ordner & DB existieren
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]));


const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, UPLOAD_DIR),
filename: (req, file, cb) => {
// safe filename: uuid + origin name
const ext = path.extname(file.originalname);
cb(null, `${uuidv4()}${ext}`);
}
});


const upload = multer({
storage,
limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max
fileFilter: (req, file, cb) => {
const allowed = /audio|mpeg|mp3|wav/;
if (allowed.test(file.mimetype) || allowed.test(path.extname(file.originalname))) cb(null, true);
else cb(new Error('Nur Audio-Dateien erlaubt'));
}
});


// GET /api/songs -> Liste aller Songs
router.get('/', (req, res) => {
const data = JSON.parse(fs.readFileSync(DB_FILE));
res.json(data);
});


// POST /api/songs/upload -> Upload eines Songs
router.post('/upload', upload.single('audio'), (req, res) => {
try {
const { title = 'Unbenannt', artist = 'Unbekannt', description = '' } = req.body;
const file = req.file;
if (!file) return res.status(400).json({ error: 'Keine Datei hochgeladen' });


const songs = JSON.parse(fs.readFileSync(DB_FILE));
const newSong = {
id: uuidv4(),
title,
artist,
description,
filename: file.filename,
url: `/uploads/${file.filename}`,
originalName: file.originalname,
size: file.size,
uploadedAt: new Date().toISOString()
};


songs.unshift(newSong);
fs.writeFileSync(DB_FILE, JSON.stringify(songs, null, 2));


res.json(newSong);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Upload fehlgeschlagen' });
}
});


module.exports = router;
