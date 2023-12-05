import React, { useEffect } from 'react';
import Navbar from '../Pages/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Footer/Footer';
import SideBar from '../Pages/SideBar/SideBar';

const MainLayout = () => {

  //dynamic title
  const location = useLocation();

  useEffect(()=>{
    if(location.pathname=='/'){
      document.title = 'SyncStudy || Home';
    }
    else if(location.pathname=='/assignments'){
      document.title = 'SyncStudy || Assignments';
    }
    else if(location.pathname=='/submissions'){
      document.title = 'SyncStudy || Submitted Assignments';
    }
    else if(location.pathname=='/login'){
      document.title = 'Login ';
    }
    else if(location.pathname=='/register'){
      document.title = 'Registration ';
    }
    else if(location.pathname=='/mysubmissions'){
      document.title = 'SyncStudy || My Assignments ';
    }
    else if(location.pathname=='/createassignment'){
      document.title = 'SyncStudy || Create Assignment';
    }
    else if(location.pathname.includes('assignmentdetails')){
      document.title = 'SyncStudy || Assignment Details';
    }
    else if(location.pathname.includes('updateassignment')){
      document.title = 'SyncStudy || Update Assignment';
    }
    else if(location.state){
      document.title = location.state;
    }
  },[location.pathname])

    return (
<div>
<div className='max-w-6xl mx-auto'>
<div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
<Navbar></Navbar>
    {/* Page content here */}
    <Outlet />
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
      {/* Sidebar content here */}
      <SideBar></SideBar>
    </ul>
  </div>
</div>
</div>

<Footer></Footer>
</div>
    );
};

export default MainLayout;