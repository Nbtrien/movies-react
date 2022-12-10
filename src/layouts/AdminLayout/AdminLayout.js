import React from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Routes, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import '../../assets/scss/paper-dashboard.scss?v=1.3.0';
import '../../assets/demo/demo.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import Footer from '../../components/admin/Footer';

import { adminRoutes } from '../../config/routes';

var ps;

const AdminLayout = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = React.useState('black');
    const [activeColor, setActiveColor] = React.useState('info');
    const mainPanel = React.useRef();
    const location = useLocation();
    React.useEffect(() => {
        if (navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(mainPanel.current);
            document.body.classList.toggle('perfect-scrollbar-on');
        }
        return function cleanup() {
            if (navigator.platform.indexOf('Win') > -1) {
                ps.destroy();
                document.body.classList.toggle('perfect-scrollbar-on');
            }
        };
    });
    React.useEffect(() => {
        mainPanel.current.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [location]);
    const handleActiveClick = (color) => {
        setActiveColor(color);
    };
    const handleBgClick = (color) => {
        setBackgroundColor(color);
    };
    return (
        <div className='wrapper'>
            <Sidebar routes={adminRoutes} bgColor={backgroundColor} activeColor={activeColor} />
            <div className='main-panel' ref={mainPanel}>
                <Header />

                {children}

                <Footer fluid />
            </div>
        </div>
    );
};

export default AdminLayout;
