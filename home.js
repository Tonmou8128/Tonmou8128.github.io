// ----------[ TITLE ]----------

const words = ["un Giga Chad", "moi", "un professionnel", "print('Tonmou8128')", "l'idole de tous", "un gars ordinaire", "un passionné", "un artiste", "un mec cool", "un beau gosse", "le dieu du code", "un gros sing- quoi ??"];

const title = document.getElementById("magicTitle");

const spotifyDiv = document.getElementById("spotifyDiv");
const spotifyIcon = document.getElementById("spotifyCover");
const spotifyTitle = document.getElementById("spotifyTitle");
const spotifyAuthors = document.getElementById("spotifyAuthors");
const spotifyTrackLine = document.getElementById("spotifyTrackLine");
const spotifyTimeListened = document.getElementById("spotifyTimeListened");
const spotifyTotalTime = document.getElementById("spotifyTotalTime");


const currentTrack = await getCurrentTrack();

async function getCurrentTrack() {
    let track = await fetch("https://tonmou-api.vercel.app/api/spotify");
    track = await track.json();
    return track;
}

if (currentTrack["is_playing"]) {
    spotifyDiv.classList.remove("hidden");
    spotifyIcon.src = currentTrack["album"];
    spotifyTitle.textContent = currentTrack["title"];
    spotifyAuthors.textContent = currentTrack["authors"];
    spotifyTrackLine.style.background = `linear-gradient(to right, white ${(currentTrack["time_listened"]/currentTrack["total_time"]) * 100}%, gray ${(currentTrack["time_listened"]/currentTrack["total_time"]) * 100}%)`
    spotifyTimeListened.textContent = `${Math.floor((currentTrack["time_listened"] / 1000 / 60))}:${Math.floor((currentTrack["time_listened"] / 1000) % 60).toString().padStart(2, "0")}`;
    spotifyTotalTime.textContent = `${Math.floor((currentTrack["total_time"] / 1000 / 60))}:${Math.floor((currentTrack["total_time"] / 1000) % 60).toString().padStart(2, "0")}`;
}

title.addEventListener("mouseenter", (event) => {
    title.style.transition = "transform 0.1s ease-in-out";
    title.style.transform = `scale(${Math.random() * 0.5 + 1}) rotate(${Math.random() * 20 - 10}deg)`;
    title.style.animation = "breathe 2s infinite ease-in-out";
    setTimeout(() => {
        title.textContent = words[Math.floor(Math.random() * words.length)];
    }, 150);

});

title.addEventListener("mouseleave", (event) => {
    title.style.transition = "transform 0.1s ease-in-out";
    title.style.transform = "none";
    title.style.animation = "none";
    setTimeout(() => {
        title.textContent = "Tonmou8128";
        title.style.transform = "rotateY(0deg)";
    }, 150);
})
