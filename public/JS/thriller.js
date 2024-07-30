const movieData = {
    theDeparted: {
        title: "The Departed (2006)",
        description: "The Departed is a gripping crime thriller directed by Martin Scorsese and starring Leonardo DiCaprio, Matt Damon, and Jack Nicholson. Set in Boston, the film revolves around an undercover cop, Billy Costigan, who infiltrates the Irish mob, and a mole within the police force, Colin Sullivan, who feeds information to the mob boss Frank Costello. As both sides race to uncover the identity of the other, tensions rise, leading to a dramatic climax of betrayal and violence. The Departed is praised for its intricate plot, sharp dialogue, and powerhouse performances, earning it four Academy Awards, including Best Picture and Best Director.",
        trailer: "https://www.youtube.com/embed/SGWvwjZ0eDc",
        ott: "https://www.primevideo.com/detail/The-Departed/0R9B4VS2TJGIDJO7D60W9Y12XK",
        cast: [
            { name: "Leonardo DiCaprio", role: "Billy Costigan", img: "/assets/thriller/Leonardo_DiCaprio.jpg" },
            { name: "Matt Damon", role: "Colin Sullivan", img: "/assets/thriller/Matt_Damon.jpg" },
            { name: "Jack Nicholson", role: "Frank Costello", img: "/assets/thriller/Jack_Nicholson.jpg" }
        ]
    },
    noCountryForOldMen: {
        title: "No Country for Old Men (2007)",
        description: "No Country for Old Men is a neo-western crime thriller directed by Joel and Ethan Coen, based on Cormac McCarthy's novel of the same name. Set in West Texas during the early 1980s, the film follows the aftermath of a botched drug deal and the violent chain of events it sets in motion. The story centers on Llewelyn Moss, a welder who stumbles upon the aftermath of the deal and decides to take the money for himself, sparking a cat-and-mouse game with a ruthless hitman named Anton Chigurh. No Country for Old Men is praised for its stark cinematography, tense atmosphere, and Javier Bardem's chilling performance as Chigurh, which earned him an Academy Award for Best Supporting Actor.",
        trailer: "https://www.youtube.com/embed/38A__WT3-o0",
        ott: "https://www.primevideo.com/detail/No-Country-for-Old-Men/0IVBKTOBBF85AT6ZKLMJL6NMO3",
        cast: [
            { name: "Tommy Lee Jones", role: "Sheriff Ed Tom Bell", img: "/assets/thriller/Tommy_Lee_Jones.jpg" },
            { name: "Javier Bardem", role: "Anton Chigurh", img: "/assets/thriller/Javier_Bardem.jpg" },
            { name: "Josh Brolin", role: "Llewelyn Moss", img: "/assets/thriller/Josh_Brolin.jpg" }
        ]
    },
    thePrestige: {
        title: "The Prestige (2006)",
        description: "The Prestige is a mystery thriller directed by Christopher Nolan and based on Christopher Priest's novel of the same name. Set in London in the late 19th century, the film follows rival magicians Robert Angier and Alfred Borden as they engage in a bitter feud to create the ultimate illusion. The story explores themes of obsession, sacrifice, and deception, with twists and turns that keep the audience guessing until the final reveal. The Prestige is praised for its intricate plot structure, stellar performances from Hugh Jackman and Christian Bale, and its exploration of the nature of magic and illusion.",
        trailer: "https://www.youtube.com/embed/A706FUW1FIc",
        ott: "https://www.netflix.com/in/title/70044680",
        cast: [
            { name: "Hugh Jackman", role: "Robert Angier", img: "/assets/thriller/Hugh_Jackman.jpg" },
            { name: "Christian Bale", role: "Alfred Borden", img: "/assets/thriller/Christian_Bale.jpg" },
            { name: "Michael Caine", role: "Cutter", img: "/assets/thriller/Michael_Caine.jpg" }
        ]
    },
    theSixthSense: {
        title: "The Sixth Sense (1999)",
        description: "The Sixth Sense is a supernatural psychological thriller directed by M. Night Shyamalan and starring Bruce Willis and Haley Joel Osment. The film follows child psychologist Dr. Malcolm Crowe as he tries to help a young boy named Cole Sear who claims to see dead people. As Dr. Crowe delves deeper into Cole's world, he discovers unsettling truths about the boy's abilities and his own past. The Sixth Sense is renowned for its suspenseful atmosphere, clever twist ending, and Osment's poignant performance as Cole, earning multiple Academy Award nominations and becoming a cultural touchstone for psychological thrillers.",
        trailer: "https://www.youtube.com/embed/VG9AGf66tXM",
        ott: "https://www.netflix.com/in/title/60022584",
        cast: [
            { name: "Bruce Willis", role: "Dr. Malcolm Crowe", img: "/assets/thriller/Bruce_Willis.jpg" },
            { name: "Haley Joel Osment", role: "Cole Sear", img: "/assets/thriller/Haley_Joel_Osment.jpg" }
        ]
    },
    heat: {
        title: "Heat (1995)",
        description: "Heat is a crime thriller directed by Michael Mann and starring Al Pacino and Robert De Niro. Set in Los Angeles, the film follows the cat-and-mouse game between LAPD Detective Vincent Hanna and master thief Neil McCauley. As McCauley plans one last heist before retiring, Hanna becomes obsessed with catching him, leading to a gripping showdown between the two men. Heat is praised for its realistic portrayal of crime and law enforcement, intense action sequences, and the electrifying on-screen chemistry between Pacino and De Niro, who share a scene together for the first time in their careers.",
        trailer: "https://www.youtube.com/embed/0xbBLJ1WGwQ",
        ott: "https://www.primevideo.com/detail/Heat/0SXK5RU8UNN4TEYR36OZ0VIQ4C",
        cast: [
            { name: "Al Pacino", role: "Vincent Hanna", img: "/assets/thriller/Al_Pacino.jpg" },
            { name: "Robert De Niro", role: "Neil McCauley", img: "/assets/thriller/Robert_De_Niro.jpg" }
        ]
    },
};

function showMovieDetails(movieId) {
    const movie = movieData[movieId];
    if (movie) {
        document.getElementById('movieTitle').textContent = movie.title;
        document.getElementById('movieDescription').textContent = movie.description;
        document.getElementById('movieTrailer').src = movie.trailer;
        document.getElementById('ottLink').href = movie.ott;

        const castList = document.getElementById('castList');
        castList.innerHTML = '';

        movie.cast.forEach(cast => {
            const castCard = document.createElement('div');
            castCard.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');
            castCard.innerHTML = `
                <div class="card text-white bg-dark">
                    <img data-src="${cast.img}" class="card-img-top lazy" alt="${cast.name}">
                    <div class="card-body">
                        <h5 class="card-title">${cast.name}</h5>
                        <p class="card-text">Role: ${cast.role}</p>
                    </div>
                </div>
            `;
            castList.appendChild(castCard);
        });

        // Lazy load images
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.classList.remove('lazy');
            img.classList.add('lazy-loaded');
        });

        document.getElementById('movieDetails').classList.remove('hidden');
        document.getElementById('movieList').classList.add('hidden');
    }
};

function goBack() {
    document.getElementById('movieDetails').classList.add('hidden');
    document.getElementById('movieList').classList.remove('hidden');
};
