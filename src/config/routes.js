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
import MyMovies from '../pages/MyMovies';
import DashBoard from '../components/admin/DashBoard';
import AdminLayout from '../layouts/AdminLayout';
import Movie from '../components/admin/Movie';
import Category from '../components/admin/Category/index.js';
import CreateMovie from '../components/admin/CreateMovie';
import { ActorMana } from '../components/admin/Actor';
import CreateActor from '../components/admin/CreateActor';
import User from '../components/admin/User/User';
import UpdateMovie from '../components/admin/UpdateMovie';
import CreateEpisode from '../components/admin/CreateEpisode';
import AddActor from '../components/admin/AddActor/AddActor';
import Series from '../components/admin/Series';
import CreateSeries from '../components/admin/CreateSeries';
import Comment from '../components/admin/Comment';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/category/:category',
        component: Catalog,
    },
    {
        path: '/genre/:genre',
        component: Catalog,
    },
    {
        path: '/search/:key',
        component: Search,
    },
    {
        path: '/movie/:name/:id',
        component: Detail,
    },
    {
        path: '/actor/:name/:id',
        component: Actor,
    },
    {
        path: '/watch/:name/:id/',
        component: Watch,
    },
    {
        path: '/watch/:name/:id/:ep',
        component: Watch,
    },
    {
        path: '/login',
        component: Login,
        layout: LoginLayout,
    },
    {
        path: '/register',
        component: Regsiter,
        layout: LoginLayout,
    },
    {
        path: '*',
        component: PageNotFound,
        layout: null,
    },
];

const privateRoutes = [
    {
        path: '/mymovies',
        component: MyMovies,
    },
];

var adminRoutes = [
    {
        path: '/dashboard',
        name: 'Thống kê',
        icon: 'nc-icon nc-bank',
        component: DashBoard,
        defautpath: '/admin',
        layout: AdminLayout,
        sidebar: true,
    },
    {
        path: '/categories',
        name: 'Danh mục',
        icon: 'nc-icon nc-layout-11',
        component: Category,
        defautpath: '/admin',
        layout: AdminLayout,
        sidebar: true,
    },
    {
        path: '/movies',
        name: 'Phim',
        icon: 'nc-icon nc-globe',
        component: Movie,
        defautpath: '/admin',
        layout: AdminLayout,
        sidebar: true,
    },
    {
        path: '/list',
        name: 'Danh sách xem',
        icon: 'nc-icon nc-bullet-list-67',
        component: Series,
        defautpath: '/admin',
        layout: AdminLayout,
        sidebar: true,
    },
    {
        path: '/actors',
        name: 'Diễn viên',
        icon: 'nc-icon nc-single-02',
        component: ActorMana,
        defautpath: '/admin',
        layout: AdminLayout,
        sidebar: true,
    },
    {
        path: '/comments',
        name: 'Bình luận',
        icon: 'nc-icon nc-paper',
        component: Comment,
        defautpath: '/admin',
        layout: AdminLayout,
        sidebar: true,
    },
    {
        path: '/users',
        name: 'Người dùng',
        icon: 'nc-icon nc-circle-10',
        component: User,
        defautpath: '/admin',
        layout: AdminLayout,
        sidebar: true,
    },
    {
        path: '/movies/create',
        name: 'Phim',
        icon: 'nc-icon nc-globe',
        component: CreateMovie,
        defautpath: '/admin',
        layout: AdminLayout,
    },
    {
        path: '/actors/create',
        name: 'Phim',
        icon: 'nc-icon nc-globe',
        component: CreateActor,
        defautpath: '/admin',
        layout: AdminLayout,
    },
    {
        path: '/movies/update/:name/:id',
        name: 'Phim',
        icon: 'nc-icon nc-globe',
        component: UpdateMovie,
        defautpath: '/admin',
        layout: AdminLayout,
    },
    {
        path: '/movies/create/:name/:id/episode',
        name: 'Phim',
        icon: 'nc-icon nc-globe',
        component: CreateEpisode,
        defautpath: '/admin',
        layout: AdminLayout,
    },
    {
        path: '/movies/update/:name/:id/add-actor',
        name: 'Phim',
        icon: 'nc-icon nc-globe',
        component: AddActor,
        defautpath: '/admin',
        layout: AdminLayout,
    },
    {
        path: '/list/create',
        name: 'Series',
        icon: 'nc-icon nc-globe',
        component: CreateSeries,
        defautpath: '/admin',
        layout: AdminLayout,
    },
];

export { privateRoutes, publicRoutes, adminRoutes };
