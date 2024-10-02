import Typography from "../ui/Typography";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/button";
import { storeDispatch, storeSelector } from "../../hooks/slice-hook";
import { clearUser } from "../../redux/user-slice";
import axios from "axios";

type Links = {
  name: string;
  link: string;
};

function Navbar() {
  const { user: _auth_user_ } = storeSelector((state) => state.userstate);
  const dispatch = storeDispatch();

  const LogoutHandler = () => {
    const url_logout = import.meta.env.CONST_BASE_URL + "/user/logout";
    axios.get(url_logout, { withCredentials: true }).then(() => {
      dispatch(clearUser());
      navigate("/");
    });
  };

  const links: Links[] = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Problems",
      link: "/problems",
    },
    {
      name: "Roadmaps",
      link: "/roadmap",
    },
    {
      name: "Contests",
      link: "/contests",
    },
  ];

  const navigate = useNavigate();

  return (
    <nav className="flex relative justify-between items-center px-2 md:px-4 py-2 shadow-md w-full">
      <div>
        <Typography varient="h3">BitMaster</Typography>
      </div>
      <div className="z-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex flex-row gap-4 m-auto">
          {links.map((item, index) => (
            <li key={index}>
              <Typography className="hover:underline" varient="h5">
                <Link to={item.link}>{item.name}</Link>
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 justify-center items-center">
        {
          <Typography varient="p" className="text-slate-700">
            {_auth_user_ ? `Hi, ${_auth_user_.username}` : "Guest"}
          </Typography>
        }
        {!_auth_user_ ? (
          <div className="flex gap-2">
            <Button onClick={() => navigate("/auth/signin")}>Sign In</Button>
            <Button onClick={() => navigate("/auth/signup")}>Sign Up</Button>
          </div>
        ) : (
          <Button onClick={LogoutHandler}>Logout</Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
