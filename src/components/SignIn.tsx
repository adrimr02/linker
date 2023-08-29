import { BiLinkAlt } from "react-icons/bi"
import UserAuthForm from "./UserAuthForm"

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <BiLinkAlt className="h-12 w-12 mx-auto" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Breadit account and agree to our User Agreement and Privacy Policy.
        </p>

        <UserAuthForm />
      </div>
    </div>
  )
}
export default SignIn
