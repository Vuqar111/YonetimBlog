import { lazy } from 'react';


const Settings = lazy(() => import('../pages/Settings'));
const Products = lazy(() => import('../pages/Products/ProductList'));
const Users = lazy(() => import('../pages/Users/UserList'));
const ProductCreate = lazy(() => import('../pages/Products/ProductCreate'));
const ProductEdit = lazy(() => import('../pages/Products/ProductEdit'));
const coreRoutes = [
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/blogs',
    title: 'Products',
    component: Products,
  },
  {
    path: '/blog-create',
    title: 'Products Create',
    component: ProductCreate,
  },
  {
    path: '/blog-edit/:id',
    title: 'Products Edit',
    component: ProductEdit,
  },
  {
    path: '/users',
    title: 'Users',
    component: Users,
  },
];

const routes = [...coreRoutes];
export default routes;
