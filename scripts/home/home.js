export function headerColor(){
    const colorsHeader = ["#f3f55f", "#67d9e4", "#b567e4", "#36cf5f"]; // jaune - bleu - violet - vert
    const colorsHeaderBorder = ["#e2d22f", "#46c3cf", "#9d47d1", "#289946"] // pareil
    let date = new Date();
    let minutes = date.getHours() * 60 + date.getMinutes();
    let choice = Math.floor(minutes / 15) % 4;

    document.querySelector("header").style.backgroundColor = colorsHeader[choice];
    document.querySelector("header").style.borderBottom = "5px solid " + colorsHeaderBorder[choice]
}

headerColor()
