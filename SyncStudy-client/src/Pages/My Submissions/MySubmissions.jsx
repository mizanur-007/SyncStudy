import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoaderPage from '../LoaderPage/LoaderPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import MySubmission from './MySubmission';

const MySubmissions = () => {

    const {user} = useContext(AuthContext)

    const {data,isLoading, isError} = useQuery({
        queryKey: ['submissions'],
        queryFn: async()=>{
            const result = await axios.get(`https://sync-study-server.vercel.app/api/v1/submissions?email=${user?.email}`,{withCredentials: true})
            return result.data;
        }
    })

    if(isLoading){
        return <LoaderPage></LoaderPage>
    }
    if(isError){
        return <ErrorPage></ErrorPage>
    }
    return (
        <div className='my-14 grid grid-cols-1 lg:grid-cols-2 gap-6 px-3 lg:px-0'>
            {
                data?.map(submission => <MySubmission key={submission._id} submission={submission}></MySubmission>)
            }
        </div>
    );
};

export default MySubmissions;