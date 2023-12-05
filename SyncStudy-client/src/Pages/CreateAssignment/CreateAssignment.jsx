import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../Provider/AuthProvider";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const CreateAssignment = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState('Easy');
    const {user} = useContext(AuthContext);

    const handleSelectChange = (event) => {
        const option = event.target.value;
        setSelectedOption(option);
      };

    const handleCreate =(event)=>{

        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const marks = parseInt(form.marks.value);
        const thumbnail_url = form.thumbnail_url.value;
        const due_date = startDate;
        const difficulty_level = selectedOption;
        const creator_email = user?.email;
        const creator_name = user?.displayName;

        const createDoc =  {
            title,
            description,
            marks,
            thumbnail_url,
            difficulty_level,
            due_date,
            creator_email,
            creator_name
          }
         

          axios.post(`https://sync-study-server.vercel.app/api/v1/assignments`,createDoc,{withCredentials:true})
          .then(()=>{
            toast.success("Created Successfully",{
              autoClose: 2000
            });
            form.reset()
          })
          .catch(()=>{
            toast.error("Creation Failed",{
              autoClose: 2000
            });
          })

    }


    return (
        <div className="my-10">
        <div
          className="hero h-[600px] lg:h-[500px] rounded-xl mt-8 mb-10"
          style={{
            backgroundImage:
              "url(https://i.ibb.co/2WQZWDz/7769831-2924107.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-70 rounded-xl"></div>
          <div className=" text-center py-0 md:py-10 lg:py-0" >
              <h1 className="text-3xl text-emerald-300 font-bold mb-8">Create A Assignment</h1>
            <form onSubmit={handleCreate} className="space-y-6">

              <div className="flex flex-col lg:flex-row gap-6">

              <input className="w-80 md:w-[550px] lg:w-80 py-1 md:py-3 lg:py-1 px-2 md:px-3 lg:px-2 bg-[#00000049] rounded-md text-white font-medium" placeholder='Title' type="text" name="title" required/>

              <input className="w-80 md:w-[550px] lg:w-80 py-1 md:py-3 lg:py-1 px-2 md:px-3 lg:px-2 bg-[#00000049] rounded-md text-white font-medium" placeholder='Description' name="description" type="text" required/>

              </div>

              <div className="flex flex-col lg:flex-row gap-6">
              <input className="w-80 md:w-[550px] lg:w-80 py-1 md:py-3 lg:py-1 px-2 md:px-3 lg:px-2 bg-[#00000049] rounded-md text-white font-medium" placeholder='Marks' name="marks" type="text" required/>

              <input className="w-80 md:w-[550px] lg:w-80 py-1 md:py-3 lg:py-1 px-2 md:px-3 lg:px-2 bg-[#00000049] rounded-md text-white font-medium" placeholder='Thumbnail Image URL' name="thumbnail_url" type="text" required/>

              </div>
              <div className="flex flex-col lg:flex-row gap-6">

              <DatePicker  className="w-80 md:w-[550px] lg:w-80 py-1 md:py-3 lg:py-1 px-2 md:px-3 lg:px-2 bg-[#00000049] rounded-md text-white font-medium" showTimeSelect={false}  selected={startDate} onChange={(date) => setStartDate(date)} />

              <select className="w-80 md:w-[550px] lg:w-80 py-1 md:py-3 lg:py-1 px-2 md:px-3 lg:px-2 bg-[#00000049] rounded-md text-white font-medium" value={selectedOption} onChange={handleSelectChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

              </div>
              <br />
              <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} type="submit" className="btn bg-emerald-600 btn-block text-white text-2xl font-bold">Create</motion.button>
              
            </form>
          </div>
        </div>
      </div>
    );
};

export default CreateAssignment;