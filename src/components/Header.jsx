import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { searchProduct } from '../redux/slices/productSlice';

const Header = ({ insideHome }) => {

  const userWishlist = useSelector(state => state.wishlistReducer);
  const userCart = useSelector(state => state.cartReducer);

  const dispatch = useDispatch()

  return (
    <nav className='flex bg-violet-600 text-white p-5 fixed w-full'>
      <Link to={'/'} className='text-2xl font-bold'><li className='fa-solid fa-truck-fast me-1'></li>Daily Cart</Link>
      <ul className='flex-1 text-right gap-3'>
        {insideHome &&
          <li className='inline-block px-5'><input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} className='border rounded p-2 w-100 bg-white text-black' type="text" placeholder='Seach Products here' /></li>
        }
        <Link to={'/wishlist'}><li className='inline-block px-5'><i className='fa-solid fa-heart text-red-600 mr-2'></i>WishList<span className='bg-black text-white p-1 rounded  ml-2'>{userWishlist?.length}</span></li></Link>
        <Link to={'/cart'}><li className='inline-block px-5'><i className='fa-solid fa-cart-plus text-green-600 mr-2'></i>Cart<span className='bg-black text-white p-1 rounded ml-2'>{userCart?.length}</span></li></Link>
      </ul>
    </nav>
  )
}

export default Header