import React from 'react'
import { Badge } from './ui/badge'

const LatestjobCard = ({job}) => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
      </div>
      <div>
      <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
      <p className='text-sm text-gray-500'>{job?.description}.</p>
      </div>
      <div className=' flex items-center gap-2 mt-4'>
        <Badge className="text-blue-700 font-bold" variant="ghost" >{job?.position} Position</Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost" >{job?.jobtype}</Badge>
        <Badge className="text-[#6a38c2] font-bold" variant="ghost" >{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}

export default LatestjobCard
