import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setsearchedquery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HeroSection = () => {
  const [query, setquery] = useState();
  const dispatch = useDispatch();
  const naviget = useNavigate();

  const searchjobhandler = () => {
    if (!query) {
      return toast.success("Search Field is Empty");
    }
    dispatch(setsearchedquery(query));
    naviget("/browse");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 py-10">
        <span className="mx-auto px-4 py-2 bg-gray-200 font-medium rounded-full text-[#f83002]">
          No. 1 job hunt website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6a38c2]">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam facere
          distinctio maxime?
        </p>
        <div className="w-[40%] flex items-center justify-center shadow-lg border border-gray-200 pl-5 rounded-full mx-auto my-5">
          <input
            onChange={(e) => {
              setquery(e.target.value);
            }}
            type="text"
            placeholder="Find your dream Job"
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchjobhandler}
            className="rounded-r-full bg-[#6a38c2]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
