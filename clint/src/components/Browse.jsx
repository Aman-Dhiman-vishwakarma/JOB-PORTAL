import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setsearchedquery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector((store)=>store.job)
  const dispatch = useDispatch();

  useEffect(()=>{
    return () => {
      dispatch(setsearchedquery(""))
    }
  }, [])

  return (
    <div>
     <Navbar />
     <div className='max-w-7xl mx-auto mt-8'>
     <h1 className='font-bold text-xl my-8'>Search Results ({allJobs?.length})</h1>
     <div className='grid grid-cols-3 gap-5'>
     {
      allJobs?.length > 0 ?  allJobs?.map((job)=> <Job key={job?._id} job={job} />) : <div className='text-2xl font-bold text-center my-6'>Job Is Not Available</div>
     }
     </div>
    
     </div>
    </div>
  )
}

export default Browse
