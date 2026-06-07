let lostItems = [];
let loginForm = document.querySelector('form[action="/login"]');
let registerForm = document.querySelector('form[action="/register"]');

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    if (email === "" || password === "") {
        alert("Please fill all login fields");
    } else {
        alert("Login form submitted successfully");
        console.log("Login Email:", email);
    }
});

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("reg-name").value;
    let email = document.getElementById("reg-email").value;
    let password = document.getElementById("reg-password").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill all registration fields");
    } else {
        alert("Registration successful");
        console.log("Name:", name);
        console.log("Email:", email);
    }
});

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function(){

    let itemName =
    document.getElementById("itemName").value;

    let location =
    document.getElementById("location").value;

    let status =
    document.getElementById("status").value;

    if(itemName === "" || location === ""){
        alert("Fill all fields");
        return;
    }

    const item = {
        id: Date.now(),
        name: itemName,
        location: location,
        status: status
    };

    lostItems.push(item);

    displayItems();

});

// Day 5 ES6 Practice

const appName = "LostLink";

console.log(`Welcome to ${appName}`);

const item = {
    name: "ID Card",
    location: "Library",
    status: "Lost"
};

const { name, location, status } = item;

console.log(name);
console.log(location);
console.log(status);

const items = ["ID Card", "Laptop", "Book"];

items.map(item => {
    console.log(item);
});

const newItems = [
    ...items,
    "Charger"
];

console.log(newItems);

const filteredItems =
items.filter(item => item !== "Book");

console.log(filteredItems);

function displayItems(){

    let itemList =
    document.getElementById("itemList");

    itemList.innerHTML = "";

    lostItems.forEach(item => {

        let li =
        document.createElement("li");

        li.innerHTML =
        `${item.name} -
         ${item.location} -
         ${item.status}`;

        itemList.appendChild(li);

    });

}
