import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { AuthContext } from '../../Provider/AuthProvider';
import { motion } from 'framer-motion';

const UpdateAssignment = () => {
    const assignment = useLoaderData();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSelectChange = (event) => {
        const option = event.target.value;
        setSelectedOption(option);
      };

    const {
        _id,
        title,
        description,
        marks,
        thumbnail_url,
        difficulty_level,
        due_date,
        creator_email,
      } = assignment;

      const [selectedOption, setSelectedOption] = useState(difficulty_level);
      const [startDate, setStartDate] = useState(new Date(due_date));

      //update

      const handleUpdate = ()=>{
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const marks = parseInt(form.marks.value);
        const thumbnail_url = form.thumbnail_url.value;
        const due_date = startDate;
        const difficulty_level = selectedOption;

        const updatedDoc =  {
            title,
            description,
            marks,
            thumbnail_url,
            difficulty_level,
            due_date,
          }

if(user?.email == creator_email){
    axios.put(`https://sync-study-server.vercel.app/api/v1/assignments/update/${_id}`,updatedDoc,{withCredentials:true})
    .then(()=>{
      toast.success("Updated Successfully",{
        autoClose: 2000
      });
      navigate('/assignments')
    })
    .catch(()=>{
      toast.error("Update unsuccessful",{
        autoClose: 2000
      });
    })
}
else{
    toast.error("You are not authorized to update this assignment",{
        autoClose: 2000
    })
}

      }


    return (
        <div className='mb-20 md:mb-12'>
        <div
          className="hero h-[500px] rounded-xl mt-16 md:mt-8"
          style={{
            backgroundImage:
              "url(https://i.ibb.co/DgY7RmW/12291093-Wavy-Tech-22-Single-06.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-70 rounded-xl"></div>
          <div className=" text-center py-10 md:py-0">
              <h1 className="text-3xl text-cyan-400 font-bold mb-8">Update Assignment</h1>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">

              <input className="w-80 py-1 px-2 bg-[#00000049] rounded-md text-white font-medium" placeholder='Title' defaultValue={title} type="text" name="title" required/>

              <input className="w-80 py-1 px-2 bg-[#00000049] rounded-md text-white font-medium" defaultValue={description} placeholder='Description' name="description" type="text" required/>

              </div>

              <div className="flex flex-col md:flex-row gap-6">
              <input className="w-80 py-1 px-2 bg-[#00000049] rounded-md text-white font-medium" placeholder='Marks' defaultValue={marks} name="marks" type="text" required/>

              <input className="w-80 py-1 px-2 bg-[#00000049] rounded-md text-white font-medium" placeholder='Thumbnail Image URL' name="thumbnail_url" defaultValue={thumbnail_url} type="text" required/>

              </div>
              <div className="flex flex-col md:flex-row gap-6">

              <DatePicker  className="w-80 py-1 px-2 bg-[#00000049] rounded-md text-white font-medium" showTimeSelect={false}  selected={startDate} onChange={(date) => setStartDate(date)} />

              <select className="w-80 py-1 px-2 bg-[#00000049] rounded-md text-white font-medium" value={selectedOption} onChange={handleSelectChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

              </div>
              <br />
              <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} type="submit" className="btn bg-cyan-600 btn-block text-white text-2xl font-bold">Update Assignment</motion.button>
              
            </form>
          </div>
        </div>
      </div>
    );
};

export default UpdateAssignment;