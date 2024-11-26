import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocument } from "react-icons/hi";
import useAuthStore from "../zustant/useAuthStore";
const DashSidebar = () => {
  const location = useLocation();
  const {authUser} = useAuthStore();
  const [tab, setTab] = React.useState("");
  React.useEffect(() => {
    let urlParams = new URLSearchParams(location.search);
    let tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
    console.log(tabFromUrl);
  }, [location]);
console.log(authUser)
  return (
    <Sidebar className="w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"Admin"}
              labelColor={"dark"}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {authUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiDocument}
              labelColor={"dark"}
              as="div"
              >
              Posts
            </Sidebar.Item>
          </Link>
            )}
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
