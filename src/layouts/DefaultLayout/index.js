import Header from './Header';
import Footer from './Footer';

import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className='content'>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
