import React from "react";
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
import { Edit2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setstatusupdate } from "@/redux/applicationSlice";

const sortlistingstatus = ["accepted", "Pending", "rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();
  const statushandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/updatestatus/${id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        dispatch(setstatusupdate(res.data.application))
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.success)
    }

  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((applicants) => (
              <TableRow key={applicants?._id}>
                <TableCell>{applicants?.applicant?.fullname}</TableCell>
                <TableCell>{applicants?.applicant?.email}</TableCell>
                <TableCell>{applicants?.applicant?.phonenumber}</TableCell>
                <TableCell className="text-blue-600">
                  {applicants?.applicant?.profile?.resume ? (
                    <a href={applicants?.applicant?.profile?.resume}>
                      {applicants?.applicant?.profile?.resumeorignalname}
                    </a>
                  ) : (
                    "Not Uplode"
                  )}
                </TableCell>
                <TableCell>
                  {applicants?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <div className="flex items-center justify-start gap-2">
                        {" "}
                        <span className={`${applicants?.status === "accepted" ? "bg-green-600" : "bg-red-400"} rounded-md px-2 py-1 font-semibold`}>{applicants?.status}</span>
                        <Edit2 className="bg-violet-500 rounded-md h-7 w-8 px-2 py-1"/>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-44">
                      {sortlistingstatus.map((status, index) => (
                        <div
                          onClick={() => {
                            statushandler(status, applicants?._id);
                          }}
                          className="flex items-center px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer"
                          key={index}
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
