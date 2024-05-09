import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../supabase/Client";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

export default function CarsTable() {
  const [data, setData] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data: supabaseData, error } = await supabase
        .from("cars")
        .select("*");

      if (error) {
        console.log("Error fetching data:", error);
        return;
      }

      setData(supabaseData);
    };
    fetchData();
  }, []);

  // Handle Edit
  const handleEdit = (car) => {
    setEditingCar(car);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedCar) => {
    const { error } = await supabase
      .from("cars")
      .update(updatedCar)
      .eq("id", updatedCar.id);

    if (error) {
      console.log("Error updating car:", error);
    } else {
      setIsModalOpen(false);
      setEditingCar(null);
      setData((prevData) =>
        prevData.map((car) => (car.id === updatedCar.id ? updatedCar : car))
      );
    }
  };

  // Handle Delete
  const handleDelete = async (carId) => {
    if (confirm("Are you sure you want to delete this car?")) {
      const { error } = await supabase
        .from("cars")
        .delete()
        .eq("id", carId);

      if (error) {
        console.log("Error deleting car:", error);
      } else {
        setData((prevData) => prevData.filter((car) => car.id !== carId));
      }
    }
  };

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
          <Button onClick={() => handleEdit(row.original)}>Edit</Button>
          <Button variant="destructive" onClick={() => handleDelete(row.original.id)}>Delete</Button>
        </div>
      ),
    },
  ]);

  // TanStack Table hook
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
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
        <tbody className="text-gray-600">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-4 py-2">
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
            Next
          </span>
          <span>
            <FaArrowCircleRight/>
          </span>
        </Button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal
          car={editingCar}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}

function EditModal({ car, onClose, onSave }) {
  const [updatedCar, setUpdatedCar] = useState(car);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedCar);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Edit Car</h2>
        <div className="grid gap-4 mb-4">
          {/* Add form inputs */}
          <input
            type="text"
            name="make"
            value={updatedCar.make}
            onChange={handleChange}
            placeholder="Make"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="model"
            value={updatedCar.model}
            onChange={handleChange}
            placeholder="Model"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="number"
            name="year"
            value={updatedCar.year}
            onChange={handleChange}
            placeholder="Year"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="number"
            name="price_per_day"
            value={updatedCar.price_per_day}
            onChange={handleChange}
            placeholder="Daily Fee"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="location"
            value={updatedCar.location}
            onChange={handleChange}
            placeholder="Location"
            className="border px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
