
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";


function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter filterField={"discount"} options={[{ value: "all", label: "All" }, { value: "with-discount", label: "With Discount" }, { value: "no-discount", label: "No Discount" }]} />
            <SortBy options={[
                {value: "name-asc", label: "Sort by name (a-z)"},
                {value: "name-desc", label: "Sort by name (z-a)"},
                {value: "capacity-asc", label: "Sort by capacity (low to high)"},
                {value: "capacity-desc", label: "Sort by capacity (high to low) "},
                {value: "regularPrice-asc", label: "Sort by price (low to high)"},
                {value: "regularPrice-desc", label: "Sort by price (high to low)"},
            ]} />
        </TableOperations>
    )
}

export default CabinTableOperations
