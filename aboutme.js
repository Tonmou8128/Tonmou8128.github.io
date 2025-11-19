const images = [...document.getElementsByClassName("icon")]
const infos = [...document.getElementsByClassName("infos")]

images.forEach(element => {
    element.addEventListener("click", (event) => {
        document.getElementById(element.id.replace("Icon", "").concat("Infos")).classList.add("visible");
        images.forEach(element => {
            element.classList.add("hidden");
        });
    });
});

infos.forEach(element => {
    element.addEventListener("click", (event) => {
        images.forEach(image => {
            element.classList.remove("visible");
            image.classList.remove("hidden");
        });
    });
});
