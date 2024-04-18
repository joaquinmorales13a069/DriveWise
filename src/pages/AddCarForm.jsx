import { useState } from 'react'    
import { supabase } from "../supabase/Client"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import App from "../App"
import Navbar from '../components/Navbar'; // Update the path as necessary to correctly point to your Navbar file



export default function AddCarForm() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    pricePerDay: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('cars')
      .insert([
        { ...formData, year: parseInt(formData.year), price_per_day: parseFloat(formData.pricePerDay) },
      ]);

    if (error) {
      console.error('There was an error inserting the data', error);
      return;
    }

    console.log('Car added successfully', data);
    // Reset form or do any other action after successful insert
  };

  return (
   
    <div className="min-h-screen bg-gray-100  items-center justify-center">
        <Navbar /> 
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="make">Car Maker</label>
            <input
              id="make"
              name="make"
              placeholder="e.g., Tesla"
              value={formData.make}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">Car Model</label>
            <input
              id="model"
              name="model"
              placeholder="e.g., Model S"
              value={formData.model}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              name="year"
              placeholder="e.g., 2022"
              value={formData.year}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerDay">Price Per Day</label>
            <input
              id="pricePerDay"
              type="text"
              name="pricePerDay"
              placeholder="e.g., 99.99"
              value={formData.pricePerDay}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              placeholder="e.g., New York"
              value={formData.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Include details like condition, mileage, etc."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-150"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
