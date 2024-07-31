import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import DefaultAvtar from "./DefaultAvtar";

const Job = ({ job }) => {
  const daysagofunction = (mongodbtime) => {
    const createdAt = new Date(mongodbtime);
    const currenttime = new Date();
    const timedifference = currenttime - createdAt;
    return Math.floor(timedifference / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="p-4 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysagofunction(job?.createdAt) == 0
            ? "Today"
            : `${daysagofunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        {job?.company?.logo ? (
          <Button variant="outline" className="p-6" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
        ) : (
          <DefaultAvtar name={job?.company?.name} />
        )}

        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}.</p>
      </div>
      <div className=" flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">
          {job?.jobtype}
        </Badge>
        <Badge className="text-[#6a38c2] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" className="bg-[#7109b7a7]">
          <Link to={`/discription/${job?._id}`}>Detail</Link>
        </Button>
        {/* <Button className="bg-[#7209b7]">Save For Latter</Button> */}
      </div>
    </div>
  );
};

export default Job;
