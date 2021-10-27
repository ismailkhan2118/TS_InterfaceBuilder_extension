const text = document.querySelector("textarea");
const btn = document.querySelector(".convert");
const redo = document.querySelector(".redo");
const outputDiv = document.querySelector(".output");
const errorP = document.querySelector(".msg");
let converted = false;

btn.addEventListener("click", () => {
  let val = text.value;
  const obj = getJson(val); //JSON
  if (!obj) {
    errorP.classList.remove("hide");
    return;
  }

  errorP.classList.add("hide");
  text.classList.add("hide");
  btn.classList.add("hide");
  redo.classList.remove("hide");

  let interface = {};
  for (const key in obj) {
      if(typeof obj[key] == 'object'){
        interface[key] = 'any';
      }else{
        interface[key] = typeof obj[key];
      }
  }

  let str = `interface T{\n`;
  for (const key in interface) {
    str += `\t${key}: ${interface[key]},\n`;
  }
  str += `}`;
  console.log(str);
  outputDiv.textContent = str;
  outputDiv.classList.remove("hide");
});

redo.addEventListener("click", () => {
  text.classList.remove("hide");
  btn.classList.remove("hide");
  redo.classList.add("hide");
  outputDiv.classList.add("hide");
});

function getJson(str) {
  let type;
  try {
    type = JSON.parse(str);
  } catch {
    type = "";
  }
  return type;
}
