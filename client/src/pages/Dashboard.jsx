import React from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../component/DashSidebar'
import DashProfile from '../component/DashProfile'
import DashPost from '../component/DashPost'
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = React.useState("")
  React.useEffect(() => {
    let urlParams = new URLSearchParams(location.search);
    let tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl)

  },[location])
  console.log(tab)
  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div className="md:w-56">
        {/*  sidebar */}
        <DashSidebar/>
      </div>

        {/* profile */}
        {tab === "profile" && <DashProfile/>}

        {/* posts */}
        {tab === "posts" && <DashPost/>}
    </div>
  )
}

export default Dashboard