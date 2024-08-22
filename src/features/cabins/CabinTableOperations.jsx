
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
                
            ]} />
        </TableOperations>
    )
}

export default CabinTableOperations
