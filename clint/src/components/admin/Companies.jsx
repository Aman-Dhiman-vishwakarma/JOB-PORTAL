import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { Link } from 'react-router-dom'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setsearchcompanybytext } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompany();
  const dispatch = useDispatch();

  const inputhandler = (e) => {
    dispatch(setsearchcompanybytext(e.target.value))
  }
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-8'>
          <Input onChange={inputhandler} className="w-fit border border-gray-400" type="text" placeholder="Filter by name" />
          <Link to="/admin/company/create"><Button>Add New Company</Button></Link>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies

