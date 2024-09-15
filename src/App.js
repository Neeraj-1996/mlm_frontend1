import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Dashboard from './screen/Dashboard';
import Settings from './screen/Setting';
import Home from './screen/Home'; // Rename to Home
import LoginPage from './screen/Login'; // This will be shown at root "/"
import UserRecords from './screen/User';
import ProductTable from './screen/Product';
import CountryTable from './screen/County';
import EventTable from './screen/Event';

import PlanTable from './screen/Plan';
import LevelTable from './screen/Level';
import SupportTable from './screen/Support';
import FormRegister from './sidebar/FormRegister';
import Reactdnd from './sidebar/Reactdnd';
import Reactpropper from './sidebar/Reactpopper';
import { ProSidebarProvider } from 'react-pro-sidebar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated ? (
          <ProSidebarProvider>
            <Navigation />
            <Routes>
              <Route path="/home" element={<Home />} /> {/* Updated path for Home */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/UserRecords" element={<UserRecords />} />
              <Route path="/ProductTable" element={<ProductTable />} />
              <Route path="/CountryTable" element={<CountryTable />} />
              <Route path="/EventTable" element={<EventTable />} />
              <Route path="/PlanTable" element={<PlanTable />} />
              <Route path="/LevelTable" element={<LevelTable />} />
              <Route path="/Support" element={<SupportTable />} />
              <Route path="/FormRegister" element={<FormRegister />} />
              <Route path="/ReactDnd" element={<Reactdnd />} />
              <Route path="/Reactproper" element={<Reactpropper />} />
              {/* <Route path="/" element={<Navigate to="/home" />} />  */}
            </Routes>
          </ProSidebarProvider>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} /> {/* Login page at root */}
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to login page for undefined routes */}
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
