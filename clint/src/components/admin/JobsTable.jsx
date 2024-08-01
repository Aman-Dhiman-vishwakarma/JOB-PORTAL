import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const JobsTable = () => {
    const { alladminjobs, searchjobbytext } = useSelector(
        (store) => store.job
      );
      const [filterjob, setfilterjob] = useState(alladminjobs);
    
      useEffect(() => {
        const filteredjob =
        alladminjobs?.length > 0 &&
        alladminjobs.filter((job) => {
            if (!searchjobbytext) {
              return true;
            }
            return job?.title
              ?.toLowerCase()
              .includes(searchjobbytext.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchjobbytext.toLowerCase());
          });
          setfilterjob(filteredjob);
      }, []);
    
      return (
        <div>
          <Table>
            <TableCaption>A list of your recent posted jobs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alladminjobs?.length <= 0 ? (
                 <TableRow><span className="text-lg font-semibold">Match not found</span></TableRow>
               
              ) : (
                
                alladminjobs?.map((job, index) => (
                  <TableRow key={index}>
                    {/* <TableCell>
                      <Avatar>
                        {company?.logo ? (
                          <AvatarImage src={company?.logo} />
                        ) : (
                          <span className="p-2 font-semibold">
                            {company?.name[0].toUpperCase()}
                          </span>
                        )}
                      </Avatar>
                    </TableCell> */}
                    <TableCell>{job?.company?.name}</TableCell>
                    <TableCell>{job?.title}</TableCell>
                    <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-34">
                         
                          <div className="flex items-center cursor-pointer rounded-md  hover:bg-gray-200 px-2 py-1px-2 py-1 w-full">
                            <Link className="flex items-center gap-2 " to={`/admin/jobs/applicants/${job?._id}`}>
                            <Eye className="w-4" />
                            <span>Applicants</span>
                            </Link>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              
              )}
            </TableBody>
          </Table>
        </div>
      );
}

export default JobsTable
