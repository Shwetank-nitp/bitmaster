import { Outlet } from "react-router-dom";
import Navbar from "../navigation-bar/Navbar";
import { Title } from "../shared/Title";

function AppLayout() {
  return (
    <>
      <div className="flex flex-col h-full w-full min-h-screen">
        <Title />
        <Navbar />
        <div className="flex-grow">{<Outlet />}</div>
      </div>
    </>
  );
}

export default AppLayout;
