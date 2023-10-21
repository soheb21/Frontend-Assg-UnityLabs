import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataDetailAsync, selectAllData, selectDataDetail, selectLoading } from '../redux/storeSlice';

const Details = () => {
    const param = useParams();
    const dataDetail = useSelector(selectDataDetail);
    const loading = useSelector(selectLoading);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDataDetailAsync(param))
    }, [])
    if (loading) {
        return <h1>Loading....</h1>
    }
    return (
        <>
            <h2>Title:{dataDetail?.title}</h2>
            <h2>Points:{dataDetail?.points}</h2>
            {
                dataDetail && dataDetail.children?.map((item, index) => (
                    <div key={index} >
                        <p style={{ marginTop: "1rem" }}>Type: {item.type}</p>
                        <br />
                        <p style={{ marginTop: "1rem" }}>Text: {item.created_at}</p>
                    </div>
                ))
            }
        </>
    )
}

export default Details