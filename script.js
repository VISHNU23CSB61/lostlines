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

    if(itemName === ""){
        alert("Enter Item Name");
        return;
    }

    let li =
    document.createElement("li");

    li.textContent = itemName;

    document
    .getElementById("itemList")
    .appendChild(li);

    document
    .getElementById("itemName")
    .value = "";
});
