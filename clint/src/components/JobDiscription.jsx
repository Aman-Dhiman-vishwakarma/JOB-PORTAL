import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setapplicant, setsinglejob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDiscription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlejob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isApplied =
    singlejob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

    
  const applyjobhandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setapplicant(res.data.newapplication));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchsinglejob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setsinglejob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchsinglejob();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singlejob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singlejob?.position} Position
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {singlejob?.jobtype}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singlejob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyjobhandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.description}.
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.createdAt.split("T")[0]}
          </span>
        </h1>
        <div className="flex items-center gap-5 mt-2">
          <h1 className="font-bold my-1">Requirments: </h1>
          <div className="flex items-center gap-2">
            {singlejob?.requirments?.map((item, index) => (
              <Badge key={index} className={"text-blue-700 font-bold"} variant="ghost">
               {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDiscription;
