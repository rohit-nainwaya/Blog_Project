const movieData = {
    toyStory: {
        title: "Toy Story (1995)",
        description: "Toy Story, directed by John Lasseter, is a groundbreaking animated film that marked Pixar Animation Studios' debut feature. The movie introduces us to a world where toys come to life when humans are not around. It follows the story of Woody, a pull-string cowboy doll voiced by Tom Hanks, and Buzz Lightyear, a space ranger action figure voiced by Tim Allen. When Buzz joins Andy's toy collection, Woody feels threatened and sets off a chain of events that leads them on an adventure of self-discovery and friendship. Toy Story revolutionized animation with its pioneering use of CGI technology and heartfelt storytelling, setting a new standard for animated films and launching Pixar as a leading force in the industry.",
        trailer: "https://www.youtube.com/embed/KYz2wyBy3kc",
        ott: "https://www.disneyplus.com/movies/toy-story/3m0faafB8Kw3",
        cast: [
            { name: "Tom Hanks", role: "Woody (voice)", img: "./images/tom_hanks.jpg" },
            { name: "Tim Allen", role: "Buzz Lightyear (voice)", img: "./images/tim_allen.jpg" },
        ]
    },
    spiritedAway: {
        title: "Spirited Away (2001)",
        description: "Spirited Away, directed by Hayao Miyazaki and produced by Studio Ghibli, is a critically acclaimed Japanese animated fantasy film. The story follows Chihiro, a young girl who unwittingly enters a magical world of spirits and gods after her parents are transformed into pigs. To save her family and return to the human world, Chihiro must work at a bathhouse run by the witch Yubaba, facing challenges that test her courage and compassion. Spirited Away is celebrated for its breathtaking animation, rich storytelling, and Miyazaki's exploration of themes such as environmentalism, identity, and the importance of empathy.",
        trailer: "https://www.youtube.com/embed/ByXuk9QqQkk",
        ott: "https://www.hbomax.com/feature/urn:hbo:feature:GX0ajowotB2nsygEAAAAi",
        cast: [
            { name: "Rumi Hiiragi", role: "Chihiro (voice)", img: "./images/rumi_hiiragi.jpg" },
            { name: "Miyu Irino", role: "Haku (voice)", img: "./images/miyu_irino.jpg" },
        ]
    },
    theLionKing: {
        title: "The Lion King (1994)",
        description: "The Lion King, directed by Roger Allers and Rob Minkoff, is a Disney classic that tells the epic tale of Simba, a young lion prince who must reclaim his throne from his uncle Scar and fulfill his destiny as king of the Pride Lands. Set against the majestic African savanna, the film explores themes of family, loss, and the circle of life. With memorable characters like Mufasa, Timon, and Pumbaa, and a soundtrack featuring iconic songs by Elton John and Hans Zimmer, The Lion King became an instant hit and a cultural phenomenon, blending traditional animation with innovative CGI techniques.",
        trailer: "https://www.youtube.com/embed/4sj1MT05lAA",
        ott: "https://www.disneyplus.com/movies/the-lion-king-1994/6CrtXiDswiVz",
        cast: [
            { name: "Matthew Broderick", role: "Simba (voice)", img: "./images/matthew_broderick.jpg" },
            { name: "Jeremy Irons", role: "Scar (voice)", img: "./images/jeremy_irons.jpg" },
        ]
    },
    findingNemo: {
        title: "Finding Nemo (2003)",
        description: "Finding Nemo, directed by Andrew Stanton, follows the journey of Marlin, a clownfish, who embarks on a quest across the ocean to find his son Nemo, who has been captured by a scuba diver and placed in a fish tank in Sydney. Along the way, Marlin is accompanied by Dory, a friendly and forgetful blue tang fish. The film explores themes of parenthood, friendship, and overcoming personal limitations. Finding Nemo received praise for its stunning underwater visuals, heartfelt story, and memorable characters, becoming one of Pixar's most beloved and successful films.",
        trailer: "https://www.youtube.com/embed/wZdpNglLbt8",
        ott: "https://www.disneyplus.com/movies/finding-nemo/7Gk1K3iMsZs2",
        cast: [
            { name: "Albert Brooks", role: "Marlin (voice)", img: "./images/albert_brooks.jpg" },
            { name: "Ellen DeGeneres", role: "Dory (voice)", img: "./images/ellen_degeneres.jpg" },
        ]
    },
    shrek: {
        title: "Shrek (2001)",
        description: "Shrek, directed by Andrew Adamson and Vicky Jenson, is a comedic animated fantasy film that subverts fairy tale conventions. The story follows Shrek, an ogre who embarks on a quest to rescue Princess Fiona from a dragon-guarded castle in exchange for the removal of fairy tale creatures from his swamp. Along the way, Shrek is accompanied by Donkey, a talkative and loyal sidekick. Known for its irreverent humor, memorable characters, and satire of Disney tropes, Shrek became a commercial and critical success, spawning sequels and establishing DreamWorks Animation as a major player in the animation industry.",
        trailer: "https://www.youtube.com/embed/W37DlG1i61s",
        ott: "https://www.netflix.com/title/60020834",
        cast: [
            { name: "Mike Myers", role: "Shrek (voice)", img: "./images/mike_myers.jpg" },
            { name: "Eddie Murphy", role: "Donkey (voice)", img: "./images/eddie_murphy.jpg" },
        ]
    },
    frozen: {
        title: "Frozen (2013)",
        description: "Frozen, directed by Chris Buck and Jennifer Lee, is a musical fantasy film inspired by Hans Christian Andersen's fairy tale 'The Snow Queen.' The story centers on two sisters, Elsa and Anna, princesses of Arendelle. Elsa has magical powers that allow her to control ice and snow, but her abilities inadvertently trap their kingdom in eternal winter. Anna sets off on a journey with Kristoff, an ice harvester, his reindeer Sven, and Olaf, a comedic snowman brought to life, to find Elsa and reverse the icy spell. Frozen was praised for its animation, music (including the hit song 'Let It Go'), and themes of love, self-acceptance, and sisterhood.",
        trailer: "https://www.youtube.com/embed/TbQm5doF_Uc",
        ott: "https://www.disneyplus.com/movies/frozen/3ZoBtT60ILdj",
        cast: [
            { name: "Idina Menzel", role: "Elsa (voice)", img: "./images/idina_menzel.jpg" },
            { name: "Kristen Bell", role: "Anna (voice)", img: "./images/kristen_bell.jpg" },
        ]
    },
    up: {
        title: "Up (2009)",
        description: "Up, directed by Pete Docter and Bob Peterson, is an animated adventure film that tells the story of Carl Fredricksen, a widower who fulfills his dream of adventure by tying thousands of balloons to his house and flying to South America. Unbeknownst to Carl, an enthusiastic Wilderness Explorer named Russell becomes an accidental stowaway on the journey. Together, they encounter exotic creatures and unexpected challenges that test their courage and friendship. Up is celebrated for its emotional depth, visual storytelling, and exploration of themes such as love, loss, and the importance of pursuing dreams at any age.",
        trailer: "https://www.youtube.com/embed/ORFWdXl_zJ4",
        ott: "https://www.disneyplus.com/movies/up/3Qlb8WtK9gp0",
        cast: [
            { name: "Ed Asner", role: "Carl Fredricksen (voice)", img: "./images/ed_asner.jpg" },
            { name: "Jordan Nagai", role: "Russell (voice)", img: "./images/jordan_nagai.jpg" },
        ]
    },
    spiderVerse: {
        title: "Spider-Man: Into the Spider-Verse (2018)",
        description: "Spider-Man: Into the Spider-Verse, directed by Bob Persichetti, Peter Ramsey, and Rodney Rothman, is a groundbreaking animated superhero film that introduces the concept of the multiverse to the Spider-Man universe. The story follows Miles Morales, a teenager who gains spider-like abilities and discovers that there are other Spider-People from different dimensions who need his help to stop a threat that could destroy all realities. Known for its innovative animation style that blends traditional hand-drawn techniques with CGI, Spider-Man: Into the Spider-Verse received acclaim for its diverse representation, humor, and heartfelt storytelling.",
        trailer: "https://www.youtube.com/embed/g4Hbz2jLxvQ",
        ott: "https://www.netflix.com/title/81155083",
        cast: [
            { name: "Shameik Moore", role: "Miles Morales / Spider-Man (voice)", img: "./images/shameik_moore.jpg" },
            { name: "Jake Johnson", role: "Peter B. Parker / Spider-Man (voice)", img: "./images/jake_johnson.jpg" },
        ]
    },
    insideOut: {
        title: "Inside Out (2015)",
        description: "Inside Out, directed by Pete Docter, is a unique animated film that takes viewers inside the mind of an 11-year-old girl named Riley, where her emotions—Joy, Sadness, Anger, Fear, and Disgust—guide her through life's challenges. When Riley's family moves to a new city, Joy and Sadness are accidentally swept away from the control center of her mind, leaving Fear, Anger, and Disgust to navigate her emotions. Inside Out explores complex themes of growing up, the importance of sadness, and the emotional rollercoaster of adolescence. Praised for its creativity, emotional resonance, and psychological insight, Inside Out continues Pixar's tradition of storytelling excellence.",
        trailer: "https://www.youtube.com/embed/seMwpP0yeu4",
        ott: "https://www.disneyplus.com/movies/inside-out/1n9RyJbwCP5C",
        cast: [
            { name: "Amy Poehler", role: "Joy (voice)", img: "./images/amy_poehler.jpg" },
            { name: "Phyllis Smith", role: "Sadness (voice)", img: "./images/phyllis_smith.jpg" },
        ]
    },
    yourName: {
        title: "Your Name (2016)",
        description: "Your Name, directed by Makoto Shinkai, is a Japanese animated romantic fantasy film that follows the lives of two teenagers, Mitsuha Miyamizu and Taki Tachibana, who mysteriously swap bodies. Despite never having met, they communicate through notes and messages, forming a deep connection as they navigate each other's lives and attempt to unravel the supernatural forces at play. Your Name is celebrated for its stunning visuals, emotionally resonant storytelling, and exploration of themes such as fate, love, and the interconnectedness of lives across time and space.",
        trailer: "https://www.youtube.com/embed/3KR8_igDs1Y",
        ott: "https://www.netflix.com/title/80196789",
        cast: [
            { name: "Ryunosuke Kamiki", role: "Taki Tachibana (voice)", img: "./images/ryunosuke_kamiki.jpg" },
            { name: "Mone Kamishiraishi", role: "Mitsuha Miyamizu (voice)", img: "./images/mone_kamishiraishi.jpg" },
        ]
    }
};

