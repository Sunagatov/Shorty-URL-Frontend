import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import UrlShortener from './components/UrlShortener';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserAccount from './components/UserAccount';
import UserUrlMappings from './components/UserUrlMappings';
import UrlMappingDetails from './components/UrlMappingDetails';
import Security from './components/Security';
import Dashboard from './components/Dashboard';
import { ROUTES } from './constants';

const App: React.FC = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path={ROUTES.HOME} element={<UrlShortener />} />
                    <Route path={ROUTES.SIGNIN} element={<SignIn />} />
                    <Route path={ROUTES.SIGNUP} element={<SignUp />} />
                    <Route path="/account" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.PROFILE} element={<UserAccount />} />
                    <Route path={ROUTES.SECURITY} element={<Security />} />
                    <Route path={ROUTES.URL_MAPPINGS} element={<UserUrlMappings />} />
                    <Route path="/account/url-mappings/:urlHash" element={<UrlMappingDetails />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default App;
