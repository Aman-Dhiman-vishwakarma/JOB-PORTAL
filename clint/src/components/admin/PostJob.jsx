import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const companyarray = [];

const PostJob = () => {
  const [input, setinput] = useState({
    title: "",
    description: "",
    requirments: "",
    salary: "",
    location: "",
    jobtype: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const naviget = useNavigate();
  const [loading, setloading] = useState(false)
  const { companies } = useSelector((store) => store.company);
  const changeeventhandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const selectchangehandler = (value) => {
    setinput({ ...input,  companyId:value });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        naviget("/admin/jobs")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      setloading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center  my-8">
        <form onSubmit={submithandler} className="py-6 px-8 border w-[40%] border-gray-200 shadow-lg rounded-md">
          <h1 className="text-center text-2xl font-bold">Post Job</h1>
          <div className="grid grid-cols-2 mt-4 gap-6">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeeventhandler}
                className="border border-gray-400"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeeventhandler}
                 className="border border-gray-400"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirments"
                value={input.requirments}
                onChange={changeeventhandler}
                 className="border border-gray-400"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeeventhandler}
                 className="border border-gray-400"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeeventhandler}
                 className="border border-gray-400"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobtype"
                value={input.jobtype}
                onChange={changeeventhandler}
                 className="border border-gray-400"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeeventhandler}
                 className="border border-gray-400"
              />
            </div>
            <div>
              <Label>No of Postion</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeeventhandler}
                placeholder="Write Requirments With Comma"
                 className="border border-gray-400"
              />
            </div>
          </div>
          {companies?.length > 0 && (
           <div className="mt-8 mb-4 border border-gray-400 w-[182px] rounded-md">
            <Select onValueChange={selectchangehandler}>
              {" "}
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Companies</SelectLabel>
                  {
                    companies?.map((company)=> <SelectItem key={company?._id} value={company?._id}>{company?.name}</SelectItem>)
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>
          )}
         {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}
          {companies?.length === 0 && (
            <p className="text-xs font-bold text-red-600 my-4 text-center">
              Please register a company first before posting the job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
