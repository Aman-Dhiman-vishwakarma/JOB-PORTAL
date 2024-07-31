import React from 'react'
import LatestjobCard from './LatestjobCard'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// const random = [1,2,3,4,5,6,7,8]
const Latestjobs = () => {
  const {allJobs} = useSelector((store)=>store.job)
  return (
    <div className='max-w-7xl mx-auto my-14'>
      <h1 className='text-4xl font-bold'><span className='text-[#6a38c2]'>Latest & Top </span>Job Opening</h1>
      <div className='grid grid-cols-3 gap-5 my-10'>
      {allJobs.length <= 0 ? <span>Jobs not found</span> : allJobs?.slice(0, 6).map((job)=><Link key={job?._id} to={`/discription/${job?._id}`}> <LatestjobCard job={job} /></Link>)}
      </div>
     
    </div>
  )
}

export default Latestjobs
