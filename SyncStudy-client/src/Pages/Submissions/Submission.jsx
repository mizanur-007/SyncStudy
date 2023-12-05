import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { motion } from 'framer-motion';

const Submission = ({submission, updateSubmission}) => {
    const {user} = useContext(AuthContext);

    const {_id, title, marks, creator_email, creator_name, drive_link, comment, submitter_email, submitter_name, status} = submission;

    const handleGiveMark = (event)=>{
        event.preventDefault();

        const obtained_mark = parseInt(event.target.obtained_mark.value);
        const feedback = event.target.feedback.value;
        const status = "Completed";
        const marked_by = user?.displayName;

        const updatedData = {
            obtained_mark,
            feedback,
            status,
            marked_by,
            title,
            marks,
            creator_email,
            creator_name,
            drive_link,
            comment,
            submitter_email,
            submitter_name

        }
      
        updateSubmission(_id, updatedData);
    }

    return (
        <div className='flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 justify-between bg-emerald-50 my-10 px-16 py-10 rounded-xl shadow-info shadow-lg'>

            <div>
                <h1 className='text-2xl text-teal-700 font-bold'>{title}</h1>
                <h2 className='text-xl text-teal-700 my-2 font-semibold'>Marks: <span className='text-teal-500'>{marks}</span></h2>
                <h3 className='text-xl text-teal-700 font-semibold'>Submitted By: <span className='text-teal-500'>{submitter_name}</span></h3>
                <p className='text-xl text-teal-700 font-medium mt-2'>Status: <span className='text-teal-800 bg-green-200 px-2 py-1 rounded-lg'>{status}</span></p>
            </div>
            <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }}  onClick={()=>document.getElementById(`my_modal_${_id}`).showModal()} className='btn btn-accent btn-outline text-lg text-white'>Give Mark</motion.button>

                  {/* modal  */}
      <dialog id={`my_modal_${_id}`} className="modal">
  <div className="modal-box bg-teal-50">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }}  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</motion.button>
    </form>
    <h3 className="font-bold text-xl text-teal-600"> Submission Details</h3>

    <form onSubmit={handleGiveMark}>
      <p className="text-lg font-medium mt-4 mb-2">  Submitted File Link</p>
      <p><a className='text-lg text-cyan-500' href={drive_link}>{drive_link}</a></p>

      <p className='mt-2 text-xl font-bold'>Note: <span className='text-lg font-medium'>{comment}</span></p>
    
      <p  className="text-lg font-semibold mt-4 mb-2">Marks <span className='font-base text-base'>(Out Of {marks})</span></p>
      <input className="bg-[#13121229] w-full px-3 py-1 rounded-lg shadow-md shadow-emerald-300 text-emerald-700" placeholder="Obtained Mark " type="number" min={0} max={marks} name="obtained_mark" required />
      <p  className="text-lg font-medium mt-4 mb-2">Feedback</p>
      <input className="bg-[#13121229] w-full px-3 py-1 rounded-lg shadow-md shadow-emerald-300 text-emerald-700" type="text" placeholder="Examiner Feedback"  name="feedback" required></input>
      <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} type="submit" className="btn btn-accent mt-6 text-white font-bold text-lg btn-outline">Submit</motion.button>
    </form>
  </div>
</dialog>
            
        </div>
    );
};

export default Submission;