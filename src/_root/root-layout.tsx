import Bottombar from "@/components/shared/bottom-bar";
import LeftSideBar from "@/components/shared/left-side-bar";
import TopBar from "@/components/shared/top-bar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSideBar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
