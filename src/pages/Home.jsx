import React, { useState } from "react";
import carsData from "@/pages/data.js";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [cars, setCars] = useState(carsData);

  // Function to filter cars based on selected options
  const filterCars = (option, value) => {
    let filteredCars = carsData;
    if (value !== "All") {
      filteredCars = carsData.filter((car) => car[option] === value);
    }
    setCars(filteredCars);
  };

  return (
    <section>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
      <header className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">Car Sales Landing Page</h1>
        <div className="flex justify-center space-x-4 mb-4">
          <select
            className="px-3 py-2 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e) => filterCars("model", e.target.value)}
          >
            <option value="All">All</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
          </select>
          <select
            className="px-3 py-2 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e) => filterCars("maker", e.target.value)}
          >
            <option value="All">All</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            {/* Add more options as needed */}
          </select>
          <select
            className="px-3 py-2 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e) => filterCars("year", parseInt(e.target.value))}
          >
            <option value="All">All</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            {/* Add more options as needed */}
          </select>
          <select
            className="px-3 py-2 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e) => filterCars("location", e.target.value)}
          >
            <option value="All">All</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2">Model</th>
            <th className="px-4 py-2">Maker</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Location</th>
          </tr>
          </thead>
          <tbody className="text-gray-600">
          {cars.map((car) => (
            <tr key={car.id}>
              <td className="border px-4 py-2">{car.model}</td>
              <td className="border px-4 py-2">{car.maker}</td>
              <td className="border px-4 py-2">{car.year}</td>
              <td className="border px-4 py-2">{car.location}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </header>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Torren's Students: All Rights Reserved.</p>
      </footer>
    </div>
    </section>
  )
}
