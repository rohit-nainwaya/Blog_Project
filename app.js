const express = require('express');
const app = express();
const port = 8080;

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.get('/rohit-nainwaya.github.io/Blog_Project/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/action', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'action.html'));
});

app.get('/comedy', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'comedy.html'));
});

app.get('/drama', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'drama.html'));
});

app.get('/fantasy', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'fantasy.html'));
});

app.get('/horror', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'horror.html'));
});

app.get('/mystery', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'mystery.html'));
});

app.get('/romance', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'romance.html'));
});

app.get('/adult', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'adult.html'));
});

app.get('/sci-fi', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'sci-fi.html'));
});

app.get('/thriller', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'thriller.html'));
});

app.get('/documentary', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'documentary.html'));
});

app.get('/animation', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'animation.html'));
});

app.get('/musical', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'musical.html'));
});

app.get('/western', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'western.html'));
});

app.get('/biographical', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'biographical.html'));
});

app.listen(port, () =>{
    console.log(`server started at ${port}`);
});
