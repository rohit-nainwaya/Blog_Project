const movieData = {
    dieHard: {
        title: "Die Hard (1988)",
        description: "Die Hard is a classic action film directed by John McTiernan and starring Bruce Willis as NYPD officer John McClane. McClane finds himself trapped in a Los Angeles skyscraper during a Christmas party when a group of terrorists takes the building hostage. McClane must use his wit and cunning to outsmart the terrorists and save the hostages, including his wife. Die Hard is known for its thrilling action sequences, memorable one-liners, and charismatic performance by Willis.",
        trailer: "https://www.youtube.com/embed/2TQ-pOvI6Xo",
        ott: "https://www.primevideo.com/region/eu/detail/Die-Hard/0T1U9Y0553WS3CC7RKXTC9B09M",
        cast: [
            { name: "Bruce Willis", role: "John McClane", img: "./action/Bruce_Willis.jpg" },
            { name: "Alan Rickman", role: "Hans Gruber", img: "./action/Alan_Rickman.jpg" },
        ]
    },
    madMax: {
        title: "Mad Max: Fury Road (2015)",
        description: "Mad Max: Fury Road is a post-apocalyptic action film directed by George Miller and starring Tom Hardy as Max Rockatansky and Charlize Theron as Imperator Furiosa. The film follows Max and Furiosa as they join forces to escape the tyrannical rule of Immortan Joe and his army in a desert wasteland. The non-stop action and stunning practical effects garnered widespread acclaim, making it one of the most critically acclaimed action films of the decade.",
        trailer: "https://www.youtube.com/embed/hEJnMQG9ev8",
        ott: "https://www.primevideo.com/detail/Mad-Max-Fury-Road/0G9GAOJ4273C0PK4FCPXS4KEJF",
        cast: [
            { name: "Tom Hardy", role: "Max Rockatansky", img: "/action/Tom_Hardy.jpg" },
            { name: "Charlize Theron", role: "Imperator Furiosa", img: "/action/Charlize_Theron.jpg" },
        ]
    },
    darkKnight: {
        title: "The Dark Knight (2008)",
        description: "The Dark Knight is a superhero film directed by Christopher Nolan and starring Christian Bale as Batman, Heath Ledger as the Joker, and Aaron Eckhart as Harvey Dent. The film follows Batman as he faces off against the Joker, who wreaks havoc on Gotham City with his chaotic schemes. The Joker's actions push Batman to his limits as he grapples with the ethical complexities of his vigilante role. Ledger's performance as the Joker earned widespread acclaim, with many considering it one of the greatest portrayals of a comic book villain.",
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
        ott: "https://www.primevideo.com/detail/The-Dark-Knight/0QSTXR0EXWWYI4D3UGMLFM4A0Q",
        cast: [
            { name: "Christian Bale", role: "Bruce Wayne / Batman", img: "/action/Christian_Bale.jpg" },
            { name: "Heath Ledger", role: "The Joker", img: "/action/Heath_Ledger.jpg" },
        ]
    },
    terminator2: {
        title: "Terminator 2: Judgment Day (1991)",
        description: "Terminator 2: Judgment Day is a science fiction action film directed by James Cameron. It is the sequel to the 1984 film The Terminator and stars Arnold Schwarzenegger as the Terminator, Linda Hamilton as Sarah Connor, and Edward Furlong as John Connor. The film follows the Terminator as he is sent back in time to protect John Connor from a more advanced and deadly Terminator sent to kill him. As they evade the relentless pursuit of the new Terminator, Sarah and John learn about the future apocalyptic war and the role John plays in humanity's survival.",
        trailer: "https://www.youtube.com/embed/lwSysg9o7wE",
        ott: "https://www.primevideo.com/detail/Terminator-2-Judgment-Day/0QTY6TWMC8JW830MI5FQND475S",
        cast: [
            { name: "Arnold Schwarzenegger", role: "The Terminator", img: "/action/Arnold_Schwarzenegger.jpg" },
            { name: "Linda Hamilton", role: "Sarah Connor", img: "/action/Linda_Hamilton.jpg" },
        ]
    },
    matrix: {
        title: "The Matrix (1999)",
        description: "The Matrix is a science fiction action film directed by the Wachowskis and starring Keanu Reeves as Neo, Laurence Fishburne as Morpheus, and Carrie-Anne Moss as Trinity. The film follows Neo, a computer programmer who discovers that the world he lives in is a simulated reality created by sentient machines. Morpheus, a rebel leader, offers Neo the chance to awaken from the Matrix and join the fight against the machines. The Matrix revolutionized visual effects and action choreography, becoming one of the most influential films of the late 20th century.",
        trailer: "https://www.youtube.com/embed/mctdeCb9Dro",
        ott: "https://primevideo.com/detail/The-Matrix/0MNMSXF63GQDYGKL8E4HV9BYO2",
        cast: [
            { name: "Keanu Reeves", role: "Neo", img: "/action/Keanu_Reeves.jpg" },
            { name: "Laurence Fishburne", role: "Morpheus", img: "/action/Laurence_Fishburne.jpg" },
        ]
    },
    gladiator: {
        title: "Gladiator (2000)",
        description: "Gladiator is an epic historical drama directed by Ridley Scott and starring Russell Crowe as Maximus Decimus Meridius, a Roman general who is betrayed and seeks revenge against the corrupt emperor who murdered his family and sent him into slavery. The film combines thrilling action sequences with political intrigue and emotional depth, earning widespread acclaim and multiple Academy Awards, including Best Picture and Best Actor for Crowe.",
        trailer: "https://www.youtube.com/embed/owK1qxDselE",
        ott: "https://www.primevideo.com/detail/Gladiator/0I2PF17D25K06KVEQKVXSDD0RR",
        cast: [
            { name: "Russell Crowe", role: "Maximus", img: "/action/Russell_Crowe.jpg" },
            { name: "Joaquin Phoenix", role: "Commodus", img: "/action/Joaquin_Phoenix.jpg" },
        ]
    },
    inception: {
        title: "Inception (2010)",
        description: "Inception is a science fiction action film written and directed by Christopher Nolan. It stars Leonardo DiCaprio as Dom Cobb, a skilled thief who specializes in extracting information from the subconscious of his targets through their dreams. Cobb is offered a chance to have his criminal history erased in exchange for implanting an idea into a target's subconscious, a process known as 'inception.' The film explores themes of reality, memory, and the nature of the mind, all within the framework of mind-bending action sequences and stunning visual effects.",
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
        ott: "https://www.netflix.com/in/title/70131314",
        cast: [
            { name: "Leonardo DiCaprio", role: "Dom Cobb", img: "/action/Leonardo_DiCaprio.jpg" },
            { name: "Joseph Gordon-Levitt", role: "Arthur", img: "/action/Joseph_Gordon-Levitt.jpg" },
        ]
    },
    johnWick: {
        title: "John Wick (2014)",
        description: "John Wick is an American action film directed by Chad Stahelski. It stars Keanu Reeves as the titular character, a retired hitman seeking vengeance for the killing of his beloved dog, a final gift from his deceased wife. The film is known for its stylized action sequences, impressive choreography, and the establishment of an intricate criminal underworld. John Wick reinvigorated Keanu Reeves' career and spawned a successful franchise.",
        trailer: "https://www.youtube.com/embed/2AUmvWm5ZDQ",
        ott: "https://www.primevideo.com/detail/John-Wick/0O2TV0WGM2J40Q4I1LQHV3M7QA",
        cast: [
            { name: "Keanu Reeves", role: "John Wick", img: "/action/Keanu_Reeves.jpg" },
            { name: "Michael Nyqvist", role: "Viggo Tarasov", img: "/action/Michael_Nyqvist.jpg" },
        ]
    },
    raidRedemption: {
        title: "The Raid: Redemption (2011)",
        description: "The Raid: Redemption is an Indonesian action film directed by Gareth Evans. It follows a SWAT team as they become trapped in a Jakarta tenement building ruled by a ruthless crime lord. The team must fight their way through wave after wave of enemies to reach their target, encountering intense martial arts battles and visceral action along the way. The Raid: Redemption is praised for its relentless pacing and jaw-dropping fight choreography.",
        trailer: "https://www.youtube.com/embed/m6Q7KnXpNOg",
        ott: "https://www.primevideo.com/detail/The-Raid-Redemption/0JXNC8XQ051ON4M209O796GGQZ",
        cast: [
            { name: "Iko Uwais", role: "Rama", img: "/action/Iko_Uwais.jpg" },
            { name: "Yayan Ruhian", role: "Mad Dog", img: "/action/Yayan_Ruhian.jpg" },
        ]
    },
    killBillVolume1: {
        title: "Kill Bill: Volume 1 (2003)",
        description: "Kill Bill: Volume 1 is an American martial arts film directed by Quentin Tarantino. The film follows 'The Bride,' a former assassin who seeks revenge on her ex-colleagues after they try to kill her and her unborn child. Known for its stylish cinematography, eclectic soundtrack, and homage to various genres including kung fu and spaghetti westerns, Kill Bill: Volume 1 features intense action sequences and an unforgettable performance by Uma Thurman.",
        trailer: "https://www.youtube.com/embed/7kSuas6mRpk",
        ott: "https://www.primevideo.com/detail/Kill-Bill-Volume-1/0J3PELLU8KXU3JWDRLFDKMMPO0",
        cast: [
            { name: "Uma Thurman", role: "The Bride", img: "/action/Uma_Thurman.jpg" },
            { name: "Lucy Liu", role: "O-Ren Ishii", img: "/action/Lucy_Liu.jpg" },
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
}
