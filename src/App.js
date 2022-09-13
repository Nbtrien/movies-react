import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts';
// import './App.scss';
import { publicRoutes } from './config/routes';
import ScrollToTop from './ScrollToTop';

function App() {
    return (
        <Router>
            <div className='App'>
                <ScrollToTop />
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.conponent;
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
