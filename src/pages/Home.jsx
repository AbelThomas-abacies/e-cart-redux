import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { allProducts, loading } = useSelector((state) => state.productReducer)

  const [currentPage, setCurrentPage] = useState(1)

  const productsPerPage = 12
  const totalPages = Math.ceil(allProducts.length / productsPerPage)
  const currentPageLastIndex = currentPage * productsPerPage
  const currentPageFirtIndex = currentPageLastIndex-productsPerPage
  const visibleAllProducts = allProducts?.slice(currentPageFirtIndex,currentPageLastIndex)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const navigateToNextPage = ()=>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  const navigateToPreviousPage = ()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }
  
  return (
    <>
      <Header insideHome />
      {/* px‑4 on mobile → md:px‑8 → lg:px‑12 for nicer margins */}
      <div className="container mx-auto pt-24 px-4 md:px-8 lg:px-12">
        {loading ? (
          <div className="flex justify-center items-center my-10 gap-3 text-lg">
            <img
              src="https://media.tenor.com/IfbOs_yh89AAAAAM/loading-buffering.gif"
              alt="loading"
              className="w-14 h-14"
            />
            Loading…
          </div>
        ) : (
          <>
            {allProducts?.length ? (
              /* 1 / 2 / 3 / 4 columns at different breakpoints */
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {visibleAllProducts.map((product) => (
                  <div key={product.id} className="rounded shadow p-4 flex flex-col">
                    {/* aspect‑square keeps images neat; `object-cover` prevents stretch */}
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full aspect-square object-cover rounded"
                    />

                    <div className="text-center mt-4 flex flex-col flex-1">
                      <h1 className="font-semibold text-lg mb-2 truncate">{product.title}</h1>

                      {/* Push button to the bottom on tall cards */}
                      <div className="mt-auto">
                        <Link
                          to={`${product.id}/view`}
                          className="inline-block bg-violet-500 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded transition-colors"
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-2xl text-center text-amber-900 py-20">
                No Products Found
              </p>
            )}
          </>
        )}
      </div>
      <div className='text-center font-bold text-2xl mt-20'>
        <span onClick={navigateToPreviousPage} className='cursor-pointer'><i className='fa-solid fa-backward me-5'></i></span>
        <span>{currentPage} of {totalPages}</span>
        <span onClick={navigateToNextPage} className='cursor-pointer'> <i className='fa-solid fa-forward me-5'></i></span>
      </div>
    </>
  )
}

export default Home
