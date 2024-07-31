import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setsearchedquery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Noida", "Uttar Paradesh", "Bangalore", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Devloper",
      "Backend Devloper",
      "Fullstack Devloper",
      "MERN Stack",
      "Data Science",
    ],
  },
];

const FilterCard = () => {
  const [selectedvalue, setselectedvalue] = useState("");
  const dispatch = useDispatch();
  const changrhandler = (value) => {
    setselectedvalue(value)
  }

  useEffect(()=>{
    dispatch(setsearchedquery(selectedvalue))
  }, [selectedvalue])


  return (
    <div>
      <h1 className="font-bold text-xl">Filter Jobs</h1>
      <hr className="my-4" />
      <RadioGroup onValueChange={changrhandler} >
        {filterData.map((data, index) => (
          <div key={index}>
            {" "}
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item} />
                <Label>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
