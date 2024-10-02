import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Typography from "./components/ui/Typography";
import Home from "./components/pages/Home";
import ProblemProvider from "./components/pages/ProblemProvider";
import AuthSignin from "./components/pages/AuthSignin";
import axios from "axios";
import { storeDispatch } from "./hooks/slice-hook";
import { setUser } from "./redux/user-slice";
import AuthLayout from "./components/layouts/AuthLayout";
import AuthSignUp from "./components/pages/AuthSignUp";
import Container from "./components/layouts/Container";
import ProblemList from "./components/pages/ProblemList";
import Roadmap from "./components/pages/Roadmap";

const AppLayout = lazy(() => import("./components/layouts/AppLayout"));

export default function App() {
  const dispatch = storeDispatch();
  useEffect(() => {
    axios
      .get(`${import.meta.env.CONST_BASE_URL}/user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status !== 200) return;
        dispatch(
          setUser({
            _id: res.data.user._id,
            username: res.data.user.username,
            email: res.data.user.email,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/problem/:slug" element={<ProblemProvider />} />
            <Route
              path="/problems"
              element={<Container children={<ProblemList />} />}
            />
            <Route
              path="/roadmap"
              element={<Container children={<Roadmap />} />}
            />
          </Route>
          <Route
            path="/auth/signin"
            element={
              <AuthLayout
                title="signin - bitmaster"
                children={<AuthSignin />}
              />
            }
          />
          <Route
            path="/auth/signup"
            element={
              <AuthLayout
                title="signup - bitmaster"
                children={<AuthSignUp />}
              />
            }
          />
          <Route
            path="*"
            element={
              <Typography className="text-center">Page Not Found</Typography>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
