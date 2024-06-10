const movieData = {
    theUsualSuspects: {
        title: "The Usual Suspects (1995)",
        description: "The Usual Suspects is a neo-noir mystery film directed by Bryan Singer. The story follows Roger 'Verbal' Kint, a small-time con artist, who is one of only two survivors of a massacre and fire on a ship docked in the Port of Los Angeles. Kint is interrogated by U.S. Customs Agent Dave Kujan, who wants to uncover the truth behind the incident. Kint recounts the events leading up to the disaster, revealing the involvement of a mysterious criminal mastermind known as Keyser Söze. The film is praised for its intricate plot, unexpected twists, and standout performance by Kevin Spacey as Verbal Kint.",
        trailer: "https://www.youtube.com/embed/oiXdPolca5w",
        ott: "https://www.primevideo.com/detail/The-Usual-Suspects/0R90T0VV5SXH4Z08RXKR1RRLX9",
        cast: [
            { name: "Kevin Spacey", role: "Roger 'Verbal' Kint", img: "./mystery/Kevin_Spacey.jpg" },
            { name: "Gabriel Byrne", role: "Dean Keaton", img: "./mystery/Gabriel_Byrne.jpg" },
        ]
    },
    se7en: {
        title: "Se7en (1995)",
        description: "Se7en is a psychological thriller directed by David Fincher. The film follows two detectives, Somerset and Mills, as they investigate a series of gruesome murders inspired by the seven deadly sins. As they delve deeper into the case, they uncover the disturbing motives of the killer, who views himself as an agent of divine justice. Se7en is known for its dark atmosphere, chilling performances, and shocking ending.",
        trailer: "https://www.youtube.com/embed/zwYJg0mj2r4",
        ott: "https://www.primevideo.com/detail/Se7en/0R90T0VBJHXZKP20V35LRYSSG0",
        cast: [
            { name: "Brad Pitt", role: "Detective David Mills", img: "./mystery/Brad_Pitt.jpg" },
            { name: "Morgan Freeman", role: "Detective William Somerset", img: "./mystery/Morgan_Freeman.jpg" },
        ]
    },
    goneGirl: {
        title: "Gone Girl (2014)",
        description: "Gone Girl is a mystery thriller directed by David Fincher, based on the novel of the same name by Gillian Flynn. The film follows the disappearance of Amy Dunne on her fifth wedding anniversary, which sparks a media frenzy and police investigation. As suspicions mount and secrets are revealed, the truth becomes increasingly elusive. Gone Girl is praised for its unpredictable plot, sharp social commentary, and standout performances by Rosamund Pike and Ben Affleck.",
        trailer: "https://www.youtube.com/embed/2-_-1nJf8Vg",
        ott: "https://www.primevideo.com/detail/Gone-Girl/0TIFFW7TZT2EC9F0J28JZBIM2T",
        cast: [
            { name: "Rosamund Pike", role: "Amy Dunne", img: "./mystery/Rosamund_Pike.jpg" },
            { name: "Ben Affleck", role: "Nick Dunne", img: "./mystery/Ben_Affleck.jpg" },
        ]
    },
    shutterIsland: {
        title: "Shutter Island (2010)",
        description: "Shutter Island is a psychological thriller directed by Martin Scorsese, based on the novel by Dennis Lehane. The film follows U.S. Marshal Teddy Daniels and his partner Chuck Aule as they investigate the disappearance of a patient from a psychiatric hospital located on Shutter Island. As they uncover disturbing truths about the hospital and its staff, Daniels becomes increasingly paranoid and questions his own sanity. Shutter Island is praised for its atmospheric tension, haunting visuals, and mind-bending twists.",
        trailer: "https://www.youtube.com/embed/5iaYLCiq5RM",
        ott: "https://www.primevideo.com/detail/Shutter-Island/0O2TV0LDYQI1C4MTHP4QKMLAT0",
        cast: [
            { name: "Leonardo DiCaprio", role: "Teddy Daniels", img: "./mystery/Leonardo_DiCaprio.jpg" },
            { name: "Mark Ruffalo", role: "Chuck Aule", img: "./mystery/Mark_Ruffalo.jpg" },
        ]
    },
    thePrestige: {
        title: "The Prestige (2006)",
        description: "The Prestige is a mystery thriller directed by Christopher Nolan, based on the novel by Christopher Priest. The film follows rival magicians Robert Angier and Alfred Borden as they engage in a bitter rivalry to create the ultimate illusion. Their obsession with outdoing each other leads to tragic consequences and shocking revelations. The Prestige is praised for its intricate plot, atmospheric cinematography, and thought-provoking themes.",
        trailer: "https://www.youtube.com/embed/ijXruSzfGEc",
        ott: "https://www.primevideo.com/detail/The-Prestige/0JXNC8XQZVP7LHDXOUOHUJ5ZBM",
        cast: [
            { name: "Hugh Jackman", role: "Robert Angier", img: "./mystery/Hugh_Jackman.jpg" },
            { name: "Christian Bale", role: "Alfred Borden", img: "./mystery/Christian_Bale.jpg" },
        ]
    },
    memento: {
        title: "Memento (2000)",
        description: "Memento is a neo-noir mystery thriller directed by Christopher Nolan, based on a short story by Jonathan Nolan. The film follows Leonard Shelby, a man suffering from short-term memory loss, as he tries to find his wife's murderer. Due to his condition, Leonard relies on Polaroid photographs and tattoos to piece together clues from his past. Memento is praised for its innovative narrative structure, which unfolds in reverse chronological order, keeping viewers guessing until the final revelation.",
        trailer: "https://www.youtube.com/embed/0vS0E9bBSL0",
        ott: "https://www.primevideo.com/detail/Memento/0GIOPD36Y1MMQAN6YMWQEGAM61",
        cast: [
            { name: "Guy Pearce", role: "Leonard Shelby", img: "./mystery/Guy_Pearce.jpg" },
            { name: "Carrie-Anne Moss", role: "Natalie", img: "./mystery/Carrie-Anne_Moss.jpg" },
        ]
    },
    zodiac: {
        title: "Zodiac (2007)",
        description: "Zodiac is a mystery thriller directed by David Fincher, based on the non-fiction book by Robert Graysmith. The film follows the investigation into the Zodiac Killer, a notorious serial killer who terrorized the San Francisco Bay Area in the late 1960s and early 1970s. The case spans decades and involves multiple law enforcement agencies and journalists, but the killer's identity remains elusive. Zodiac is praised for its meticulous attention to detail, atmospheric tension, and ensemble cast performances.",
        trailer: "https://www.youtube.com/embed/yNncHPl1UXg",
        ott: "https://www.primevideo.com/detail/Zodiac/0KRHVC48QB9Z3DXLC3KUW9ETZA",
        cast: [
            { name: "Jake Gyllenhaal", role: "Robert Graysmith", img: "./mystery/Jake_Gyllenhaal.jpg" },
            { name: "Mark Ruffalo", role: "Inspector David Toschi", img: "./mystery/Mark_Ruffalo.jpg" },
        ]
    },
    prisoners: {
        title: "Prisoners (2013)",
        description: "Prisoners is a mystery thriller directed by Denis Villeneuve. The film follows Keller Dover, a desperate father who takes matters into his own hands after his daughter and her friend go missing. As the police investigation stalls and tensions rise, Dover becomes increasingly obsessed with finding the girls, leading him down a dark and dangerous path. Prisoners is praised for its tense atmosphere, morally complex characters, and haunting portrayal of grief.",
        trailer: "https://www.youtube.com/embed/bpXfcTF6iVk",
        ott: "https://www.primevideo.com/detail/Prisoners/0FFOVKGP4NKLF5W9GUXCQK0KJY",
        cast: [
            { name: "Hugh Jackman", role: "Keller Dover", img: "./mystery/Hugh_Jackman.jpg" },
            { name: "Jake Gyllenhaal", role: "Detective Loki", img: "./mystery/Jake_Gyllenhaal.jpg" },
        ]
    },
    theGirlwiththeDragonTattoo: {
        title: "The Girl with the Dragon Tattoo (2011)",
        description: "The Girl with the Dragon Tattoo is a mystery thriller directed by David Fincher, based on the novel by Stieg Larsson. The film follows journalist Mikael Blomkvist and hacker Lisbeth Salander as they investigate the disappearance of a wealthy industrialist's niece. As they dig deeper into the case, they uncover a dark conspiracy involving corruption, abuse, and murder. The Girl with the Dragon Tattoo is praised for its gripping storyline, atmospheric visuals, and standout performance by Rooney Mara as Lisbeth Salander.",
        trailer: "https://www.youtube.com/embed/YKWXEfXGWtA",
        ott: "https://www.primevideo.com/detail/The-Girl-with-the-Dragon-Tattoo/0PYMWHT8J7F4YI8DGYMZB7P3VS",
        cast: [
            { name: "Daniel Craig", role: "Mikael Blomkvist", img: "./mystery/Daniel_Craig.jpg" },
            { name: "Rooney Mara", role: "Lisbeth Salander", img: "./mystery/Rooney_Mara.jpg" },
        ]
    },
    identity: {
        title: "Identity (2003)",
        description: "Identity is a psychological mystery thriller directed by James Mangold. The film follows ten strangers who find themselves stranded at a remote desert motel during a severe rainstorm. As they seek shelter from the storm, they realize that they are being killed off one by one in mysterious and increasingly gruesome ways. With each death, they uncover shocking connections that link them together in unexpected ways. Identity is praised for its suspenseful atmosphere, clever plot twists, and ensemble cast performances.",
        trailer: "https://www.youtube.com/embed/US5PEPPCxqE",
        ott: "https://www.primevideo.com/detail/Identity/0QG90I0N8W3QZQ2TMTN92Z95PQ",
        cast: [
            { name: "John Cusack", role: "Ed", img: "./mystery/John_Cusack.jpg" },
            { name: "Ray Liotta", role: "Rhodes", img: "./mystery/Ray_Liotta.jpg" },
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