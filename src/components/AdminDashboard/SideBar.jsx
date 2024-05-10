import { Link } from "react-router-dom"
import DriveWise from "@/assets/DriveWise_logo.png"
import { DASHBOARD_SIDEBAR, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "@/lib/consts/DashboardNavigation.jsx";
import {Button} from "@/components/ui/button.jsx";

function SideBar(props) {
  return (
    <div className={'bg-neutral-700 w-60 p-3 flex flex-col text-white'}>
      <div className={'flex items-center gap-2 px-1 py-3'}>
        <img src={DriveWise}/>
      </div>
      {/*Top section*/}
      <div className={'flex-1 flex flex-col justify-between'}>
        <nav className={'flex flex-col pt-3 gap-5'}>
          {DASHBOARD_SIDEBAR.map((link) => (
            <Link key={link.key} to={link.path} className={'flex gap-2 items-center'}>
              <span>{link.icon}</span>
              <span className={'text-xl'}>{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className={'flex'}>
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
            <Button key={link.key} className={'gap-2 text-base bg-neutral-700 hover:bg-neutral-500'} onClick={props.logOut}>
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Button>
          ))}
        </div>
      </div>
      {/*Bottom section*/}
      <div>

      </div>
    </div>
  );
}

export default SideBar;
