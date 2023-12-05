import React, { useContext, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlineDelete } from "react-icons/ai";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Pagination, EffectCoverflow } from "swiper/modules";
import ErrorPage from "../ErrorPage/ErrorPage";
import LoaderPage from "../LoaderPage/LoaderPage";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const Notes = () => {
  const { user } = useContext(AuthContext);
  console.log(user)

  const client = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const result = await axios.get(
        `https://sync-study-server.vercel.app/api/v1/notes`,
        { withCredentials: true }
      );
      return result.data;
    },
  });

  if (isLoading) {
    return <LoaderPage></LoaderPage>;
  }
  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  const handleNote = (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("You need to log in to create a note");
    } else {
      const form = event.target;
      const note = event.target.note.value;
      const posted_by = user?.displayName;
      const post_image_url = user?.photoURL;
      const poster_email = user?.email;

      const noteData = { post_image_url, posted_by, note, poster_email };

      axios
        .post(`https://sync-study-server.vercel.app/api/v1/notes`, noteData, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("Note created", {
            autoClose: 2000,
          });
          client.invalidateQueries("notes");
          form.reset();

          // close modal
          const modal = document.getElementById(`my_modal_1`);
          if (modal) {
            modal.close();
          }
        })
        .catch(() => {
          toast.error("Error ocurred", {
            autoClose: 2000,
          });
        });
    }
  };

  // delete a note
  const handleNoteDelete = (noteId, posterEmail) => {
    if (user?.email == posterEmail) {

      
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
  axios
    .delete(`https://sync-study-server.vercel.app/api/v1/notes/${noteId}`, {
      withCredentials: true,
    })
              .then(() =>{
                  
                      toast.success("Note Deleted", {
        autoClose: 2000,
      });
client.invalidateQueries("notes");
      Navigate("/");

    
              })
.catch(() => {
      console.log("Error ocurred");
    });

        }
      })
    } else {
      toast.error("You Are Not Authorized To Delete This Note", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="max-w-[400px] md:max-w-[700px] lg:max-w-[1200px] mt-7 lg:mt-0">
        <h1 className="text-center logofont font-bold text-2xl md:text-4xl lg:text-2xl text-emerald-700 mb-3">
          Important Notes
        </h1>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper mb-6"
        >
          {data?.map((notes) => (
            <>
              <SwiperSlide key={notes._id}>
                <div className="max-w-[400px] md:max-w-[500px] lg:max-w-[600px] text-center flex items-center mb-10 z-10">
                  <div>
                    <div className=" w-3/4">
                      <div className=" bg-[#ADEBD8] shadow-xl shadow-rose-800">
{
  user &&                         <button
  onClick={() =>
    handleNoteDelete(notes._id, notes?.poster_email)
  }
  className=" text-2xl flex pt-2 pl-2 font-bold z-50"
>
  <AiOutlineDelete />
</button>
}
                        <h3 className="text-lg mb-6 pt-6 px-10 font-medium">
                          {notes?.note}
                        </h3>

                        {/* creator  */}
                        <div className="flex flex-row-reverse justify-center pb-6 items-center">
                          <h1 className="text-xl font-semibold">
                            {notes?.posted_by}
                          </h1>

                          {/* avatar  */}
                          <div className="avatar">
                            <div className="w-14 rounded-full">
                              <img src={notes?.post_image_url} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>

        <motion.button
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => document.getElementById(`my_modal_1`).showModal()}
          className="btn btn-ghost text-right btn-outline ml-6 mb-3 lg:ml-0 lg:mb-0"
        >
          Add Note
        </motion.button>

        {/* modal  */}

        <dialog id={`my_modal_1`} className="modal">
          <div className="modal-box bg-teal-50">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </motion.button>
            </form>
            <h3 className="font-bold text-xl text-teal-600">
              {" "}
              Submission Details
            </h3>

            <form onSubmit={handleNote}>
              <p className="text-lg font-medium mt-4 mb-2">Note</p>
              <textarea
                className="bg-[#13121229] w-full px-3 py-1 rounded-lg shadow-md shadow-emerald-300 text-emerald-700"
                type="text"
                placeholder="Note"
                name="note"
                required
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                type="submit"
                className="btn btn-accent mt-6 text-white font-bold text-lg btn-outline"
              >
                Submit
              </motion.button>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Notes;
