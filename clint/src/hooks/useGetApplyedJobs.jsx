import { setallappliyedjobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetApplyedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApplyedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setallappliyedjobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplyedJobs();
  }, []);
};

export default useGetApplyedJobs;