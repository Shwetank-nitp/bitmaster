import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/button";
import Typography from "../ui/Typography";
import React from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { storeDispatch } from "../../hooks/slice-hook";
import { setUser } from "../../redux/user-slice";

function AuthSignin() {
  const [show, setShow] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = storeDispatch();
  const [message, setMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const onSubmit = async () => {
    setLoading(true);
    const url_signin = `${import.meta.env.CONST_BASE_URL}/user/signin`;
    const url_me = `${import.meta.env.CONST_BASE_URL}/user/me`;
    if (!email || !password) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        url_signin,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        const user = await axios.get(url_me, {
          withCredentials: true,
        });
        const data = user.data.user;
        dispatch(
          setUser({
            _id: data._id,
            username: data.username,
            email: data.email,
          })
        );
        navigate(-1);
      }
    } catch (error: any) {
      error = error as AxiosError;
      const message = error.response?.data.message;
      setMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-[460px]">
        <Typography className="font-bold" varient="h3">
          Welcome to BitMaster
        </Typography>
        <Typography varient="h5" className="text-gray-600">
          Sign in to continue
        </Typography>
      </div>
      <div className="text-start flex justify-center flex-col gap-4">
        <div>
          <Typography varient="h6" className="text-slate-800">
            Email
          </Typography>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white focus:outline focus:outline-gray-400 focus:outline-2 rounded-md w-full"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="relative">
          <Typography varient="h6" className="text-slate-800">
            Password
          </Typography>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white focus:outline focus:outline-gray-400 focus:outline-2 rounded-md w-full"
            type={show ? "text" : "password"}
            placeholder="Password"
          />
          <Button
            onClick={() => setShow((prev) => !prev)}
            className="absolute top-10 right-2"
          >
            {!show ? <FaEye color="white" /> : <FaEyeSlash color="white" />}
          </Button>
        </div>
        <Button
          disabled={loading}
          styles={loading ? "cursor-not-allowed" : ""}
          onClick={onSubmit}
        >
          Sign In
        </Button>
        {message && (
          <Typography varient="p" className="text-red-600">
            {message}
          </Typography>
        )}
        <Typography varient="p">
          Don't have an account?{" "}
          <Link className="text-blue-600 hover:underline" to={"/auth/signup"}>
            Sign up
          </Link>
        </Typography>
      </div>
    </>
  );
}

export default AuthSignin;
