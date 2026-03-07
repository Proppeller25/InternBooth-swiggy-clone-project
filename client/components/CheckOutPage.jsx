import React from 'react'
import { useState, useEffect } from 'react'
import '../public/output.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'





export default function CheckOutPage () {
  const { user } = useAuth()
  const changeCart = (original, updated) =>  {
    original = updated
    return original
  } 
  let Cart = JSON.parse(localStorage.getItem(`${user?.id}Cart`)) || []

function SaveItem (item, name = String) {
  localStorage.setItem(name, JSON.stringify(item))
}

const calculateTotal = () => {
    let total = 0
    Cart.forEach((item) => {
      total = total + ((item.price * item.items) * 1350)
    })
    return total
  }
  
  function alterQuantity (action, id) {
    const containerDiv = document.querySelector(`#quantityContainer`)
    const reduceButton = document.querySelector('#reduceButton')
    const addButton = document.querySelector('#addButton')
    const quantityDiv = document.querySelector(`#quantityDiv-${id}`)
    const priceDiv = document.querySelector(`#priceDiv-${id}`)
    const subTotalDiv = document.querySelector('#subTotalDiv')
    const grandTotalDiv = document.querySelector('#grandTotalDiv')
    const deliveryFeesDiv = document.querySelector('#deliveryFeesDiv')

    
    containerDiv.dataset.id = id
    Array.from(containerDiv.children).forEach((child) => {
      child.dataset.id = id
    })

    if(action === 'add') {
      if (addButton.dataset.id === quantityDiv.dataset.id) {
        const founditem = Cart.find(item => item.id === id)
        founditem.items++
        quantityDiv.textContent = founditem.items
        priceDiv.textContent = `₦ ${((founditem.price * founditem.items) * 1300).toLocaleString()}`
        grandTotalDiv.textContent = `₦${(Math.round((Number(calculateTotal()) * 5/100) + calculateTotal())).toLocaleString()}`
        subTotalDiv.textContent = `₦ ${calculateTotal().toLocaleString()}`
        deliveryFeesDiv.textContent = `₦ ${(Number(calculateTotal()) * 5/100).toLocaleString()}`
        SaveItem(Cart, `${user?.id}Cart`)
      }
    }

    if (action === 'reduce'){
      if (reduceButton.dataset.id === quantityDiv.dataset.id) {
        const founditem = Cart.find(item => item.id === id)
        founditem.items--
        if(founditem.items > 0){
          quantityDiv.textContent = founditem.items
          priceDiv.textContent = `₦ ${((founditem.price * founditem.items) * 1300).toLocaleString()}`
          grandTotalDiv.textContent = `₦${(Math.round((Number(calculateTotal()) * 5/100) + calculateTotal())).toLocaleString()}`
          subTotalDiv.textContent = `₦ ${calculateTotal().toLocaleString()}`
          deliveryFeesDiv.textContent = `₦ ${(Number(calculateTotal()) * 5/100).toLocaleString()}`
        }

        if (founditem.items < 1) {
          const updatedCart = Cart.filter(item => item.id !== founditem.id) ;
          grandTotalDiv.textContent = `₦${(Math.round((Number(calculateTotal()) * 5/100) + calculateTotal())).toLocaleString()}`
          subTotalDiv.textContent = `₦ ${calculateTotal().toLocaleString()}`
          deliveryFeesDiv.textContent = `₦ ${(Number(calculateTotal()) * 5/100).toLocaleString()}`
          
          containerDiv.remove()
          SaveItem(updatedCart, `${user?.id}Cart`)
        }
      }
    }
    
  }

  return (
    <>
      <div id='containerDiv' className='flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 bg-[#E8E8E8] p-4 sm:p-6 md:p-10 w-full min-h-screen'>
        <div id='cartContent' className='bg-[#FFFFFF] rounded-3xl border border-gray-200 mx-auto text-left p-4 sm:p-6 md:p-8 w-full'>
          <header className='text-lg sm:text-xl md:text-2xl font-semibold py-2 text-gray-800'>
            Your Cart
          </header>
          <hr className='my-3' />
          <div className='space-y-3 sm:space-y-4'>
            {
              Cart.map((item) => {
                return (
                  <div id='quantityContainer' key={item.restaurantId} className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg'>

                    <div id='imageDiv' className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0'>
                      <img src= {`../images/menu/${item.foodName}.png`} alt={item.foodName} className='w-full h-full'/>
                    </div>

                    <div id='foodDiv' className='flex-1 min-w-0'>
                      <div className='text-sm sm:text-base text-gray-800'>
                        {item.foodName} from <strong className='text-[#EB3A20]'>{item.restaurantName}</strong>
                      </div>
                    </div>

                    <div className='border-2 border-gray-300 flex flex-row justify-between items-center gap-3 px-3 py-2 rounded-lg text-gray-700 text-sm'>
                      <button id='reduceButton' className='text-lg sm:text-xl hover:text-[#EB3A20] transition-colors font-bold' onClick={() => alterQuantity('reduce', item.id)}>−</button>
                      <div id={`quantityDiv-${item.id}`} className='font-semibold'>{item.items}</div>
                      <button id='addButton' className='text-lg sm:text-xl hover:text-[#27AE60] transition-colors font-bold'  onClick={() => alterQuantity('add', item.id)}>+</button>
                    </div>

                    <div id= {`priceDiv-${item.id}`} className='text-right font-bold text-base sm:text-lg text-[#EB3A20]'>
                      ₦ {((item.price * item.items) * 1300).toLocaleString()}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div id='checkoutContainer' className='bg-[#FFFFFF] rounded-3xl border border-gray-200 mx-auto text-left w-full lg:min-w-[min-content] max-h-[fit-content] flex flex-col gap-4 sm:gap-5 flex-1'>
          <header className='text-lg sm:text-xl md:text-2xl font-semibold pt-4 sm:pt-6 px-4 sm:px-6 md:px-8 text-gray-800'>
            Checkout
          </header>
          <hr className='my-2' />
          <div className='flex flex-col justify-between px-4 sm:px-6 md:px-8 gap-4'>
            <div className='flex flex-row justify-between items-center'>
              <div  className='text-sm sm:text-base text-gray-700'>Your Cart Subtotal:</div>
              <div id='subTotalDiv' className='font-bold text-base sm:text-lg md:text-xl text-gray-900'>₦ {calculateTotal().toLocaleString()}</div>
            </div>
          </div>

          <div className='flex flex-row justify-between items-center px-4 sm:px-6 md:px-8'>
            <div className='text-sm sm:text-base text-gray-700'>Delivery Fees (5%):</div>
            <div id='deliveryFeesDiv' className='font-bold text-base sm:text-lg md:text-xl text-gray-900'>₦ {(Number(calculateTotal()) * 5/100).toLocaleString()}</div>
          </div>

          <div  className='bg-[#EFEFF3] w-full flex flex-col sm:flex-row sm:justify-between lg:justify-evenly sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 rounded-b-3xl'>
            <div id='grandTotalDiv' className='text-base sm:text-xl md:text-2xl font-bold text-gray-900 flex-1'>₦{(Math.round((Number(calculateTotal()) * 5/100) + calculateTotal())).toLocaleString()}</div>
            <button className='bg-[#EB3A20] text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-[#D62D15] transition-colors w-full sm:w-auto text-sm sm:text-base flex-1'>Checkout</button>
          </div>
          
        </div>

      </div>
      {console.log(Cart)}
    </>
  )
}