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
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
