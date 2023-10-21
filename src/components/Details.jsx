import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataDetailAsync, selectDataDetail, selectLoading } from '../redux/storeSlice';
import ClipLoader from "react-spinners/ClipLoader";
const override = { display: "grid", borderColor: "orange", margin: "auto" };

const Details = () => {
    const param = useParams();
    const dataDetail = useSelector(selectDataDetail);
    const loading = useSelector(selectLoading);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDataDetailAsync(param))
    }, [])
    if (loading) {
        return <ClipLoader
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    }
    return (
        <div className='dark:bg-gray-800 p-4'>
            <h2 className='bg-orange-600 text-white mb-2 p-2 text-2xl'><span className='text-3xl font-bold mr-2'>Title :</span>{dataDetail?.title}</h2>
            <h2 className='bg-orange-500 text-white p-2 text-xl'><span className='text-3xl font-bold mr-2'>Points :</span>{dataDetail?.points}</h2>
            {
                dataDetail && dataDetail.children.map((item, index) => (

                    <div key={index} className="max-w-full p-6 m-4 bg-white border-4 border-orange-700 rounded-lg shadow overflow-hidden flex flex-col ">
                        <p className="font-normal text-xl "><span className='text-orange-500'>Author</span>: {item.author}</p>
                        <p className="text-gray-500 font-semibold w-full overflow-x-auto"><span className='text-orange-500'>Comment</span> {item.text}</p>
                    </div>



                ))
            }
        </div>
    )
}

export default Details