import './App.css';
import { useState ,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask'; 
import Report from './pages/Report';
import ListTasks from './pages/ListTasks';

import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* LOGIN PAGE*/}
          <Route path="/" element={<LoginPage onLogin={() => handleLogin(true)} />} />

        
          <Route
            path="/"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Navbar />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addtask" element={<AddTask />} />
            <Route path="listtask" element={<ListTasks />} />
            <Route path="report" element={<Report />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;