function showMovieDetails(movieKey) {
    const movie = movieData[movieKey];

    document.getElementById('movieTitle').innerText = movie.title;
    document.getElementById('movieDescription').innerText = movie.description;
    document.getElementById('movieTrailer').src = movie.trailer;
    document.getElementById('ottLink').href = movie.ott;

    const castList = document.getElementById('castList');
    castList.innerHTML = '';
    movie.cast.forEach(actor => {
        const actorCard = document.createElement('div');
        actorCard.className = 'card';
        actorCard.innerHTML = `
            <img src="${actor.img}" alt="${actor.name}">
            <div class="card-body">
                <h5 class="card-title">${actor.name}</h5>
                <p class="card-text">Role: ${actor.role}</p>
            </div>
        `;
        castList.appendChild(actorCard);
    });

    document.getElementById('movieList').classList.add('hidden');
    document.getElementById('movieDetails').classList.remove('hidden');
}

function goBack() {
    document.getElementById('movieDetails').classList.add('hidden');
    document.getElementById('movieList').classList.remove('hidden');
    document.getElementById('movieTrailer').src = '';
}

function goHome() {
    document.getElementById('movieDetails').classList.add('hidden');
    document.getElementById('movieList').classList.remove('hidden');
    document.getElementById('movieTrailer').src = '';
};