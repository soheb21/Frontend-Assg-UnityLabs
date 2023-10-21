
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDataAsync, selectAllData, selectLoading } from '../redux/storeSlice';
import ClipLoader from "react-spinners/ClipLoader";

const override ={display:"grid",borderColor:"orange", margin:"auto"};

const Home = () => {

  const [searchData, setSearchData] = useState("");
  const data = useSelector(selectAllData);
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataAsync(searchData))
  }, [searchData])


  return (

    <>
      <div className="search h-15 -2 flex justify-center items-center bg-orange-400 text-white text-lg">
        <i className="p-2 text-4xl fa-solid fa-magnifying-glass"></i>
        <input className='w-full mr-2 p-2 rounded-md outline-none text-orange-700 font-semibold' onChange={(e) => setSearchData(e.target.value)} type="search" placeholder='search...' />
      </div >

      {
        loading
          ? <ClipLoader
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          : data?.map((item, index) => (

            <div key={index} className="home relative ">

              <Link to={`/${item.objectID}`} className="block max-w-full scroll-smooth p-6 m-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Author: {item.author}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Title: {item.title}</p>
                <p className='font-normal text-orange-700 dark:text-orange-400'>Read More</p>

              </Link>

            </div>

          ))}
    </>
  )
}

export default Home