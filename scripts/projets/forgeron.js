import * as JSZip from "./jszip.js"

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
    const packVersion = [document.getElementById("packVersion1") ?? 0, document.getElementById("packVersion2") ?? 0, document.getElementById("packVersion3") ?? 0]
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
    itemsBp.push([itemName, itemId, itemIconName, itemCategory]);
    itemsRp.push(itemIcon);
}

function forgeItemJson([itemName, itemId, itemIcon, itemCategory]) {
    const item = {
        format_version: "1.21.90",
        "minecraft:item": {
            description: {
                identifier: itemId,
                menu_category: {
                    category: itemCategory
                }
            },
            components: {}
        }
    };
    return JSON.stringify(item, null, 2);
}

function forgeItemLang(itemName, itemId) {
    return `item.${itemId}=${itemName}`;
}

function forgeCompleteItemLang() {
    let lang = ""
    itemsBp.forEach(item => {
        lang += forgeItemLang(item[0], item[1]) + "\n";
    });
    return lang;
}

function forgePack() {
    let pack = new JSZip();
    zip.file("BP/manifest.json", forgeManifest("data"));
    zip.file("RP/manifest.json", forgeManifest("resources"));
    itemsBp.forEach(item => {
        zip.file(`BP/items/${item[1].split(":")[1]}.json`, forgeItemJson(item));
        zip.file("BP/texts/fr_FR.lang", forgeCompleteItemLang());
    });
    itemsRp.forEach(item => {
        const image = await item.arrayBuffer();
        zip.file(`RP/textures/item/${itemsBp[itemsRp.indexOf(item)][1].split(":")[1]}.png`, image);
        zip.file("RP/texts/fr_FR.lang", forgeCompleteItemLang());
    });
}