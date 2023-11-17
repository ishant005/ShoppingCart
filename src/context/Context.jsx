import React, { createContext, useContext,useReducer } from 'react';
import { cartReducer } from './Reducers';
import { productReducer } from './Reducers';

faker.seed(99);
import { faker } from '@faker-js/faker';

const Cart=createContext();


const Context = ({children}) => {

    const products = [...Array(20)].map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
       
        inStock: faker.number.int({ min: 0, max: 10 }),
        fastDelivery: faker.datatype.boolean(),
        // ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
        ratings:faker.number.int({ min: 1, max: 10 })
      }));

      const[state,dispatch]=useReducer(cartReducer,{
        products:products,
        cart:[]
      })

      const[productState,productDispatch]=useReducer(productReducer,{
        byStock:false,
        byFastDelivery:false,
        byRating:0,
        searchQuery:"",
        // wishlist: [],
      })
     
  return (
    <Cart.Provider value={{state,dispatch,productState,productDispatch}}>
      {children}
    </Cart.Provider>
  )
}

export const CartState=()=>{
    return useContext(Cart)
}
export default Context;