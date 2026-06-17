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
        let itemCategory = document.getElementById("category").value;
        let itemPriority = document.getElementById("priority").value;

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
                status: itemStatus,
                category: itemCategory,
                priority: itemPriority
            };

            editId = null;
            addBtn.textContent = "Add Item";
        } else {
            lostItems.push({
                id: Date.now(),
                name: itemName,
                location: itemLocation,
                status: itemStatus,
                category: itemCategory,
                priority: itemPriority,
                date: new Date().toLocaleString()
            });
        }

        saveItems();
        displayItems();

        document.getElementById("itemName").value = "";
        document.getElementById("location").value = "";
        document.getElementById("status").value = "Lost";
        document.getElementById("category").value = "Electronics";
        document.getElementById("priority").value = "Low";
    });
}

function saveItems(){
    localStorage.setItem("lostItems", JSON.stringify(lostItems));
}

function getFilteredItems(){
    let searchInput = document.getElementById("searchInput");
    let filterStatus = document.getElementById("filterStatus");
    let sortItems = document.getElementById("sortItems");

    let searchText = searchInput ? searchInput.value.toLowerCase() : "";
    let selectedStatus = filterStatus ? filterStatus.value : "All";

    let filteredItems = lostItems.filter(item => {
        let itemName = item.name ? item.name.toLowerCase() : "";
        let itemLocation = item.location ? item.location.toLowerCase() : "";

        let matchesSearch =
        itemName.includes(searchText) ||
        itemLocation.includes(searchText);

        let matchesStatus =
        selectedStatus === "All" ||
        item.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    if(sortItems){
        if(sortItems.value === "newest"){
            filteredItems.sort((a, b) => b.id - a.id);
        } else {
            filteredItems.sort((a, b) => a.id - b.id);
        }
    }

    return filteredItems;
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

        let category = item.category || "Others";
        let priority = item.priority || "Low";

     li.innerHTML =

`
<strong>${item.name}</strong><br>

Location:
${item.location}<br>

Status:
${item.status}<br>

Category:
${item.category}<br>

Priority:
${item.priority}<br>

Reported:
${item.date}
`;

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginLeft = "10px";

        editBtn.addEventListener("click", function(){
            document.getElementById("itemName").value = item.name;
            document.getElementById("location").value = item.location;
            document.getElementById("status").value = item.status;
            document.getElementById("category").value = category;
            document.getElementById("priority").value = priority;

            editId = item.id;
            addBtn.textContent = "Update Item";
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.addEventListener("click", function(){
            lostItems = lostItems.filter(i => i.id !== item.id);
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

function exportCSV(){
    if(lostItems.length === 0){
        alert("No items to export");
        return;
    }

    let csv = "Item,Location,Status,Category,Priority\n";

    lostItems.forEach(item => {
        let category = item.category || "Others";
        let priority = item.priority || "Low";

        csv += `${item.name},${item.location},${item.status},${category},${priority}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "lostitems.csv";
    a.click();
}

let searchInput = document.getElementById("searchInput");

if(searchInput){
    searchInput.addEventListener("input", displayItems);
}

let filterStatus = document.getElementById("filterStatus");

if(filterStatus){
    filterStatus.addEventListener("change", displayItems);
}

let sortItems = document.getElementById("sortItems");

if(sortItems){
    sortItems.addEventListener("change", displayItems);
}

let exportBtn = document.getElementById("exportBtn");

if(exportBtn){
    exportBtn.addEventListener("click", exportCSV);
}

let logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){
    logoutBtn.addEventListener("click", function(){
        window.location.href = "index.html";
    });
}

let darkModeBtn = document.getElementById("darkModeBtn");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

if(darkModeBtn){
    darkModeBtn.addEventListener("click", function(){

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

    });
}
function showMessage(msg){

    let message =
    document.getElementById(
    "message");

    message.textContent = msg;

    setTimeout(() => {

        message.textContent = "";

    },2000);

}

displayItems();
