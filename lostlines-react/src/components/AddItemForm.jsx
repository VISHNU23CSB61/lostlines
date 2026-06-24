function AddItemForm({ onAddItem }) {

    function handleSubmit(event) {

        event.preventDefault();

        const itemName =
        event.target.itemName.value.trim();

        const location =
        event.target.location.value.trim();

        const status =
        event.target.status.value;

        if(itemName === "" || location === "") {

            alert("Please fill in all fields");

            return;
        }

        const newItem = {

            id: Date.now(),

            name: itemName,

            location: location,

            status: status

        };

        onAddItem(newItem);

        event.target.reset();
    }

    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="itemName"
                placeholder="Item Name"
            />

            <input
                type="text"
                name="location"
                placeholder="Location"
            />

            <select name="status">

                <option value="Lost">
                    Lost
                </option>

                <option value="Found">
                    Found
                </option>

            </select>

            <button type="submit">

                Add Item

            </button>

        </form>

    );
}

export default AddItemForm;