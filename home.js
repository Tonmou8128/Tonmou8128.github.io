// ----------[ TITLE ]----------

const words = ["un Giga Chad", "moi", "un professionnel", "print('Tonmou8128')", "l'idole de tous", "un gars ordinaire", "un passionné", "un artiste", "un mec cool", "un beau gosse", "le dieu du code", "un gros sing- quoi ??"];

const title = document.getElementById("magicTitle");

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
