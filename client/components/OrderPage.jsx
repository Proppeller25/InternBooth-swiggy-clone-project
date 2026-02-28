import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../public/output.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Cart, SaveItem } from './Cart';

const OrderPage = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch food details
        const foodRes = await axios.get(`http://localhost:5000/swiggy/findMenuById/${foodId}`);
        if (foodRes.status !== 200) throw new Error('Food not found');
        const foodData = foodRes.data;
        setFood(foodData)

        // 2. Fetch restaurants using the restaurantId array
        if (foodData.restaurantId && foodData.restaurantId.length > 0) {
          const ids = foodData.restaurantId.join(',');
          const restRes = await axios.get(`http://localhost:5000/swiggy/restaurantsById?ids=${ids}`);
          if (restRes.status !== 200) throw new Error('Failed to fetch restaurants');
          const restData = restRes.data;
          setRestaurants(restData);
          console.log(restData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [foodId]);

  if (loading) return (<div class="flex-col gap-4 w-full flex items-center justify-center my-[30%]">
  <div
    class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-[#FF9102] rounded-full"
  >
    <div
      class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-[#8BD801] rounded-full"
    ></div>
  </div>
</div>)

  if (error) return <div>Error: {error}</div>;
  if (!food) return <div>No food item found</div>;

function addToCart (restaurantId, restaurantName) {
  const foodName = food.name
  const price = food.price
  const items = 1

  const existingItem = Cart.find(
  item => item.restaurantId === restaurantId
  );

  if (existingItem) {
    existingItem.items++;
  } else {
    Cart.push({
      foodName,
      restaurantId,
      restaurantName,
      price,
      items
    });
  }
  
  const cartLength = document.getElementById('cartLength')
  cartLength.textContent = `${Cart.length}`

  SaveItem(Cart, 'Cart')
}

  return (
    document.title = 'Order Food Online',
    <div className="container mx-auto px-10 py-4">
      <header className='flex flex-row gap-5 justify-between items-center p-5 shadow-xl rounded-lg border'>
        <div id='LogoIdv'>
          <img src="../images/NaiDeliverLogo.png" alt= "NaiDeliverLogo" className='max-w-[70px] lg:max-w-[90px]'/>
        </div>

        <div className='px-5 flex flex-col'>
           <div id='cartLength' className='font-medium text-center bg-[#FE9101] text-white rounded-full px-2 min-w-[24px]'>{Cart.length}</div>
          <Link to={'/CheckOut'}><i className="fa-solid fa-cart-shopping text-gray-700 hover:text-[#FE9101] text-2xl"></i></Link>
        </div>
      </header>
      <div className='mt-10'>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 m-4">{food.name}</h1>
        <p className="text-sm md:text-base m-4 font-medium">{food.description}</p>
      </div>

      <div>
        <h1 className="text-lg md:text-xl font-semibold m-4 mt-10 border-b-2 border-[#FE9101] inline-block pb-1">Restaurants serving this item</h1>
        <div className='grid grid-rows-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-rows-4 rounded-lg p-5'>
          {
            restaurants.map((restaurant) => {
              return (
                <div key={restaurant._id} className=" m-4  ">
                  <div id='bgImg&Rating'
                          style={
                            {
                              backgroundImage: `url('../images/restaurants/${restaurant.name}.png')`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundColor:'#f3f4f6'
                            }
                          }
                          className="w-full h-32 md:h-40 lg:h-48 text-white flex flex-row items-end justify-between lg:px-5 rounded-3xl "
                        >
                      

                  </div>
                  <div className='flex flex-row justify-between items-center'>
                    <h2 className="text-base md:text-lg font-semibold p-2">{restaurant.name}</h2>
                    <i className="fa-solid fa-cart-plus text-xl text-[#FE9101] hover:text-[#8BD801] pr-5 hover:cursor-pointer" onClick={() => addToCart(restaurant._id, restaurant.name)}></i>
                  </div>
                  
                  <h2 className="text-xs md:text-sm text-gray-600 p-2">⭐ {restaurant.rating} . {food.preparationTime} - {Math.round(Math.random() * 10) + food.preparationTime} mins</h2>
                  <h2 className="text-xs md:text-sm p-2">{restaurant.cuisines.join(', ')}</h2>
                  <p className="text-xs md:text-sm p-2">{restaurant.address.street}, {restaurant.address.city}</p>
                </div>
              )
            })
          }
            
          
        </div>

      </div>
      
    </div>
  )
}

export default OrderPage