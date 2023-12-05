import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Submission from './Submission';
import LoaderPage from '../LoaderPage/LoaderPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import { toast } from 'react-toastify';
import { PDFViewer } from '@react-pdf/renderer';
import PdfGenerate from '../PdfGenerate/PdfGenerate';

const Submissions = () => {
    const client = useQueryClient();

    const {data,isLoading, isError} = useQuery({
        queryKey: ['submissions'],
        queryFn: async()=>{
            const result = await axios.get("https://sync-study-server.vercel.app/api/v1/submissions?status=Pending",{withCredentials: true})
            return result.data;
        }
    })

    if(isLoading){
        return <LoaderPage></LoaderPage>
    }
    if(isError){
        return <ErrorPage></ErrorPage>
    }

    const updateSubmission = (id, updatedData)=>{

        axios.put(`https://sync-study-server.vercel.app/api/v1/submissions/update/${id}`, updatedData ,{withCredentials: true})
        .then(()=>{
            toast.success("Marked Successfully",{
              autoClose: 2000
            });
            client.invalidateQueries('submissions')
  
            // close modal 
            const modal = document.getElementById(`my_modal_${id}`);
            if (modal) {
              modal.close();
            }
          })
          .catch(()=>{
            toast.error("Marking is not complete",{
              autoClose: 2000
            });
          })
    }

    return (
<>
<h1 className='mt-10 logofont text-2xl font-bold text-emerald-700 pl-2 lg:pl-0'>Preview of All Submissions</h1>
<PDFViewer className='mt-4 h-96 shadow-lg shadow-teal-400 px-2 lg:px-0'>
  <PdfGenerate></PdfGenerate>
</PDFViewer>
<div className='px-2 lg:px-0'>
            {
                data.map(submission=> <Submission key={submission._id} submission={submission} updateSubmission={updateSubmission}></Submission>)
            }
        </div>
</>
    );
};

export default Submissions;