// ----------[ TITLE ]----------

const words = ["un Giga Chad", "moi", "un professionnel", "un Être supérieur", "un fan de Shaka Ponk", "le meilleur dev de 2025", "un gars ordinaire"];

const title = document.getElementById("magicTitle");

title.addEventListener("mouseenter", (event) => {
    title.style.transition = "transform 0.1s ease-in-out";
    title.style.transform = `scale(${Math.random() * 0.5 + 1}) rotate(${Math.random() * 20 - 10}deg)`;
    setTimeout(() => {
        title.textContent = words[Math.floor(Math.random() * words.length)];
    }, 150);

});

title.addEventListener("mouseleave", (event) => {
    title.style.transition = "transform 0.1s ease-in-out";
    title.style.transform = "none";
    setTimeout(() => {
        title.textContent = "Tonmou8128";
        title.style.transform = "rotateY(0deg)";
    }, 150);
})
