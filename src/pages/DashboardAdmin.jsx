import { Outlet } from "react-router-dom";
import SideBar from "@/components/AdminDashboard/SideBar.jsx";

export default function DashboardAdmin() {
  return (
    <section className={'flex bg-neutral-100 h-screen w-screen'}>
      {/* sidebar */}
      <SideBar />
      {/* main content */}
      <div className="p-8 w-full">
        <Outlet />
      </div>

    </section>
  )
}
