const express = require('express');
const app = express();
const port = 8080;

const ejsMate = require("ejs-mate");
const path = require("path");

function capitalizeWords(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) =>{
    res.render('locals/index.ejs');
});

app.get('/Top_Actions', (req, res) =>{
    res.render('locals/action.ejs');
});

app.get('/Top_Comedy', (req, res) =>{
    res.render('locals/comedy.ejs');
});

app.get('/Top_Drama', (req, res) =>{
    res.render('locals/drama.ejs');
});

app.get('/Top_Fantasy', (req, res) =>{
    res.render('locals/fantasy.ejs');
});

app.get('/Top_Horror', (req, res) =>{
    res.render('locals/horror.ejs');
});

app.get('/Top_Mystery', (req, res) =>{
    res.render('locals/mystery.ejs');
});

app.get('/Top_Romance', (req, res) =>{
    res.render('locals/romance.ejs');
});

app.get('/Top_sci-fi', (req, res) =>{
    res.render('locals/sci-fi.ejs');
});

app.get('/Top_Thriller', (req, res) =>{
    res.render('locals/thriller.ejs');
});

app.get('/Top_Documentary', (req, res) =>{
    res.render('locals/documentary.ejs');
});

app.get('/Top_Animation', (req, res) =>{
    res.render('locals/animation.ejs');
});

app.get('/Top_Biographical', (req, res) =>{
    res.render('locals/biographical.ejs');
});

app.get('/Popular_Movies', (req, res) =>{
    res.render('api/popular.ejs');
});

app.get('/Upcoming_Movies', (req, res) =>{
    res.render('api/upcoming.ejs');
});

app.get('/Trending_Movies', (req, res) =>{
    res.render('api/trending.ejs');
});

app.get('/Top_Rated_Movies', (req, res) =>{
    res.render('api/toprated.ejs');
});

app.get('/Popular_Tv_Shows', (req, res) =>{
    res.render('api/populartv.ejs');
});

app.get('/On_Tv_Shows', (req, res) =>{
    res.render('api/ontv.ejs');
});

app.get('/Airing_Shows_Today', (req, res) =>{
    res.render('api/airing-today.ejs');
});

app.get('/Top_Rated_Shows', (req, res) =>{
    res.render('api/topratedtv.ejs');
});

app.get('/search_results', (req, res) => {
    let { q } = req.query || '';
    q = capitalizeWords(q).trim();
    res.render('api/search_results.ejs', { query: q });
});

app.get('/about', (req, res) =>{
    res.render('policies/about.ejs');
});

app.get('/contact', (req, res) =>{
    res.render('policies/contact.ejs');
});

app.get('/terms', (req, res) =>{
    res.render('policies/terms.ejs');
});

app.get('/privacy', (req, res) =>{
    res.render('policies/privacy.ejs');
});

app.listen(port, () =>{
    console.log(`server started at ${port}`);
});
