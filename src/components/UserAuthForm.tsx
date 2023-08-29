'use client'

import { type FC, useState } from "react"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { cn } from "@/lib/utils"
import { Button } from "./ui/Button"
import { useToast } from "@/hooks/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {

  const [isLoading, setisLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const loginWithGoogle = async () => {
    setisLoading(true)
    
    try {
      await signIn('google')
    } catch(error) {
      toast({
        title: 'There was a problem.',
        description: 'There was a problem logging you in. Please try again.',
        variant: 'destructive',
        duration: 5000,
      })
    } finally {
      setisLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button onClick={loginWithGoogle} isLoading={isLoading} size='sm' className='w-full' >
        {
          !isLoading && <FcGoogle className="h-4 w-4 mr-2" />
        }
        Google
      </Button>
    </div>
  )
}
export default UserAuthForm