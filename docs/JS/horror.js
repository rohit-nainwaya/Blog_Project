const horrorData = {
    exorcist: {
        title: "The Exorcist (1973)",
        description: "The Exorcist is a classic horror film directed by William Friedkin, based on the novel of the same name by William Peter Blatty. The story revolves around the demonic possession of a young girl named Regan and the attempts of two priests to exorcise the demon from her. The film is known for its chilling atmosphere, groundbreaking special effects, and intense performances.",
        trailer: "https://www.youtube.com/embed/YDGw1MTEe9k",
        ott: "https://www.netflix.com/pt-en/title/14546619",
        cast: [
            { name: "Ellen Burstyn", role: "Chris MacNeil", img: "/horror/Ellen_Burstyn.jpg" },
            { name: "Max von Sydow", role: "Father Merrin", img: "/horror/Max_von_Sydow.jpg" },
        ]
    },
    shining: {
        title: "The Shining (1980)",
        description: "The Shining is a psychological horror film directed by Stanley Kubrick, based on the novel of the same name by Stephen King. It stars Jack Nicholson as Jack Torrance, a writer who becomes the winter caretaker of the isolated Overlook Hotel. As Jack's sanity deteriorates, supernatural forces drive him to violence against his family. The film is celebrated for its eerie atmosphere, iconic imagery, and Nicholson's memorable performance.",
        trailer: "https://www.youtube.com/embed/5Cb3ik6zP2I",
        ott: "https://tv.apple.com/in/movie/the-shining/umc.cmc.be3gn94hs3l9fjvg34ex9sy1",
        cast: [
            { name: "Jack Nicholson", role: "Jack Torrance", img: "/horror/Jack_Nicholson.jpg" },
            { name: "Shelley Duvall", role: "Wendy Torrance", img: "/horror/Shelley_Duvall.jpg" },
        ]
    },
    psycho: {
        title: "Psycho (1960)",
        description: "Psycho is a psychological horror film directed by Alfred Hitchcock, based on the novel by Robert Bloch. The story centers on Marion Crane, who embezzles money and checks into the Bates Motel, run by the enigmatic Norman Bates. What follows is a series of horrifying events that culminate in one of the most iconic twists in cinematic history. Psycho is praised for its suspenseful storytelling, innovative camera techniques, and Bernard Herrmann's haunting score.",
        trailer: "https://www.youtube.com/embed/Wz719b9QUqY",
        ott: "https://www.primevideo.com/detail/Psycho/0NLRDLAQ1XETCMSGRXD6H0R4WK",
        cast: [
            { name: "Anthony Perkins", role: "Norman Bates", img: "/horror/Anthony_Perkins.jpg" },
            { name: "Janet Leigh", role: "Marion Crane", img: "/horror/Janet_Leigh.jpg" },
        ]
    },
    conjuring: {
        title: "The Conjuring (2013)",
        description: "The Conjuring is a supernatural horror film directed by James Wan, inspired by the real-life investigations of paranormal investigators Ed and Lorraine Warren. The film follows the Warrens as they assist a family terrorized by a dark presence in their farmhouse. With its eerie atmosphere, effective jump scares, and strong performances, The Conjuring became a critical and commercial success, spawning a popular horror franchise.",
        trailer: "https://www.youtube.com/embed/k10ETZ41q5o",
        ott: "https://www.netflix.com/in/title/70251894",
        cast: [
            { name: "Vera Farmiga", role: "Lorraine Warren", img: "/horror/Vera_Farmiga.jpg" },
            { name: "Patrick Wilson", role: "Ed Warren", img: "/horror/Patrick_Wilson.jpg" },
        ]
    },
    silenceLambs: {
        title: "The Silence of the Lambs (1991)",
        description: "The Silence of the Lambs is a psychological thriller-horror film directed by Jonathan Demme, based on the novel by Thomas Harris. It follows FBI trainee Clarice Starling as she seeks the help of incarcerated serial killer Hannibal Lecter to catch another killer known as Buffalo Bill. The film is known for its suspenseful storytelling, chilling performances by Jodie Foster and Anthony Hopkins, and its exploration of the darkness of the human psyche.",
        trailer: "https://www.youtube.com/embed/W6Mm8Sbe__o",
        ott: "https://www.primevideo.com/detail/The-Silence-of-the-Lambs/0PNN0D2G09Z4HE1QOJ7ENJEVFM",
        cast: [
            { name: "Jodie Foster", role: "Clarice Starling", img: "/horror/Jodie_Foster.jpg" },
            { name: "Anthony Hopkins", role: "Hannibal Lecter", img: "/horror/Anthony_Hopkins.jpg" },
        ]
    },
    nightmareElmStreet: {
        title: "A Nightmare on Elm Street (1984)",
        description: "A Nightmare on Elm Street is a supernatural slasher film directed by Wes Craven. The story follows a group of teenagers who are stalked and killed in their dreams by the vengeful spirit Freddy Krueger. The film introduced audiences to one of the most iconic horror villains in cinema history and spawned a successful franchise. A Nightmare on Elm Street is praised for its inventive premise, imaginative kills, and atmospheric tension.",
        trailer: "https://www.youtube.com/embed/dCVh4lBfW-c",
        ott: "https://tv.apple.com/in/movie/a-nightmare-on-elm-street/umc.cmc.2gxjjzta1kb4a1ysonxlo5twi",
        cast: [
            { name: "Heather Langenkamp", role: "Nancy Thompson", img: "/horror/Heather_Langenkamp.jpg" },
            { name: "Robert Englund", role: "Freddy Krueger", img: "/horror/Robert_Englund.jpg" },
        ]
    },
    hillHouse: {
        title: "The Haunting of Hill House (2018)",
        description: "The Haunting of Hill House is a supernatural horror series created by Mike Flanagan, loosely based on the novel by Shirley Jackson. The series follows the Crain family as they confront the haunting memories of their past and the sinister forces lurking within the walls of Hill House. With its compelling characters, intricate storytelling, and spine-tingling scares, The Haunting of Hill House received widespread acclaim and became a cultural phenomenon.",
        trailer: "https://www.youtube.com/embed/3eqxXqJDmcY",
        ott: "https://www.netflix.com/in/title/80189221",
        cast: [
            { name: "Michiel Huisman", role: "Steven Crain", img: "/horror/Michiel_Huisman.jpg" },
            { name: "Carla Gugino", role: "Olivia Crain", img: "/horror/Carla_Gugino.jpg" },
        ]
    },
    babadook: {
        title: "The Babadook (2014)",
        description: "The Babadook is a psychological horror film written and directed by Jennifer Kent. The story follows a single mother, plagued by the violent death of her husband, as she battles with her son's fear of a monster lurking in the house. As tensions rise and the supernatural presence becomes increasingly real, the line between reality and imagination blurs. The Babadook is praised for its psychological depth, atmospheric tension, and powerful performances.",
        trailer: "https://www.youtube.com/embed/k5WQZzDRVtw",
        ott: "https://tv.apple.com/us/movie/the-babadook/umc.cmc.44oyvcxsw4z32tozidkk6glv0",
        cast: [
            { name: "Essie Davis", role: "Amelia", img: "/horror/Essie_Davis.jpg" },
            { name: "Noah Wiseman", role: "Samuel", img: "/horror/Noah_Wiseman.jpg" },
        ]
    },
    hereditary: {
        title: "Hereditary (2018)",
        description: "Hereditary is a psychological horror film written and directed by Ari Aster. The story follows the Graham family as they experience a series of increasingly disturbing events following the death of their secretive grandmother. As they unravel the dark secrets of their ancestry, they are drawn into a terrifying and sinister supernatural phenomenon. Hereditary is praised for its unsettling atmosphere, visceral scares, and Toni Collette's powerhouse performance.",
        trailer: "https://www.youtube.com/embed/V6wWKNij_1M",
        ott: "https://www.primevideo.com/detail/Hereditary/0T65HGH8XLZN0612MUMF3JQ2RO",
        cast: [
            { name: "Toni Collette", role: "Annie Graham", img: "/horror/Toni_Collette.jpg" },
            { name: "Alex Wolff", role: "Peter Graham", img: "/horror/Alex_Wolff.jpg" },
        ]
    },
    sixthSense: {
        title: "The Sixth Sense (1999)",
        description: "The Sixth Sense is a supernatural psychological thriller film written and directed by M. Night Shyamalan. It stars Bruce Willis as Dr. Malcolm Crowe, a child psychologist who tries to help a young boy, Cole Sear, played by Haley Joel Osment, who claims he can see and communicate with the dead. The film is renowned for its unexpected twist ending and its ability to create a sense of dread and suspense throughout.",
        trailer: "https://www.youtube.com/embed/VG9AGf66tXM",
        ott: "https://www.hotstar.com/in/movies/the-sixth-sense/1260018039",
        cast: [
            { name: "Bruce Willis", role: "Dr. Malcolm Crowe", img: "/horror/Bruce_Willis.jpg" },
            { name: "Haley Joel Osment", role: "Cole Sear", img: "/horror/Haley_Joel_Osment.jpg" },
        ]
    }
};

function showMovieDetails(movieKey) {
    const movie = horrorData[movieKey];

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
}

