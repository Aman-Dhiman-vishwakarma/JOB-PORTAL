import React from 'react'
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import JobsTable from './JobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setsearchjobbytext } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs()
    const dispatch = useDispatch();
    const inputhandler = (e) => {
      dispatch(setsearchjobbytext(e.target.value))
    }
    return (
      <div>
        <Navbar />
        <div className='max-w-6xl mx-auto my-10'>
          <div className='flex items-center justify-between my-8'>
            <Input onChange={inputhandler} className="w-fit" type="text" placeholder="Filter by name or jobs" />
            <Link to="/admin/jobs/create"><Button>Post New Job</Button></Link>
          </div>
          <JobsTable />
        </div>
      </div>
    )
}

export default AdminJobs
