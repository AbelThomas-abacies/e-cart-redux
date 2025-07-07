import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const View = () => {

  const dispatch = useDispatch()
  const userWishlist = useSelector(state => state.wishlistReducer);
   const userCart = useSelector(state => state.cartReducer);
  console.log(userWishlist);

  const { id } = useParams()
  console.log(id);

  const [product, setProduct] = useState({});
  console.log(product);

  useEffect(() => {
    if (sessionStorage.getItem('allProducts')) {
      const allProducts = JSON.parse(sessionStorage.getItem('allProducts'))
      const selectedItem = allProducts.find(item => item.id == id)
      // console.log(selectedItem);
      setProduct(selectedItem)
    }
  }, [])

  const handleWishlist = () => {
    const existingProduct = userWishlist?.find(item => item?.id == id);
    if (existingProduct) {
      alert("Product already added to your wishlist");
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleCart = () => {
    dispatch(addToCart(product));
    const existingProduct = userCart?.find(item => item?.id == id);
    if (existingProduct) {
      alert("Product quantity is adding");
    } else {
      alert("Product are added to the cart");
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: '150px' }} className='mx-5 pt-28 px-4 md:px-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
          {/* Image Section */}
          <div className="flex flex-col items-center sm:items-start gap-5">
            <img
              className="w-full max-w-xs aspect-square object-cover rounded shadow"
              src={product?.thumbnail}
              alt={product?.title}
            />

            <div className="flex flex-col sm:flex-row gap-3 w-full ml-5">
              <button onClick={handleWishlist} className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
                Add to Wishlist
              </button>
              <button onClick={handleCart} className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className='flex flex-col gap-3'>
            <h1 className='font-semibold text-gray-500'>PID: {product?.id}</h1>
            <h1 className='text-3xl md:text-4xl font-bold'>{product?.title}</h1>
            <h4 className='text-2xl text-red-500 font-bold'>${product?.price}</h4>
            <h4 className='text-lg'>Brand: {product?.brand}</h4>
            <h4 className='text-lg'>Category: {product?.category}</h4>
            <p className='leading-relaxed'>
              <span className='font-bold'>Description:</span> {product?.description}
            </p>
            <div className='flex flex-col gap-2 shadow rounded mt-3 p-5'>
              <h3 className='font-bold text-2xl'>Client Reviews</h3>
              {
                product?.reviews?.length > 0 ?
                  product?.reviews?.map((item,index) => (
                    <div key={item?.index}>
                      <h5>
                        <span className='font-bold'>{item?.reviewerName}: </span><span>{item?.comment}</span>
                      </h5>
                      <p>Rating: <span className='ml-1'>{item?.rating}</span><i className='fa-solid fa-star text-amber-300 ml-1'></i></p>
                    </div>
                  ))
                  :
                  <p>No Reviews yet...</p>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default View