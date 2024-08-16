import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getAllCabins } from "../../services/cabinsAPI";
import Spinner from "../../ui/Spinner";
import AddCabin from "./AddCabin";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  height: auto;
  width: 100%;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });
  

  const [searchParams] = useSearchParams();
  
  const filteredValue = searchParams.get("discount") || "all"


  if (isLoading) return <Spinner />;

  let filteredCabin;

if(filteredValue === "all") filteredCabin = cabins;
if(filteredValue === "with-discount") filteredCabin = cabins.filter((cabin) => cabin.discount > 0);
if(filteredValue === "no-discount") filteredCabin = cabins.filter((cabin) => cabin.discount === 0);  

//2 sort

const sortBy = searchParams.get("sortBy") || "startDate-asc";
const [field, direction] = sortBy.split("-");
const modifier = direction === "asc" ? 1 : -1;
const sortedCabin = filteredCabin.sort((a, b) => (a[field] - b[field]) * modifier);


  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>

        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Quantity{}: {filteredCabin.length}</div>
      </TableHeader>
      {sortedCabin.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}

      <AddCabin />

    </Table>
  );
}

export default CabinTable;
