import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"

const Assignment = ({assignment}) => {
    const [color, setColor] = useState(null);

    const {_id, title, description, marks, thumbnail_url, difficulty_level, due_date, creator_email, creator_name} = assignment;

useEffect(()=>{
    if(difficulty_level == "Easy"){
        setColor("bg-green-500");
    }
    else if(difficulty_level == "Medium"){
        setColor("bg-yellow-500");
    }
    else{
        setColor("bg-red-500");
    }
},[])

    return (
        <div className='flex flex-col md:flex-row items-center bg-emerald-50 justify-center rounded-l-xl shadow-lg shadow-lime-600 '>
            {/* image  */}
            <div className='flex-1'>
                <img className='h-auto md:h-64  w-full md:w-80 lg:w-64 rounded-t-xl md:rounded-xl md:rounded-r-none' src={thumbnail_url} alt="thumbnail" />
            </div>
            {/* content  */}

            <div  className='flex-1 space-y-2 mt-6 md:mt-0'>
                <h1 className='text-2xl w-[360px] md:w-auto font-bold'>{title}</h1>
                <h2 className={`text-lg font-semibold`}>Difficulty Level: <span className={`${color} px-2 py-1 rounded-lg`}>{difficulty_level}</span></h2>
                <h3 className='text-lg font-semibold'>Marks: {marks}</h3>

                <div className='space-x-52 md:space-x-4 pb-8'>
                    <Link to={`/assignmentdetails/${_id}`}><motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} className='btn btn-accent font-bold btn-outline'>View
    </motion.button></Link>
                    <Link  to={`/updateassignment/${_id}`}><motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} className='btn btn-info btn-outline font-bold'>Update</motion.button></Link>
                </div>

            </div>

        </div>
    );
};

export default Assignment;