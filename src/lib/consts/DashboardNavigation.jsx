import { FaHome, FaUser, FaCarSide, FaBookOpen, FaSignOutAlt } from "react-icons/fa";
export const DASHBOARD_SIDEBAR = [
  {
    key: 'home',
    label: 'home',
    path: '/',
    icon: '<FaHome />'
  },
  {
    key: 'users',
    label: 'Users',
    path: '/users',
    icon: '<FaUser />'
  },
  {
    key: 'cars',
    label: 'Cars',
    path: '/cars',
    icon: <FaCarSide />
  },
  {
    key: 'bookings',
    label: 'Bookings',
    path: '/bookings',
    icon: <FaBookOpen />
  }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'logout',
    label: 'Log Out',
    icon: '<FaSignOutAlt />'
  }
]