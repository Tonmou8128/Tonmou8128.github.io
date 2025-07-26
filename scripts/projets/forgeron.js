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

function forgeManifest(type) {
    const packName = document.getElementById("packName").value;
    const packDescription = document.getElementById("packDescription").value;
    const packVersion = [parseInt(document.getElementById("packVersion1").value ?? 0), parseInt(document.getElementById("packVersion2").value ?? 0), parseInt(document.getElementById("packVersion3").value ?? 0)]
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
    console.log("AddItem");
    const itemName = document.getElementById("itemName").value;
    const itemId = document.getElementById("itemId").value;
    const itemIcon = document.getElementById("itemIcon").files[0];
    const itemIconName = itemId.split(":")[1];
    const itemCategory = document.getElementById("itemCategory").value;
    console.log("🧪 Icône sélectionnée :", itemIcon);
    if (!itemName || !itemId || !itemIcon || !itemCategory) {
        alert("Tous les champs doivent être remplis, y compris l’icône !");
        return;
    };
    itemsBp.push([itemName, itemId, itemIconName, itemCategory]);
    itemsRp.push(itemIcon);
    console.log("🧱 itemsRp :", itemsRp);
}

function forgeItemJson([itemName, itemId, itemIcon, itemCategory]) {
    const item = {
        format_version: "1.21.90",
        "minecraft:item": {
            description: {
                identifier: itemId,
                category: itemCategory
            },
            components: {
                "minecraft:icon": itemId
            }
        }
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

async function forgePack() {
    console.log("Download");
    window.JSZip = JSZip;
    let pack = new JSZip();
    pack.file("BP/manifest.json", forgeManifest("data"));
    pack.file("RP/manifest.json", forgeManifest("resources"));
    itemsBp.forEach(item => {
        pack.file(`BP/items/${item[1].split(":")[1]}.json`, forgeItemJson(item));
        pack.file("BP/texts/fr_FR.lang", forgeCompleteItemLang());
    });
    for (let item of itemsRp) {
        console.log("📸 Image type :", item.type);
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