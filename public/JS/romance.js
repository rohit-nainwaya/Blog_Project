// Geolocation fallback for IP-based location detection
async function getCountryByIP() {
    try {
        let res = await axios.get('https://ipapi.co/json/');
        return res.data.country_code;
    } catch (e) {
        console.error('Error fetching IP location:', e);
        return 'US'; // Default to US if there's an error
    }
}

const movieData = {
    casablanca: {
        title: "Casablanca (1942)",
        description: "Casablanca is an iconic romantic drama directed by Michael Curtiz, starring Humphrey Bogart and Ingrid Bergman. Set against the backdrop of World War II, the film follows Rick Blaine, a cynical American expatriate who runs a nightclub in Casablanca, Morocco. Rick's life is turned upside down when his former lover, Ilsa Lund, walks into his club with her husband, Victor Laszlo, a Czech resistance leader. Ilsa's unexpected appearance rekindles old flames and forces Rick to confront his past. As tensions rise, Rick must choose between his love for Ilsa and his commitment to a higher cause. Casablanca is celebrated for its memorable dialogue, complex characters, and the timeless theme of love and sacrifice. The film's iconic lines and the unforgettable romance between Rick and Ilsa have cemented its status as a cinematic masterpiece.",
        trailer: "https://www.youtube.com/embed/BkL9l7qovsE",
        ott: "https://www.primevideo.com/detail/Casablanca-1942/0TMV6OAYY9R6M97JDGPDCU35TO",
        cast: [
            { name: "Humphrey Bogart", role: "Rick Blaine", img: "/assets/romance/Humphrey_Bogart.jpg" },
            { name: "Ingrid Bergman", role: "Ilsa Lund", img: "/assets/romance/Ingrid_Bergman.jpg" },
        ]
    },
    titanic: {
        title: "Titanic (1997)",
        description: "Titanic is a romantic disaster film directed by James Cameron, starring Leonardo DiCaprio and Kate Winslet. The film tells the story of Jack Dawson, a poor artist, and Rose DeWitt Bukater, a wealthy young woman, who meet and fall in love aboard the ill-fated RMS Titanic. Despite the vast differences in their social classes, Jack and Rose's love blossoms amidst the opulence of the ship. However, their romance is threatened by Rose's oppressive fiancé, Cal Hockley, and the impending disaster as the Titanic strikes an iceberg. The film seamlessly blends romance and tragedy, capturing the grandeur of the ship and the intense emotions of its passengers. Titanic was a monumental success, winning 11 Academy Awards, including Best Picture and Best Director. Its heart-wrenching love story and the spectacular visual effects have made it one of the most beloved films of all time.",
        trailer: "https://www.youtube.com/embed/kVrqfYjkTdQ",
        ott: "https://www.hotstar.com/in/movies/titanic/1770001166",
        cast: [
            { name: "Leonardo DiCaprio", role: "Jack Dawson", img: "/assets/romance/Leonardo_DiCaprio.jpg" },
            { name: "Kate Winslet", role: "Rose DeWitt Bukater", img: "/assets/romance/Kate_Winslet.jpg" },
        ]
    },
    prideAndPrejudice: {
        title: "Pride and Prejudice (2005)",
        description: "Pride and Prejudice is a romantic drama film directed by Joe Wright, based on Jane Austen's classic novel. Starring Keira Knightley as Elizabeth Bennet and Matthew Macfadyen as Mr. Darcy, the film explores themes of love, class, and family. Elizabeth, a sharp-witted young woman, navigates societal expectations and familial pressures while grappling with her growing feelings for the aloof yet honorable Mr. Darcy. Their initial misunderstandings and prejudices give way to a deeper understanding and mutual respect. Set in the early 19th century, the film beautifully captures the period's elegance and social dynamics through stunning cinematography and meticulous attention to detail. Knightley's portrayal of Elizabeth is both spirited and nuanced, earning her critical acclaim. Pride and Prejudice is a timeless love story that resonates with audiences for its wit, charm, and insight into human nature.",
        trailer: "https://www.youtube.com/embed/1dYv5u6v55Y",
        ott: "https://www.netflix.com/in/title/70032594",
        cast: [
            { name: "Keira Knightley", role: "Elizabeth Bennet", img: "/assets/romance/Keira_Knightley.jpg" },
            { name: "Matthew Macfadyen", role: "Mr. Darcy", img: "/assets/romance/Matthew_Macfadyen.jpg" },
        ]
    },
    theNotebook: {
        title: "The Notebook (2004)",
        description: "The Notebook is a romantic drama film directed by Nick Cassavetes, based on Nicholas Sparks' novel. It stars Ryan Gosling and Rachel McAdams as Noah Calhoun and Allie Hamilton, two young lovers from different social backgrounds. The film alternates between their passionate summer romance in the 1940s and their lives in the present day, where an elderly Noah reads their love story to Allie, who suffers from Alzheimer's disease. Despite facing numerous obstacles, including societal expectations and Allie's disapproving family, their love endures. The Notebook is renowned for its heartfelt performances, particularly the chemistry between Gosling and McAdams. Its portrayal of enduring love and the power of memory resonates deeply with audiences. The film's poignant narrative and emotional depth make it a beloved classic in the romance genre.",
        trailer: "https://www.youtube.com/embed/FC6biTjEyZw",
        ott: "https://www.netflix.com/in/title/60036227",
        cast: [
            { name: "Ryan Gosling", role: "Noah Calhoun", img: "/assets/romance/Ryan_Gosling.jpg" },
            { name: "Rachel McAdams", role: "Allie Hamilton", img: "/assets/romance/Rachel_McAdams.jpg" },
        ]
    },
    laLaLand: {
        title: "La La Land (2016)",
        description: "La La Land is a modern romantic musical film directed by Damien Chazelle, starring Ryan Gosling and Emma Stone. The film follows the intertwined lives of Sebastian, a jazz musician, and Mia, an aspiring actress, as they pursue their dreams in Los Angeles. Their romance blossoms amidst the vibrant and often harsh realities of the entertainment industry. As they support each other's ambitions, they also face challenges that test their relationship. La La Land is a homage to classic Hollywood musicals, featuring dazzling dance sequences, an enchanting score, and vivid cinematography. The film explores themes of love, ambition, and the sacrifices made in pursuit of artistic fulfillment. Gosling and Stone's performances are magnetic, earning them critical acclaim and multiple awards. La La Land's blend of nostalgia and contemporary storytelling makes it a standout in modern cinema.",
        trailer: "https://www.youtube.com/embed/0pdqf4P9MB8",
        ott: "https://www.airtelxstream.in/movies/la-la-land/LIONSGATEPLAY_MOVIE_LALALANDY2016M",
        cast: [
            { name: "Ryan Gosling", role: "Sebastian", img: "/assets/romance/Ryan_Gosling.jpg" },
            { name: "Emma Stone", role: "Mia", img: "/assets/romance/Emma_Stone.jpg" },
        ]
    },
    goneWithTheWind: {
        title: "Gone with the Wind (1939)",
        description: "Gone with the Wind is an epic historical romance film directed by Victor Fleming, based on Margaret Mitchell's novel. It stars Clark Gable as Rhett Butler and Vivien Leigh as Scarlett O'Hara. The film is set in the American South during the Civil War and Reconstruction era, following the life of Scarlett, a strong-willed woman determined to survive and thrive despite the turmoil around her. Her complicated relationship with the charming but roguish Rhett forms the core of the story. Gone with the Wind is renowned for its grand scale, lush cinematography, and memorable performances. It explores themes of love, loss, and resilience, with Scarlett's indomitable spirit embodying the struggle and transformation of the South. The film won numerous Academy Awards, including Best Picture, and remains a cinematic landmark for its epic storytelling and cultural impact.",
        trailer: "https://www.youtube.com/embed/0X94oZgJis4",
        ott: "https://www.primevideo.com/detail/Gone-with-the-Wind/0G9HB83IB5WBITVE3MN9U23COE",
        cast: [
            { name: "Clark Gable", role: "Rhett Butler", img: "/assets/romance/Clark_Gable.jpg" },
            { name: "Vivien Leigh", role: "Scarlett O'Hara", img: "/assets/romance/Vivien_Leigh.jpg" },
        ]
    },
    eternalSunshine: {
        title: "Eternal Sunshine of the Spotless Mind (2004)",
        description: "Eternal Sunshine of the Spotless Mind is a surreal romantic drama directed by Michel Gondry, starring Jim Carrey and Kate Winslet. The film explores the relationship between Joel Barish and Clementine Kruczynski, who undergo a procedure to erase each other from their memories after a painful breakup. As the procedure unfolds, Joel realizes he still loves Clementine and attempts to preserve his memories of her. The film's non-linear narrative and dreamlike sequences delve into the complexities of memory, love, and identity. Eternal Sunshine is praised for its innovative storytelling, emotional depth, and the standout performances of Carrey and Winslet. The film challenges traditional notions of romance and offers a poignant reflection on the nature of relationships and the indelible impact they leave on our lives.",
        trailer: "https://www.youtube.com/embed/07-QBnEkgXU",
        ott: "https://www.primevideo.com/detail/Eternal-Sunshine-of-the-Spotless-Mind/0FH2D94YJR532I78A4RBSNDLBN",
        cast: [
            { name: "Jim Carrey", role: "Joel Barish", img: "/assets/romance/Jim_Carrey.jpg" },
            { name: "Kate Winslet", role: "Clementine Kruczynski", img: "/assets/romance/Kate_Winslet.jpg" },
        ]
    },
    whenHarryMetSally: {
        title: "When Harry Met Sally (1989)",
        description: "When Harry Met Sally is a romantic comedy directed by Rob Reiner, starring Billy Crystal and Meg Ryan. The film follows the evolving relationship between Harry Burns and Sally Albright, who meet by chance and debate whether men and women can be just friends. Over the years, their paths cross repeatedly, and they develop a deep friendship that gradually turns into love. The film is celebrated for its witty dialogue, sharp insights into relationships, and the chemistry between Crystal and Ryan. The famous deli scene and the line 'I'll have what she's having' have become iconic in popular culture. When Harry Met Sally explores the nuances of friendship and romance, capturing the complexities and joys of finding love with someone who understands and accepts you completely.",
        trailer: "https://www.youtube.com/embed/-E10AcydCuk",
        ott: "https://www.primevideo.com/detail/When-Harry-Met-Sally/0RTWG8Y8X8GRX9E6NLYE9CN7EX",
        cast: [
            { name: "Billy Crystal", role: "Harry Burns", img: "/assets/romance/Billy_Crystal.jpg" },
            { name: "Meg Ryan", role: "Sally Albright", img: "/assets/romance/Meg_Ryan.jpg" },
        ]
    },
    romanHoliday: {
        title: "Roman Holiday (1953)",
        description: "Roman Holiday is a romantic comedy directed by William Wyler, starring Audrey Hepburn and Gregory Peck. The film follows Princess Ann, a young royal who escapes her official duties for a day of adventure in Rome. Disguised as a commoner, she meets Joe Bradley, an American journalist who recognizes her but pretends to be unaware of her identity. As they explore the city together, Ann experiences the joys of ordinary life and a blossoming romance with Joe. Roman Holiday is renowned for its charming performances, particularly Hepburn's, which earned her an Academy Award for Best Actress. The film captures the enchanting beauty of Rome and the bittersweet nature of fleeting romance. Its timeless appeal and delightful storytelling make it a beloved classic in the romance genre.",
        trailer: "https://www.youtube.com/embed/2vm2FdHg7Io",
        ott: "https://www.mxplayer.in/movie/watch-roman-holiday-movie-online-0c2e912073dc8b2d93b83a0343a193e9",
        cast: [
            { name: "Audrey Hepburn", role: "Princess Ann", img: "/assets/romance/Audrey_Hepburn.jpg" },
            { name: "Gregory Peck", role: "Joe Bradley", img: "/assets/romance/Gregory_Peck.jpg" },
        ]
    },
    beforeSunrise: {
        title: "Before Sunrise (1995)",
        description: "Before Sunrise is a romantic drama directed by Richard Linklater, starring Ethan Hawke and Julie Delpy. The film follows Jesse, an American traveler, and Celine, a French student, who meet on a train and decide to spend one day together in Vienna. As they wander through the city, they engage in deep conversations about life, love, and their personal philosophies. Their connection grows stronger, creating a profound and memorable bond despite knowing they may never see each other again. Before Sunrise is celebrated for its naturalistic dialogue, authentic performances, and the chemistry between Hawke and Delpy. The film captures the fleeting magic of a brief encounter and the impact it can have on one's life. Its introspective and heartfelt storytelling has made it a beloved classic, spawning two sequels that follow the characters' journey over the years.",
        trailer: "https://www.youtube.com/embed/6MUcuqbGTxc",
        ott: "https://www.netflix.com/be-en/title/293391",
        cast: [
            { name: "Ethan Hawke", role: "Jesse", img: "/assets/romance/Ethan_Hawke.jpg" },
            { name: "Julie Delpy", role: "Celine", img: "/assets/romance/Julie_Delpy.jpg" },
        ]
    }
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