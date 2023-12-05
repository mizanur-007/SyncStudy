import axios from "axios";
import  { useContext, useEffect, useState } from "react";
import {  useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const AssignmentDetails = () => {
  const assignment = useLoaderData();
  const [color, setColor] = useState(null);
  const {user} = useContext(AuthContext)

  const navigate = useNavigate();


  const {
    _id,
    title,
    description,
    marks,
    thumbnail_url,
    difficulty_level,
    due_date,
    creator_email,
    creator_name,
  } = assignment;

  //color bg
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

//delete assignment
const handleDelete = ()=>{
if(user?.email == creator_email){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
axios.delete(`https://sync-study-server.vercel.app/api/v1/assignments/${_id}`, {withCredentials:true})
.then(()=>{
toast.success("Assignment deleted Successfully",{
  autoClose: 2000
});
navigate('/assignments')
})
.catch(()=>{
toast.error("Deletion Denied",{
  autoClose: 2000
});
})

    }
  })
}
else{
  toast.error("You Are Not Authorized To Delete This Assignment",{
    autoClose: 2000
  })
}

}

//submission
const handleSubmit =(event)=>{
  event.preventDefault();
        const form = event.target;
        const drive_link = form.drive_link.value;
        const comment = form.comment.value;

        const submitter_email = user?.email;
        const submitter_name = user?.displayName;
        const status = "Pending";

        const createSubmission =  {
          title,
          marks,
          creator_email,
          creator_name,
          drive_link,
          comment,
          submitter_email,
          submitter_name,
          status

        }

        
        axios.post(`https://sync-study-server.vercel.app/api/v1/submissions`,createSubmission,{withCredentials:true})
        .then(()=>{
          toast.success("Submitted Successfully",{
            autoClose: 2000
          });
          form.reset()

          // close modal 
          const modal = document.getElementById("my_modal_3");
          if (modal) {
            modal.close();
          }
        })
        .catch(()=>{
          toast.error("Submission Failed",{
            autoClose: 2000
          });
        })

}

  return (
    <div className="mt-10 bg-cyan-50 py-8 px-10 rounded-xl shadow-lime-600 flex flex-col md:flex-row gap-8 items-center  mb-10">
<div className="flex-1">
<img className="rounded-lg h-auto md:h-80 lg:h-auto" src={thumbnail_url} alt="" />
</div>

<div className="flex-1">
<h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="my-2 text-xl font-bold">
        Difficulty Level: <span className={`font-medium ${color} px-2 py-1 rounded-lg`}>{difficulty_level}</span>
      </h2>
      <h2 className="my-2 text-xl font-bold">
        Marks: <span className="font-medium">{marks}</span>
      </h2>
      <h1 className="text-xl text-red-700 font-bold">
        Due Date: <span className="text-black font-semibold">{due_date?.slice(0,10)}</span>
      </h1>
      <p className="text-xl font-bold mt-2">
        Description: <span className="text-lg font-medium">{description}</span>
      </p>
      <p className="text-xl font-bold mt-2">
        Created By: <span className="text-lg font-medium">{creator_name}</span>
      </p>
<div className="flex flex-col md:flex-row items-start md:items-center  md:gap-10">
<motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} onClick={()=>document.getElementById('my_modal_3').showModal()} className="btn btn-accent mt-6 text-white font-bold text-xl w-60 md:w-44 lg:w-auto  h-auto md:h-16 lg:h-auto">
        Take Assignment
      </motion.button>
      <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} onClick={handleDelete} className="btn btn-error mt-6 text-white font-bold text-xl  w-60 md:w-44 lg:w-auto h-auto md:h-16 lg:h-auto">
        Delete Assignment
      </motion.button>

      {/* modal  */}
      <dialog id="my_modal_3" className="modal">
  <div className="modal-box bg-emerald-50">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }}  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</motion.button>
    </form>
    <h3 className="font-bold text-lg">Assignment Submission</h3>

    <form onSubmit={handleSubmit}>
      <p className="text-lg font-medium mt-4 mb-2">Enter Your Submission file Link</p>
      <input className="bg-[#13121229] w-full px-3 py-1 rounded-lg shadow-md shadow-emerald-300 text-emerald-700" placeholder="File Drive Link" type="text" name="drive_link" required />
      <p  className="text-lg font-medium mt-4 mb-2">Enter Your comment</p>
      <textarea className="bg-[#13121229] w-full px-3 py-1 rounded-lg shadow-md shadow-emerald-300 text-emerald-700" type="text" placeholder="Comment"  name="comment" required></textarea>
      <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} type="submit" className="btn btn-accent mt-6 text-white font-bold text-lg">Submit</motion.button>
    </form>
  </div>
</dialog>


</div>
</div>
    </div>
  );
};

export default AssignmentDetails;
