import {
    Search,
    Filter,
    ArrowUpDown
} from "lucide-react";

import "./SearchFilter.css";

function SearchFilter({
    search,
    setSearch,
    filter,
    setFilter,
    sortOrder,
    setSortOrder
}) {

    return (

        <div className="search-filter-container">

            {/* Search */}

            <div className="search-box">

                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            {/* Filter */}

            <div className="select-box">

                <Filter size={18} />

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                >

                    <option value="All">All Items</option>

                    <option value="Lost">Lost</option>

                    <option value="Found">Found</option>

                    <option value="Recovered">Recovered</option>

                </select>

            </div>

            {/* Sort */}

            <div className="select-box">

                <ArrowUpDown size={18} />

                <select
                    value={sortOrder}
                    onChange={(e) =>
                        setSortOrder(e.target.value)
                    }
                >

                    <option value="Newest">
                        Newest First
                    </option>

                    <option value="Oldest">
                        Oldest First
                    </option>

                </select>

            </div>

        </div>

    );

}

export default SearchFilter;