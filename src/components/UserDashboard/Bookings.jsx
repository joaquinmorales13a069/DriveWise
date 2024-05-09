// src/components/Bookings.jsx
import React, { useState, useEffect } from 'react';
 
function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Placeholder for fetch logic
    setBookings([{ id: 1, date: '2024-05-08', time: '14:00' }]);
  }, []);

  const handleCancel = (id) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  return (
    
    <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h1> Booking Details</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>
                <button onClick={() => handleCancel(booking.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
