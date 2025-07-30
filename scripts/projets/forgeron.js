import JSZip from "https://esm.sh/jszip";
import saveAs from "https://esm.sh/file-saver";

let itemsBp = [];
let itemsRp = [];

function uuid() {
  const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  const choicex = "0123456789abcdef".split("");
  const choicey = "89ab".split("");
  let newUuid = "";
  template.forEach(x => {
    if (x === "x") {
      newUuid += choicex[Math.floor(Math.random() * 16)];
    }
     else if (x === "y") {
      newUuid += choicey[Math.floor(Math.random() * 4)]
    }
    else {
      newUuid += x;
    }
  })
  return newUuid;
}

function changeSubMenu(value) {
    document.querySelectorAll(".subMenu").forEach(menu => {
        menu.style.display = "none";
    });
    switch (value) {
        case "construction":
            document.getElementById("constructionSubMenu").style.display = "block";
            break;
        case "equipment":
            document.getElementById("equipmentSubMenu").style.display = "block";
            break;
        case "items":
            document.getElementById("itemsSubMenu").style.display = "block";
            break;
        case "nature":
            document.getElementById("natureSubMenu").style.display = "block";
            break;
        default:
            break;
    };
}

function forgeManifest(type) {
    const packName = document.getElementById("packName").value;
    const packDescription = document.getElementById("packDescription").value;
    const packVersion = [parseInt(document.getElementById("packVersion1").value), parseInt(document.getElementById("packVersion2").value), parseInt(document.getElementById("packVersion3").value)];
    const manifest = {
        format_version: 2,
        header: {
            name: packName,
            description: packDescription,
            uuid: uuid(),
            version: packVersion,
            min_engine_version: [1, 16, 0]
        },
        modules: [{
            type: type,
            uuid: uuid(),
            version: packVersion
        }]
    }
    return JSON.stringify(manifest, null, 2)
}

function addItem() {
    const itemName = document.getElementById("itemName").value;
    const itemId = document.getElementById("itemId").value;
    const itemIcon = document.getElementById("itemIcon").files[0];
    const itemIconName = itemId.split(":")[1];
    const itemCategory = document.getElementById("itemCategory").value;
    const itemGroup = document.getElementsByClassName("subMenu")[0].value;
    if (!itemName || !itemId || !itemIcon || !itemCategory) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    };
    itemsBp.push([itemName, itemId, itemIconName, itemCategory, itemGroup ?? null]);
    itemsRp.push(itemIcon);
    alert("Item ajouté avec succès.")
}

function forgeItemJson([itemName, itemId, itemIcon, itemCategory, itemGroup]) {
    let item = {
        format_version: "1.21.90",
        "minecraft:item": {
            description: {
                identifier: itemId,
                menu_category: {
                    category: itemCategory
                }
            },
            components: {
                "minecraft:icon": itemId
            }
        }
    };
    if (itemGroup !== null) {
        item["minecraft:item"].description.menu_category.group = itemGroup;
    };
    return JSON.stringify(item, null, 2);
}

function forgeItemLang(itemName, itemId) {
    return `item.${itemId}.name=${itemName}`;
}

function forgeCompleteItemLang() {
    let lang = "";
    itemsBp.forEach(item => {
        lang += forgeItemLang(item[0], item[1]) + "\n";
    });
    return lang;
}

function forgeItemTexture() {
    let itemTexture = {
        resource_pack_name: document.getElementById("packName").value,
        texture_name: "atlas.items",
        texture_data: {}
    };
    itemsBp.forEach(item => {
        itemTexture.texture_data[item[1]] = {textures: `textures/items/${item[1].split(":")[1]}`}
    });
    return JSON.stringify(itemTexture, null, 2);
}

function readyToForge() {
    const packName = document.getElementById("packName").value;
    const packDescription = document.getElementById("packDescription").value;
    const packVersion = [parseInt(document.getElementById("packVersion1").value), parseInt(document.getElementById("packVersion2").value), parseInt(document.getElementById("packVersion3").value)];
    const packIcon = document.getElementById("packIcon").files[0];
    if (packName == undefined || packDescription == undefined || isNaN(packVersion[0]) || isNaN(packVersion[1]) || isNaN(packVersion[2]) || packIcon == undefined) return false;
    else return true;
}

async function forgePack() {
    if (!readyToForge()) {
        alert("Veuillez remplir tous les champs de la section principale.");
        return;
    };
    window.JSZip = JSZip;
    let pack = new JSZip();
    pack.file("BP/manifest.json", forgeManifest("data"));
    pack.file("RP/manifest.json", forgeManifest("resources"));
    pack.file("BP/pack_icon.png", document.getElementById("packIcon").files[0]);
    pack.file("BP/pack_icon.png", document.getElementById("packIcon").files[0]);
    itemsBp.forEach(item => {
        pack.file(`BP/items/${item[1].split(":")[1]}.json`, forgeItemJson(item));
        pack.file("BP/texts/fr_FR.lang", forgeCompleteItemLang());
    });
    for (let item of itemsRp) {
        const image = await item.arrayBuffer();
        pack.file(`RP/textures/items/${itemsBp[itemsRp.indexOf(item)][1].split(":")[1]}.png`, image);
        pack.file("RP/texts/fr_FR.lang", forgeCompleteItemLang());
        pack.file("RP/textures/item_texture.json", forgeItemTexture());
    };
    pack.generateAsync({type: "blob"}).then(blob => {
        saveAs(blob, `${document.getElementById("packName").value}.mcaddon`);
    })
}

document.querySelector("button#download").addEventListener("click", forgePack);
document.querySelector("button#addItem").addEventListener("click", addItem);
document.getElementById("itemCategory").addEventListener("change", function() {changeSubMenu(this.value)});
