import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Notification from '../pages/notification';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
