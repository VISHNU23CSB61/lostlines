let lostItems = [];

let loginForm = document.getElementById("loginForm");

if(loginForm){
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;

        if(email === "" || password === ""){
            alert("Please fill all login fields");
        } else {
            alert("Login successful");
            window.location.href = "home.html";
        }
    });
}

let registerForm = document.getElementById("registerForm");

if(registerForm){
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("reg-name").value;
        let email = document.getElementById("reg-email").value;
        let password = document.getElementById("reg-password").value;

        if(name === "" || email === "" || password === ""){
            alert("Please fill all registration fields");
        } else {
            alert("Registration successful");
        }
    });
}

let addBtn = document.getElementById("addBtn");

if(addBtn){
    addBtn.addEventListener("click", function(){

        let itemName = document.getElementById("itemName").value;
        let itemLocation = document.getElementById("location").value;
        let itemStatus = document.getElementById("status").value;

        if(itemName === "" || itemLocation === ""){
            alert("Fill all fields");
            return;
        }

        let lostItem = {
            id: Date.now(),
            name: itemName,
            location: itemLocation,
            status: itemStatus
        };

        lostItems.push(lostItem);
        displayItems();

        document.getElementById("itemName").value = "";
        document.getElementById("location").value = "";
    });
}

function displayItems(){

    let itemList = document.getElementById("itemList");
    let itemCount = document.getElementById("itemCount");

    if(!itemList || !itemCount){
        return;
    }

    itemCount.textContent = lostItems.length;
    itemList.innerHTML = "";

    if(lostItems.length === 0){
        itemList.innerHTML = "<li>No items reported yet.</li>";
        return;
    }

    lostItems.forEach(item => {

        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ${item.location} - ${item.status}`;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.addEventListener("click", function(){
            lostItems = lostItems.filter(i => i.id !== item.id);
            displayItems();
        });

        li.appendChild(deleteBtn);
        itemList.appendChild(li);
    });
}

let logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){
    logoutBtn.addEventListener("click", function(){
        window.location.href = "index.html";
    });
}

displayItems();
