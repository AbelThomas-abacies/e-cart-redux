import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'


const WishList = () => {
  const userWishlist = useSelector(state => state.wishlistReducer)
     const userCart = useSelector(state => state.cartReducer);
  const dispatch = useDispatch()

 const handleCart = (product) => {
     dispatch(removeItem(product.id))
     dispatch(addToCart(product));
     const existingProduct = userCart?.find(item => item?.id == product.id);
     if (existingProduct) {
       alert("Product quantity is adding");
     } else {
       alert("Product are added to the cart");
     }
   };
  

  return (
    <>
      <Header />
      <div style={{ padding: '120px' }} className="container px-4 mx-auto">

        {userWishlist?.length > 0 ? (
          <>
            <h1 className="font-bold text-red-500 text-4xl mb-6">My Wishlist</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userWishlist.map(item => (
                <div key={item.id} className="rounded shadow p-4 flex flex-col">
                  <img
                    className="w-full h-60 object-cover rounded"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <div className="text-center mt-3">
                    <h1 className="font-bold text-xl mb-2">{item.title}</h1>
                    <div className="flex justify-center gap-6">
                      <button onClick={() => dispatch(removeItem(item?.id))}>
                        <i className="fa-solid fa-heart-circle-plus text-red-600 text-xl" />
                      </button>
                      <button onClick={()=>dispatch(handleCart(item))}>
                        <i className="fa-solid fa-cart-plus text-green-600 text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-bold text-red-400 text-3xl">No items found in Wishlist</h1>
            <img
              width="600px"
              src="https://static.vecteezy.com/system/resources/previews/016/462/240/non_2x/empty-shopping-cart-illustration-concept-on-white-background-vector.jpg"
              alt="Empty cart"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default WishList
