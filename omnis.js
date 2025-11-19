// ----------[ BACKGROUND ] ----------

document.addEventListener("mousemove", (event) => {
    const blue2 = 255 - (event.x / window.innerWidth) * 255;
    const green = (event.x / window.innerHeight) * 255;

    const red2 = (event.y / window.innerWidth) * 255;
    const blue = 255 - (event.y / window.innerHeight) * 255;

    const angle = 360 - ((event.x + event.y) / (window.innerWidth + window.innerHeight)) * 360;

    document.body.style.setProperty("--bg-color1", `rgba(255, ${green}, ${blue2}, 0.5)`);
    document.body.style.setProperty("--bg-color2", `rgba(${red2}, 255, ${blue}, 0.5)`);
    document.body.style.setProperty("--bg-angle", angle + "deg");

})
