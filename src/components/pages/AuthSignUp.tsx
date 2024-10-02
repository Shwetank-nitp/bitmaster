import Button from "../ui/button";
import Typography from "../ui/Typography";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { storeDispatch } from "../../hooks/slice-hook";
import { setUser } from "../../redux/user-slice";
import { Link, useNavigate } from "react-router-dom";

const signupSchema = z.object({
  username: z
    .string()
    .min(1, "Oh, username is required")
    .max(50, "Nah, Invalid username"),

  email: z
    .string()
    .min(1, "Oh, username is required")
    .email("Ops, Invalid Email")
    .max(50, "Nah, Invalid username"),
  password: z
    .string()
    .min(1, "Password must be atleast 6 characters long")
    .max(50, "Password must be less then 50 characters"),
});

type signUpObject = z.infer<typeof signupSchema>;

function AuthSignUp() {
  const dispatch = storeDispatch();
  const navigate = useNavigate();

  const form = useForm<signUpObject>({
    resolver: zodResolver(signupSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signup = async (obj: signUpObject) => {
    try {
      setLoading(true);
      const url = `${import.meta.env.CONST_BASE_URL}/user/`;
      const res = await axios.post(url + "signup", obj, {
        withCredentials: true,
      });
      if (res.status === 200) {
        const {
          data: { user },
        } = await axios.get(url + "me", {
          withCredentials: true,
        });
        dispatch(setUser(user));
        navigate("/");
      }
    } catch (error: any) {
      if (error as AxiosError) {
        setError(error.data);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <Typography className="font-bold" varient="h3">
          Welcome to BitMaster.
        </Typography>
        <Typography varient="h5" className="text-gray-600">
          Fill the Credenticals to Continue.
        </Typography>
      </div>
      <div className="text-start">
        <form onSubmit={form.handleSubmit(signup)}>
          <fieldset className="flex flex-col gap-3">
            <div>
              <Typography varient="h6" className="text-slate-800 mb-1">
                Username
              </Typography>
              <input
                placeholder="Username"
                className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white focus:outline focus:outline-gray-400 focus:outline-2 rounded-md w-full"
                {...form.register("username")}
                type="text"
              />
              {form.formState.errors.username && (
                <Typography varient="p" addClass="text-red-600">
                  {String(form.formState.errors.username.message)}
                </Typography>
              )}
            </div>
            <div>
              <Typography varient="h6" className="text-slate-800 mb-1">
                Email
              </Typography>
              <input
                placeholder="Email"
                className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white focus:outline focus:outline-gray-400 focus:outline-2 rounded-md w-full"
                {...form.register("email")}
                type="text"
              />
              {form.formState.errors.email && (
                <Typography varient="p" addClass="text-red-600">
                  {String(form.formState.errors.email.message)}
                </Typography>
              )}
            </div>
            <div>
              <Typography varient="h6" className="text-slate-800 mb-1">
                Password
              </Typography>
              <input
                placeholder="Passwrod"
                className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white focus:outline focus:outline-gray-400 focus:outline-2 rounded-md w-full"
                {...form.register("password")}
                type="password"
              />
              {form.formState.errors.password && (
                <Typography varient="p" addClass="text-red-600">
                  {String(form.formState.errors.password.message)}
                </Typography>
              )}
            </div>
            {error && (
              <Typography varient="p" addClass="text-red-600">
                {error}
              </Typography>
            )}
            <Button
              disabled={loading}
              styles={`${loading ? "cursor-not-allowed" : ""}`}
              type="submit"
            >
              <Typography varient="h6">Submit</Typography>
            </Button>
          </fieldset>
        </form>
        <Typography varient="p" addClass="mt-2">
          Don't have an account?{" "}
          <Link className="text-blue-600 hover:underline" to={"/auth/signin"}>
            Sign in
          </Link>
        </Typography>
      </div>
    </>
  );
}

export default AuthSignUp;
