const express = require('express');
const app = express();
const port = 8080;

const path = require("path");
app.use(express.static(path.join(__dirname, 'docs')));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.get('/Top_Actions', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'action.html'));
});

app.get('/Top_Comedy', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'comedy.html'));
});

app.get('/Top_Drama', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'drama.html'));
});

app.get('/Top_Fantasy', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'fantasy.html'));
});

app.get('/Top_Horror', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'horror.html'));
});

app.get('/Top_Mystery', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'mystery.html'));
});

app.get('/Top_Romance', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'romance.html'));
});

app.get('/Top_sci-fi', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'sci-fi.html'));
});

app.get('/Top_Thriller', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'thriller.html'));
});

app.get('/Top_Documentary', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'documentary.html'));
});

app.get('/Top_Animation', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'animation.html'));
});

app.get('/Top_Musical', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'musical.html'));
});

app.get('/Top_Western', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'western.html'));
});

app.get('/Top_Biographical', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'biographical.html'));
});

app.get('/Popular_Movies', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'popular.html'));
});

app.get('/Upcoming_Movies', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'upcoming.html'));
});

app.get('/Trending_Movies', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'trending.html'));
});

app.get('/Top_Rated_Movies', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'toprated.html'));
});

app.get('/Popular_Tv_Shows', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'populartv.html'));
});

app.get('/On_Tv_Shows', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'ontv.html'));
});

app.get('/Airing_Shows_Today', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'airing-today.html'));
});

app.get('/Top_Rated_Shows', (req, res) =>{
    res.sendFile(path.join(__dirname, 'docs', 'topratedtv.html'));
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
