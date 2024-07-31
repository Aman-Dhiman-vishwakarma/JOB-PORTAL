import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allappliyedjobs} = useSelector((store)=>store.job)
  return (
    <div>
    <Table>
    <TableCaption>Alist of your applied jobs</TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {
          allappliyedjobs && allappliyedjobs?.map((item)=>  <TableRow key={item?._id}>
                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>
                <TableCell className="text-right"><Badge className={`font-bold ${item?.status === "accepted" ? "bg-green-800" : item?.status === "pending" ? "bg-black" : "bg-red-800"}`}>{item?.status}</Badge></TableCell>
            </TableRow>)
        }
    </TableBody>
    </Table>
    </div>
  )
}

export default AppliedJobTable
