import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, emptyCart, incrementQuantity, removeCartItem } from '../redux/slices/cartSlice';

const Cart = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userCart = useSelector(state => state.cartReducer);
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    if (userCart?.length > 0) {
      setCartTotal(userCart?.map(item => item.totalPrice).reduce((a1, a2) => a1 + a2))
    }
  }, [userCart])

  const checkout = ()=>{
    dispatch(emptyCart())
    alert("Order Confirmed. Thankyou for the Purchase!!!!")
    navigate("/")
  }

  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='px-5 h-screen'>
        {userCart?.length > 0 ?
          <>
            <h1 className='text-5xl text-blue-600 font-bold'>Cart Summary</h1>
            <div className='grid grid-cols-3 mt-10'>
              <div className='col-span-2 rounded shadow p-5 m-10'>
                <table className='table-auto w-full'>
                  <thead>
                    <tr>
                      <td className='font-semibold'>#</td>
                      <td className='font-semibold'>Name</td>
                      <td className='font-semibold'>Image</td>
                      <td className='font-semibold'>Quantity</td>
                      <td className='font-semibold'>Price</td>
                      <td className='font-semibold'>...</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userCart?.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td><img width={'70px'} height={'70px'} src={item.thumbnail} alt="" /></td>
                          <td>
                            <div className='flex gap-2'>
                              <button onClick={() => dispatch(decrementQuantity(item.id))} className='font-bold text-xl'>-</button>
                              <input className='border-2 w-6 rounded text-center' type="text" value={item?.quantity} readOnly />
                              <button onClick={() => dispatch(incrementQuantity(item.id))} className='font-bold text-xl'>+</button>
                            </div>
                          </td>
                          <td>{item.totalPrice.toFixed(2)}</td>
                          <td><button onClick={() => dispatch(removeCartItem(item.id))} className='text-red-600'>
                            <i className='fa-solid fa-trash'></i>
                          </button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <div className='float-right mt-5'>
                  <button onClick={() => dispatch(emptyCart())} className='bg-red-600 rounded p-2 text-white'>Empty Cart</button>
                  <Link to={'/'} className='bg-blue-600 rounded p-2 text-white ms-5'>Shop More</Link>
                </div>

              </div>
              <div className='col-span-1'>
                <div className='rounded shadow p-5 m-10'>
                  <h2 className='text-2xl font-bold'>Total Amount: <span className='text-red-600'>$ {cartTotal.toFixed(2)}</span></h2>
                  <button onClick={checkout} className='bg-green-500 rounded shadow p-2 w-full mt-8'>Check out</button>
                </div>
              </div>
            </div>
          </>
          :
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-bold text-red-400 text-3xl">No items found in Cart</h1>
            <img
              width="600px"
              src="https://static.vecteezy.com/system/resources/previews/016/462/240/non_2x/empty-shopping-cart-illustration-concept-on-white-background-vector.jpg"
              alt="Empty cart"
            />
          </div>
        }
      </div>
    </>
  )
}

export default Cart