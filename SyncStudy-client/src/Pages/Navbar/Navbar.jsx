import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [visibleName, setVisibleName] = useState(false);


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

  const handleAvatar = ()=>{
    setVisible(!visible);
    setVisibleName(!visibleName);
  }
  return (
    <div className="w-full navbar bg-cyan-50 rounded-b-lg">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1"><img className="h-12" src="/logo.png" alt="" /></div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
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

{
  !user &&   <>
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
  </>
}

{
  user && <>
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
        Create
      </span>
    </NavLink>
  </li>

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
         Submissions
      </span>
    </NavLink>
  </li>

  <li>
  <div className="avatar online -mt-3">
  <div onClick={handleAvatar} className="relative cursor-pointer w-14 rounded-full" onMouseEnter={() => setVisibleName(true)}
          onMouseLeave={() => setVisibleName(false)}>
    <img src={user?.photoURL} />
  </div>
  {
    visibleName && <>
            <div className="absolute top-[49px] right-[1px] rounded-lg p-2 z-30">
        <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }}  className=" text-black font-bold text-xl w-52">{user?.displayName}</motion.button>
        </div>
    </>
  }
  {
        visible && <>
        <div className="absolute top-[74px] right-[1px] rounded-lg p-2 z-30">
        <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }}  onClick={handleLogout} className="btn btn-accent text-white font-bold text-xl w-32">Log Out</motion.button>
        </div>
        </>
        }
</div>
  </li>
  </>
}


        </ul>
      </div>
    </div>
  );
};

export default Navbar;
