import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const SideBar = () => {

    const {user, logOut} = useContext(AuthContext);

    
  // logout
  const handleLogout = ()=>{
    logOut()
    .then(()=>{
      toast.success("LogOut Complete",{
        autoClose: 2000
      });
    })
    .catch(()=>{
      toast.error("problem Occurred",{
        autoClose: 2000
      });
    })

  }

    return (
       <>
       {
        user && <>
        <li>
            <div>
            <div className="avatar online">
  <div className="w-14 rounded-full">
    <img src={user?.photoURL} />
  </div>
</div>
            <h1 className='text-lg font-semibold text-emerald-600'>{user?.displayName}</h1>
            </div>
        </li>

{/* home  */}
<li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active text-red-600 font-bold underline"
                  : ""
              }
            >
              <span className="text-xl font-semibold text-emerald-600">
                Home
              </span>
            </NavLink>
          </li>

          <div className='divider -my-1'></div>

                    {/* Assignments  */}
                    <li>
            <NavLink
              to="/assignments"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active text-red-600 font-bold underline"
                  : ""
              }
            >
              <span className="text-xl font-semibold text-emerald-600">
                Assignments
              </span>
            </NavLink>
          </li>
          <div className='divider -my-1'></div>

          <li>
    <NavLink
      to="/createassignment"
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
          ? "active text-red-600 font-bold underline"
          : ""
      }
    >
      <span className="text-xl font-semibold text-emerald-600">
        Create Assignments
      </span>
    </NavLink>
  </li>
  <div className='divider -my-1'></div>

    <li>
    <NavLink
      to="/mysubmissions"
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
          ? "active text-red-600 font-bold underline"
          : ""
      }
    >
      <span className="text-xl font-semibold text-emerald-600">
        My Assignments
      </span>
    </NavLink>
  </li>
  <div className='divider -my-1'></div>

    <li>
    <NavLink
      to="/submissions"
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
          ? "active text-red-600 font-bold underline"
          : ""
      }
    >
      <span className="text-xl font-semibold text-emerald-600">
         Submitted Assignments
      </span>
    </NavLink>
  </li>
  <div className='divider -my-1'></div>

  <li>
  <motion.button whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.8 }}  onClick={handleLogout} className="btn btn-ghost text-emerald-700 btn-outline font-bold text-xl w-32 mt-3">Log Out</motion.button>
  </li>

        </>
       }

       {
        !user && <>
        {/* home  */}
<li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active text-red-600 font-bold underline"
                  : ""
              }
            >
              <span className="text-xl font-semibold text-emerald-600">
                Home
              </span>
            </NavLink>
          </li>

          <div className='divider -my-1'></div>

                    {/* Assignments  */}
                    <li>
            <NavLink
              to="/assignments"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active text-red-600 font-bold underline"
                  : ""
              }
            >
              <span className="text-xl font-semibold text-emerald-600">
                Assignments
              </span>
            </NavLink>
          </li>
          <div className='divider -my-1'></div>

          <li>
    <NavLink
      to="/login"
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
          ? "active text-red-600 font-bold underline"
          : ""
      }
    >
      <span className="text-xl font-semibold text-emerald-600">
        Login
      </span>
    </NavLink>
  </li>
  <div className='divider -my-1'></div>


  <li>
    <NavLink
      to="/register"
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
          ? "active text-red-600 font-bold underline"
          : ""
      }
    >
      <span className="text-xl font-semibold text-emerald-600">
        Register
      </span>
    </NavLink>
  </li>
  <div className='divider -my-1'></div>

        </>
       }

       </>
    );
};

export default SideBar;