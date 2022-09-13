import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Information';
import Watch from '../pages/Watch';
import PageNotFound from '../pages/PageNotFound';
import Search from '../pages/Search';
import Actor from '../pages/Actor';
import Login from '../pages/Login';
import LoginLayout from '../layouts/LoginLayout';
import Regsiter from '../pages/Regsiter';

const publicRoutes = [
    {
        path: '/',
        conponent: Home,
    },
    {
        path: '/category/:category',
        conponent: Catalog,
    },
    {
        path: '/genre/:genre',
        conponent: Catalog,
    },
    {
        path: '/search/:key',
        conponent: Search,
    },
    {
        path: '/movie/:name/:id',
        conponent: Detail,
    },
    {
        path: '/actor/:name/:id',
        conponent: Actor,
    },
    {
        path: '/watch/:name/:id/',
        conponent: Watch,
    },
    {
        path: '/watch/:name/:id/:ep',
        conponent: Watch,
    },
    {
        path: '/login',
        conponent: Login,
        layout: LoginLayout,
    },
    {
        path: '/register',
        conponent: Regsiter,
        layout: LoginLayout,
    },
    {
        path: '*',
        conponent: PageNotFound,
        layout: null,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
