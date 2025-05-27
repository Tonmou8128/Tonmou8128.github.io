const colorsHeader = ["#f3f55f", "#67d9e4", "#b567e4", "#36cf5f"];
const colorsHeaderBorder = ["red", "black", "orange", "pink"]

function headerColor(){
    let date = new Date();
    let minutes = date.getHours() * 60 + date.getMinutes();
    let choice = Math.floor(minutes / 15) % 4;

    document.querySelector("header").style.backgroundColor = colorsHeader[choice];
    document.querySelector("header").style.borderBottom = "5px solid " + colorsHeaderBorder[choice]
}

headerColor()
