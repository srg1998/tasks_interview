import './Navbar.css';

import { Outlet, Link } from "react-router-dom";

export default function Navbar () {
  return (
    <>
      <nav>
        <ul className='navbar'>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/listtask">List</Link>
          </li>
          <li>
            <Link to="/addtask">Add</Link>
          </li>
          <li>
            <Link to="/report">Report</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};
 