const colorsHeader = ["brown", "blue", "violet", "green"];
const colorsHeaderBorder = ["red", "black", "orange", "pink"]

let date = new Date();
let minutes = date.getHours() * 60 + date.getMinutes();
let choice = Math.floor(minutes / 15) % 4

document.querySelector("header").style.backgroundColor = colorsHeader[choice]
document.querySelector("header").style.borderBottom = "5px solid ${colorsHeaderBorder[choice]}"
