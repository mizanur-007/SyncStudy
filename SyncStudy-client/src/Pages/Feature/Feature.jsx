import React from 'react';
import LoaderPage from '../LoaderPage/LoaderPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import FeatureCard from './FeatureCard';

const Feature = () => {

    const {data,isLoading, isError} = useQuery({
        queryKey: ['assignments'],
        queryFn: async()=>{
            const result = await axios.get("https://sync-study-server.vercel.app/api/v1/assignments",{withCredentials: true})
            return result.data;
        }
    })

    if(isLoading){
        return <LoaderPage></LoaderPage>
    }
    if(isError){
        return <ErrorPage></ErrorPage>
    }

    const dispayData = data?.slice(-3);
    console.log(dispayData)

    return (
<div className='my-12'>
    <h1 className='text-2xl md:text-4xl lg:text-2xl logofont text-emerald-700 font-bold mb-5 pl-10 md:pl-0'>Featured Assignments <span className='text-sm md:text-lg text-sky-700 font-normal'>(Latest)</span></h1>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6 lg:gap-5 px-3 md:px-2 lg:px-0'>
            {
                dispayData?.map(feature=> <FeatureCard key={feature._id} feature={feature}></FeatureCard>)
            }
        </div>
</div>
    );
};

export default Feature;