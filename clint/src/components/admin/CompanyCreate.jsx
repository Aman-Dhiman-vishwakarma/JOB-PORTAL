import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setsinglecompany } from "@/redux/companySlice";
import { Loader2 } from "lucide-react";

const CompanyCreate = () => {
    const [companyName, setCompanyName] = useState();
    const naviget = useNavigate();
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);

    const registernewcompany = async () => {
        try {
          setloading(true)
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if (res?.data?.success) {
                toast.success(res.data.message)
                const conpanyId = res?.data?.company?._id
                dispatch(setsinglecompany(res.data.company))
                naviget(`/admin/companies/${conpanyId}`)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
          setloading(false)
        }
    }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Create Your Company</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2 border border-gray-400"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-4 my-10">
          <Link to="/admin/companies"><Button variant="outline">Cancel</Button></Link>
          {loading ? (
            <Button>
              {" "}
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button onClick={registernewcompany}>Continue</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
