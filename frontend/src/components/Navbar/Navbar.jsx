import './Navbar.css';

import { Outlet, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => { 
    sessionStorage.clear(); 
    navigate('/login');
  };

  return (
    <>
      <nav>
        <ul className='navbar'>
          <li>
            <Link to="/">Dashboard</Link>
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
        <div onClick={() => handleLogout()}>Logout</div>
      </nav>

      <Outlet />
    </>
  )
};
