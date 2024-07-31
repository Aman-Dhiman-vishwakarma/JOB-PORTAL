import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"

const Jobs = () => {
  const { allJobs, searchedquery } = useSelector((store) => store.job);
  const [filterjobs, setfilterjobs] = useState(allJobs);

  useEffect(() => {
    if (searchedquery) {
      const filteredjob = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(searchedquery?.toLowerCase()) ||
          job?.description?.toLowerCase().includes(searchedquery?.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchedquery?.toLowerCase())
          
        );
      });
      setfilterjobs(filteredjob)
    } else {
      setfilterjobs(allJobs);
    }
  }, [allJobs, searchedquery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex gap-5">
          <div className=" w-[16%]">
            {" "}
            <FilterCard />
          </div>
          {filterjobs?.length == 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-4">
                {filterjobs?.map((job) => (
                  <motion.div
                  initial={{opacity:0, x:100}}
                  animate={{opacity:1, x:0}}
                  exit={{opacity:0, x:-100}}
                  transition={{duration:0.3}}
                   key={job?._id}>
                    <Job job={job} />
                  </motion.div>
                ))}{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
