import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeatureCard = ({feature}) => {
    const {_id, title, description, marks, thumbnail_url, difficulty_level, due_date, creator_email, creator_name} = feature
    return (
<div className="card bg-emerald-50 h-[900px] md:h-[800px] lg:h-[700px]">
  <figure><img src={thumbnail_url} className='w-full h-[450px] lg:w-96 md:h-80 lg:h-72' alt="thumbnail" /></figure>
  <div className="card-body">
    <h2 className="card-title font-bold text-2xl md:text-2xl lg:text-xl text-emerald-700">{title}</h2>
    <p className='text-2xl md:text-2xl lg:text-lg font-bold text-emerald-600 -mb-5 mt-4 md:mt-0'>Description: <span className='text-xl md:text-xl lg:text-base text-black font-medium'>{description}</span></p>
    <p  className='text-2xl md:text-2xl lg:text-lg font-bold text-emerald-600 -mb-6 mt-4 md:mt-0'>Difficulty Level: <span className='text-black'>{difficulty_level}</span></p>
    <p  className='text-2xl md:text-2xl lg:text-lg font-bold text-emerald-600 mt-4 md:mt-0'>Marks: <span className='font-semibold text-black'>{marks}</span></p>
    <div className="card-actions justify-between">
    <Link to={`/assignmentdetails/${_id}`}><motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} className="btn btn-accent btn-outline mt-3 w-24 md:w-32  lg:w-auto font-bold">View</motion.button></Link>
    <Link  to={`/updateassignment/${_id}`}> <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} className="btn btn-accent btn-outline mt-3 w-24 md:w-32  lg:w-auto font-bold">Update</motion.button></Link>
    </div>
  </div>
</div>
    );
};

export default FeatureCard;