function AddItemForm({ onAddItem }) {
    function handleSubmit(event) {
        event.preventDefault();
        const itemName = event.target.elements.itemName.value.trim();
        const location=event.target.location.value;
        const status =even.target.status.value;
        if(itemName===""||loaction===""){
            alert("Please fill in all fields");
            return;
        }
        const newItem={
            id: Date.now(),
            name: itemName,
            location: location,
            status: status

        };
        onAddItem(newItem);
        event.target.reset();
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="itemName" placeholder="Item Nmae" />
            <input type="text" name="location" placeholder="Location" />
            <select name="status">
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
            </select>
            <button type="submit">Add Item</button>
        </form>

    );
}
export default AddItemForm;