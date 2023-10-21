import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDataAsync, selectAllData, selectLoading } from '../redux/storeSlice';


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
          ? <h1>Loading...</h1>
          : data?.map((item, index) => (

            <div key={index} className="home">
              <Link to={`/${item.objectID}`}>
                <h1>Author: {item.author}</h1>
                <br />
                <p>Title: {item.title}</p>
              </Link>
            </div>

          ))}
    </>
  )
}

export default Home