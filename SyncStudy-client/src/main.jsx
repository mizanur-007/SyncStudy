import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './Layout/MainLayout.jsx'
import Login from './Pages/Login/Login.jsx'
import Home from './Pages/Home/Home.jsx'
import Assignments from './Pages/Assignments/Assignments.jsx'
import Register from './Pages/Register/Register.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AssignmentDetails from './Pages/Assignments/AssignmentDetails.jsx'
import CreateAssignment from './Pages/CreateAssignment/CreateAssignment.jsx'
import UpdateAssignment from './Pages/Update/UpdateAssignment.jsx'
import Submissions from './Pages/Submissions/Submissions.jsx'
import MySubmissions from './Pages/My Submissions/MySubmissions.jsx'
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx'
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx'

const client = new QueryClient();

const router = createBrowserRouter([
  {
      path:'/',
      element:<MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children :[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'assignments',
          element:<Assignments></Assignments>
        },
        {
          path:'submissions',
          element:<PrivateRoute><Submissions></Submissions></PrivateRoute>
        },
        {
          path:'mysubmissions',
          element:<PrivateRoute><MySubmissions></MySubmissions></PrivateRoute>
        },
        {
          path:'createassignment',
          element:<PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
        },
        {
          path:'assignmentdetails/:id',
          loader: ({params})=> fetch(`https://sync-study-server.vercel.app/api/v1/assignments/${params.id}`, {
            method: 'GET',
            credentials: 'include'
        }),
          element:<PrivateRoute><AssignmentDetails></AssignmentDetails></PrivateRoute>
        },
        {
          path:'updateassignment/:id',
          loader: ({params})=> fetch(`https://sync-study-server.vercel.app/api/v1/assignments/${params.id}`, {
            method: 'GET',
            credentials: 'include'
        }),
          element:<PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>
        }
      ]
  },
  {
    path: '/login',
    element:<Login></Login>
  },
  {
    path: '/register',
    element:<Register></Register>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<QueryClientProvider client={client}>
<AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
</QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>,
)
