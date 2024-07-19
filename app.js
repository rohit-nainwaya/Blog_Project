const express = require('express');
const app = express();
const port = 8080;

const path = require("path");
app.use(express.static(path.join(__dirname, 'docs')));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.get('/action', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'action.html'));
});

app.get('/comedy', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'comedy.html'));
});

app.get('/drama', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'drama.html'));
});

app.get('/fantasy', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'fantasy.html'));
});

app.get('/horror', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'horror.html'));
});

app.get('/mystery', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'mystery.html'));
});

app.get('/romance', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'romance.html'));
});

app.get('/adult', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'adult.html'));
});

app.get('/sci-fi', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'sci-fi.html'));
});

app.get('/thriller', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'thriller.html'));
});

app.get('/documentary', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'documentary.html'));
});

app.get('/animation', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'animation.html'));
});

app.get('/musical', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'musical.html'));
});

app.get('/western', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'western.html'));
});

app.get('/biographical', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'biographical.html'));
});

app.get('/popular', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'popular.html'));
});

app.get('/about', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'about.html'));
});

app.get('/contact', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'contact.html'));
});

app.get('/terms', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'terms.html'));
});

app.get('/privacy', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'privacy.html'));
});

app.listen(port, () =>{
    console.log(`server started at ${port}`);
});
