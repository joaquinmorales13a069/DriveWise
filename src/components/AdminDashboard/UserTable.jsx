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

export default function UserTable() {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data: supabaseData, error } = await supabase
        .from("profiles")
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
  const handleEdit = (user) => {
    console.log(user);  // Debugging to make sure user includes an 'id'
    setEditingUser(user);
    setIsModalOpen(true);
  };
  

  const handleUpdate = async (updatedUser) => {
    if (!updatedUser.id) {
      console.error("Attempted to update user without ID.");
      return;
    }
  
    const { error } = await supabase
      .from("profiles")
      .update(updatedUser)
      .eq("id", updatedUser.id);
  
    if (error) {
      console.log("Error updating user:", error);
    } else {
      setIsModalOpen(false);
      setEditingUser(null);
      setData((prevData) =>
        prevData.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    }
  };
  

  // Handle Delete
  const handleDelete = async (userId) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (error) {
        console.log("Error deleting user:", error);
      } else {
        setData((prevData) => prevData.filter((user) => user.id !== userId));
      }
    }
  };

  // Columns configuration for TanStack Table
  const columns = useMemo(() => [
    { accessorKey: "id", header: "Id", cell: ({ row }) => row.index + 1 },
    { accessorKey: "full_name", header: "Name" },
    { accessorKey: "phone_number", header: "Phone" },
    { accessorKey: "driver_licence", header: "Drivers Licence" },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className={"flex gap-2"}>
          <Button onClick={() => handleEdit(row.original)}>Edit</Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
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
        <Button
          className={"text-sm flex gap-2 w-24"}
          onClick={() => table.previousPage()}
        >
          <span>
            <FaArrowCircleLeft />
          </span>
          <span>Previous</span>
        </Button>
        <Button
          className={"text-sm flex gap-2 w-24"}
          onClick={() => table.nextPage()}
        >
          <span>
            <FaArrowCircleRight />
          </span>
          <span>Next</span>
        </Button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal
          user={editingUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}
// EDIT PROFILE MODAL LOGIC

function EditModal({ user, onClose, onSave }) {
  const [updatedUser, setUpdatedUser] = useState(() => ({
    full_name: user?.full_name || "",
    phone_number: user?.phone_number || "",
    driver_licence: user?.driver_licence || "",
    id: user?.id  // Ensure the ID is preserved
  }));
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedUser);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        <div className="grid gap-4 mb-4">
          {/* Add form inputs */}
          <input
            type="text"
            name="full_name" // Ensure this matches state key
            value={updatedUser.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="phone_number" // Ensure this matches state key
            value={updatedUser.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="driver_licence" // Ensure this matches state key
            value={updatedUser.driver_licence}
            onChange={handleChange}
            placeholder="Drivers Licence"
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
