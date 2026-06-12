let lostItems =
JSON.parse(localStorage.getItem("lostItems")) || [];

let editId = null;

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

        if(editId){
            let itemIndex =
            lostItems.findIndex(item => item.id === editId);

            lostItems[itemIndex] = {
                id: editId,
                name: itemName,
                location: itemLocation,
                status: itemStatus
            };

            editId = null;
            addBtn.textContent = "Add Item";
        }
        else{
            let lostItem = {
                id: Date.now(),
                name: itemName,
                location: itemLocation,
                status: itemStatus
            };

            lostItems.push(lostItem);
        }

        saveItems();
        displayItems();

        document.getElementById("itemName").value = "";
        document.getElementById("location").value = "";
        document.getElementById("status").value = "Lost";
    });
}

function saveItems(){
    localStorage.setItem(
        "lostItems",
        JSON.stringify(lostItems)
    );
}

function getFilteredItems(){

    let searchInput = document.getElementById("searchInput");
    let filterStatus = document.getElementById("filterStatus");

    let searchText = searchInput
        ? searchInput.value.toLowerCase()
        : "";

    let selectedStatus = filterStatus
        ? filterStatus.value
        : "All";

    return lostItems.filter(item => {

        let matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText);

        let matchesStatus =
        selectedStatus === "All" ||
        item.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });
}

function displayItems(){

    let itemList = document.getElementById("itemList");
    let itemCount = document.getElementById("itemCount");

    if(!itemList || !itemCount){
        return;
    }

    let filteredItems = getFilteredItems();

    itemCount.textContent = lostItems.length;
    itemList.innerHTML = "";

    updateStats();

    if(filteredItems.length === 0){
        itemList.innerHTML = "<li>No matching items found.</li>";
        return;
    }

    filteredItems.forEach(item => {

        let li = document.createElement("li");

        li.innerHTML =
        `${item.name} - ${item.location} - ${item.status}`;

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginLeft = "10px";

        editBtn.addEventListener("click", function(){

            document.getElementById("itemName").value = item.name;
            document.getElementById("location").value = item.location;
            document.getElementById("status").value = item.status;

            editId = item.id;
            addBtn.textContent = "Update Item";
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.addEventListener("click", function(){

            lostItems =
            lostItems.filter(i => i.id !== item.id);

            saveItems();
            displayItems();
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        itemList.appendChild(li);
    });
}

function updateStats(){

    let totalCount = document.getElementById("totalCount");
    let lostCount = document.getElementById("lostCount");
    let foundCount = document.getElementById("foundCount");

    if(!totalCount || !lostCount || !foundCount){
        return;
    }

    totalCount.textContent = lostItems.length;

    lostCount.textContent =
    lostItems.filter(item => item.status === "Lost").length;

    foundCount.textContent =
    lostItems.filter(item => item.status === "Found").length;
}

let searchInput = document.getElementById("searchInput");

if(searchInput){
    searchInput.addEventListener("input", function(){
        displayItems();
    });
}

let filterStatus = document.getElementById("filterStatus");

if(filterStatus){
    filterStatus.addEventListener("change", function(){
        displayItems();
    });
}

let logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){
    logoutBtn.addEventListener("click", function(){
        window.location.href = "index.html";
    });
}

displayItems();
