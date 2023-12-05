import React, { useEffect, useState } from "react";
import Assignment from "./Assignment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoaderPage from "../../Pages/LoaderPage/LoaderPage";
import ErrorPage from "../ErrorPage/ErrorPage";

const Assignments = () => {
  const [displayData, setDisplayData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Sort');


  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 8;

  //data load
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks",currentPage],
    queryFn: async () => {
      const result = await axios.get(
        `https://sync-study-server.vercel.app/api/v1/assignments?currentPage=${currentPage}&size=${perPage}`
      ,{withCredentials: true});
      const data = await result.data;
      return data;
    },
  });
  useEffect(() => {
    if (data) {
      setDisplayData(data?.result);
    }
    
  }, [data]);



  if (isLoading) {
    return <LoaderPage></LoaderPage>;
  }
  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  const handleData = async(filterOption)=>{
          const result = await axios.get(
            `https://sync-study-server.vercel.app/api/v1/assignments`,{withCredentials:true}
          );
          const data = await result.data;
          const filterData = data.filter(items => items.difficulty_level == filterOption)
      setDisplayData(filterData)
  }

  
  const handleSelectChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    if(option !== "Sort"){
        handleData(option);
    }
  };

  //pagination calculation
  const totalCount = data.count;
  const numberOfPage = Math.ceil(totalCount / perPage);

  const pages = [...Array(numberOfPage).keys()];

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < numberOfPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="my-16 lg:my-10">
        <div className="flex justify-between mb-4">
            <h1 className="text-3xl logofont pl-3 md:pl-4 lg:pl-0 font-bold ">Assignments</h1>
            <select className="outline bg-slate-200 mr-2 text-lg font-medium" value={selectedOption} onChange={handleSelectChange}>
                <option value="Sort">Sort</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
        </div>
        
      <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-10 px-3 lg:px-0">
        {displayData.map((assignment) => (
          <Assignment key={assignment._id} assignment={assignment}></Assignment>
        ))}
      </div>

      {/* buttons  */}
      <div className="text-center space-x-8 mt-12">
        <button
          onClick={handlePrevious}
          className="btn btn-secondary btn-outline "
        >
          Previous
        </button>
        {pages.map((page, index) => (
          <button
            className={`btn btn-secondary btn-outline ${
              currentPage == page ? "bg-black" : ""
            }`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNext} className="btn btn-secondary btn-outline ">
          Next
        </button>
      </div>
    </div>
  );
};

export default Assignments;
