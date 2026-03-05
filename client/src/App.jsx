import { useState } from 'react'
import '../public/output.css'
import {
Route,
RouterProvider,
createBrowserRouter,
createRoutesFromElements
} from 'react-router-dom'
import axios from 'axios'

import { AuthProvider } from '../contexts/AuthContext';

import {HomePage} from '../components/HomePage'
import OrderPage from '../components/orderPage'
import CheckOutPage from '../components/CheckOutPage'

const router =  createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/'>
      <Route index element = {<HomePage/>}/>
      <Route path="/order/:foodId" element = {<OrderPage />} />
      <Route path="/CheckOut" element = {<CheckOutPage />} />
    </Route>
  )
)

export default function App() {
  return( 
    <>
      <AuthProvider>
        <RouterProvider router = {router}/>
      </AuthProvider>
    </>
  )
}


