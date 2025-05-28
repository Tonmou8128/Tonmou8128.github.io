export function headerColor(){
    const colorsHeader = ["#f3f55f", "#67d9e4", "#b567e4", "#36cf5f"]; // jaune - bleu - violet - vert
    const colorsHeaderBorder = ["#e2d22f", "#46c3cf", "#9d47d1", "#289946"] // pareil
    let date = new Date();
    let choice = Math.floor(date.getMinutes() / 15);
    document.querySelector("header").style.backgroundColor = colorsHeader[choice];
    document.querySelector("header").style.borderBottom = "5px solid " + colorsHeaderBorder[choice]
}

function iconColor(){
    const colorsHeader = ["#f3f55f", "#67d9e4", "#b567e4", "#36cf5f"];
    let date = new Date();
    let choice = Math.floor(date.getMinutes() / 15);
    document.querySelector(".icon").style.border = "5px solid " + colorsHeader[choice]
}

headerColor();

iconColor();