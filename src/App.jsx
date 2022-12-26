import React from 'react';
import axios from 'axios';
import './App.css'
import { atom, useRecoilState, selector } from 'recoil';
import FakeProducts from './components/FakeProducts';
import Cart from './components/Cart';

//creating state
const cartState = atom({
  key: "cartState",
  default: []
});

// defining total state with selector method - to compute total price
const cartTotalState = selector({
  key: "cartTotalState",
  get: ({get}) => {
    const cart = get(cartState);

    const total = cart.reduce((prev, curr) => prev + curr.price, 0);

    return {
      total
    }
  }
});

//fetching api with Selector method
const productsQuery = selector({
  key: "Products",
  get: async()=> {
    try {
      const res = await axios('https://fakestoreapi.com/products');
      return res.data || [];
    }
    catch(error) {
      console.log(`Error: \n${error}`);
      return [];
    }
  }
});

const App = () => {
  const [cart, setCart] = useRecoilState(cartState);

  //cart total
  const [{total}, setTotalFromSelector] = useRecoilState(cartTotalState);

  //adding products to the cart
  const AddCartItem = (product) => {
    setCart((cart) => {
        cart.find((item) => item.id === product.id)
        ? cart 
        : [...cart, product]
    })
  }

  //removing product from cart
  const removeCartItem = (product) => {
    setCart((cart) => cart.filter((item) => item.id !== product.id))
  }
  return (
    <div className='container'>
      {/* using react suspense to display "loading" */}
      <React.Suspense fallback={<div>Page Loading...</div>}>
        <FakeProducts onAddCartItem={AddCartItem} productsQuery={productsQuery}/>
      </React.Suspense>

      <div className="floatcart">
        <Cart total={total} setCart={setTotalFromSelector} products={{cart}} onRemoveCartItem={removeCartItem}/>
      </div>
    </div>
  )
}

export default App;