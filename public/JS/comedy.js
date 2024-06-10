const comedyData = {
    montyPython: {
        title: "Monty Python and the Holy Grail (1975)",
        description: "Monty Python and the Holy Grail is a British comedy film directed by Terry Gilliam and Terry Jones. It is a parody of the legend of King Arthur's quest to find the Holy Grail. The film follows King Arthur and his knights as they encounter absurd and surreal challenges on their journey. Known for its irreverent humor and memorable quotes, Monty Python and the Holy Grail has become a cult classic.",
        trailer: "https://www.youtube.com/embed/urRkGvhXc8w",
        ott: "https://www.netflix.com/in/title/771476",
        cast: [
            { name: "Graham Chapman", role: "King Arthur", img: "/comedy/Graham_Chapman.jpg" },
            { name: "John Cleese", role: "Sir Lancelot the Brave", img: "/comedy/John_Cleese.jpg" },
        ]
    },
    airplane: {
        title: "Airplane! (1980)",
        description: "Airplane! is a parody comedy film directed by Jim Abrahams, David Zucker, and Jerry Zucker. The film satirizes the disaster film genre, particularly the 1957 film Zero Hour! and the 1970s Airport series. Airplane! follows the absurd and chaotic events on board a passenger plane after the crew falls ill from food poisoning. Known for its rapid-fire jokes and slapstick humor, Airplane! is considered one of the funniest comedies of all time.",
        trailer: "https://www.youtube.com/embed/07pPmCfKi3U",
        ott: "https://www.primevideo.com/detail/Airplane/0MF27TDS99IGSDWV6G5YQP6L2D",
        cast: [
            { name: "Robert Hays", role: "Ted Striker", img: "/comedy/Robert_Hays.jpg" },
            { name: "Julie Hagerty", role: "Elaine Dickinson", img: "/comedy/Julie_Hagerty.jpg" },
        ]
    },
    groundhogDay: {
        title: "Groundhog Day (1993)",
        description: "Groundhog Day is a fantasy comedy film directed by Harold Ramis and starring Bill Murray as Phil Connors, a cynical TV weatherman who finds himself stuck in a time loop, repeating the same day over and over again. As Phil relives Groundhog Day in the small town of Punxsutawney, Pennsylvania, he undergoes a transformation, learning to appreciate life and love. Groundhog Day is celebrated for its clever premise and Murray's performance.",
        trailer: "https://www.youtube.com/embed/GncQtURdcE4",
        ott: "https://www.primevideo.com/detail/Groundhog-Day/0QX3YI41P3QILLCJHBBMYE4DVP",
        cast: [
            { name: "Bill Murray", role: "Phil Connors", img: "/comedy/Bill_Murray.jpg" },
            { name: "Andie MacDowell", role: "Rita Hanson", img: "/comedy/Andie_MacDowell.jpg" },
        ]
    },
    americanPie: {
        title: "American Pie (1999)",
        description: `American Pie is a coming-of-age teen comedy film directed by Paul Weitz in his directorial debut and written by Adam Herz. The film follows a group of high school friends, who make a pact to lose their virginity before graduation. With its humorous and often risqué take on teenage sexuality and the awkwardness of growing up, American Pie became a cultural phenomenon and spawned a successful franchise.`,
        trailer: "https://www.youtube.com/embed/iUZ3Yxok6N8",
        ott: "https://www.netflix.com/in/title/22037751",
        cast: [
            { name: "Jason Biggs", role: "Jim Levenstein", img: "/comedy/Jason_Biggs.jpg" },
            { name: "Chris Klein", role: "Chris 'Oz' Ostreicher", img: "/comedy/Chris_Klein.jpg" },
        ]
    },
    superbad: {
        title: "Superbad (2007)",
        description: "Superbad is a coming-of-age teen comedy film directed by Greg Mottola and produced by Judd Apatow. It follows two socially awkward high school seniors, Seth and Evan, played by Jonah Hill and Michael Cera, respectively, as they attempt to secure alcohol for a party and lose their virginity before graduating. Superbad is praised for its hilarious dialogue, authentic portrayal of teenage friendship, and breakout performances by its young cast.",
        trailer: "https://www.youtube.com/embed/4eaZ_48ZYog",
        ott: "https://www.netflix.com/in/title/70058023",
        cast: [
            { name: "Jonah Hill", role: "Seth", img: "/comedy/Jonah_Hill.jpg" },
            { name: "Michael Cera", role: "Evan", img: "/comedy/Michael_Cera.jpg" },
        ]
    },
    friends: {
        title: "Friends (1994-2004)",
        description: "Friends is an American sitcom created by David Crane and Marta Kauffman. It follows the lives and relationships of six friends living in Manhattan: Ross, Rachel, Monica, Chandler, Joey, and Phoebe. The show explores themes of friendship, love, and adulthood as the characters navigate their personal and professional lives. Friends became one of the most popular and beloved sitcoms of all time, earning critical acclaim and a dedicated fanbase.",
        trailer: "https://www.youtube.com/embed/IEEbUzffzrk",
        ott: "https://www.netflix.com/in/title/70153404",
        cast: [
            { name: "Jennifer Aniston", role: "Rachel Green", img: "/comedy/Jennifer_Aniston.jpg" },
            { name: "Courteney Cox", role: "Monica Geller", img: "/comedy/Courteney_Cox.jpg" },
        ]
    },
    theOffice: {
        title: "The Office (U.S.) (2005-2013)",
        description: "The Office is an American mockumentary sitcom created by Greg Daniels. It depicts the everyday lives of office employees working at the Scranton, Pennsylvania, branch of the Dunder Mifflin Paper Company. The series employs a unique comedic style, blending humor with moments of sincerity and emotional resonance. The Office received widespread acclaim for its writing, ensemble cast, and portrayal of workplace dynamics.",
        trailer: "https://www.youtube.com/embed/tNcDHWpselE",
        ott: "https://www.netflix.com/in/title/70136120",
        cast: [
            { name: "Steve Carell", role: "Michael Scott", img: "/comedy/Steve_Carell.jpg" },
            { name: "Rainn Wilson", role: "Dwight Schrute", img: "/comedy/Rainn_Wilson.jpg" },
        ]
    },
    parksAndRec: {
        title: "Parks and Recreation (2009-2015)",
        description: "Parks and Recreation is an American mockumentary sitcom created by Greg Daniels and Michael Schur. Set in the fictional town of Pawnee, Indiana, the series follows the quirky employees of the Parks and Recreation Department as they navigate local government bureaucracy and pursue their various passions and projects. Led by the optimistic and enthusiastic Leslie Knope, played by Amy Poehler, the show celebrates friendship, community, and the absurdity of small-town politics.",
        trailer: "https://www.youtube.com/embed/5IZWeAwdJ-s",
        ott: "https://www.primevideo.com/detail/Parks-And-Recreation/0IMOVVKFVSJLZKRHDHZ7HNSWUT",
        cast: [
            { name: "Amy Poehler", role: "Leslie Knope", img: "/comedy/Amy_Poehler.jpg" },
            { name: "Nick Offerman", role: "Ron Swanson", img: "/comedy/Nick_Offerman.jpg" },
        ]
    },
    brooklynNineNine: {
        title: "Brooklyn Nine-Nine (2013-2021)",
        description: "Brooklyn Nine-Nine is an American police procedural comedy television series created by Dan Goor and Michael Schur. Set in the fictional 99th Precinct of the New York City Police Department in Brooklyn, the series follows a team of detectives and their eccentric captain as they solve crimes and navigate the challenges of their personal and professional lives. Known for its diverse cast, witty humor, and heartfelt moments, Brooklyn Nine-Nine became a beloved comedy series during its run.",
        trailer: "https://www.youtube.com/embed/icTOP9F17pU",
        ott: "https://www.netflix.com/in/title/70281562",
        cast: [
            { name: "Andy Samberg", role: "Jake Peralta", img: "/comedy/Andy_Samberg.jpg" },
            { name: "Terry Crews", role: "Terry Jeffords", img: "/comedy/Terry_Crews.jpg" },
        ]
    },
    schittsCreek: {
        title: "Schitt's Creek (2015-2020)",
        description: "Schitt's Creek is a Canadian television sitcom created by Eugene Levy and his son Daniel Levy. The series follows the wealthy Rose family—video store magnate Johnny, his wife and former soap opera actress Moira, and their adult children David and Alexis—who are forced to relocate to Schitt's Creek, a small town they once purchased as a joke. Stripped of their wealth and privilege, the Roses must adjust to their new circumstances and rebuild their lives in the eccentric town they now call home.",
        trailer: "https://www.youtube.com/embed/W0uWS6CnC2o",
        ott: "https://www.netflix.com/in/title/80036165",
        cast: [
            { name: "Eugene Levy", role: "Johnny Rose", img: "/comedy/Eugene_Levy.jpg" },
            { name: "Catherine O'Hara", role: "Moira Rose", img: "/comedy/Catherine_OHara.jpg" },
        ]
    },
};



function showMovieDetails(movieKey) {
    const movie = comedyData[movieKey];

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
