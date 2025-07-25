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
    const manifest = {
        format_version: 2,
        header: {
            name: packName,
            description: packDescription
        },
        modules: []
    }
    JSON.stringify(manifest, null, 2)
}

function forgeItem() {
    const itemName = document.getElementById("itemName").value;
    const itemId = document.getElementById("itemId").value;
    const itemIcon = document.getElementById("itemIcon").files[0];
    const itemIconName = itemIcon.split(":")[1];
}