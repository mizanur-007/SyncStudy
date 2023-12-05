import React, { useEffect, useState } from 'react';

const MySubmission = ({submission}) => {

    const [color, setColor] = useState(null);

    const {obtained_mark, feedback, status, title, marks, marked_by} = submission
    

    useEffect(()=>{
        if(status == "Pending"){
            setColor("bg-yellow-400");
        }
        else if(status == "Completed"){
            setColor("bg-green-300");
        }
    },[])

    return (
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between bg-teal-50 rounded-lg shadow-md shadow-purple-500 py-12 gap-8 md:gap-2 pl-10 lg:pl-5'>
            
            <div className='flex-1'>
                <h1 className='text-xl font-bold text-emerald-700'>{title}</h1>
                <h2 className='font-semibold text-lg text-emerald-500 mt-3'>Marks: <span>{marks}</span></h2>
            </div>

            <div className='flex-1'>
                <h1 className='text-lg text-teal-700 font-semibold'>Status: <span className={`${color} px-2 py-1 rounded-md`}>{status}</span></h1>
                {
                    status =="Completed" && <>
                    <h2 className='text-lg mt-1 font-semibold text-teal-500'>Obtained Marks: <span className='font-bold'>{obtained_mark}</span></h2>
                <p className='text-lg font-semibold text-teal-600 my-1'>Feedback: <span className='text-black text-lg font-medium'>{feedback}</span></p>
                <h3 className='text-lg text-teal-700 font-bold'>Examiner: <span className='font-medium text-black'>{marked_by}</span></h3>
                    </>
                }
            </div>

        </div>
    );
};

export default MySubmission;