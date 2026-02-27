import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../public/output.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

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
        if (foodRes.status !== 200) throw new Error('Food not found', console.log(foodId, foodRes));
        const foodData = foodRes.data;
        setFood(foodData);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!food) return <div>No food item found</div>;

  return (
    document.title = 'Order Food Online',
    <div className="container mx-auto px-10 py-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold m-4">{food.name}</h1>
        <p className="text-sm md:text-base m-4 font-medium">{food.description}</p>
      </div>

      <div>
        <h1 className="text-lg md:text-xl font-semibold m-4 mt-10">Restaurants serving this item</h1>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-rows-4 rounded-lg p-5'>
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
                              backgroundColor:'red'
                            }
                          }
                          className="w-full h-32 md:h-40 lg:h-48 text-white flex flex-row items-end justify-between lg:px-5 rounded-3xl "
                        >
                      

                  </div>
                  <h2 className="text-base md:text-lg font-semibold p-2">{restaurant.name}</h2>
                  <h2 className="text-xs md:text-sm p-2">⭐ {restaurant.rating} . {food.preparationTime} - {Math.round(Math.random() * 10) + food.preparationTime} mins</h2>
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