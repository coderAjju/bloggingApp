
import {Link, useNavigate} from "react-router-dom";
import {Button, Label ,TextInput} from 'flowbite-react'
import { useForm } from "react-hook-form";
import useAuthStore from "../zustant/useAuthStore";
const SignIn = () => {
  const navigate = useNavigate();
  const {register,handleSubmit,reset,formState:{errors}} = useForm();
  const {signin} = useAuthStore();
  const submitForm = async (data) => {
    let isSignined = await signin(data);
    if(isSignined)
    reset();
    navigate("/");
  }


  return (
    <div className="min-h-[90vh] flex justify-center  ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col sm:flex-row sm:items-center gap-5">
        {/* left */}
        <div className="flex-1">
            <Link to="/" className="text-4xl font-bold">
             {/* logo */}
             Blog App
            </Link>
            <p className="text-sm mt-5">
              This is a demo project, You can sign up with your email and password or with Google.
            </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
          <div>
            <Label>Username:</Label>
            <TextInput type="text" placeholder="username" id="username"
            {...register("username",{required:"Username is required"})}
            />
            {
              errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )
            }
          </div>
         
          <div>
            <Label>Password:</Label>
            <TextInput type="text" placeholder="password" id="password"
            {
              ...register("password",{required:"Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })
            }
            />
            {
              errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )
            }
          </div>
          <Button color="purple" outline type="submit" >Sign In</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span> Don't have an account? {" "}
              <Link to="/signup" className="text-purple-500">Sign Up</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn