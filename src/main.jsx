import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Error from './pages/Error'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Orders from './pages/Orders'
import SigninAdmin from './pages/AdminSigin'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminAddProduct from './pages/AdminAddProduct'
import AdminEditProduct from './pages/AdminEditProduct'
import AdminAccounts from './pages/AdminAccounts'
import AdminProfile from './pages/AdminProfile'
//env

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error/>
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/orders',
    element: <Orders />
  },
  {
    path: '/orders/:id',
    element: <Order />
  },
  {
    path: '/products',
    element: <Products /> 
  },
  {
    path: 'products/:id',
    element: <Product/>
  },
  {
    path: '/signin-admin',
    element: <SigninAdmin/>
  },
  {
    path:'/admin',
    element: <AdminDashboard />,
    children: [
      {
        path: 'products',
        element: <AdminProducts/>
      },
      {
        path: 'orders',
        element: <Order/>
      },
      {
        path: 'add-product',
        element: <AdminAddProduct/>
      },
      {
        path: 'edit-product/:id',
        element: <AdminEditProduct/>
      },
      {
        path: 'accounts',
        element: <AdminAccounts/>
      },
      {
        path: 'profile',
        element: <AdminProfile/>
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <Toaster position='top-right'/>
  </React.StrictMode>,
)
