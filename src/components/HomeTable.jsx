import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/supabase/Client.js";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

export default function HomeTable() {
  const [data, setData] = useState([]);

  // states used for filtering the table
  const [filterMake, setFilterMake] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [search, setSearch] = useState('');

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      let query = supabase.from("cars").select("*");

      if (filterMake) {
        query = query.ilike('make', `%${filterMake}%`);
      }

      if (filterModel) {
        query = query.ilike('model', `%${filterModel}%`);
      }

      const { data: supabaseData, error } = await query;

      if (error) {
        console.log("Error fetching data:", error);
        return;
      }

      setData(supabaseData);
    };
    fetchData();
  }, [filterMake, filterModel]);

  // Filter data based on search bar
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter(car =>
      Object.values(car).some(value =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);



  // Columns configuration for TanStack Table
  const columns = useMemo(() => [
    { accessorKey: "id", header: "Id", cell: ({ row }) => row.index + 1 },
    { accessorKey: "make", header: "Make" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "year", header: "Year" },
    { accessorKey: "price_per_day", header: "Daily Fee" },
    { accessorKey: "location", header: "Location" },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className={"flex gap-2"}>
          <Button variant="destructive" onClick={() => console.log('Book')}>
            Book
          </Button>
        </div>
      ),
    },
  ]);

  // TanStack Table hook
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  return (
    <>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={filterMake}
          onChange={(e) => setFilterMake(e.target.value)}
          placeholder="Filter by Make"
          className="border px-4 py-2 rounded-md"
        />
        <input
          type="text"
          value={filterModel}
          onChange={(e) => setFilterModel(e.target.value)}
          placeholder="Filter by Model"
          className="border px-4 py-2 rounded-md"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="General Search"
          className="border px-4 py-2 rounded-md"
        />
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="px-4 py-2">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody className="text-gray-600 text-center">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border px-4 py-2 justify-center">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div className="pt-3 flex justify-between">
        <Button className={'text-sm flex gap-2 w-24'} onClick={()=> table.previousPage()}>
          <span>
            <FaArrowCircleLeft />
          </span>
          <span>
            Previous
          </span>
        </Button>
        <Button className={'text-sm flex gap-2 w-24'} onClick={() => table.nextPage()}>
          <span>
            <FaArrowCircleRight />
          </span>
          <span>
            Next
          </span>
        </Button>
      </div>
    </>
  );
}
