let colors = ["brown", "blue", "violet", "green"];

let date = new Date();
let minutes = date.getHours() * 60 + date.getMinutes();
let choice = Math.floor(minutes / 15) % 4

document.querySelector("header").style.backgroundColor = colors[choice]
