import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../supabase/Client";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"

export default function CarsTable() {
  const [data, setData] = useState([])

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const {data: supabaseData, error} = await supabase
        .from('cars')
        .select('*')

      if (error){
        console.log('Error fetching data:', error)
        return
      }

      setData(supabaseData)
    }
    fetchData()
  }, []);

  // Columns configuration for TanStack Table
  const columns = useMemo(
    () => [
      {accessorKey: 'id', header: 'Id'},
      {accessorKey: 'make', header: 'Make'},
      {accessorKey: 'model', header: 'Model'},
      {accessorKey: 'year', header: 'Year'},
      {accessorKey: 'price_per_day', header: 'Daily Fee'},
      {accessorKey: 'location', header: 'Location'},
      {accessorKey: 'actions', header: 'Actions',
      cell: ({row}) => (
        <div className={'flex gap-2'}>
          <Button>Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      )},
    ]
  )

  // TanStack Table hook
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel()})

  return (
    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-200 text-gray-700">
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
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
      <tbody className="text-gray-600">
      {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id} className="border">
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
}
