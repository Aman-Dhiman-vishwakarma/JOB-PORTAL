import { setalladminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchalladminjobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setalladminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchalladminjobs();
  }, []);
};

export default useGetAllAdminJobs;
