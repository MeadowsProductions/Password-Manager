import Cipher from "./b64kc.obf.js";

// Util functions
function get() {
    return JSON.parse(localStorage.getItem("save")) || null
}
function save(save) {
    if(!save) {
        return console.warn("No save passed, not saving to avoid losing data.");
    }
    localStorage.setItem("save", JSON.stringify(save)); 
}
function print(text) {
    console.log(text);
}
function $(e) {
    return document.querySelector(e);
}
function $$(e) {
    return document.querySelectorAll(e);
}
function commas(num) {
    return parseFloat(num).toLocaleString();
}
function convertExponent(ex) {
    if(ex.includes("+")) {
        const [base, exponent] = ex.split("e+");
        return base + "0".repeat(exponent - 1);
    } else if(ex.includes("-")){
        const [base, exponent] = ex.split("e-");
        return "0." + "0".repeat(exponent - 1) + base;
    } else return ex;
}

// Elements
const saveContainer = $(".save-container");
const newUserContainer = $(".new-user");
const creationContainer = $(".creation-container");
const passChoice = $$(".new-user > input[type=password]");
const passConfirm = $(".new-user > button");
const verifyInput = $(".save-container > .div > input[type=password]")
const verifyButton = $(".save-container > .div > button");
const addButton = $(".creation-container > button");
const siteInput = $(".creation-container > .site");
const userInput = $(".creation-container > .name");
const passInput = $(".creation-container > .pass");
const creationClose = $(".addClose");
const creationOpen = $(".addOpen");

// Main saving
let load = get();

if(load === null) {
    load = {
        pass: "",
        array: {

        }
    }
} else {
    init(load);
}

// ------------------------------

// Actually making the manager function!

// ------------------------------

// User creation
passConfirm.addEventListener("click", () => {
    if(passChoice[0].value != "" && passChoice[1].value != "" && passChoice[0].value === passChoice[1].value && passChoice[0].value.length >= 4) {
        load.pass = Cipher.encode(passChoice[0].value);
        save(load);
        alert("Successfully set password!");
        init();
    } else {
        alert("Password must be atleast 4 characters long, and make sure you put the same password in both of the input containers.");
    }
})

verifyButton.addEventListener("click", () => {
    verify(verifyInput.value);
})

function init() {
    newUserContainer.style.display = "none";
    saveContainer.style.display = "inline-block";  
}

// --------------------------------

// Log In Functions

// --------------------------------

function verify(pass) {
    if(pass === Cipher.decode(load.pass)) {
        $(".div").style.opacity = "0";
        setTimeout(() => {
            $(".div").innerHTML = "";
        }, 500)
        setTimeout(() => {
            update(load)
            $(".div").style.opacity = "1";
        }, 500)
    } else {
        verifyInput.style.borderColor = "#FF0000";
        setTimeout(() => {
            verifyInput.style.borderColor = "rgba(56, 56, 56, 0.521)";
            verifyInput.value = "";
        }, 1000)
    }
}

function update(save) {
    $(".div").innerHTML = "";
    creationOpen.style.display = "inline-block";
    for(const key in save.array) {
        const temp = document.createElement("div");
        const site = document.createElement("h1");
        const name = document.createElement("h1");
        const pass = document.createElement("h1");
        site.innerText = key;
        name.innerText = save.array[key].User;
        pass.innerText = "[Censored]", pass.classList.add("pass");
        temp.classList.add(key);
        temp.classList.add("pass-container");
        temp.appendChild(site);
        temp.appendChild(name);
        temp.appendChild(pass);
        $(".div").appendChild(temp);
        pass.addEventListener("click", () => {reveal(pass, save.array[key].Pass)});
    }
}
function reveal(el, pass) {
    if(el.innerText !== "[Censored]") {
        // Already revealed, copy the password.
        navigator.clipboard.writeText(Cipher.decode(pass));
        el.innerText = "Copied!";
        setTimeout(() => {
            el.innerText = "[Censored]";
        }, 5000)
    }
    el.innerText = "Pass: " + Cipher.decode(pass);
    setTimeout(() => {
        el.innerText = "[Censored]";
    }, 7500)
}

// ----------------------------------

// Adding the password creation functionality.

// ----------------------------------

addButton.addEventListener("click", () => {
    let construct = {
        User: userInput.value,
        Pass: Cipher.encode(passInput.value),
    }
    load.array[siteInput.value] = construct;
    save(load);
})

creationClose.addEventListener("click", () => {
    creationContainer.style.opacity = "0";
    setTimeout(() => {
        creationContainer.style.display = "none";
    }, 333)
    setTimeout(() => {
        saveContainer.style.display = "inline-block";
        saveContainer.style.opacity = "1";
    }, 350)
    update(get());
})

creationOpen.addEventListener("click", () => {
    saveContainer.style.opacity = "0";
    setTimeout(() => {
        saveContainer.style.display = "none";
    }, 333)
    setTimeout(() => {
        creationContainer.style.display = "inline-block";
        creationContainer.style.opacity = "1";
    }, 350)
})