import React from 'react';
import NotFound from '../components/NotFound';

function PageNotFound() {
    document.title = '404 Page Not Found';
    const body = document.body;
    body.style.overflow = 'hidden';

    const header = document.getElementById('header');
    if (header) header.remove();

    return <NotFound />;
}

export default PageNotFound;
