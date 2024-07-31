import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setloading, setuser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const naviget = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("email", input.email);
    // formData.append("password", input.password);
    // formData.append("role", input.role);

    try {
      dispatch(setloading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setuser(res?.data?.user))
        naviget("/");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setloading(false));
    }
  };
  useEffect(()=>{
    if (user) {
      naviget("/")
    }
   
  }, [])
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-[40%] shadow-lg border border-gray-200 rounded-md p-5 my-10"
        >
          <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>

          <div className="my-4">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Email"
               className="border border-gray-400"
            />
          </div>
          <div className="my-4">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
               className="border border-gray-400"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  onChange={changeEventHandler}
                  checked={input.role === "student"}
                  className=" cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  onChange={changeEventHandler}
                  checked={input.role === "recruiter"}
                  className=" cursor-pointer"
                />{" "}
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-2">
              {" "}
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2">
              Login
            </Button>
          )}

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
