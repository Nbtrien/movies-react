import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import './App.scss';
import { publicRoutes, privateRoutes, adminRoutes } from './config/routes';
import ScrollToTop from './ScrollToTop';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequiredAuth';
import AdminLayout from './layouts/AdminLayout';

const ROLES = {
    User: 'user',
    Admin: 'admin',
};

function App() {
    document.title = 'AC Phim | Phim mới | Phim hay trọn bộ';
    return (
        <Router>
            <div className='App'>
                <ScrollToTop />
                <Routes>
                    <Route element={<PersistLogin />}>
                        {publicRoutes.map((route, index) => {
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {/* private routes */}
                        <Route
                            element={
                                <DefaultLayout>
                                    <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />
                                </DefaultLayout>
                            }
                        >
                            {privateRoutes.map((route, index) => {
                                let Layout1 = Fragment;
                                if (route.layout) {
                                    Layout1 = route.layout;
                                } else if (route.layout === null) {
                                    Layout1 = Fragment;
                                }
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout1>
                                                <Page />
                                            </Layout1>
                                        }
                                    />
                                );
                            })}
                        </Route>
                        {/* Admin Routes */}
                        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                            <Route exact path='/admin' element={<Navigate replace to='/admin/dashboard' />} />
                            {adminRoutes.map((route, key) => {
                                let Layout = Fragment;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                const Page = route.component;
                                return (
                                    <Route
                                        path={route.defautpath + route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                        key={key}
                                    />
                                );
                            })}
                        </Route>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
