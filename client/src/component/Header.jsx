import { Button, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon} from "react-icons/fa"
const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link to={"/"} className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
      {/* logo */}
      Blog App
      </Link>
      <form action="">
        <TextInput
        type="text"
        placeholder="Search..."
        rightIcon={AiOutlineSearch}
        className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden rounded-full flex justify-center items-center " color="gray">
        <AiOutlineSearch/>
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="12 w-12 h-10 rounded-full flex justify-center items-center " color="gray">
          <FaMoon/>
        </Button>
        <Link to="/sign-in">
        <Button className="" outline>Sign in</Button>
        </Link>
        <Navbar.Toggle/>
      </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/" ? true : false} as={"div"}>
            <Link to={"/"}>
            Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about" ? true : false} as={"div"}>
            <Link to={"/about"}>
            About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects" ? true : false} as={"div"}>
            <Link to={"/projects"}>
            Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header