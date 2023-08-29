import type { User } from 'next-auth'
import type { FC } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/Avatar'
import type { AvatarProps } from '@radix-ui/react-avatar'
import Image from 'next/image'
import { FaRegUser } from 'react-icons/fa'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'name' |'image'>
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {
        user.image ? (
          <div className='relative aspect-square h-full w-full'>
            <Image
              src={user.image}
              alt={`${user.name}'s profile picture.`}
              fill
              referrerPolicy='no-referrer'
            />
          </div>
        ) : (
          <AvatarFallback>
            <span className='sr-only'>{user.name}</span>
            <FaRegUser className='h-4 w-4' />
          </AvatarFallback>
        )
      }
    </Avatar>
  )
}

export default UserAvatar