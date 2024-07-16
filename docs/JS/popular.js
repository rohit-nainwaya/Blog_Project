let url = 'https://api.themoviedb.org/3/movie/popular?api_key=2db5bc75c33eb661cc482365062fa0e5';

async function getPopular(){
    try{
        let res = await axios.get(url);
        let results = res.data.results;
        return results;
    }
    catch(e){
        let err = `error- ${e}`;
        return err;
    }
}

let movie_card = document.querySelector('.movie_card');
(async () => {
    let results = await getPopular();
    
    if (typeof results === 'string') {
        console.log(results); // Log the error
    } else {
        movie_card.innerHTML = ''; // Clear previous results if any
        for (let movie of results) {
            const mvCard = document.createElement('div');
            mvCard.className = 'mvCard card mb-3';
            mvCard.innerHTML = `<a href="#">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <a href="#"><h5 class="card-title">${movie.title}</h5></>
                    <p class="card-text">Release Date: ${movie.release_date}</p>
                </div>
                </a>
            `;
            movie_card.appendChild(mvCard);
        }
    }
})();

let mvName = document.querySelector('.mvCard a');
// mvName.addEventListener('click', )

let url2 = 'https://api.themoviedb.org/3/movie/1022789?api_key=2db5bc75c33eb661cc482365062fa0e5';
async function getDetails(){
    try{
        let res = await axios.get(url2);
        console.log(res);
    }
    catch(e){
        let err = `error- ${e}`;
        console.log(err);
    }
}