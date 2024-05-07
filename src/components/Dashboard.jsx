import Sidebar from '../components/Sidebar'; // Update the path as necessary to correctly point to your Navbar file
import Navbar from '../components/Navbar'; // Update the path as necessary to correctly point to your Navbar file

import UserInfo from '../components/UserInfo';
import Bookings from '../components/Bookings';
export default function Home() {
  return (
    <div>
        <Navbar />
        <div >
        <h1>User Dashboard</h1>
        </div>
      <Sidebar />
      {/* Any additional content for the Home page can go here */}
    
    </div>
  )
}
