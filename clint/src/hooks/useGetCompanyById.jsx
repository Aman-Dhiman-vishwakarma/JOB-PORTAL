import { setsinglecompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyid) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchsinglecompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyid}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setsinglecompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchsinglecompany();
  }, [companyid, dispatch]);
};

export default useGetCompanyById;