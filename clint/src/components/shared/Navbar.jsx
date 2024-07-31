import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setuser } from "@/redux/authSlice";
import { toast } from "sonner";
import DefaultAvtar from "../DefaultAvtar";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const naciget = useNavigate();
  const logouthandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setuser(null));
        naciget("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <Link to="/">
          <h1 className=" text-2xl font-bold">
            Job<span className=" text-[#f83002]">Portal</span>
          </h1>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-8">
            {user && user.role === "recruiter" ? (
              <>
                <li className=" cursor-pointer">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className=" cursor-pointer">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className=" cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className=" cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                {/* <li className=" cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li> */}
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                {" "}
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                {" "}
                <Button className="bg-[#6a38c2] hover:bg-[#6032ae]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                {user?.profile?.profilephoto ? (
                  <Avatar className=" cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilephoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                ) : (
                  <div className="cursor-pointer h-10 w-10 text-2xl font-semibold bg-[#f83002] rounded-full flex items-center justify-center">
                    <span className="mb-[1px] text-white">
                      {user?.fullname[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-4 items-center">
                {user?.profile?.profilephoto ? (
                  <Avatar className=" cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilephoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                ) : (
                  
                  <DefaultAvtar name={user?.fullname} />
                )}
                  <div>
                    <h1 className="font-medium">{user?.fullname}</h1>
                    <p className=" text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className=" flex flex-col items-start">
                  {user && user.role === "student" && (
                    <div className=" flex items-center">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className=" flex items-center mt-2">
                    {" "}
                    <LogOut />
                    <Button onClick={logouthandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
