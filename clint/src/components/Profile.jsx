import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetApplyedJobs from "@/hooks/useGetApplyedJobs";

const skills = ["HTML", "CSS", "Java Script", "React", "Redux"];

const Profile = () => {
  useGetApplyedJobs();
  const [open, setopen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
          {user?.profile?.profilephoto ? (
                  <Avatar className=" cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilephoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                ) : (
                  <div className="cursor-pointer h-12 w-12 text-3xl font-semibold bg-[#f83002] rounded-full flex items-center justify-center">
                    <span className="mb-[1px] text-white">
                      {user?.fullname[0].toUpperCase()}
                    </span>
                  </div>
                )}
            <div>
              <h1 className="font-bold text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button variant="outline" onClick={()=>{setopen(true)}}>
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-4 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-4 my-2">
            <Contact />
            <span>{user?.phonenumber}</span>
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-lg">Skills</h1>
          <div className="flex items-center gap-2 my-2">
            {user?.profile.skills.length !== 0 ? (
              user?.profile.skills.map((item, index) => <Badge className="bg-violet-600" key={index}>{item}</Badge>)
            ) : (
              <span className="font-semibold text-md">Add your skills to update profile</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-md">Resume</Label>
          {user?.profile?.resune ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline"
            >
              {user?.profile.resumeorignalname}
            </a>
          ) : (
            <span>Add your resume hear to update profile</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl my-10">
          <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
        <UpdateProfileDialog open={open} setopen={setopen} />
    </div>
  );
};

export default Profile;
