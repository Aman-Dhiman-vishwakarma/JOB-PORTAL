import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const {searchedquery} = useSelector((store)=>store.job)
  useEffect(() => {
    const fetchalljobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedquery}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchalljobs();
  }, []);
};

export default useGetAllJobs;
