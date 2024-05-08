<<<<<<< HEAD
import React, { useState } from "react";
import carsData from "@/pages/data.js";
import Navbar from "@/components/Navbar";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
=======
import Navbar from '../components/Navbar'; // Update the path as necessary to correctly point to your Navbar file
>>>>>>> 87ab10ef84b4941324ffaf0246e56b3d3d57c028

export default function Home() {
  return (
    <div>
      <Navbar />
<<<<<<< HEAD
      <div className="mx-auto my-10">Home</div>
      {/* Any additional content for the Home page can go here */}
        <div className="bg-gray-100 min-h-screen">
          <header className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">
              Car Sales Landing Page
            </h1>
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
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Torren's Students: All Rights
              Reserved.
            </p>
          </footer>
        </div>

      <div
        style={{ maxWidth: "750px", minHeight: "200px" }}
        className="mx-auto mt-5"
      >
        <PayPalScriptProvider
          options={{ clientId: "test", components: "buttons", currency: "USD" }}
        >
          <ButtonWrapper showSpinner={false} />
        </PayPalScriptProvider>
      </div>
    </div>
  );
=======
      {/* Any additional content for the Home page can go here */}
      Home
    </div>
  )
>>>>>>> 87ab10ef84b4941324ffaf0246e56b3d3d57c028
}

const style = { layout: "vertical" };

function createOrder() {
  // replace this url with your server
  return fetch(
    "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: "1blwyeo8",
            quantity: 2,
          },
        ],
      }),
    }
  )
    .then((response) => response.json())
    .then((order) => {
      // Your code here after create the order
      return order.id;
    });
}
function onApprove(data) {
  // replace this url with your server
  return fetch(
    "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }
  )
    .then((response) => response.json())
    .then((orderData) => {
      // Your code here after capture the order
    });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
}; 