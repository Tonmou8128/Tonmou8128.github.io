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

