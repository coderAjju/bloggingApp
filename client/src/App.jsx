import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Project from "./pages/Project"
import Signup from "./pages/Signup"
import SignIn from "./pages/SignIn"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import PageNotFound from "./pages/PageNotFound"
import Header from "./component/Header"
import {Toaster} from 'react-hot-toast'
import FooterCom from "./component/Footer"
import useAuthStore from "./zustant/useAuthStore"
import CreatePostPage from "./pages/CreatePostPage"
const App = () => {
  const {authUser} = useAuthStore();
  console.log(authUser)
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={authUser ?<Home />:<Navigate to={'/signin'} />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={authUser ? <Dashboard />:<Navigate to={'/signin'} />} />
        <Route path="/createPost" element={authUser &&authUser.isAdmin ? <CreatePostPage/> : <Navigate to={'/'} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <FooterCom/>
      <Toaster/>
    </div>
  )
}

export default App