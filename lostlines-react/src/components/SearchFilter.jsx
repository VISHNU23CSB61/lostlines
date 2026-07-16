function SearchFilter({
    search,
    setSearch,
    filter,
    setFilter,
    sortOrder,
    setSortOrder
}) {
    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                flexWrap: "wrap"
            }}
        >
            <input
                type="text"
                placeholder="Search Item..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
            </select>
            <select
                value={sortOrder}
                onChange={(e)=>setSortOrder(e.target.value)}
            >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>

            </select>
        </div>
    );
}
export default SearchFilter;